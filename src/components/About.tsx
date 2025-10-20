import { useEffect, useState, useRef } from 'react';
import { MapPin, Code, GraduationCap } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ about --me';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-[#00FFF0] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="aspect-square bg-gradient-to-br from-[#00FFF0]/20 to-[#FF00C8]/20 rounded-lg border border-[#00FFF0]/30 flex items-center justify-center">
              <div className="text-6xl text-[#00FFF0]/50">👤</div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-lg leading-relaxed mb-8 text-gray-300">
              I'm a Computer Science student at the University of Piraeus, passionate about algorithms, AI, and data systems.
              I've explored fields from mathematical modeling to software engineering, developing both creative and research-driven projects like DSM (Dead-Space Mapping).
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#0B1020]/50 border border-[#00FFF0]/20 rounded hover:border-[#00FFF0]/50 transition-all">
                <MapPin className="w-5 h-5 text-[#00FFF0]" />
                <span>Based in Athens, Greece</span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#0B1020]/50 border border-[#00FFF0]/20 rounded hover:border-[#00FFF0]/50 transition-all">
                <Code className="w-5 h-5 text-[#FF00C8]" />
                <span>Focus: ML • Algorithms • Software Development</span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#0B1020]/50 border border-[#00FFF0]/20 rounded hover:border-[#00FFF0]/50 transition-all">
                <GraduationCap className="w-5 h-5 text-[#00FFF0]" />
                <span>Studying in parallel with part-time work (Remote-ready)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
