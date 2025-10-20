import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  scrollProgress: number;
}

const Footer = ({ scrollProgress }: FooterProps) => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['>_ system stable', '>_ awaiting next challenge...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative py-10 px-6 border-t border-[#00FFF0]/20">
      <div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00FFF0] via-[#FF00C8] to-[#00FFF0] transition-all duration-300 glow-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto text-center space-y-4">
        <div className="text-sm text-gray-400 mb-2">
          <span className="typing-loop">{texts[currentText]}</span>
          <span className="animate-pulse">|</span>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-center gap-8">
          {/* Email */}
          <a
            href="mailto:anemosalouphs@gmail.com"
            className="group"
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-[#EA4335] transition-transform group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_#EA4335]" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/alexandros-anemos-aloupis-93942338a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-[#0077B5] transition-transform group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_#0077B5]" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Anemosalo"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6 text-[#F5F5F5] transition-transform group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_#F5F5F5]" />
          </a>
        </div>

        <div className="text-xs text-gray-600">
          © 2025 Alexandros Anemos Aloupis. Built with terminal aesthetics.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
