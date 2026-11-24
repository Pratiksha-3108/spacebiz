import { Reveal } from "./Reveal";

// One heading pattern for every section: same eyebrow, title and subtitle sizes site-wide.
export default function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={`section-head ${center ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </Reveal>
  );
}
