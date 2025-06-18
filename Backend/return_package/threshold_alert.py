import time
from datetime import datetime

class ReturnMonitor:
    """
    Monitors package return metrics and triggers alerts if they exceed thresholds.

    This class simulates a real-time monitoring system that could be used to detect
    anomalies such as high return rates for a product, excessive returns from a
    specific region, or fraudulent activity.
    """
    def __init__(self, thresholds):
        """
        Initializes the monitor with specific alert thresholds.

        Args:
            thresholds (dict): A dictionary defining the alert thresholds.
                               Example: {'product_return_rate': 0.15, 'regional_returns_per_day': 100}
        """
        if not isinstance(thresholds, dict):
            raise ValueError("Thresholds must be provided as a dictionary.")
        self.thresholds = thresholds
        print("Return Monitor initialized with the following thresholds:")
        for key, value in self.thresholds.items():
            print(f"  - {key}: {value}")

    def _send_alert(self, alert_type, message, level="WARNING"):
        """
        Placeholder for an alert sending mechanism (e.g., email, SMS, Slack).
        """
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"\n--- ALERT TRIGGERED ---")
        print(f"  Timestamp: {timestamp}")
        print(f"  Level:     {level}")
        print(f"  Type:      {alert_type}")
        print(f"  Message:   {message}")
        print(f"-----------------------")

    def check_product_return_rate(self, product_id, units_sold, units_returned):
        """
        Checks if the return rate for a specific product exceeds the threshold.
        """
        if units_sold == 0:
            return

        rate = units_returned / units_sold
        threshold = self.thresholds.get('product_return_rate')

        print(f"Checking product '{product_id}': Return rate is {rate:.2%}")
        if threshold is not None and rate > threshold:
            message = (f"Product '{product_id}' has a high return rate of {rate:.2%}, "
                       f"exceeding the threshold of {threshold:.2%}.")
            self._send_alert('High Product Return Rate', message, level="CRITICAL")

    def check_regional_returns(self, region, returns_today):
        """
        Checks if the number of returns from a region exceeds the daily threshold.
        """
        threshold = self.thresholds.get('regional_returns_per_day')
        
        print(f"Checking region '{region}': {returns_today} returns today.")
        if threshold is not None and returns_today > threshold:
            message = (f"Region '{region}' has {returns_today} returns today, "
                       f"exceeding the daily threshold of {threshold}.")
            self._send_alert('High Regional Returns', message)


if __name__ == '__main__':
    # --- Example Usage ---
    # Define the thresholds for various alerts.
    alert_thresholds = {
        'product_return_rate': 0.15,       # Alert if >15% of units are returned
        'regional_returns_per_day': 100,   # Alert if >100 returns from one region in a day
    }

    # Initialize the monitor
    monitor = ReturnMonitor(thresholds=alert_thresholds)

    # --- Simulate monitoring over time ---
    print("\n--- Starting Return Monitoring Simulation ---")

    # Scenario 1: A product with a normal return rate
    time.sleep(1)
    monitor.check_product_return_rate(product_id='ECO-MUG-001', units_sold=500, units_returned=25)

    # Scenario 2: A problematic product that triggers an alert
    time.sleep(1)
    monitor.check_product_return_rate(product_id='SOLAR-LIGHT-007', units_sold=120, units_returned=22)

    # Scenario 3: A region with normal return volume
    time.sleep(1)
    monitor.check_regional_returns(region='North-East', returns_today=85)

    # Scenario 4: A region with unusually high return volume, triggering an alert
    time.sleep(1)
    monitor.check_regional_returns(region='West-Coast', returns_today=142)
    
    print("\n--- Monitoring Simulation Complete ---")