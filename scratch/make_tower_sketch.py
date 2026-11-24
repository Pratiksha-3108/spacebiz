import cv2
import numpy as np
from PIL import Image

# Let's load banner.webp
img = cv2.imread("public/images/banner.webp")
h, w = img.shape[:2]

# In banner.webp (1600x930), the SpaceBiz tower is between x=650 and x=1150
# Let's crop the tower with surrounding city to the right: x from 600 to 1600
tower_crop = img[:, 550:]
th, tw = tower_crop.shape[:2]

gray = cv2.cvtColor(tower_crop, cv2.COLOR_BGR2GRAY)
inv = 255 - gray
blur = cv2.GaussianBlur(inv, (19, 19), 0)
sketch = cv2.divide(gray, 255 - blur, scale=256)

# Create PIL Image
sketch_pil = Image.fromarray(sketch).convert("RGBA")

# Build feathered alpha mask:
# left fades from 0 to 1 across first 45% of width
# top and bottom have subtle edge fade
mask = Image.new("L", (tw, th), 0)
for x in range(tw):
    # smooth cubic fade from x=0 to x=0.5*tw
    t = max(0.0, min(1.0, x / (0.45 * tw)))
    # smoothstep
    fade_x = t * t * (3 - 2 * t)
    alpha = int(fade_x * 210) # max opacity around 82%
    for y in range(th):
        fade_y = 1.0
        if y < 0.12 * th:
            fade_y = y / (0.12 * th)
        elif y > 0.88 * th:
            fade_y = (th - y) / (0.12 * th)
        mask.putpixel((x, y), int(alpha * fade_y))

sketch_pil.putalpha(mask)

# Save as WebP / PNG
sketch_pil.save("public/images/cta-spacebiz-sketch.webp", format="WEBP", quality=92)
print(f"Created public/images/cta-spacebiz-sketch.webp ({tw}x{th})")
