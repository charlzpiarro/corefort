import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import ProductCard from "./ProductCard";
import productsData from "./productsData";

const Products = () => {
  return (
    <Stage tone="ink" id="products">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="Our Products"
          title="Products Built by Corefort"
          paragraph="Beyond client engineering, Corefort designs and operates its own technology products, built, owned, and continuously improved in-house."
          center
          light
          mb="56px"
        />
      </div>

      <div className="flex flex-col gap-6">
        {productsData.map((product, index) => (
          <div key={product.id} data-aos="fade-up" data-aos-delay={index * 80}>
            <ProductCard product={product} reverse={index % 2 === 1} tone="dark" />
          </div>
        ))}
      </div>
    </Stage>
  );
};

export default Products;
