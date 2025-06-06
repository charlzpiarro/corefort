import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="container">
        <SectionTitle
          title="Featured Projects"
          paragraph="A curated selection of the innovative digital solutions we’ve crafted — built with precision, performance, and purpose."
          center
          data-aos="fade-up"
          data-aos-delay="400"
        />
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
