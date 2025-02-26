import json
import os

# Define the path to the JSON file
file_path = "categorized_data.json"  # Update this with the correct path

# Load the JSON data
with open(file_path, "r", encoding="utf-8") as file:
    data = json.load(file)

# Filter out entries with year 2021
for key in data:
    data[key] = [entry for entry in data[key] if entry.get("year") != 2021]

# Save the updated JSON back to the file
with open(file_path, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print("Entries with year 2021 removed successfully.")