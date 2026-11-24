import urllib.request

try:
    with urllib.request.urlopen("http://localhost:3000") as resp:
        print("Status:", resp.status)
        html = resp.read().decode("utf-8")
        print("HTML length:", len(html))
        print("Has sharp-cta-box:", "sharp-cta-box" in html)
        print("Has cta-spacebiz-sketch.webp:", "cta-spacebiz-sketch.webp" in html)
        print("Has Now Is The Time To Make:", "Now Is The Time To Make" in html)
        print("Has Explore Properties:", "Explore Properties" in html)
except Exception as e:
    print("Error:", e)
