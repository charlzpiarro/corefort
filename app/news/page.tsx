import Blog from "@/components/Blog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Blog | Corefort Technologies",
  description:
    "Read updates, case studies, and product insights from Corefort Technologies.",
  // Not yet reviewed against the site's fact-checking standard (see /insights for the vetted
  // equivalent). Left crawlable for visitors who land here, but out of the search index for now.
  robots: { index: false, follow: true },
  alternates: { canonical: "/news" },
};

const NewsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="News & Blog"
        description="Latest updates, project highlights, and practical technology insights from the Corefort team."
      />
      <Blog />
    </>
  );
};

export default NewsPage;
