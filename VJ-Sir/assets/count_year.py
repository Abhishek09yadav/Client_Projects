import json
from collections import defaultdict

# Load JSON data from a file
with open('csvjson.json', 'r') as file:
    data = json.load(file)

# Flatten and count objects per year
year_counts = defaultdict(int)
for category, entries in data.items():
    for obj in entries:
        year_counts[obj['year']] += 1

# Save the counts to a new JSON file
with open('year_counts.json', 'w') as output_file:
    json.dump(year_counts, output_file, indent=4)

print("Year-wise object count saved to year_counts.json")
