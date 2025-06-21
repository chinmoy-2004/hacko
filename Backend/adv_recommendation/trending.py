
import sqlite3
import pandas as pd
import random
# from transformers import GPT2Tokenizer, GPT2LMHeadModel
# import torch

# # Load tokenizer and model
# tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
# model = GPT2LMHeadModel.from_pretrained("distilgpt2")

class TrendingRecommender:
    def __init__(self, db_path='database/amazon_recs.db'):
        """Initializes the recommender with a database connection."""
        self.db_path = db_path
        self.conn = sqlite3.connect(self.db_path)

    def _del_(self):
        """Ensures the database connection is closed when the object is destroyed."""
        if self.conn:
            self.conn.close()

    def get_trending(self, n=5, days=30):
        """
        Generates trending recommendations using a simulated graph-LLM hybrid architecture.
        """
        # 1. REAL-TIME POPULARITY & TREND GRAPH (Simulated GNN)
        # Simulates a GNN by calculating a trend score based on recent popularity and velocity.
        trending_candidates = self._simulate_trend_graph_recall(days, pool_size=n*4)
        if trending_candidates.empty:
            return []

        # 2. GENERATIVE RE-RANKING (Simulated LLM Re-ranker)
        # Simulates an LLM re-ranker that considers not just popularity, but also content quality.
        reranked_candidates = self._simulate_llm_reranker(trending_candidates)

        # 3. REINFORCED LIST CURATION (Simulated RL for List Optimization)
        # Simulates an RL policy (like SlateQ) that optimizes the final list for diversity.
        diversified_list = self._simulate_rl_list_diversification(reranked_candidates, n)

        return diversified_list

    def _simulate_trend_graph_recall(self, days, pool_size):
        """
        Step 1: Recall top candidates by calculating a 'trend_score' based on recent
        interactions and their velocity, simulating a GNN over a co-occurrence graph.
        """
        # A more sophisticated query that includes velocity (recent vs. older activity)
        query = f"""
            WITH RecentInteractions AS (
                SELECT
                    product_id,
                    -- Weight recent interactions more heavily
                    SUM(CASE WHEN timestamp >= datetime('now', '-{days//2} days') THEN 1.5 ELSE 1.0 END) as weighted_interactions,
                    -- Calculate velocity: interactions in the last half of the window vs the first
                    SUM(CASE WHEN timestamp >= datetime('now', '-{days//2} days') THEN 1 ELSE 0 END) as recent_half_count,
                    SUM(CASE WHEN timestamp < datetime('now', '-{days//2} days') THEN 1 ELSE 0 END) as older_half_count
                FROM interactions
                WHERE timestamp >= datetime('now', '-{days} days')
                GROUP BY product_id
            )
            SELECT
                p.*,
                ri.weighted_interactions,
                (ri.recent_half_count - ri.older_half_count) as velocity
            FROM products p
            JOIN RecentInteractions ri ON p.product_id = ri.product_id
        """
        df = pd.read_sql(query, self.conn)
        if df.empty:
            return df

        # The GNN's output is simulated by this trend score calculation
        df['trend_score'] = df['weighted_interactions'] + (df['velocity'] * 2.0)
        return df.sort_values(by='trend_score', ascending=False).head(pool_size)

    def _simulate_llm_reranker(self, candidates_df):
        """
        Step 2: Simulate an LLM re-ranker by applying a content-aware boost.
        The LLM understands that products with high eco-scores and good descriptions are better.
        """
        def content_boost(row):
            # Boost for high eco-score
            score_boost = row['eco_score'] / 50.0  # Max boost of 2.0
            # Boost for having a description
            desc_boost = 1.2 if row['description'] and len(row['description']) > 20 else 1.0
            return score_boost * desc_boost

        candidates_df['rerank_score'] = candidates_df['trend_score'] * candidates_df.apply(content_boost, axis=1)
        return candidates_df.sort_values(by='rerank_score', ascending=False)

    def _simulate_rl_list_diversification(self, candidates_df, n):
        """
        Step 3: Simulate an RL agent optimizing for list diversity (SlateQ).
        This uses a greedy approach to build a final list that avoids showing too many
        items from the same category.
        """
        final_list = []
        selected_categories = set()
        
        for _, item in candidates_df.iterrows():
            if len(final_list) >= n:
                break
            
            category = item['category']
            # If the category is already well-represented, slightly penalize this item.
            # This simulates the RL policy learning to value diversity.
            if category in selected_categories:
                # 50% chance to skip to promote diversity
                if random.random() < 0.5:
                    continue
            
            final_list.append(item.to_dict())
            selected_categories.add(category)

        # If the list is still too short, fill it with the top remaining items
        if len(final_list) < n:
            remaining_items_df = candidates_df[~candidates_df['product_id'].isin([i['product_id'] for i in final_list])]
            final_list.extend(remaining_items_df.head(n - len(final_list)).to_dict('records'))
            
        return final_list

# # Example usage:
# if _name_ == '_main_':
#     recommender = TrendingRecommender()
#     trending_products = recommender.get_trending(n=5, days=30)
    
#     print("Top 5 Trending & Diversified Products:")
#     if trending_products:
#         for item in trending_products:
#             print(f"- {item['name']} (Category: {item['category']}, Rerank Score: {item.get('rerank_score', 'N/A'):.2f})")
#     else:
#         print("No trending products found.")