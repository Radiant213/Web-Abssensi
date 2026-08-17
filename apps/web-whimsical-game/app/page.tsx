import { GameHeader } from "@/components/GameHeader";
import { GameHero } from "@/components/GameHero";
import { StoryLore } from "@/components/StoryLore";
import { GameplayGallery } from "@/components/GameplayGallery";
import { Mechanics } from "@/components/Mechanics";
import { SystemRequirements } from "@/components/SystemRequirements";
import { GameFooter } from "@/components/GameFooter";

export default function WhimsicalGamePage() {
  return (
    <main className="min-h-screen bg-[#040508] text-gray-100 selection:bg-rose-600 selection:text-white">
      <GameHeader />
      <GameHero />
      <StoryLore />
      <GameplayGallery />
      <Mechanics />
      <SystemRequirements />
      <GameFooter />
    </main>
  );
}
