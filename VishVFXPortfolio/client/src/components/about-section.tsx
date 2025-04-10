
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, PlayCircle, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn, slideIn } from "@/lib/animations";
import { SiAdobepremierepro, SiAdobeaftereffects, SiAdobephotoshop } from "react-icons/si";

export function AboutSection() {
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

    const section = document.querySelector("#about");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const scrollToContact = () => {
    const contactElement = document.querySelector("#contact");
    if (contactElement) {
      window.scrollTo({
        top: contactElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToShowreel = () => {
    const featuredElement = document.querySelector("#featured-reels");
    if (featuredElement) {
      window.scrollTo({
        top: featuredElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="about"
      className="py-20 bg-[#171721] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <img
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Background texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:space-x-16">
          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={fadeIn("right", 0.5)}
            className="mb-10 md:mb-0 w-full md:w-2/5"
          >
            <div className="flex flex-col items-center">
              <div className="w-52 h-52 rounded-full overflow-hidden bg-background/20 backdrop-blur-md border-4 border-purple-600 mb-4 shadow-xl">
                <img
                  src="/profile.png"
                  alt="Vish VFX profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold">
                3+ Years Experience
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
            variants={fadeIn("left", 0.5)}
            className="w-full md:w-3/5"
          >
            <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transforming vision into viral content
            </h2>

            <p className="mb-6 text-lg text-white/90 leading-relaxed">
              I'm a freelance video editor with a passion for visual storytelling. I specialize in crafting cinematic cuts that evoke emotion, dynamic social media reels that grab attention, and polished brand videos that leave a lasting impression.
            </p>

            <p className="mb-8 text-lg text-white/90 leading-relaxed">
              I've helped creators and brands go viral by turning raw footage into scroll-stopping edits using tools like Adobe Premiere Pro, After Effects, and Photoshop. Every frame I cut is shaped with purpose—to connect, captivate, and convert.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-full hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300"
                size="lg"
              >
                <Rocket className="mr-2 h-5 w-5" /> Let's Go Viral
              </Button>
              <Button
                onClick={scrollToShowreel}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full transition-all duration-300"
                size="lg"
                variant="outline"
              >
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Featured
              </Button>
              <Button
                onClick={() => window.open("https://drive.google.com/drive/folders/1rGwR8SHWl2Q3cBF6AcoXOk7DSlpkphFy?usp=sharing", "_blank")}
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full transition-all duration-300"
                size="lg"
                variant="outline"
              >
                <FolderOpen className="mr-2 h-5 w-5" /> More Works
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
