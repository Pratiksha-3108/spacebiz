import urllib.request

try:
    with urllib.request.urlopen("http://localhost:3000") as resp:
        print("Status:", resp.status)
        html = resp.read().decode("utf-8")
        print("HTML length:", len(html))
        print("Has sb-cta-card:", "sb-cta-card" in html)
        print("Has landmark address in Baner:", ("landmark" in html and "Baner" in html))
        print("Has Book a site visit:", "Book a site visit" in html)
        print("Has old form action:", "/api/enquiry" in html)
        print("Has inline style tags:", "<style>" in html)
except Exception as e:
    print("Error:", e)
