import Link from "next/link";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <section className="relative z-10 overflow-hidden pb-10 pt-10 sm:pb-12 sm:pt-14">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-white via-white to-primary/[0.06] p-6 shadow-one backdrop-blur-sm dark:border-stroke-dark dark:from-dark dark:via-dark dark:to-primary/10 sm:p-8">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 bg-gradient-brand"
          />
          <div className="flex flex-col gap-5 pt-1 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[720px]">
              <h1 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl md:text-4xl">
                {pageName}
              </h1>
              <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark sm:text-base">
                {description}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <ul className="flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base md:justify-end">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="font-medium text-body-color transition hover:text-primary"
                  >
                    Home
                  </Link>
                  <span className="mx-2 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color" />
                </li>
                <li className="font-medium text-primary">{pageName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
