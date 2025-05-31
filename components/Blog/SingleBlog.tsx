import { Blog } from "@/types/blog";
import Image from "next/image";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, image, paragraph } = blog;

  return (
    <div
      className="wow fadeInUp hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 dark:bg-dark"
      data-wow-delay=".1s"
      data-aos="fade-up" // Scroll-triggered animation
      data-aos-delay="200" // Slight delay for staggered effect
    >
      <div className="relative block aspect-[37/22] w-full overflow-hidden">
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          latest
        </span>
        <div className="h-full w-full transform transition-transform duration-500 ease-in-out group-hover:scale-105">
          <Image
            src={image}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3 className="mb-4 block text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {paragraph}
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                {/* Optional avatar */}
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                {/* Optional name */}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
