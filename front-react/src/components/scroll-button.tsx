import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollButtonProps {
  targetId: string;
}

export function ScrollButton({ targetId }: ScrollButtonProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Usar scrollIntoView com um offset para levar em conta o Safari
      const offset = 350; // Mesmo valor do padding-top da seção about
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <button
      onClick={scrollToTarget}
      className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-zinc-900/80 backdrop-blur-sm text-zinc-300 p-3 rounded-full shadow-lg border border-zinc-700/30 transition-all duration-300 z-50 hover:bg-zinc-800/90 hover:scale-110 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Rolar para baixo"
    >
      <ChevronDown className="h-6 w-6 animate-bounce" />
    </button>
  );
} 