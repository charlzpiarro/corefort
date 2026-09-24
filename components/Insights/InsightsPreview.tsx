import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import insightsData from "./insightsData";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Colour-filled covers, one per card. Swap in real photos later by adding an <Image> inside the cover.
const COVERS = [
  "bg-[linear-gradient(135deg,#1D3FD1_0%,#3A56E8_60%,#5B7BFF_100%)]",
  "bg-[linear-gradient(160deg,#0E1326_0%,#05060A_100%)]",
  "bg-[linear-gradient(135deg,#FFD58A_0%,#FBB040_60%,#E8930C_100%)]",
];
const COVER_TEXT = ["text-white", "text-white", "text-ink"];

const InsightsPreview = () => {
  const [lead, ...rest] = insightsData.slice(0, 3);
  const side = rest.slice(0, 2);

  return (
    <Stage tone="light">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="Insights"
          title="Perspectives From Our Team"
          paragraph="Notes on engineering, security, and building technology for the markets we operate in."
          center
          mb="52px"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* featured */}
        <Link
          href={`/insights/${lead.slug}`}
          data-aos="fade-up"
          className="group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-glow"
        >
          <div className={`relative flex min-h-[220px] flex-1 items-end overflow-hidden p-6 sm:min-h-[280px] sm:p-8 ${COVERS[0]} ${COVER_TEXT[0]}`}>
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/20" />
            <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/25" />
            <span aria-hidden className="pointer-events-none absolute right-8 top-8 h-3 w-3 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(251,176,64,0.7)]" />
            <span className="glass relative rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">{lead.category}</span>
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="mb-3 text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-primary sm:text-[28px]">{lead.title}</h3>
            <p className="mb-5 text-base leading-relaxed text-body-color">{lead.summary}</p>
            <div className="flex items-center justify-between text-xs text-body-color">
              <span>
                {formatDate(lead.date)} · {lead.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                Read
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>

        {/* two stacked */}
        <div className="flex flex-col gap-5">
          {side.map((post, i) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 80}
              className="group flex flex-1 overflow-hidden rounded-3xl border border-stroke bg-white shadow-card transition duration-500 hover:-translate-y-1.5 hover:shadow-glow"
            >
              <div className={`relative hidden w-[34%] shrink-0 overflow-hidden sm:block ${COVERS[i + 1]}`}>
                <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full border border-white/25" />
                <span aria-hidden className={`absolute bottom-3 left-4 select-none text-6xl font-extrabold leading-none opacity-30 ${COVER_TEXT[i + 1]}`}>
                  {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {post.category}
                </span>
                <h3 className="mb-2 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">{post.title}</h3>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-body-color">{post.summary}</p>
                <span className="text-xs text-body-color">
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center" data-aos="fade-up">
        <Link
          href="/insights"
          className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary"
        >
          View All Insights
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Stage>
  );
};

export default InsightsPreview;
