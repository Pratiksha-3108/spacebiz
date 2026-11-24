from PIL import Image, ImageDraw, ImageFont

# Let's verify how the extended stem looks
img = Image.new('RGB', (600, 300), color=(20, 16, 14))
draw = ImageDraw.Draw(img)

# Try loading Figtree or Arial or default sans
try:
    font = ImageFont.truetype("arial.ttf", 140)
except:
    font = ImageFont.load_default()

text = "SpaceBiz"
draw.text((40, 60), text, fill=(240, 200, 180), font=font)

# Get bounding box of 'p'
bbox_s = draw.textbbox((40, 60), "S", font=font)
bbox_sp = draw.textbbox((40, 60), "Sp", font=font)
bbox_p_only = (bbox_s[2], bbox_sp[1], bbox_sp[2], bbox_sp[3])
print(f"bbox of p: {bbox_p_only}")

# Stem width is around 22-26px at font size 140
stem_x0 = bbox_s[2]
stem_x1 = stem_x0 + 24
stem_y_top = bbox_s[1] # align with top of S!
stem_y_bottom = bbox_sp[3]
print(f"Extended stem from y={stem_y_top} to y={stem_y_bottom} at x={stem_x0}..{stem_x1}")

# Draw extended stem
draw.rectangle([stem_x0, stem_y_top, stem_x1, stem_y_bottom], fill=(240, 200, 180))
img.save("d:/DTG/jhamtani-Spacebiz/scratch/test_stem.png")
print("Saved test_stem.png")
