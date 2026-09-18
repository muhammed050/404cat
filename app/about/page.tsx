import Link from "next/link";
import { CatMark } from "@/components/CatMark";
import { SiteNav } from "@/components/SiteNav";

export const metadata = { title: "About", description: "The story and principles behind 404 CAT." };

export default function About() {
  return <main><SiteNav/><section className="shell inner-page">
    <p className="kicker">ABOUT 404 CAT</p>
    <h1>Lost on the internet.<br/><span>Found by memes.</span></h1>
    <div className="about-grid">
      <div>
        <p className="lead">404 CAT is a meme-first internet character built around the universal experience of looking for the perfect entry and getting an error instead.</p>
        <div className="info-box"><b>No promises.</b><p>No guaranteed returns, no fake roadmaps and no claims about future price performance.</p></div>
        <div className="info-box"><b>Community culture.</b><p>The goal is simple: make the character fun enough that people want to create with it.</p></div>
        <Link className="pill" href="/generator">Create a meme →</Link>
      </div>
      <div className="about-cat"><CatMark/></div>
    </div>
  </section></main>;
}
