import { useEffect, useState, useRef } from 'react';
import { Folder, Github, Youtube } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ show --projects';

  const projects = [
    {
      title: 'DSM Compression Algorithm',
      tags: ['Research', 'Python', 'Algorithm'],
      description: 'Dead-Space Mapping: Novel compression algorithm leveraging spatial data structures',
    },
    {
      title: 'Probability Extension (CS50x)',
      tags: ['Data Simulation', 'Python', 'Statistics'],
      description: 'Monte Carlo simulation toolkit for complex probability distributions',
    },
    {
      title: 'Focus App (CS50P)',
      tags: ['Time Tracker', 'Productivity', 'Python'],
      description: 'Terminal-based focus management system with analytics dashboard',
    },
    {
      title: 'Neural Network Visualizer',
      tags: ['ML', 'Visualization', 'JavaScript'],
      description: 'Interactive tool for visualizing neural network architectures and training',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= command.length) {
        setCommandTyped(command.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (commandTyped === command) {
      let cardIndex = 0;
      const cardInterval = setInterval(() => {
        if (cardIndex < projects.length) {
          setVisibleCards(cardIndex + 1);
          cardIndex++;
        } else {
          clearInterval(cardInterval);
        }
      }, 200);

      return () => clearInterval(cardInterval);
    }
  }, [commandTyped]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-[#00FFF0] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, visibleCards).map((project, index) => (
            <div
              key={index}
              className="project-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border-2 border-[#00FFF0]/20 rounded-lg p-6 hover:border-[#00FFF0] transition-all duration-300 cursor-pointer group hover-tilt"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Folder className="w-8 h-8 text-[#FF00C8] group-hover:scale-110 transition-transform" />
                <div className="flex gap-2">
                  <button className="hover:text-[#00FFF0] transition-colors">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="hover:text-[#FF00C8] transition-colors">
                    <Youtube className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-[#F8F8FF] group-hover:text-[#00FFF0] transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-3 py-1 bg-[#00FFF0]/10 text-[#00FFF0] border border-[#00FFF0]/30 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
