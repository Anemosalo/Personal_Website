import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Certifications from './components/Certifications';
import Competitions from './components/Competitions';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05080F] to-[#0B1020] text-[#F8F8FF] font-mono relative overflow-x-hidden">
      <Background scrollProgress={scrollProgress} />
      <Header />
      <main>
        <Hero />
        <About />
        <Certifications />
        <Competitions />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer scrollProgress={scrollProgress} />
    </div>
  );
}

export default App;
