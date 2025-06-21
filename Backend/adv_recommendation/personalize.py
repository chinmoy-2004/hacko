
import sqlite3
import pandas as pd
import math
import random
# from transformers import GPT2Tokenizer, GPT2LMHeadModel
# import torch

# # Load tokenizer and model
# tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
# model = GPT2LMHeadModel.from_pretrained("distilgpt2")

# # Create example user history
# history = "eco toothbrush, bamboo cup, recycled bag"
# input_ids = tokenizer.encode(history, return_tensors='pt')

# # Generate next recommendation
# outputs = model.generate(input_ids, max_length=20, num_return_sequences=1)
# recommendation = tokenizer.decode(outputs[0])

# print("Recommendation:", recommendation)

# FIX: Use a relative import to robustly find the module within the same package.
from .trending import TrendingRecommender

class PersonalizedRecommender:
    def __init__(self, db_path='database/amazon_recs.db'):
        """Initializes the recommender with a database connection."""
        self.db_path = db_path
        self.conn = sqlite3.connect(self.db_path)

    def _del_(self):
        """Ensures the database connection is closed when the object is destroyed."""
        if self.conn:
            self.conn.close()

    def get_recommendations(self, user_id, n=5):
        """
        Generates personalized recommendations for a given user using a hybrid architecture.
        This orchestrates the entire personalization stream.
        """
        # 1. CANDIDATE RETRIEVAL (Collaborative + Content Features)
        # Mimics retrieving a candidate pool from two-tower models and content embeddings.
        candidates = self._get_candidate_pool(user_id, pool_size=50)
        if candidates.empty:
            # Fallback to general trending items if no candidates are found
            # FIX: Pass the db_path to the fallback recommender instance.
            return TrendingRecommender(db_path=self.db_path).get_trending(n)

        # 2. GENERATIVE SEQUENTIAL MODEL (Simulated HSTU-like LLM)
        # Simulates an LLM generating next-item predictions based on user's recent history.
        sequential_candidates = self._simulate_sequential_model(user_id, candidates)

        # 3. REINFORCEMENT LEARNING RE-RANKING (Simulated RL Policy)
        # Simulates an RL agent re-ranking items to optimize for long-term value (eco-score).
        rl_ranked_candidates = self._simulate_rl_ranking(sequential_candidates)

        # 4. MULTI-ARMED BANDIT SELECTION (Simulated MAB for Exploration)
        # Simulates a Multi-Armed Bandit (UCB1) to balance exploiting popular items
        # and exploring lesser-known ones.
        final_recommendations = self._simulate_mab_selection(rl_ranked_candidates, n)

        return final_recommendations

    def _get_candidate_pool(self, user_id, pool_size=50):
        """
        Step 1: Retrieve a broad candidate pool using collaborative and content-based filtering.
        This simulates the output of a two-tower model.
        """
        query = f"""
            WITH UserPurchases AS (
                SELECT product_id FROM interactions WHERE user_id = {user_id} AND action = 'purchase'
            ),
            SimilarUsers AS (
                -- Find users who purchased the same items
                SELECT DISTINCT i.user_id
                FROM interactions i
                WHERE i.product_id IN (SELECT product_id FROM UserPurchases) AND i.user_id != {user_id}
                LIMIT 10
            ),
            CollaborativeCandidates AS (
                -- Get items purchased by similar users
                SELECT p.*
                FROM interactions i
                JOIN products p ON i.product_id = p.product_id
                WHERE i.user_id IN (SELECT user_id FROM SimilarUsers)
                  AND i.product_id NOT IN (SELECT product_id FROM UserPurchases)
            ),
            ContentCategories AS (
                -- Get categories of items the user has purchased
                SELECT DISTINCT p.category
                FROM products p
                JOIN interactions i ON p.product_id = i.product_id
                WHERE i.user_id = {user_id}
            ),
            ContentCandidates AS (
                -- Get other items from those categories
                SELECT p.*
                FROM products p
                WHERE p.category IN (SELECT category FROM ContentCategories)
                  AND p.product_id NOT IN (SELECT product_id FROM UserPurchases)
            )
            -- Union the results to create the final pool
            SELECT * FROM CollaborativeCandidates
            UNION
            SELECT * FROM ContentCandidates
            LIMIT {pool_size}
        """
        return pd.read_sql(query, self.conn)

    def _simulate_sequential_model(self, user_id, candidates_df):
        """
        Step 2: Simulate a sequential model (like HSTU) by boosting candidates
        related to the user's most recent interactions.
        """
        # Get user's last 3 interactions
        recent_interactions_query = f"""
            SELECT product_id FROM interactions
            WHERE user_id = {user_id}
            ORDER BY timestamp DESC
            LIMIT 3
        """
        recent_product_ids = pd.read_sql(recent_interactions_query, self.conn)['product_id'].tolist()

        if not recent_product_ids:
            candidates_df['sequential_score'] = 1.0
            return candidates_df

        # Get categories of recent items
        recent_categories_query = f"SELECT DISTINCT category FROM products WHERE product_id IN ({','.join(map(str, recent_product_ids))})"
        recent_categories = pd.read_sql(recent_categories_query, self.conn)['category'].tolist()

        # Boost score for items in the same category as recent interactions
        def calculate_sequential_score(row):
            if row['category'] in recent_categories:
                return 1.5  # Boost score
            return 1.0

        candidates_df['sequential_score'] = candidates_df.apply(calculate_sequential_score, axis=1)
        return candidates_df

    def _simulate_rl_ranking(self, candidates_df):
        """
        Step 3: Simulate an RL agent's policy by scoring items based on a
        reward function that optimizes for eco-friendliness.
        """
        # Simple reward: eco_score is a proxy for long-term user satisfaction and alignment.
        # The RL agent learns that higher eco_score leads to better long-term rewards.
        candidates_df['rl_score'] = candidates_df['eco_score'] / 100.0
        candidates_df['final_score'] = candidates_df['sequential_score'] * candidates_df['rl_score']
        return candidates_df.sort_values(by='final_score', ascending=False)

    def _simulate_mab_selection(self, candidates_df, n):
        """
        Step 4: Simulate a Multi-Armed Bandit (UCB1) to balance exploration/exploitation.
        """
        if candidates_df.empty:
            return []
            
        # Get total interactions for all products in the candidate set
        product_ids_str = ','.join(map(str, candidates_df['product_id'].tolist()))
        interactions_query = f"""
            SELECT product_id, COUNT(*) as interaction_count
            FROM interactions
            WHERE product_id IN ({product_ids_str})
            GROUP BY product_id
        """
        interactions = pd.read_sql(interactions_query, self.conn).set_index('product_id')
        
        # Merge interaction counts, filling missing with 1 to avoid division by zero
        candidates_df = candidates_df.merge(interactions, on='product_id', how='left')
        candidates_df['interaction_count'] = candidates_df['interaction_count'].fillna(1)

        total_interactions = candidates_df['interaction_count'].sum()
        if total_interactions == 0: total_interactions = 1

        # UCB1 formula to balance known performance (exploit) with uncertainty (explore)
        C = 1.5 # Exploration parameter
        def ucb_score(row):
            exploitation_term = row['final_score']
            # Add a small epsilon to log to avoid log(0)
            exploration_term = C * math.sqrt(math.log(total_interactions + 0.001) / row['interaction_count'])
            return exploitation_term + exploration_term

        candidates_df['ucb_score'] = candidates_df.apply(ucb_score, axis=1)
        
        # Return top N items based on the UCB score
        top_n_df = candidates_df.sort_values(by='ucb_score', ascending=False).head(n)
        return top_n_df.to_dict('records')

# Example usage:
if __name__ == '_main_':
    # Note: Running this file directly may now cause an error due to the relative import.
    # This is expected, as this module is designed to be imported by your main app.
    recommender = PersonalizedRecommender()
    user_id = 1  # Example user
    recommendations = recommender.get_recommendations(user_id, n=5)
    
    print(f"Personalized recommendations for user {user_id}:")
    if recommendations:
        for item in recommendations:
            print(f"- {item['name']} (Eco-Score: {item['eco_score']}, UCB Score: {item.get('ucb_score', 'N/A'):.2f})")
    else:
        print("No recommendations found.")
