import sqlite3
import pandas as pd

class TrendingRecommender:
    def __init__(self):
        self.conn = sqlite3.connect('database/amazon_recs.db')
    
    def get_trending(self, n=5, days=7):
        """Trending products based on recent interactions"""
        return pd.read_sql(f"""
            SELECT p.*, COUNT(i.product_id) as interaction_count
            FROM products p
            JOIN interactions i ON p.product_id = i.product_id
            WHERE i.timestamp >= datetime('now', '-{days} days')
            GROUP BY p.product_id
            ORDER BY interaction_count DESC
            LIMIT {n}
        """, self.conn).to_dict("records")
        
        
# # pseudo
# trending_score = (search_count_last_24h * 0.6) + 
#                  (click_count_last_24h * 0.3) + 
#                  (buy_count_last_24h * 0.1)
