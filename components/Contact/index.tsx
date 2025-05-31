"use client";
import { useEffect, useState } from "react";
import NewsLatterBox from "./NewsLatterBox";
import Confetti from "react-confetti";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "99939d04-a4d6-4c7c-9382-c30b8a87c68a", // 🔐 Replace with your actual key
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
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
      className="overflow-hidden py-16 md:py-20 lg:py-28"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {status === "success" && <Confetti numberOfPieces={200} />}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div
            className="w-full px-4 lg:w-7/12 xl:w-8/12"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>

              {/* Toasts */}
              {status === "success" && (
                <div className="mb-4 animate-bounce-in rounded bg-green-500 px-4 py-3 text-white">
                  ✅ Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 animate-bounce-in rounded bg-red-500 px-4 py-3 text-white">
                  ❌ Oops! Something went wrong. Try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
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
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:bg-[#2C303B] dark:text-body-color-dark focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
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
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:bg-[#2C303B] dark:text-body-color-dark focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
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
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:bg-[#2C303B] dark:text-body-color-dark focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <div className="mb-8">
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
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:bg-[#2C303B] dark:text-body-color-dark focus:border-primary"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-60"
                    >
                      {status === "loading" ? "Sending..." : "Submit Ticket"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            className="w-full px-4 lg:w-5/12 xl:w-4/12"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
