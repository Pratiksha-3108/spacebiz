import os
from PIL import Image, ImageFilter

os.makedirs("public/images/amenities", exist_ok=True)

# 5 exact leisure amenities from video:
# 1. Billiards Lounge: frame_093.jpg
# 2. Fully-Equipped Gym: frame_095.jpg
# 3. Executive Salon & Grooming: frame_096.jpg
# 4. Corporate Food Court & Cafeteria: frame_090.jpg
# 5. Landscaped Sky Terraces: frame_081.jpg

mapping = {
    "billiards-lounge.webp": "scratch/frames_L3/frame_093.jpg",
    "fitness-gym.webp": "scratch/frames_L3/frame_095.jpg",
    "executive-salon.webp": "scratch/frames_L3/frame_096.jpg",
    "food-court.webp": "scratch/frames_L3/frame_090.jpg",
    "sky-terraces.webp": "scratch/frames_L3/frame_081.jpg",
}

for out_name, src in mapping.items():
    if os.path.exists(src):
        img = Image.open(src)
        # upscale to 1280x720 using LANCZOS
        upscaled = img.resize((1280, 720), Image.Resampling.LANCZOS)
        # subtle unsharp mask to crisp up details
        sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=3))
        out_path = os.path.join("public/images/amenities", out_name)
        sharpened.save(out_path, format="WEBP", quality=90)
        print(f"Created {out_path} from {src}")
    else:
        print(f"Source not found: {src}")
