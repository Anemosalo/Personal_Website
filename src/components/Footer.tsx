import { useEffect, useState } from 'react';

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
    <footer className="relative py-8 px-6 border-t border-[#00FFF0]/20">
      <div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00FFF0] via-[#FF00C8] to-[#00FFF0] transition-all duration-300 glow-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto text-center">
        <div className="text-sm text-gray-400 mb-2">
          <span className="typing-loop">{texts[currentText]}</span>
          <span className="animate-pulse">|</span>
        </div>
        <div className="text-xs text-gray-600">
          © 2025 Alexandros Anemos Aloupis. Built with terminal aesthetics.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
