type LandingSectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
};

export default function LandingSectionHeading({
  eyebrow,
  heading,
  intro,
}: LandingSectionHeadingProps) {
  return (
    <div className="landing-section-heading">
      {eyebrow ? <p className="landing-eyebrow">{eyebrow}</p> : null}
      <h2>{heading}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
