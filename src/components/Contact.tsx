import { useEffect, useState, useRef } from 'react';
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);
  const targetOpacityRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ connect --me';
  const email = 'anemosalouphs@gmail.com';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    const fadeMargin = 150;
    const proximity = Math.max(0, Math.min(1, y / fadeMargin));
    targetOpacityRef.current = proximity >= 1 ? 1 : proximity;
  };

  const handleMouseLeave = () => (targetOpacityRef.current = 0);

  useEffect(() => {
    let last = performance.now();
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(1, (now - last) / 16.67);
      last = now;
      setGlowOpacity((prev) => lerp(prev, targetOpacityRef.current, 0.18 * dt));
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 240, ${0.12 * glowOpacity}), transparent 40%)`,
          transition: 'background 40ms linear',
        }}
      ></div>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="mb-12 text-[#00FFF0] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div
          className={`space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Email Card - Gmail Red */}
          <div className="bg-[#0B1020]/50 border border-[#EA4335]/30 rounded-lg p-6 hover:border-[#EA4335] transition-all hover:shadow-[0_0_10px_#EA4335]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#EA4335]" />
                <span className="text-lg">&gt;_ email: {email}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-[#EA4335]/10 hover:bg-[#EA4335]/20 border border-[#EA4335]/30 rounded transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LinkedIn + GitHub Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* LinkedIn - Official Blue */}
            <a
              href="https://www.linkedin.com/in/alexandros-anemos-aloupis-93942338a/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1020]/50 border border-[#0077B5]/30 rounded-lg p-6 hover:border-[#0077B5] transition-all hover:shadow-[0_0_10px_#0077B5]/60 group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-6 h-6 text-[#0077B5] group-hover:scale-110 transition-transform" />
                <span className="text-lg">&gt;_ LinkedIn</span>
              </div>
            </a>

            {/* GitHub - White Gray */}
            <a
              href="https://github.com/Anemosalo/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1020]/50 border border-[#F5F5F5]/30 rounded-lg p-6 hover:border-[#F5F5F5] transition-all hover:shadow-[0_0_10px_#F5F5F5]/60 group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-[#F5F5F5] group-hover:scale-110 transition-transform" />
                <span className="text-lg">&gt;_ GitHub</span>
              </div>
            </a>
          </div>

          <div className="mt-12 text-gray-400 text-sm">
            <p className="leading-relaxed">
              Open to flexible software internships while studying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
