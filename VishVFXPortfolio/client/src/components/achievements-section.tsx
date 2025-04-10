import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AchievementData } from "@/lib/types";
import { fadeIn, staggerContainer, zoomIn } from "@/lib/animations";
import { Award, Trophy, Users, Play } from "lucide-react";

const achievementsData: AchievementData[] = [
  {
    id: "1",
    icon: "award",
    value: "5+",
    label: "Viral Videos"
  },
  {
    id: "2",
    icon: "trophy",
    value: "3×",
    label: "Audience Growth"
  },
  {
    id: "3",
    icon: "users",
    value: "20+",
    label: "Happy Clients"
  },
  {
    id: "4",
    icon: "play",
    value: "100K+",
    label: "Views Generated"
  }
];

// Testimonials section removed as requested

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "award":
      return <Award className="w-6 h-6" />;
    case "trophy":
      return <Trophy className="w-6 h-6" />;
    case "users":
      return <Users className="w-6 h-6" />;
    case "play":
      return <Play className="w-6 h-6" />;
    default:
      return <Award className="w-6 h-6" />;
  }
};

export function AchievementsSection() {
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

    const section = document.querySelector("#achievements");
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
    <section id="achievements" className="py-20 bg-black relative">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Achievement background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={fadeIn("up", 0.5)}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold">
            Milestones
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Recognized for creating content that stands out and delivers results.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              variants={zoomIn(index * 0.1, 0.5)}
              className="p-6 rounded-xl bg-background/20 backdrop-blur-md border border-white/5 text-center shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <IconComponent icon={achievement.icon} />
              </div>
              <h3 className="text-3xl font-bold mb-2">{achievement.value}</h3>
              <p className="text-white/80">{achievement.label}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
