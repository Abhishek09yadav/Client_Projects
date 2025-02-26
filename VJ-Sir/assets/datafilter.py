import json

# Load the JSON data from the file
with open('csvjson.json', 'r') as file:
    data = json.load(file)

# Initialize an empty dictionary to hold the categorized data
categorized_data = {}

# Iterate through each entry in the data
for entry in data:
    category = entry['category']

    # If the category is not already in the dictionary, add it with an empty list
    if category not in categorized_data:
        categorized_data[category] = []

    # Append the entry to the appropriate category list
    categorized_data[category].append(entry)

# Save the categorized data to a new JSON file
with open('categorized_data.json', 'w') as file:
    json.dump(categorized_data, file, indent=4)

print("Data has been categorized and saved to 'categorized_data.json'.")