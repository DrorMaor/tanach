import os
import sys
import json

def num_to_heb(num):
    hundreds = (num // 100) * 100
    tens = ((num % 100) // 10) * 10
    digits = num % 10
    heb = ""
    if hundreds == 100:
        heb = "ק"
    if hundreds == 200:
        heb = "ר"
    if hundreds == 300:
        heb = "ש"
    if hundreds == 400:
        heb = "ת"
    
    if tens == 10:
        heb += "י"
    if tens == 20:
        heb += "כ"
    if tens == 30:
        heb += "ל"
    if tens == 40:
        heb += "מ"
    if tens == 50:
        heb += "נ"
    if tens == 60:
        heb += "ס"
    if tens == 70:
        heb += "ע"
    if tens == 80:
        heb += "פ"
    if tens == 90:
        heb += "צ"

    if digits == 1:
        heb += "א"
    if digits == 2:
        heb += "ב"
    if digits == 3:
        heb += "ג"
    if digits == 4:
        heb += "ד"
    if digits == 5:
        heb += "ה"
    if digits == 6:
        heb += "ו"
    if digits == 7:
        heb += "ז"
    if digits == 8:
        heb += "ח"
    if digits == 9:
        heb += "ט"

    return heb

name = sys.argv[1]  # this is person's name
root_folder = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(root_folder, "tnx.json")
with open(json_file_path, 'r', encoding='utf-8') as f: 
    data = json.load(f)

for mechitza in data["mechitza"]:
    for sefer in mechitza["seforim"]:
        _kapitel = 1
        for kapitel in sefer["text"]:
            _posuk = 1 
            for posuk in kapitel:
                if (posuk[0:1] == name[0:1] and posuk[-1:] == name[-1:]):
                    print (f"{sefer['name']} {num_to_heb(_kapitel)}:{num_to_heb(_posuk)}")
                    print (posuk)
                _posuk += 1
            _kapitel += 1