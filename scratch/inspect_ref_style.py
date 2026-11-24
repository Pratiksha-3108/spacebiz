import cv2
import numpy as np
from PIL import Image

# Let's crop the building portion of user's uploaded reference image to inspect it closely
ref_img = Image.open(r"C:/Users/Admin/.gemini/antigravity/brain/0f0ccc20-b1cd-4ea7-b96d-2854802bac9c/.user_uploaded/media_1795512569386_d5e3003e.jpg")
w, h = ref_img.size
crop_building = ref_img.crop((int(w * 0.5), 0, w, h))
crop_building.save("scratch/ref_building_style.jpg")
print(f"Saved ref_building_style.jpg ({crop_building.size})")
