"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLatterBox = () => {
  const { theme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Submission failed. Network issue maybe?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11 dark:bg-gray-dark"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {submitted ? (
        <div className="flex h-64 items-center justify-center text-center text-lg font-semibold text-green-600 dark:text-green-400">
           Thanks for joining the winning team! <br /> You’ll be the first to hear the latest — stay awesome. 💌
        </div>
      ) : (
        <>
          <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
            Subscribe to receive future updates
          </h3>
          <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-25">
            Stay in the loop! We’ll send you the latest updates, product launches, and exclusive offers — no spam, ever.
          </p>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="99939d04-a4d6-4c7c-9382-c30b8a87c68a" />
            <input type="hidden" name="subject" value="New Newsletter Subscription" />

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary focus:border-primary"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="mb-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none dark:bg-[#2C303B] dark:text-body-color-dark dark:focus:border-primary focus:border-primary"
            />
            <input
              type="submit"
              disabled={loading}
              value={loading ? "Sending..." : "Subscribe"}
              className={`mb-5 w-full cursor-pointer rounded-sm px-9 py-4 text-base font-medium text-white duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90"
              }`}
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <p className="text-center text-base text-body-color dark:text-body-color-dark">
              No spam guaranteed, we promise.
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default NewsLatterBox;
