# import sqlite3
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import linear_kernel

# class PersonalizeRecommender:
#     def __init__(self):
#         self.conn = sqlite3.connect('database/amazon_recs.db')
    
#     def _get_item_similarity(self):
#         """Item-based collaborative filtering using purchase history"""
#         interactions = pd.read_sql(
#             "SELECT user_id, product_id FROM interactions WHERE action='purchase'", 
#             self.conn
#         )
#         user_item_matrix = pd.pivot_table(
#             interactions,
#             index='user_id',
#             columns='product_id',
#             aggfunc=lambda x: 1,
#             fill_value=0
#         )
#         return cosine_similarity(user_item_matrix.T)

#     def _get_content_similarity(self):
#         """Content-based filtering using product metadata"""
#         products = pd.read_sql("SELECT * FROM products", self.conn)
#         products["metadata"] = products["category"] + " " + products["brand"] + " " + products["eco_score"].astype(str)
#         tfidf = TfidfVectorizer(stop_words="english")
#         tfidf_matrix = tfidf.fit_transform(products["metadata"])
#         return linear_kernel(tfidf_matrix, tfidf_matrix)

#     def get_recommendations(self, user_id, n=5):
#         """Hybrid recommendations (60% CF + 40% Content)"""
#         # Get user's last purchased item
#         last_purchase = pd.read_sql(
#             f"SELECT product_id FROM interactions WHERE user_id={user_id} AND action='purchase' ORDER BY timestamp DESC LIMIT 1",
#             self.conn
#         )
#         if last_purchase.empty:
#             return []
        
#         target_pid = last_purchase.iloc[0]["product_id"]
        
#         # Item-based CF
#         item_sim = self._get_item_similarity()
#         cf_scores = pd.Series(item_sim[target_pid-1], index=range(1, 501))
        
#         # Content-based
#         content_sim = self._get_content_similarity()
#         content_scores = pd.Series(content_sim[target_pid-1], index=range(1, 501))
        
#         # Hybrid weighted scores
#         hybrid_scores = (cf_scores * 0.6 + content_scores * 0.4).sort_values(ascending=False)
#         top_pids = hybrid_scores.index[1:n+1].tolist()  # Exclude self
        
#         return pd.read_sql(
#             f"SELECT * FROM products WHERE product_id IN ({','.join(map(str, top_pids))})",
#             self.conn
#         ).to_dict("records")

import sqlite3
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class PersonalizeRecommender:
    def __init__(self):
        self.conn = sqlite3.connect('database/amazon_recs.db')
        self.all_products = pd.read_sql("SELECT product_id FROM products", self.conn)['product_id'].tolist()
    
    def _get_item_similarity(self):
        """Safe item-based collaborative filtering"""
        try:
            interactions = pd.read_sql(
                "SELECT user_id, product_id FROM interactions WHERE action='purchase'", 
                self.conn
            )
            if len(interactions) < 10:  # Not enough data
                return None
                
            user_item_matrix = pd.pivot_table(
                interactions,
                index='user_id',
                columns='product_id',
                aggfunc=lambda x: 1,
                fill_value=0
            )
            return cosine_similarity(user_item_matrix.T.fillna(0))
        except Exception as e:
            print(f"Error in collaborative filtering: {e}")
            return None

    def _get_content_similarity(self):
        """Safe content-based filtering"""
        try:
            products = pd.read_sql("SELECT * FROM products", self.conn)
            products["metadata"] = products["category"] + " " + products["brand"] + " " + products["eco_score"].astype(str)
            tfidf = TfidfVectorizer(stop_words="english")
            tfidf_matrix = tfidf.fit_transform(products["metadata"])
            return linear_kernel(tfidf_matrix, tfidf_matrix)
        except Exception as e:
            print(f"Error in content filtering: {e}")
            return None

    def get_recommendations(self, user_id, n=5):
        """Bulletproof hybrid recommendations"""
        try:
            # Fallback to popular items if no algorithms work
            fallback = pd.read_sql(
                f"""SELECT p.* FROM products p
                JOIN interactions i ON p.product_id = i.product_id
                GROUP BY p.product_id
                ORDER BY COUNT(i.interaction_id) DESC
                LIMIT {n}""",
                self.conn
            ).to_dict("records")
            
            # Get similarities
            item_sim = self._get_item_similarity()
            content_sim = self._get_content_similarity()
            
            if content_sim is None:
                return fallback
                
            # Get user's last interaction
            last_interaction = pd.read_sql(
                f"""SELECT product_id FROM interactions 
                WHERE user_id={user_id} AND product_id IS NOT NULL
                ORDER BY timestamp DESC LIMIT 1""",
                self.conn
            )
            
            if last_interaction.empty:
                return fallback
                
            target_pid = last_interaction.iloc[0]["product_id"]
            
            # Calculate scores
            if item_sim is not None and target_pid-1 < len(item_sim):
                cf_scores = pd.Series(item_sim[target_pid-1], index=self.all_products)
                content_scores = pd.Series(content_sim[target_pid-1], index=self.all_products)
                hybrid_scores = (cf_scores * 0.6 + content_scores * 0.4)
            else:
                hybrid_scores = pd.Series(content_sim[target_pid-1], index=self.all_products)
            
            # Get top recommendations
            top_pids = hybrid_scores.nlargest(n+1).index.tolist()
            top_pids = [pid for pid in top_pids if pid != target_pid][:n]
            
            result = pd.read_sql(
                f"SELECT * FROM products WHERE product_id IN ({','.join(map(str, top_pids))})",
                self.conn
            ).to_dict("records")
            
            return result if result else fallback
            
        except Exception as e:
            print(f"Error in get_recommendations: {e}")
            return fallback
        
# # Weighted hybrid
# final_score = 0.7 * CF_score + 0.3 * Metadata_score
