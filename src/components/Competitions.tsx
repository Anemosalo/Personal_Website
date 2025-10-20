import { useEffect, useState, useRef } from 'react';
import { Trophy, Medal, Target } from 'lucide-react';

const Competitions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ display --competitions';

  const competitions = [
    {
      title: 'Archimedes National Math Finalist',
      organizer: 'Greek Mathematical Society',
      year: '2025',
      description: 'Advanced to national finals in prestigious mathematics competition',
      icon: Trophy,
    },
    {
      title: 'Euclid Mathematics Competition',
      organizer: 'Greek Mathematical Society',
      year: '2024',
      description: 'Top performer in international mathematics contest',
      icon: Medal,
    },
    {
      title: 'Thales Mathematics Competition',
      organizer: 'Greek Mathematical Society',
      year: '2024',
      description: 'Distinguished performance in junior-level mathematics',
      icon: Target,
    },
    {
      title: 'Economics Olympiad Regional Qualifier',
      organizer: 'National Economics Association',
      year: '2024',
      description: 'Qualified for regional competition in economic theory',
      icon: Trophy,
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
        if (cardIndex < competitions.length) {
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
      id="competitions"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12 text-[#FF00C8] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {competitions.slice(0, visibleCards).map((comp, index) => {
            const Icon = comp.icon;
            return (
              <div
                key={index}
                className="comp-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#FF00C8]/30 rounded-lg p-6 hover:border-[#FF00C8] transition-all duration-300 hover:shadow-glow-pink cursor-pointer group hover:scale-105"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-[#00FFF0] group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-400">{comp.year}</span>
                </div>

                <div className="aspect-video bg-gradient-to-br from-[#FF00C8]/10 to-[#00FFF0]/10 rounded border border-[#FF00C8]/20 mb-4 flex items-center justify-center">
                  <span className="text-xs text-gray-500">comp_placeholder.png</span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-[#F8F8FF]">{comp.title}</h3>
                <p className="text-sm text-[#FF00C8] mb-2">{comp.organizer}</p>
                <p className="text-xs text-gray-400">{comp.description}</p>

                <button className="mt-4 text-xs text-[#00FFF0] border border-[#00FFF0]/30 px-3 py-1 rounded hover:bg-[#00FFF0] hover:text-[#05080F] transition-all">
                  [details]
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Competitions;
