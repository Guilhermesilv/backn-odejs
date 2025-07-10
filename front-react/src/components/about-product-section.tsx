import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Globe } from "@/components/magicui/globe";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { useRef } from "react";
import { AnimatedList } from "@/components/magicui/animated-list";
import { Marquee } from "@/components/magicui/marquee";
import React from "react";
import { colors } from "@/theme/colors";

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const Icons = {
  email: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 13.7 2.37 15.3 3.03 16.77L2 22L7.23 20.97C8.7 21.63 10.3 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 15.5C16.9 15.8 16.3 16.1 15.9 16.2C15.5 16.3 15 16.4 13.8 15.9C12.1 15.2 10.3 13.2 10.1 13C9.9 12.8 9 11.5 9 10.2C9 8.9 9.7 8.2 9.9 8C10.1 7.8 10.3 7.7 10.5 7.7C10.7 7.7 10.9 7.7 11.1 7.7C11.3 7.7 11.5 7.7 11.7 8.3C11.9 8.9 12.5 10.2 12.6 10.3C12.7 10.4 12.7 10.6 12.6 10.7C12.5 10.8 12.4 11 12.3 11.1C12.2 11.2 12.1 11.3 12 11.4C11.9 11.5 11.8 11.7 11.9 11.9C12 12.1 12.5 13 13.3 13.7C14.3 14.6 15.1 14.9 15.3 15C15.5 15.1 15.7 15.1 15.8 15C15.9 14.9 16.4 14.3 16.5 14.1C16.6 13.9 16.7 13.9 16.9 14C17.1 14.1 18.4 14.7 18.6 14.8C18.8 14.9 19 15 19 15.2C19.1 15.3 19.1 15.4 17 15.5Z"
        fill="#25D366"
      />
    </svg>
  ),
  airbnb: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L9.5 7L12 12L14.5 7L12 2Z"
        stroke="#FF5A5F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12Z"
        stroke="#FF5A5F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V22"
        stroke="#FF5A5F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  booking: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7V17C4 19.2091 5.79086 21 8 21H16C18.2091 21 20 19.2091 20 17V7M4 7V6C4 3.79086 5.79086 2 8 2H16C18.2091 2 20 3.79086 20 6V7M4 7H20"
        stroke="#003580"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="#003580"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16H12"
        stroke="#003580"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const notifications = [
  {
    name: "João confirmou presença",
    description: "Viagem para Paris",
    icon: "👤",
    color: "#00C9A7",
  },
  {
    name: "Maria confirmou presença",
    description: "Viagem para Paris",
    time: "10m atrás",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Pedro adicionou uma atividade",
    description: "Viagem para Paris",
    icon: "👤",
    color: "#FF3D71",
  },
  {
    name: "Ana confirmou presença na ativdade",
    description: "Viagem para Paris",
    icon: "👤",
    color: "#1E86FF",
  },
].flatMap(item => Array(3).fill(item));

const destinations = [
  {
    name: "Santorini, Grécia",
    description: "Praias de areias vulcânicas e pôr do sol inesquecível.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Tóquio, Japão",
    description: "Mistura única de tradição e tecnologia moderna.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Machu Picchu, Peru",
    description: "Cidade antiga dos Incas nas alturas dos Andes.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Paris, França",
    description: "Cidade luz, capital mundial da gastronomia e arte.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Maldivas",
    description: "Paraíso tropical com águas cristalinas e bangalôs sobre o mar.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop",
  },
];

const activities = [
  "Passeio de barco ao pôr do sol 🚤",
  "Caminhada na natureza 🏃‍♂️",
  "Tour gastronômico 🍷",
  "Mergulho com snorkel 🤿",
  "Visita a museus 🏛️",
  "Aula de culinária local 👨‍🍳",
  "Passeio de bicicleta 🚲",
  "Show cultural 🎭"
];

const Notification = ({ name, description, icon, color }: {
  name: string;
  description: string;
  icon: string;
  color: string;
}) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/30"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-sm font-normal text-zinc-300">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const features = [
  {
    name: "Organize datas",
    description: "Escolha o melhor período para sua viagem e mantenha todos informados.",
    className: "md:col-span-2",
    background: (
      <CalendarComponent
        mode="single"
        selected={new Date()}
        className="absolute right-0 top-10 origin-top scale-90 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-100"
      />
    ),
  },
  {
    name: "Escolha destinos",
    description: "Defina para onde vocês querem ir e visualize no mapa.",
    className: "md:col-span-1",
    background: (
      <Globe className="mt-[-8rem] mb-16" />
    ),
  },
  {
    name: "Convide amigos",
    description: "Adicione seus amigos facilmente por e-mail para planejar juntos.",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 h-full w-full">
        <div className="relative h-[70%] w-full overflow-hidden">
          <AnimatedList className="h-full w-full space-y-2 p-4 [mask-image:linear-gradient(to_bottom,transparent_5%,black_35%,black_65%,transparent_95%)] transform-gpu transition-all duration-300 ease-out group-hover:scale-[103%]">
            {notifications.map((item, idx) => (
              <Notification key={idx} {...item} />
            ))}
          </AnimatedList>
          {/* Gradientes para suavizar as bordas */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-900/5 via-zinc-900/5 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900/5 via-zinc-900/5 to-transparent" />
        </div>
      </div>
    ),
  },
  {
    name: "Atividades",
    description: "Crie e organize atividades para cada dia da viagem.",
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 flex flex-row items-center justify-center gap-8">
        <Marquee vertical className="h-full [--duration:30s]">
          {activities.slice(0, activities.length / 2).map((activity, idx) => (
            <div
              key={idx}
              className={cn(
                "relative mx-2 my-4 w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-zinc-700/30 bg-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/70",
                "transform-gpu transition-all duration-300 ease-out",
              )}
            >
              <p className="text-sm font-medium text-white">{activity}</p>
            </div>
          ))}
        </Marquee>
        <Marquee vertical reverse className="h-full [--duration:30s]">
          {activities.slice(activities.length / 2).map((activity, idx) => (
            <div
              key={idx}
              className={cn(
                "relative mx-2 my-4 w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-zinc-700/30 bg-zinc-800/50 backdrop-blur-sm hover:bg-zinc-800/70",
                "transform-gpu transition-all duration-300 ease-out",
              )}
            >
              <p className="text-sm font-medium text-white">{activity}</p>
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-900/90 via-zinc-900/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
      </div>
    ),
  },
  {
    name: "Explore opções",
    description: "Descubra lugares interessantes para visitar durante a viagem.",
    className: "md:col-span-2 relative",
    background: (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full [perspective:2000px]">
          <div 
            className="absolute inset-x-0 bottom-0 flex transform-gpu flex-row items-end justify-center pb-24"
            style={{
              transform: "translateY(-2rem) rotateX(20deg)",
            }}
          >
            <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem]">
              {destinations.map((dest, idx) => (
                <figure
                  key={idx}
                  className={cn(
                    "group relative w-[300px] cursor-pointer overflow-hidden rounded-xl",
                    "bg-zinc-800/20 backdrop-blur-sm hover:bg-zinc-800/40",
                    "transform-gpu transition-all duration-300 ease-out hover:scale-[1.02]",
                  )}
                >
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/40 to-zinc-900/90" />
                  </div>
                  <div className="p-4">
                    <figcaption className="text-lg font-medium text-white">
                      {dest.name}
                    </figcaption>
                    <p className="mt-1 text-sm text-zinc-300">
                      {dest.description}
                    </p>
                  </div>
                </figure>
              ))}
            </Marquee>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-zinc-900 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-zinc-900 to-transparent" />
        </div>
      </div>
    ),
  },
  {
    name: "Compartilhe links",
    description: "Adicione links de hospedagem, passeios e restaurantes para todos verem.",
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 h-full w-full">
        <AnimatedBeamMultipleOutputDemo />
      </div>
    ),
  },
  {
    name: "Economize tempo",
    description: "Evite longas conversas em grupos e tenha tudo organizado em um só lugar.",
    className: "md:col-span-2",
  },
  {
    name: "Crie memórias",
    description: "Foque no que importa: aproveitar momentos inesquecíveis com seus amigos.",
    className: "md:col-span-1",
  },
];

function AnimatedBeamMultipleOutputDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[270px] w-full items-center justify-center overflow-hidden p-10 pb-24"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.email />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.airbnb />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
        gradientStartColor={colors.gradient.start}
        gradientStopColor={colors.gradient.end}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
        gradientStartColor={colors.gradient.start}
        gradientStopColor={colors.gradient.end}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
        gradientStartColor={colors.gradient.start}
        gradientStopColor={colors.gradient.end}
      />
    </div>
  );
}

interface FeatureCardProps {
  name: string;
  description: string;
  className?: string;
  background?: React.ReactNode;
}

function FeatureCard({ name, description, className, background }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl p-6 border border-zinc-700/30 bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-900/60 transition-all duration-300",
        className
      )}
    >
      {background}
      
      <div className="absolute bottom-6 left-6 z-20">
        <h3 className="text-xl font-semibold mb-2 text-zinc-100">{name}</h3>
        <p className="text-zinc-300 max-w-[80%]">{description}</p>
      </div>
    </div>
  );
}

export function AboutProductSection() {
  return (
    <section id="about" className="min-h-screen py-24 px-6 relative pt-[350px]">
      <div className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <div 
        className="absolute bottom-0 right-0 w-full h-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 1800px 1400px at bottom right, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 15%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.03) 45%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.01) 75%, transparent 100%)'
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-30">
        <div className="text-center mb-16">
          <h2 className="text-zinc-300 text-3xl mb-2">
            Por que usar o Itiny?
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Planeje suas viagens com amigos de forma simples e organizada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[20rem] gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 