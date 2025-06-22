

# import sqlite3
# import os

# def get_db_connection():
#     """Creates and returns a database connection."""
#     db_path = os.path.join(os.path.dirname(_file_), 'amazon_recs.db')
#     conn = sqlite3.connect(db_path)
#     conn.row_factory = sqlite3.Row
#     return conn

# def search_products(query_string, limit=20):
#     """
#     Searches for products based on keywords in their name and description.
#     Results are ranked by relevance, with name matches prioritized.

#     Args:
#         query_string (str): The search keywords from the user.
#         limit (int): The maximum number of results to return.

#     Returns:
#         list: A list of product dictionaries matching the query.
#     """
#     if not query_string or not query_string.strip():
#         return []

#     keywords = query_string.strip().split()
#     if not keywords:
#         return []

#     conn = get_db_connection()
    
#     # Build the query dynamically for robust searching and ranking
#     base_query = "SELECT * FROM products WHERE "
#     conditions = []
#     params = []
#     rank_cases = []

#     for i, keyword in enumerate(keywords):
#         # Conditions for WHERE clause (match name OR description)
#         conditions.append(f"name LIKE ?")
#         conditions.append(f"description LIKE ?")
#         params.extend([f'%{keyword}%', f'%{keyword}%'])
        
#         # Build ranking cases to prioritize name matches
#         rank_cases.append(f"WHEN name LIKE ? THEN {len(keywords) - i}")

#     where_clause = " OR ".join(conditions)
    
#     # Rank by name matches first, then by eco-score
#     order_by_clause = f"""
#     ORDER BY
#         CASE {' '.join(rank_cases)} ELSE 0 END DESC,
#         eco_score DESC
#     """
    
#     # Add params for the ORDER BY clause
#     order_by_params = [f'%{kw}%' for kw in keywords]
    
#     final_query = base_query + where_clause + order_by_clause + f" LIMIT {limit}"
    
#     try:
#         cursor = conn.cursor()
#         cursor.execute(final_query, order_by_params + params)
#         results = cursor.fetchall()
#         return [dict(row) for row in results]
#     except sqlite3.Error as e:
#         print(f"Database search error: {e}")
#         return []
#     finally:
#         conn.close()

import sqlite3
import os

def get_db_connection():
    """Creates and returns a database connection."""
    db_path = os.path.join(os.path.dirname(__file__), 'amazon_recs.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def search_products(query_string, limit=20):
    """
    Searches for products based on keywords in their name and description.
    Results are ranked by relevance, with name matches prioritized.

    Args:
        query_string (str): The search keywords from the user.
        limit (int): The maximum number of results to return.

    Returns:
        list: A list of product dictionaries matching the query.
    """
    if not query_string or not query_string.strip():
        return []

    keywords = query_string.strip().split()
    if not keywords:
        return []

    conn = get_db_connection()
    
    # Build the query dynamically for robust searching and ranking
    base_query = "SELECT * FROM products WHERE "
    conditions = []
    params = []
    rank_cases = []

    for i, keyword in enumerate(keywords):
        # Conditions for WHERE clause (match name OR description)
        conditions.append(f"name LIKE ?")
        conditions.append(f"description LIKE ?")
        params.extend([f'%{keyword}%', f'%{keyword}%'])
        
        # Build ranking cases to prioritize name matches
        rank_cases.append(f"WHEN name LIKE ? THEN {len(keywords) - i}")

    where_clause = " OR ".join(conditions)
    
    # Rank by name matches first, then by eco-score
    order_by_clause = f"""
    ORDER BY
        CASE {' '.join(rank_cases)} ELSE 0 END DESC,
        eco_score DESC
    """
    
    # Add params for the ORDER BY clause
    order_by_params = [f'%{kw}%' for kw in keywords]
    
    final_query = base_query + where_clause + order_by_clause + f" LIMIT {limit}"
    
    try:
        cursor = conn.cursor()
        cursor.execute(final_query, order_by_params + params)
        results = cursor.fetchall()
        return [dict(row) for row in results]
    except sqlite3.Error as e:
        print(f"Database search error: {e}")
        return []
    finally:
        conn.close()

def get_autocomplete_suggestions(partial_query, limit=5):
    """
    Gets product name suggestions for search autocomplete.
    This is optimized for speed by only querying names.

    Args:
        partial_query (str): The partial string typed by the user.
        limit (int): The maximum number of suggestions to return.

    Returns:
        list: A list of product names that match the partial query.
    """
    if not partial_query or len(partial_query.strip()) < 2:
        return []

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        # Use LIKE with a wildcard to find names that start with the query
        query = "SELECT name FROM products WHERE name LIKE ? LIMIT ?"
        cursor.execute(query, (f'{partial_query.strip()}%', limit))
        # Return a simple list of names
        return [row['name'] for row in cursor.fetchall()]
    except sqlite3.Error as e:
        print(f"Autocomplete DB error: {e}")
        return []
    finally:
        conn.close()