import SectionTitle from "@/components/Common/SectionTitle";
import ProductCard from "./ProductCard";
import productsData from "./productsData";

const Products = () => {
  return (
    <section id="products" className="scroll-mt-24 bg-gray-light py-20 dark:bg-bg-color-dark md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Our Products"
            title="Products Built by Corefort"
            paragraph="Beyond client engineering, Corefort designs and operates its own technology products, built, owned, and continuously improved in-house."
            center
            mb="64px"
          />
        </div>

        <div className="flex flex-col gap-8">
          {productsData.map((product, index) => (
            <div key={product.id} data-aos="fade-up" data-aos-delay={index * 80}>
              <ProductCard product={product} reverse={index % 2 === 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
