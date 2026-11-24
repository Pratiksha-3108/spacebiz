import cv2
import numpy as np
from PIL import Image, ImageFilter

def make_sketch(src_path, out_path):
    img = cv2.imread(src_path)
    h, w = img.shape[:2]
    
    # Let's crop or use the main tower from the image
    # In hero.jpg, the tower is in the center/right
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Invert gray image
    inv = 255 - gray
    
    # Gaussian blur
    blur = cv2.GaussianBlur(inv, (21, 21), 0)
    
    # Color dodge blend to create pencil sketch
    sketch = cv2.divide(gray, 255 - blur, scale=256)
    
    # Convert to PIL for feathering and blending
    pil_sketch = Image.fromarray(sketch).convert("RGBA")
    
    # Create smooth horizontal gradient mask (left is transparent, right is opaque)
    mask = Image.new("L", (w, h), 0)
    for x in range(w):
        # start fading from 30% width to 100% width
        alpha = int(max(0, min(1, (x - 0.25 * w) / (0.65 * w))) * 255)
        for y in range(h):
            # Also soft vertical fade at top and bottom
            v_fade = 1.0
            if y < 0.1 * h:
                v_fade = y / (0.1 * h)
            elif y > 0.9 * h:
                v_fade = (h - y) / (0.1 * h)
            mask.putpixel((x, y), int(alpha * v_fade * 0.85))
            
    # Apply warm tone tint matching the ivory background
    tinted = Image.new("RGBA", (w, h), (40, 36, 32, 255))
    # Composite sketch with mask
    pil_sketch.putalpha(mask)
    
    pil_sketch.save(out_path, format="PNG")
    print(f"Created {out_path} ({w}x{h})")

make_sketch("public/images/hero.jpg", "public/images/cta-building-sketch.png")
make_sketch("public/images/banner.webp", "public/images/cta-banner-sketch.png")
