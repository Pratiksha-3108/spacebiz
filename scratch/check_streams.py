import json

with open("scratch/player_response.json", "r", encoding="utf-8") as f:
    data = json.load(f)

streamingData = data.get("streamingData", {})
formats = streamingData.get("formats", [])
adaptiveFormats = streamingData.get("adaptiveFormats", [])
print(f"Formats count: {len(formats)}, Adaptive formats count: {len(adaptiveFormats)}")
if formats:
    print("Direct format sample:", formats[0].get("qualityLabel"), formats[0].get("mimeType"))
    if "url" in formats[0]:
        print("Direct URL available!")
if adaptiveFormats:
    for f in adaptiveFormats[:3]:
        print("Adaptive:", f.get("qualityLabel"), f.get("mimeType"), "has url:", "url" in f)
