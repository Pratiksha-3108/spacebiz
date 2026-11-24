from PIL import Image

im = Image.open("public/images/cta-spacebiz-sketch.webp")
im.resize((im.width // 3, im.height // 3)).save("scratch/test_tower.png")
print("Saved scratch/test_tower.png")
