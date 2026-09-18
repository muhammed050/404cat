import { SiteNav } from "@/components/SiteNav";
import { MemeMaker } from "./MemeMaker";

export const metadata = { title: "Meme Lab", description: "Create a 404 CAT meme poster in seconds." };

export default function Generator() {
  return <main><SiteNav/><section className="shell inner-page">
    <p className="kicker">404 MEME LAB</p>
    <h1>Type the mistake.<br/><span>Let the cat judge it.</span></h1>
    <p className="lead narrow">Create a simple 404 CAT poster locally in your browser. No upload or account required.</p>
    <MemeMaker/>
  </section></main>;
}
