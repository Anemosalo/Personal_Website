import { useEffect, useState, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ fetch --certifications';

  const certifications = [
    {
      title: 'CS50x – Introduction to Computer Science',
      issuer: 'Harvard University',
      date: 'April 2025',
    },
    {
      title: 'CS50P – Introduction to Programming with Python',
      issuer: 'Harvard University',
      date: 'March 2025',
    },
    {
      title: 'Google AI Fundamentals',
      issuer: 'Google',
      date: 'February 2025',
    },
    {
      title: 'Data Structures & Algorithms',
      issuer: 'Online Course Platform',
      date: 'January 2025',
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
        if (cardIndex < certifications.length) {
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
      id="certifications"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-[#00FFF0] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.slice(0, visibleCards).map((cert, index) => (
            <div
              key={index}
              className="cert-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#00FFF0]/30 rounded-lg p-6 hover:border-[#00FFF0] transition-all duration-300 hover:shadow-glow cursor-pointer group"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-8 h-8 text-[#FF00C8] group-hover:scale-110 transition-transform" />
                <ExternalLink className="w-5 h-5 text-[#00FFF0] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="aspect-video bg-gradient-to-br from-[#00FFF0]/10 to-[#FF00C8]/10 rounded border border-[#00FFF0]/20 mb-4 flex items-center justify-center">
                <span className="text-xs text-gray-500">certificate_image_placeholder.png</span>
              </div>

              <h3 className="text-lg font-bold mb-2 text-[#F8F8FF]">{cert.title}</h3>
              <p className="text-sm text-[#00FFF0] mb-1">{cert.issuer}</p>
              <p className="text-xs text-gray-400">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
