import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Steps } from "@/components/sections/steps";
import { Features } from "@/components/sections/features";
import CTA from "@/components/sections/cta";

export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="bg-background">
        <Steps />
        <Features />
      </div>
      <CTA />
      <Footer />
    </main>
  );
}
