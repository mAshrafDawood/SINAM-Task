import json

with open('words.txt', 'r') as f:
    lines = f.readlines()

words = [line.strip() for line in lines]

with open('words.json', 'w') as f:
    json.dump(words, f)
