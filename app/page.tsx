import Link from "next/link";
import { CatMark } from "@/components/CatMark";
import { SiteNav } from "@/components/SiteNav";

const traits = [
  ["01", "Meme-first", "Built around a recognizable internet character, not empty promises."],
  ["02", "Community-made", "The best jokes, posts and confession-style stories can become the brand."],
  ["03", "Terminal energy", "A playful 404-error identity made for screenshots, replies and reaction posts."],
];

export default function Home() {
  return (
    <main>
      <SiteNav />
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> ERROR 404 / CAT FOUND</div>
          <h1>The dip you&apos;re looking for <span>could not be found.</span></h1>
          <p className="lead">
            Meet <strong>404 CAT</strong> — one confused internet cat, permanently searching the charts
            for a dip that never seems to load.
          </p>
          <div className="hero-actions">
            <a className="pill" href="https://pump.fun/coin/4PATCCTpkLTJjSnjQ75emHEA3bfd3zBnpWzNHfm3pump" target="_blank" rel="noreferrer">Buy $404 ↗</a>
            <Link className="ghost" href="/generator">Make a meme</Link>
          </div>
          <div className="contract">
            <span>CONTRACT</span>
            <code>4PATCCTpkLTJjSnjQ75emHEA3bfd3zBnpWzNHfm3pump</code>
          </div>
        </div>

        <div className="hero-art">
          <div className="terminal-card">
            <div className="terminal-top"><i/><i/><i/><span>404cat.exe</span></div>
            <div className="terminal-body">
              <p>&gt; searching_for_dip...</p>
              <p>status: <b>NOT_FOUND</b></p>
              <p>memes: <b>ONLINE</b></p>
              <p>cat: <b>CONFUSED</b></p>
            </div>
          </div>
          <div className="mascot-orbit">
            <span className="orb orb1"/><span className="orb orb2"/><span className="orb orb3"/>
            <CatMark className="hero-cat" />
          </div>
          <div className="ticker">$404</div>
        </div>
      </section>

      <section className="ticker-strip" aria-label="404 CAT phrases">
        <div>MEMES ✦ CHAOS ✦ GOOD VIBES ✦ DIP NOT FOUND ✦ SAME CAT, DIFFERENT INTERNET ✦ </div>
      </section>

      <section className="shell section">
        <div className="section-head">
          <p className="kicker">THE LORE</p>
          <h2>One cat. One mission. <span>Zero dips found.</span></h2>
        </div>
        <div className="story-grid">
          <div className="story-card big">
            <div className="pixel-cat">ฅ^•ﻌ•^ฅ</div>
            <h3>He opened the chart.</h3>
            <p>Then refreshed it. Then refreshed it again. Somewhere between the candles and the memes, 404 CAT became part of the internet.</p>
          </div>
          <div className="story-card quote">
            <span>TERMINAL LOG #404</span>
            <blockquote>“No roadmap to the moon. We&apos;re still trying to find the loading screen.”</blockquote>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="trait-grid">
          {traits.map(([n,t,d]) => (
            <article className="trait" key={n}>
              <span>{n}</span><h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section lab-callout">
        <div>
          <p className="kicker">COMMUNITY TOOL</p>
          <h2>Turn your bad trade into a <span>good meme.</span></h2>
          <p>Use the upgraded Meme Studio to remix templates, colors and 404 CAT reactions, then export a share-ready square meme in seconds.</p>
          <Link className="pill" href="/generator">Open Meme Studio →</Link>
        </div>
        <div className="mini-poster">
          <span>404 CAT</span>
          <CatMark className="mini-cat"/>
          <strong>DIP<br/>NOT<br/>FOUND.</strong>
        </div>
      </section>

      <section className="shell section cta">
        <p className="kicker">STAY LOST</p>
        <h2>The internet is weird.<br/><span>We brought a cat.</span></h2>
        <div className="hero-actions center">
          <a className="pill" href="https://x.com/404CatCoin" target="_blank" rel="noreferrer">Follow @404CatCoin ↗</a>
          <Link className="ghost" href="/graveyard">Visit the 404 Graveyard</Link>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand"><span className="brand404">404</span><span>CAT</span></div>
        <p>Memes, internet culture and a confused cat. Nothing on this site is financial advice.</p>
        <div><Link href="/about">About</Link><a href="https://x.com/404CatCoin">X</a></div>
      </footer>
    </main>
  );
}
