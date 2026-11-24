import Hero from "@/components/Hero";
import HorizontalGallery from "@/components/HorizontalGallery";
import AmenitiesShowcase from "@/components/AmenitiesShowcase";
import ConnectivityMap from "@/components/ConnectivityMap";
import ProjectHighlights from "@/components/ProjectHighlights";
import OverviewSection from "@/components/OverviewSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import CountUp from "@/components/CountUp";
import { Reveal, ImageWipe } from "@/components/Reveal";

const stats: [number, number, string, string][] = [
  [150, 0, " m", "Tower height"],
  [37, 0, "", "Floors"],
  [3.36, 2, " L", "Sq. ft. carpet area"],
  [0.5, 1, " km", "To metro station"],
];
const reasons = [
  ["01", "Prime Baner address", "A prominent location on Baner Road, one of Pune's most established commercial corridors."],
  ["02", "Metro & arterial access", "Metro station within 0.5 km and quick links to Aundh, Pashan, Balewadi and Hinjewadi."],
  ["03", "Grade A specification", "Modern architecture, high-speed elevators and a new-age parking system for everyday ease."],
  ["04", "Own or lease", "Use the space for your own operations or lease it out, with flexible office and retail formats."],
  ["05", "Exclusive offices per floor", "Private floor plates give every occupier a composed, uninterrupted work environment."],
  ["06", "Skyline presence", "At 150 metres across 37 floors, SpaceBiz lends lasting visibility to your brand."],
];
const highlights = [
  ["A distinctive skyline presence", "Rising 150 metres across 37 floors, SpaceBiz is a commanding presence on Baner's skyline.", "/images/g1.jpg"],
  ["Privacy at every level", "Exclusive offices on each floor offer a private, composed work environment.", "/images/h2.jpg"],
  ["Arrival, made seamless", "A new-age parking system brings greater ease and efficiency to everyday access.", "/images/h3.jpg"],
];
const spaces = [
  ["Offices", "Efficient, column-light floor plates for teams of every size, with private floor options.", "/images/g3.jpg"],
  ["Retail", "Premium double-height frontage with strong visibility on Baner Road.", "/images/g2.jpg"],
  ["Showrooms", "Landmark ground-level presence for brands that want to be seen.", "/images/s2.jpg"],
];

export default function Page() {
  return (
    <main>
      <Hero />

      <section className="stats-band">
        <div className="wrap stats-grid">
          {stats.map(([n, d, s, l], i) => (
            <Reveal key={l} delay={i * 0.1} className="stat-cell">
              <b><CountUp to={n} decimals={d} suffix={s} /></b>
              <span>{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <OverviewSection />

      <ProjectHighlights />

      <AmenitiesShowcase />

      <section className="light">
        <div className="wrap">
          <SectionHead eyebrow="CHOOSE YOUR SPACE" title="A format for every business" sub="Offices, retail and showrooms, planned around how modern businesses operate." />
          <div className="grid3">
            {spaces.map(([t, d, s], i) => (
              <Reveal key={t} delay={i * 0.12} className="card">
                <ImageWipe src={s} alt={t} className="wide" />
                <h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark walk">
        <div className="wrap">
          <SectionHead eyebrow="WALKTHROUGH" title="Experience SpaceBiz" sub="Step inside and see the tower come to life." />
          <Reveal>
            <div className="walkthrough-video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/J000_UMusmU?rel=0&modestbranding=1"
                title="Jhamtani SpaceBiz Architectural Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="walkthrough-iframe"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <HorizontalGallery />

      <section id="why-invest" className="light">
        <div className="wrap">
          <SectionHead eyebrow="WHY INVEST" title="Invest in a future of possibilities" sub="Own commercial space in one of Pune's fastest-growing business corridors." />
          <div className="reasons">
            {reasons.map(([n, t, d], i) => (
              <Reveal key={n} delay={(i % 3) * 0.1} className="reason">
                <span className="reason-no">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="disclaimer">Returns depend on market conditions and are not guaranteed.</p></Reveal>
        </div>
      </section>

      <ConnectivityMap />

      <CTASection />

      <Footer />
    </main>
  );
}
