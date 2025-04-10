import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clipboard, Rocket, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer, zoomIn } from "@/lib/animations";

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  priceUnit: string;
  features: string[];
  idealFor: string;
  buttonText: string;
  icon: string;
  color: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    title: "Basic Package",
    description: "For quick & clean edits",
    price: "₹250",
    priceUnit: "/min",
    features: [
      "Trimming and arranging clips",
      "Basic transitions",
      "Color correction (basic)",
      "Background music syncing",
      "Delivery in Full HD"
    ],
    idealFor: "Ideal for short reels, personal vlogs, or quick event clips.",
    buttonText: "Get Started",
    icon: "clipboard",
    color: "from-blue-600 to-blue-400"
  },
  {
    id: "advanced",
    title: "Advanced Package",
    description: "For polished professional content",
    price: "₹450",
    priceUnit: "/min",
    features: [
      "Everything in Basic, plus:",
      "Advanced color grading",
      "Dynamic text animations",
      "Motion graphics / light VFX",
      "Sound design & mixing",
      "Thumbnail (if needed)"
    ],
    idealFor: "Great for YouTube videos, product promos, or branded content.",
    buttonText: "Get Advanced",
    icon: "packageCheck",
    color: "from-purple-600 to-blue-600"
  },
  {
    id: "premium",
    title: "Premium Package",
    description: "For viral, high-impact content",
    price: "₹700",
    priceUnit: "/min",
    features: [
      "Everything in Advanced, plus:",
      "Viral-style editing techniques",
      "Platform-optimized versions (IG, YT, etc.)",
      "Storyboarding & creative direction",
      "2 free revision rounds"
    ],
    idealFor: "Best for music videos, campaigns, and content that needs to pop.",
    buttonText: "Go Premium",
    icon: "rocket",
    color: "from-yellow-600 to-amber-500"
  }
];

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "clipboard":
      return <Clipboard className="w-6 h-6" />;
    case "packageCheck":
      return <PackageCheck className="w-6 h-6" />;
    case "rocket":
      return <Rocket className="w-6 h-6" />;
    default:
      return <CheckCircle2 className="w-6 h-6" />;
  }
};

export function PricingSection() {
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

    const section = document.querySelector("#pricing");
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

  return (
    <section id="pricing" className="py-20 bg-[#18181f]">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5)}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Editing Package
          </h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Professional video editing services tailored to your specific needs and budget. All packages include direct communication and quick turnaround.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={zoomIn(index * 0.1, 0.5)}
              className="rounded-2xl bg-background/20 backdrop-blur-md border border-white/5 shadow-xl overflow-hidden"
            >
              <div className={`p-6 bg-gradient-to-r ${plan.color}`}>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <IconComponent icon={plan.icon} />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-white">{plan.title}</h3>
                <p className="text-white/80">{plan.description}</p>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/70">{plan.priceUnit}</span>
                </div>
                
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-sm text-white/70 mb-6">
                  {plan.idealFor}
                </p>
                
                <Button
                  onClick={scrollToContact}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-all`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5, 0.5)}
          className="text-center"
        >
          <p className="text-white/70 mb-6">
            Need a custom solution? Contact me for projects requiring specialized editing techniques or unique requirements.
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-full hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300"
            size="lg"
          >
            Let's Discuss Your Project
          </Button>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5, 0.6)}
          className="mt-16 p-6 rounded-xl bg-background/20 backdrop-blur-sm border border-white/5"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">*Pricing FAQs</h3>
          <p className="text-white/80 leading-relaxed">
            Let's Collaborate for the Long Run! For clients with long-term projects, I offer negotiable pricing to ensure that both of us get the best value. The more we work together, the better the rates! Feel free to reach out, and we can discuss a custom package that suits your needs and budget.
          </p>
        </motion.div>
      </div>
    </section>
  );
}