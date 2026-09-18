import { SiteNav } from "@/components/SiteNav";
import { MemeMaker } from "./MemeMaker";

export const metadata = {
  title: "Meme Studio",
  description: "Create 404 CAT memes from your own image, choose social formats, and export instantly.",
};

export default function Generator() {
  return (
    <main>
      <SiteNav/>
      <section className="shell studio-page">
        <div className="studio-intro">
          <div>
            <p className="kicker">404 MEME STUDIO</p>
            <h1>Make a meme people actually want to post.</h1>
          </div>
          <p>Upload a photo or start from a 404 CAT template. Edit the joke, choose a social format, preview the exact output, then export it instantly.</p>
        </div>
        <MemeMaker/>
      </section>
    </main>
  );
}
