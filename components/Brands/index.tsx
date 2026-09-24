import brandsData from "./brandsData";
import LogoMarquee from "./LogoMarquee";

const Brands = () => {
  return (
    <section className="overflow-hidden py-10 md:py-12">
      <div className="container">
        <div className="mx-auto mb-6 max-w-xl text-center" data-aos="fade-up">
          <p className="mb-2 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Partners &amp; Clients
          </p>
          <h2 className="text-xl font-bold text-black sm:text-2xl">Organizations That Work With Corefort</h2>
        </div>
      </div>

      {/* full-bleed so the row runs edge to edge */}
      <div data-aos="fade-up" data-aos-delay="100">
        <LogoMarquee brands={brandsData} />
      </div>
    </section>
  );
};

export default Brands;
