import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-gray-light dark:bg-gray-dark flex flex-wrap items-center justify-center rounded-sm px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s"
              data-aos="fade-up" // Scroll-triggered animation for the entire section
              data-aos-delay="200" // Delay for staggered effect
            >
              {brandsData.map((brand, index) => (
                <SingleBrand key={brand.id} brand={brand} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand, index }: { brand: Brand; index: number }) => {
  const { href, image, name } = brand;

  return (
    <div
      className="mx-3 flex w-full max-w-[160px] items-center justify-center py-[15px] sm:mx-4 lg:max-w-[130px] xl:mx-6 xl:max-w-[150px] 2xl:mx-8 2xl:max-w-[160px]"
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
    >
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="flex h-10 w-full items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image
          src={image}
          alt={name}
          height={20}
          width={150}
          className="mx-auto"
        />
      </a>
    </div>

  );
};
