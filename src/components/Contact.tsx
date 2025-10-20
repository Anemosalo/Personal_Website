import { useEffect, useState, useRef } from 'react';
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [commandTyped, setCommandTyped] = useState('');
  const [copied, setCopied] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const command = '>_ connect --me';
  const email = 'alexandros@example.com';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 240, 0.1), transparent 40%)`,
        }}
      ></div>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        <div className="mb-12 text-[#00FFF0] text-xl">
          {commandTyped}
          <span className="animate-pulse">|</span>
        </div>

        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#0B1020]/50 border border-[#00FFF0]/30 rounded-lg p-6 hover:border-[#00FFF0] transition-all hover:shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#00FFF0]" />
                <span className="text-lg">&gt;_ email: {email}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-[#00FFF0]/10 hover:bg-[#00FFF0]/20 border border-[#00FFF0]/30 rounded transition-all"
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

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1020]/50 border border-[#FF00C8]/30 rounded-lg p-6 hover:border-[#FF00C8] transition-all hover:shadow-glow-pink group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-6 h-6 text-[#FF00C8] group-hover:scale-110 transition-transform" />
                <span className="text-lg">&gt;_ LinkedIn</span>
              </div>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B1020]/50 border border-[#00FFF0]/30 rounded-lg p-6 hover:border-[#00FFF0] transition-all hover:shadow-glow group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-[#00FFF0] group-hover:scale-110 transition-transform" />
                <span className="text-lg">&gt;_ GitHub</span>
              </div>
            </a>
          </div>

          <div className="mt-12 text-gray-400 text-sm">
            <p className="leading-relaxed">
              Open to part-time, remote software internships while studying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
