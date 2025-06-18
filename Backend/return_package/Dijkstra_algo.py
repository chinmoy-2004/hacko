import heapq

def find_shortest_path(graph, start_node, end_node):
    """
    Finds the shortest path between two nodes in a graph using Dijkstra's algorithm.

    This function can be used to determine the most cost-effective or time-efficient
    route for a package return through a network of drop-off points, hubs, and warehouses.

    Args:
        graph (dict): A dictionary representing the logistics network. 
                      Keys are node names (e.g., 'Customer', 'Hub_A').
                      Values are dictionaries of neighbors with edge weights (cost/distance).
        start_node (str): The starting point of the return (e.g., 'Customer').
        end_node (str): The final destination for the return (e.g., 'Warehouse').

    Returns:
        tuple: A tuple containing:
               - list: The sequence of nodes in the shortest path.
               - float: The total cost or distance of the shortest path.
               Returns (None, float('inf')) if no path exists.
    """
    # Priority queue to store (cost, current_node, path_list)
    priority_queue = [(0, start_node, [start_node])]
    
    # Set to keep track of visited nodes to avoid cycles and redundant work
    visited_nodes = set()

    while priority_queue:
        # Get the node with the smallest cost
        (cost, current_node, path) = heapq.heappop(priority_queue)

        if current_node in visited_nodes:
            continue
        
        visited_nodes.add(current_node)

        # If the destination is reached, return the path and its cost
        if current_node == end_node:
            return path, cost

        # Explore neighbors
        for neighbor, weight in graph.get(current_node, {}).items():
            if neighbor not in visited_nodes:
                new_cost = cost + weight
                new_path = path + [neighbor]
                heapq.heappush(priority_queue, (new_cost, neighbor, new_path))

    # If the loop finishes, no path was found
    return None, float('inf')

if __name__ == '__main__':
    # --- Example Usage ---
    # Define a sample logistics network. Weights can represent cost, distance, or time.
    logistics_network = {
        'Customer': {'DropOff_A': 5, 'DropOff_B': 10},
        'DropOff_A': {'Hub_Central': 20},
        'DropOff_B': {'Hub_Central': 15, 'Hub_West': 25},
        'Hub_Central': {'Warehouse': 30},
        'Hub_West': {'Warehouse': 20},
        'Warehouse': {}
    }

    start_location = 'Customer'
    end_destination = 'Warehouse'

    print(f"Calculating the most efficient return route from {start_location} to {end_destination}...")
    
    shortest_path, total_cost = find_shortest_path(logistics_network, start_location, end_destination)

    if shortest_path:
        print(f"\nOptimal Route Found:")
        print(f"  -> Path: {' -> '.join(shortest_path)}")
        print(f"  -> Total Cost/Distance: {total_cost}")
    else:
        print("\nNo viable return route could be found.")