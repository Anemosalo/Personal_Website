import { useEffect, useState, useRef } from 'react';
import { Code2, Hourglass, Github, X } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ show --projects';

  const projects = [
    {
      title: 'DSM Compression Algorithm',
      short:
        'Custom research-grade compression system currently under development.',
      details:
            'Under Construction',
      icon: Hourglass,
      status: 'Under Construction',
      link: '',
      accent: 'text-[#FF00C8]',
    },
    {
      title: 'CS50x – Probability Extension',
      short:
        'An interactive probability visualizer inspired by 3Blue1Brown.',
      details:
        'Built as the final project for Harvard’s CS50x. This tool allows users to dynamically generate and visualize probability distributions. It features real-time sampling, adjustable mean and standard deviation, and a responsive histogram display that updates as data evolves. Designed to make abstract probability concepts tangible and interactive.',
      icon: Code2,
      link: 'https://github.com/Anemosalo/Final-CS50-Project',
      accent: 'text-[#00FFF0]',
    },
    {
      title: 'CS50P – Focus App',
      short:
        'A minimalist productivity tracker built in Python.',
      details:
        'Developed as part of CS50P, this Focus App helps users track and analyze their study sessions. It records session durations, stores data in CSV logs, and visualizes progress with clean charts. Aimed at improving consistency and awareness in study habits — built purely in Python using simple file I/O and Matplotlib.',
      icon: Code2,
      link: 'https://github.com/Anemosalo/CS50P_Timer_Tracker_Project',
      accent: 'text-[#00FFF0]',
    },
  ];

  // --- Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Typing animation ---
  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= command.length) {
        setCommandTyped(command.slice(0, i));
        i++;
      } else clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isVisible]);

  // --- Sequential Card Reveal ---
  useEffect(() => {
    if (commandTyped !== command) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < projects.length) setVisibleCards(i++ + 1);
      else clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [commandTyped]);

  const closeModal = () => setSelectedProject(null);

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
          {projects.slice(0, visibleCards).map((proj, index) => {
            const Icon = proj.icon;
            const isDSM = proj.title.includes('DSM');

            return (
              <div
                key={index}
                onClick={(e) => {
                  // prevent modal if GitHub icon clicked
                  const target = e.target as HTMLElement;
                  if (target.closest('a')) return;
                  setSelectedProject(proj);
                }}
                className={`project-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border ${
                  isDSM
                    ? 'border-[#FF00C8]/40 hover:border-[#FF00C8]'
                    : 'border-[#00FFF0]/30 hover:border-[#00FFF0]'
                } rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer group`}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon
                    className={`w-8 h-8 ${proj.accent} group-hover:scale-110 transition-transform`}
                  />
                  {!isDSM && proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Github className="w-6 h-6 text-[#00FFF0] hover:text-[#FF00C8] transition-colors" />
                    </a>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-2 text-[#F8F8FF] ${
                    isDSM ? 'text-[#FF00C8]' : ''
                  }`}
                >
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-400 mb-4">{proj.short}</p>

                {isDSM ? (
                  <div className="text-sm text-[#FF00C8] font-semibold border border-[#FF00C8]/40 rounded px-3 py-1 inline-block">
                    {proj.status}
                  </div>
                ) : (
                  proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00FFF0] border border-[#00FFF0]/30 px-3 py-1 rounded hover:bg-[#00FFF0] hover:text-[#05080F] transition-all"
                    >
                      [view on GitHub]
                    </a>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Modal for Detailed Project Description --- */}
      {selectedProject && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#00FFF0]/40 rounded-lg max-w-lg w-[90%] p-6 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-[#00FFF0] hover:text-[#FF00C8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#F8F8FF] mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {selectedProject.details}
            </p>

            {selectedProject.link && (
              <div className="mt-6">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#00FFF0] border border-[#00FFF0]/30 px-3 py-1 rounded hover:bg-[#00FFF0] hover:text-[#05080F] transition-all"
                >
                  [view on GitHub]
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
