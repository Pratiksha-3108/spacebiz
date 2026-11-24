from PIL import Image

# Resize sketches down for quick visual inspection
im1 = Image.open("public/images/cta-building-sketch.png")
im1.resize((im1.width // 4, im1.height // 4)).save("scratch/test_sketch1.png")

im2 = Image.open("public/images/cta-banner-sketch.png")
im2.resize((im2.width // 4, im2.height // 4)).save("scratch/test_sketch2.png")
print("Saved resized previews")
