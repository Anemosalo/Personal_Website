import { useState, useEffect } from 'react';

const Header = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#05080F]/80 border-b border-gradient">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-1">
          <span className="text-[#00FFF0]">&gt;</span>
          <span className={blink ? 'opacity-100' : 'opacity-0'}>_</span>
          <span className="ml-2">Hello World</span>
        </div>

        <nav className="hidden md:flex gap-8">
          {['About', 'Certifications', 'Competitions', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="nav-link relative group text-sm"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#00FFF0] group-hover:w-full group-hover:left-0 transition-all duration-[160ms] ease-out"></span>
            </button>
          ))}
        </nav>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#00FFF0] to-transparent opacity-50"></div>
    </header>
  );
};

export default Header;
