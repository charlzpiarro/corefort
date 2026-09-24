const SectionTitle = ({
  title,
  paragraph,
  eyebrow,
  width = "570px",
  center,
  mb = "100px",
  light,
}: {
  title: string;
  paragraph: string;
  eyebrow?: string;
  width?: string;
  center?: boolean;
  mb?: string;
  light?: boolean;
}) => {
  return (
    <>
      <div
        className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb }}
      >
        {eyebrow && (
          <p
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
              light
                ? "border-white/20 bg-white/[0.06] text-white/80"
                : "border-primary/20 bg-primary/5 text-primary"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`mb-4 text-3xl font-bold !leading-tight sm:text-4xl md:text-[45px] ${
            light ? "text-white" : "text-black dark:text-white"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-base !leading-relaxed md:text-lg ${
            light ? "text-white/70" : "text-body-color"
          }`}
        >
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
