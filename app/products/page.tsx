import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ProductCard from "@/components/Products/ProductCard";
import productsData from "@/components/Products/productsData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Products | Corefort Technologies",
  description:
    "NetPurse and LEDGE Biashara: technology products designed, built, and operated by Corefort Technologies.",
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Products"
        description="Beyond client engineering, Corefort designs and operates its own technology products, built, owned, and continuously improved in-house."
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col gap-8">
            {productsData.map((product, index) => (
              <ProductCard key={product.id} product={product} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
