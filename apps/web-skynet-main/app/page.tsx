import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IoTShowcase } from "@/components/IoTShowcase";
import { GameShowcase } from "@/components/GameShowcase";
import { Pillars } from "@/components/Pillars";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080b11] text-gray-100 selection:bg-cyan-500 selection:text-black">
      <Header />
      <Hero />
      <IoTShowcase />
      <GameShowcase />
      <Pillars />
      <Footer />
    </main>
  );
}
