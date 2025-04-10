import { Instagram, Twitter, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { SocialLink } from "@/lib/types";

const socialLinks: SocialLink[] = [
  {
    platform: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/vishv.fx/"
  },
  {
    platform: "Twitter",
    icon: "twitter",
    url: "https://x.com/vish_vfx"
  },
  {
    platform: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/919430562996"
  },
  {
    platform: "Email",
    icon: "mail",
    url: "mailto:vishwaszsoni@gmail.com"
  }
];

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "whatsapp":
      return <FaWhatsapp className="w-5 h-5" />;
    case "mail":
      return <Mail className="w-5 h-5" />;
    default:
      return <Mail className="w-5 h-5" />;
  }
};

export function Footer() {
  const scrollToContact = () => {
    const contactElement = document.querySelector("#contact");
    if (contactElement) {
      window.scrollTo({
        top: contactElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer(0.1, 0.1)}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div
            variants={fadeIn("right", 0.5)}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Vish VFX
            </h2>
            <p className="text-white/70 max-w-md">
              Crafting stories through cuts & color. Premium video editing services for creators and brands.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.5)}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.platform}
                  variants={fadeIn("up", 0.3, index * 0.1)}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center hover:opacity-90 transition-opacity"
                  aria-label={link.platform}
                >
                  <SocialIcon icon={link.icon} />
                </motion.a>
              ))}
            </div>

            <motion.button
              variants={fadeIn("up", 0.5, 0.3)}
              onClick={scrollToContact}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]"
            >
              Let's Go Viral
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.5, 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vish VFX. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
