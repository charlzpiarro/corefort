"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IconErrorCircle, IconSuccessCircle } from "../Common/UiIcons";
import Confetti from "react-confetti";
import AOS from "aos";
import "aos/dist/aos.css";

type ContactProps = {
  /** Homepage only: shows the "Let's build" banner and photo above the form. */
  showIntro?: boolean;
};

const Contact = ({ showIntro = false }: ContactProps) => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    updates: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "99939d04-a4d6-4c7c-9382-c30b8a87c68a",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subscribe_to_updates: formData.updates ? "Yes" : "No",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", updates: false });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      id="contact"
      className="overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {status === "success" && <Confetti numberOfPieces={200} />}
      <div className="container max-w-4xl">
        {showIntro && (
          <div
            className="relative mb-10 overflow-hidden rounded-3xl bg-[#0632C4] shadow-[0_40px_90px_-40px_rgba(6,50,196,0.8)]"
            data-aos="fade-up"
          >
            <div className="relative h-[200px] sm:h-[240px] md:h-[280px]">
              <Image
                src="/images/photos/robot-corefort.webp"
                alt="A robotic hand holding a glass card that shows the Corefort logo"
                fill
                sizes="(min-width: 1280px) 900px, 100vw"
                className="object-cover object-[80%_35%]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#0632C4_0%,rgba(6,50,196,0.15)_65%)]" />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-[0.12]" />
            </div>
            <div className="relative px-6 pb-8 pt-1 sm:px-10">
              <h2 className="mb-3 max-w-[36ch] text-2xl font-extrabold leading-[1.15] text-white sm:text-3xl">
                Let&apos;s build what comes next.
              </h2>
              <p className="max-w-[54ch] text-sm leading-relaxed text-white/[0.82] sm:text-base">
                Whether you&apos;re modernizing an existing system or building something entirely new, tell us about it below.
              </p>
            </div>
          </div>
        )}

        <div data-aos="fade-up" data-aos-delay="300">
            <div className="mb-8 rounded-2xl bg-white px-4 py-7 shadow-three dark:bg-gray-dark sm:px-6 sm:py-9 lg:px-8 xl:px-10">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Talk to Corefort
              </h2>
              <p className="mb-8 text-sm font-medium text-body-color sm:mb-10 sm:text-base">
                Tell us what you need. Our team will review it and get back to you by email.
              </p>

              {/* Toasts */}
              {status === "success" && (
                <div className="mb-4 flex animate-bounce-in items-center gap-3 rounded-lg bg-green-600 px-4 py-3 text-white">
                  <IconSuccessCircle className="h-5 w-5 shrink-0 text-white" />
                  <span>Message sent successfully.</span>
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 flex animate-bounce-in items-center gap-3 rounded-lg bg-red-600 px-4 py-3 text-white">
                  <IconErrorCircle className="h-5 w-5 shrink-0 text-white" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="-mx-2 flex flex-wrap">
                  <div className="w-full px-2 md:w-1/2">
                    <div className="mb-5 sm:mb-6">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm outline-none transition focus:border-primary dark:bg-[#2C303B] dark:text-body-color-dark sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="w-full px-2 md:w-1/2">
                    <div className="mb-5 sm:mb-6">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm outline-none transition focus:border-primary dark:bg-[#2C303B] dark:text-body-color-dark sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="w-full px-2 md:w-1/2">
                    <div className="mb-5 sm:mb-6">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        onChange={handleChange}
                        value={formData.phone}
                        placeholder="Enter your phone number"
                        inputMode="numeric"
                        pattern="[0-9+\-\s]{7,15}"
                        title="Please enter a valid phone number"
                        className="border-stroke w-full rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm outline-none transition focus:border-primary dark:bg-[#2C303B] dark:text-body-color-dark sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <div className="mb-5 sm:mb-6">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        onChange={handleChange}
                        value={formData.message}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm outline-none transition focus:border-primary dark:bg-[#2C303B] dark:text-body-color-dark sm:text-base"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <label className="mb-5 flex items-start gap-2.5 text-sm text-body-color dark:text-body-color-dark sm:mb-6">
                      <input
                        type="checkbox"
                        name="updates"
                        checked={formData.updates}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-stroke text-primary focus:ring-primary dark:border-stroke-dark"
                      />
                      Also send me occasional product updates and announcements. No spam, ever.
                    </label>
                  </div>

                  <div className="w-full px-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-9 sm:py-4 sm:text-base"
                    >
                      {status === "loading" ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
