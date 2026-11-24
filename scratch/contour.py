from PIL import Image

img = Image.open('C:/Users/Admin/.gemini/antigravity/brain/0f0ccc20-b1cd-4ea7-b96d-2854802bac9c/.user_uploaded/media_1795500061994_a722e8e6.jpg')
w, h = img.size

# Let's find where the glow boundary (y threshold where luminance > 40) is across x
print("Glow height (y position where glow starts) across x:")
for x_pct in range(5, 100, 10):
    x = int(w * x_pct / 100)
    # Scan from top to bottom to find where color transitions from dark into warm copper
    y_start = None
    for y in range(int(h * 0.3), int(h * 0.95)):
        r, g, b = img.getpixel((x, y))[:3]
        if r > 50 and r > g * 1.3: # warm glow detected
            y_start = y
            break
    pct = (y_start / h * 100) if y_start else 100
    print(f"x={x_pct}%: glow starts at y={pct:.1f}%")
