import { SiteNav } from "@/components/SiteNav";
import { MemeMaker } from "./MemeMaker";

export const metadata = {
  title: "Meme Studio",
  description: "Create polished 404 CAT memes with templates, colors and instant PNG export.",
};

export default function Generator() {
  return (
    <main>
      <SiteNav/>
      <section className="shell inner-page">
        <p className="kicker">404 MEME STUDIO</p>
        <h1>Make the mistake.<br/><span>Turn it into a meme.</span></h1>
        <p className="lead narrow">
          Pick a template, customize the joke, change the vibe, and export a polished 1080×1080 404 CAT meme instantly.
        </p>
        <MemeMaker/>
      </section>
    </main>
  );
}
