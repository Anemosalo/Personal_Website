import { useEffect, useState, useRef } from 'react';
import { Trophy, Target, X } from 'lucide-react';

// ✅ Import images properly for Vite bundling
import Arximidis2025 from '../assets/Arximidis2025.png';
import Euclid2024 from '../assets/Euclid2024.png';
import EconOlympiadCer from '../assets/EconOlympiadCer.png';

const Competitions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalDetails, setModalDetails] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ display --competitions';

  // ✅ Use imported images instead of strings
  const competitions = [
    {
      title: 'Archimedes National Math Competition Finalist',
      organizer: 'Greek Mathematical Society',
      year: '2025',
      description:
        'Advanced to national finals in prestigious mathematics competition.',
      image: Arximidis2025,
      icon: Trophy,
    },
    {
      title: 'Euclid National Math Competition Semi-Finalist',
      organizer: 'Greek Mathematical Society',
      year: '2024',
      description:
        'Advanced to national semi-finals in prestigious mathematics competition.',
      image: Euclid2024,
      icon: Trophy,
    },
    {
      title: 'Thales Mathematics Competition',
      organizer: 'Greek Mathematical Society',
      year: '2023',
      description:
        'Entry-level round of the national math competition series.',
      details:
        'This was the first stage of the Olympiad which consists of Thales, Euclid and Archimedes stages. No certificatation was issued for this stage.',
      image: '', // no certificate image
      icon: Target,
    },
    {
      title: 'Economics Olympiad Regional Qualifier',
      organizer: 'National Economics Association',
      year: '2025',
      description:
        'Qualified for regional competition in economic theory national competition.',
      image: EconOlympiadCer,
      details:
        'Advanced to the national competition in economic theory up to the regionals. No official website for advancements.',
      icon: Trophy,
    },
  ];

  // --- Intersection observer ---
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
      if (i <= command.length) setCommandTyped(command.slice(0, i++));
      else clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isVisible]);

  // --- Sequential card reveal ---
  useEffect(() => {
    if (commandTyped !== command) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < competitions.length) setVisibleCards(i++ + 1);
      else clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [commandTyped]);

  // --- Handlers ---
  const handleImageClick = (image: string) => image && setSelectedImage(image);
  const handleDetailsClick = (details: string) => setModalDetails(details);
  const closeAllModals = () => {
    setSelectedImage(null);
    setModalDetails(null);
  };

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
            const noImage = !comp.image;
            return (
              <div
                key={index}
                className="comp-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#FF00C8]/30 rounded-lg p-6 hover:border-[#FF00C8] transition-all duration-300 hover:shadow-glow-pink cursor-pointer group hover:scale-105"
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-[#00FFF0] group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-400">{comp.year}</span>
                </div>

                {/* Image area */}
                <div
                  onClick={() =>
                    noImage
                      ? handleDetailsClick(comp.details || '')
                      : handleImageClick(comp.image)
                  }
                  className={`aspect-video rounded border mb-4 overflow-hidden ${
                    noImage
                      ? 'border-dashed border-[#FF00C8]/30 flex items-center justify-center text-gray-500 text-xs'
                      : 'border-[#FF00C8]/20'
                  }`}
                >
                  {noImage ? (
                    <span>No certificate issued</span>
                  ) : (
                    <img
                      src={comp.image}
                      alt={comp.title}
                      className="w-full h-full object-cover brightness-75 contrast-90 group-hover:brightness-100 group-hover:contrast-100 hover:scale-105 transition-all duration-500"
                    />
                  )}
                </div>

                <h3 className="text-lg font-bold mb-2 text-[#F8F8FF]">
                  {comp.title}
                </h3>
                <p className="text-sm text-[#FF00C8] mb-2">{comp.organizer}</p>
                <p className="text-xs text-gray-400">{comp.description}</p>

                <button
                  onClick={() =>
                    noImage
                      ? handleDetailsClick(comp.details || '')
                      : handleImageClick(comp.image)
                  }
                  className="mt-4 text-xs text-[#00FFF0] border border-[#00FFF0]/30 px-3 py-1 rounded hover:bg-[#00FFF0] hover:text-[#05080F] transition-all"
                >
                  [open]
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Image Modal --- */}
      {selectedImage && (
        <div
          onClick={closeAllModals}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-[90%] rounded-lg overflow-hidden"
          >
            <button
              onClick={closeAllModals}
              className="absolute top-3 right-3 text-[#00FFF0] hover:text-[#FF00C8] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Competition Certificate"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* --- Details Modal (for Thales or Economics) --- */}
      {modalDetails && (
        <div
          onClick={closeAllModals}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#FF00C8]/40 rounded-lg max-w-md w-[90%] p-6 text-center relative"
          >
            <button
              onClick={closeAllModals}
              className="absolute top-3 right-3 text-[#00FFF0] hover:text-[#FF00C8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-[#F8F8FF] leading-relaxed">{modalDetails}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Competitions;
