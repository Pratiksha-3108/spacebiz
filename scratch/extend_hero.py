from PIL import Image, ImageDraw
import numpy as np

# Load original
orig = Image.open('d:/DTG/jhamtani-Spacebiz/public/images/banner.webp')
w, h = orig.size
print(f"Original size: {w}x{h}")

# Backup original
orig.save('d:/DTG/jhamtani-Spacebiz/public/images/banner_backup.webp', format='WEBP')

# We want to add ~160px of sky at the top
added_top = 160
new_h = h + added_top
new_img = Image.new('RGB', (w, new_h))

# Paste original at y = added_top
new_img.paste(orig, (0, added_top))

# Now smoothly extend the sky upwards
# Sample the top 30 rows of the original image (rows 0 to 30)
# and seamlessly blend them upwards
top_slice = orig.crop((0, 0, w, 40))

# For each x column, smoothly continue the gradient upwards
top_arr = np.array(orig.crop((0, 0, w, 20)), dtype=float) # (20, w, 3)
col_mean = np.mean(top_arr[:5], axis=0) # (w, 3) color at the very top of each column
# Gradient slope
slope = (np.mean(top_arr[15:20], axis=0) - col_mean) / 15.0 # change per row going down

# Fill new_img from y=0 to added_top
sky_fill = np.zeros((added_top, w, 3), dtype=np.uint8)
for y in range(added_top):
    # As y goes from 0 to added_top, color smoothly approaches col_mean
    # Extend slightly darker/deeper sky towards the top
    factor = (added_top - y) * 0.4
    row_color = col_mean - slope * factor
    row_color = np.clip(row_color, 0, 255)
    sky_fill[y] = row_color.astype(np.uint8)

sky_img = Image.fromarray(sky_fill)
new_img.paste(sky_img, (0, 0))

# Smoothly blur the transition zone between added sky and original image (around added_top)
transition_zone = new_img.crop((0, added_top - 15, w, added_top + 15))
from PIL import ImageFilter
transition_blurred = transition_zone.filter(ImageFilter.GaussianBlur(radius=3))
new_img.paste(transition_blurred, (0, added_top - 15))

# Save optimized
new_img.save('d:/DTG/jhamtani-Spacebiz/public/images/banner.webp', 'WEBP', quality=92)
print(f"New banner saved: {w}x{new_h}, building roof is now at y={60 + added_top}px ({ (60 + added_top) / new_h * 100:.1f}%)")
