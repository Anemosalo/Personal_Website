import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const lines = [
    ">_ Hello, I'm Alexandros Anemos Aloupis",
    ">_ CS Student @ University of Piraeus | Future Artificial Inteligence Engineer",
    ">_ Initiating system..."
  ];

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentLine[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (lineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + '\n');
        setLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 px-6">
      <div className="absolute inset-0 grid-background opacity-10"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <Terminal className="w-20 h-20 mx-auto text-[#00FFF0] animate-pulse" />
        </div>

        <pre className="text-left text-lg md:text-2xl mb-12 whitespace-pre-wrap leading-relaxed terminal-text">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => scrollToSection('about')}
            className="px-8 py-3 bg-transparent border border-[#00FFF0] text-[#00FFF0] hover:bg-[#00FFF0] hover:text-[#05080F] transition-all duration-300 glow-on-hover"
          >
            [ view profile ]
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 bg-transparent border border-[#FF00C8] text-[#FF00C8] hover:bg-[#FF00C8] hover:text-[#05080F] transition-all duration-300 glow-on-hover"
          >
            [ explore projects ]
          </button>
        </div>

<div className="mt-16 floating-equations text-xs md:text-sm opacity-30">
  <span className="equation">E = ∑ p(x) · log p(x)</span>
  <span className="equation">ŷ = σ(Wx + b)</span>
  <span className="equation">𝛁J(θ) = E[∂ log π_θ(a|s)/∂θ · R]</span>
</div>

      </div>
    </section>
  );
};

export default Hero;
