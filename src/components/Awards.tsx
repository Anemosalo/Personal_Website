import { useEffect, useState, useRef } from 'react';

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const timeline = [
  { year: 'Oct 2025', achievement: 'CS50P Certificate (Harvard University, edX)' },
  { year: 'Sep 2025', achievement: 'CS50x Certificate (Harvard University, edX)' },
  { year: 'Jul 2025', achievement: 'Admitted to University of Piraeus — BSc in Computer Science' },
  { year: 'Apr 2025', achievement: 'Economics Olympiad — Regional Qualifier' },
  { year: 'Feb 2025', achievement: 'Archimedes National Mathematics Finalist' },
  { year: '2024', achievement: 'Euclid National Mathematics Semi-Finalist' },
  { year: '2023', achievement: 'Thales National Mathematics Competition Participant' },
];

  // Restore once-per-session guard
  useEffect(() => {
    const played = sessionStorage.getItem('awardsAnalyzingPlayed');
    if (played === 'true') {
      setHasPlayed(true);
      setIsVisible(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          // Play analyzing only once
          setLoading(true);
          if (timerRef.current) window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setLoading(false);
            setIsVisible(true);
            setHasPlayed(true);
          }, 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed) sessionStorage.setItem('awardsAnalyzingPlayed', 'true');
  }, [hasPlayed]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
    >
      <div className="max-w-4xl mx-auto w-full">
        {loading && (
          <div className="text-center mb-12 transition-opacity duration-200 opacity-100">
            <div className="text-[#00FFF0] text-lg mb-4">
              <span className="animate-pulse">&gt;_ analyzing system...</span>
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-[#00FFF0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#00FFF0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#00FFF0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {isVisible && (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00FFF0] via-[#FF00C8] to-[#00FFF0] timeline-pulse"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className="relative pl-20 pb-12 last:pb-0"
                style={{
                  animation: `fadeInLeft 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                <div className="absolute left-6 w-5 h-5 bg-[#00FFF0] rounded-full border-4 border-[#0B1020] timeline-node"></div>

                <div className="bg-gradient-to-r from-[#0B1020] to-transparent border-l-2 border-[#00FFF0] p-4 hover:border-[#FF00C8] transition-all duration-300">
                  <div className="text-[#FF00C8] text-xl font-bold mb-1">{item.year}</div>
                  <div className="text-[#F8F8FF] text-lg">{item.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Awards;
