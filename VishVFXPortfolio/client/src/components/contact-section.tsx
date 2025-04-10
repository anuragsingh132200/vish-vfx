import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/animations";
import { ContactForm } from "./contact-form";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-[#171721]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={fadeIn("right", 0.5)}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
              Let's Connect
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to go viral?
            </h2>

            <p className="mb-8 text-lg text-white/90 leading-relaxed">
              Whether you have a specific project in mind or just want to explore
              possibilities, I'm here to help bring your vision to life. Let's
              create content that stands out and gets the engagement it deserves.
            </p>

            <div className="p-6 rounded-xl bg-background/20 backdrop-blur-md border border-white/5 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:vishwaszsoni@gmail.com" 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    vishwaszsoni@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-4">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a 
                    href="https://wa.me/919430562996" 
                    className="text-white/80 hover:text-white transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    +91 9430562996
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-white/80">Available Worldwide (Remote)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={fadeIn("left", 0.5)}
            className="w-full md:w-1/2"
          >
            <div className="p-8 rounded-xl bg-background/20 backdrop-blur-md border border-white/5 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
