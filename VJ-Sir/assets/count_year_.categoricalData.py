import json
from collections import defaultdict

# Load JSON data from a file with error handling
try:
    with open('categoricalData.json', 'r') as file:
        data = json.load(file)
except FileNotFoundError:
    print("Error: File 'csvjson.json' not found.")
    exit(1)
except json.JSONDecodeError:
    print("Error: JSON file is not properly formatted.")
    exit(1)

# Flatten and count objects per year
year_counts = defaultdict(int)
if isinstance(data, dict):  # Ensure data is a dictionary
    for category, entries in data.items():
        if isinstance(entries, list):  # Ensure entries is a list
            for obj in entries:
                if 'year' in obj:
                    year_counts[obj['year']] += 1

# Save the counts to a new JSON file
with open('year_counts.json', 'w') as output_file:
    json.dump(year_counts, output_file, indent=4)

print("Year-wise object count saved to year_counts.json")
