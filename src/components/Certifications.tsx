import { useEffect, useState, useRef } from 'react';
import { Award, ExternalLink, X } from 'lucide-react';

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [visibleCards, setVisibleCards] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ fetch --certifications';

  const certifications = [
    {
      title: 'CS50x – Introduction to Computer Science',
      issuer: 'Harvard University',
      date: 'September 2025',
      imageName: 'CS50x.png',
    },
    {
      title: 'CS50P – Introduction to Programming with Python',
      issuer: 'Harvard University',
      date: 'October 2025',
      imageName: 'CS50P.png',
    },
  ];

  // --- Animate section entrance ---
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Type command ---
  useEffect(() => {
    if (!isVisible) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= command.length) {
        setCommandTyped(command.slice(0, index));
        index++;
      } else clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isVisible]);

  // --- Reveal cards ---
  useEffect(() => {
    if (commandTyped === command) {
      let cardIndex = 0;
      const cardInterval = setInterval(() => {
        if (cardIndex < certifications.length) {
          setVisibleCards(cardIndex + 1);
          cardIndex++;
        } else clearInterval(cardInterval);
      }, 200);
      return () => clearInterval(cardInterval);
    }
  }, [commandTyped]);

  // --- Modal close handler ---
  const closeModal = () => setSelectedImage(null);

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
              onClick={() => setSelectedImage(`src/assets/${cert.imageName}`)}
              className="cert-card bg-gradient-to-br from-[#0B1020] to-[#05080F] border border-[#00FFF0]/30 rounded-lg p-6 hover:border-[#00FFF0] transition-all duration-300 hover:shadow-glow cursor-pointer group"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <Award className="w-8 h-8 text-[#FF00C8] group-hover:scale-110 transition-transform" />
                <ExternalLink className="w-5 h-5 text-[#00FFF0] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="aspect-video rounded border border-[#00FFF0]/20 mb-4 overflow-hidden">
                <img
                  src={`src/assets/${cert.imageName}`}
                  alt={cert.title}
                  className="w-full h-full object-cover brightness-75 contrast-90 group-hover:brightness-100 group-hover:contrast-100 hover:scale-105 transition-all duration-500"
                />
              </div>

              <h3 className="text-lg font-bold mb-2 text-[#F8F8FF]">{cert.title}</h3>
              <p className="text-sm text-[#00FFF0] mb-1">{cert.issuer}</p>
              <p className="text-xs text-gray-400">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Modal Overlay for Full Image --- */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            className="relative max-w-4xl w-[90%] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent click from closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-[#00FFF0] hover:text-[#FF00C8] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Certificate"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
