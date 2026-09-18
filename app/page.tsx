import Link from "next/link";
import { CatMark } from "@/components/CatMark";
import { SiteNav } from "@/components/SiteNav";
import { CopyContract } from "@/components/CopyContract";

const CONTRACT="4PATCCTpkLTJjSnjQ75emHEA3bfd3zBnpWzNHfm3pump";
const PUMP="https://pump.fun/coin/4PATCCTpkLTJjSnjQ75emHEA3bfd3zBnpWzNHfm3pump";
const TG="https://t.me/The404Cat";
const X="https://x.com/404catcoin?s=11";

export default function Home() {
  return (
    <main>
      <SiteNav />
      <div className="live-bar"><span/> $404 IS LIVE ON PUMP.FUN <a href={PUMP} target="_blank" rel="noreferrer">VIEW COIN ↗</a></div>

      <section className="hero shell live-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot"/> LIVE / SOLANA / PUMP.FUN</div>
          <h1>404 CAT is <span>live.</span></h1>
          <p className="lead">The dip you&apos;re looking for could not be found. $404 is now live on Pump.fun — memes first, community powered.</p>
          <div className="hero-actions">
            <a className="pill" href={PUMP} target="_blank" rel="noreferrer">Buy $404 on Pump.fun ↗</a>
            <a className="ghost" href={TG} target="_blank" rel="noreferrer">Join Telegram</a>
            <a className="ghost" href={X} target="_blank" rel="noreferrer">Follow on X</a>
          </div>
          <CopyContract contract={CONTRACT}/>
          <p className="risk-note">Always verify the contract address before trading. 404 CAT makes no promises of returns.</p>
        </div>

        <div className="hero-art">
          <div className="terminal-card live-terminal">
            <div className="terminal-top"><i/><i/><i/><span>404cat.live</span></div>
            <div className="terminal-body">
              <p>&gt; launch_status...</p>
              <p>token: <b>$404</b></p>
              <p>network: <b>SOLANA</b></p>
              <p>platform: <b>PUMP.FUN</b></p>
              <p>status: <b className="live-text">LIVE</b></p>
            </div>
          </div>
          <div className="mascot-orbit live-orbit">
            <span className="orb orb1"/><span className="orb orb2"/><span className="orb orb3"/>
            <CatMark className="hero-cat" />
          </div>
          <div className="ticker">$404</div>
        </div>
      </section>

      <section className="ticker-strip"><div>LIVE NOW ✦ $404 ✦ MEMES ✦ CHAOS ✦ GOOD VIBES ✦ DIP NOT FOUND ✦ </div></section>

      <section className="shell section">
        <div className="section-head">
          <p className="kicker">OFFICIAL LINKS</p>
          <h2>One cat. <span>Three official doors.</span></h2>
        </div>
        <div className="live-links-grid">
          <a href={PUMP} target="_blank" rel="noreferrer"><span>01</span><strong>Buy $404</strong><p>Open the official Pump.fun coin page.</p><b>Pump.fun ↗</b></a>
          <a href={TG} target="_blank" rel="noreferrer"><span>02</span><strong>Join Telegram</strong><p>Community chat, memes and project updates.</p><b>The404Cat ↗</b></a>
          <a href={X} target="_blank" rel="noreferrer"><span>03</span><strong>Follow on X</strong><p>Launch posts, memes and announcements.</p><b>@404catcoin ↗</b></a>
        </div>
      </section>

      <section className="shell section community-live">
        <div>
          <p className="kicker">COMMUNITY MODE</p>
          <h2>Don&apos;t just watch.<br/><span>Make the meme.</span></h2>
          <p>Use the 404 Meme Studio to make share-ready posts for X, Telegram and stories. Upload your own image or start from the cat.</p>
          <div className="hero-actions"><Link className="pill" href="/generator">Open Meme Studio →</Link><Link className="ghost" href="/graveyard">Visit Graveyard</Link></div>
        </div>
        <div className="mini-poster"><span>404 CAT</span><CatMark className="mini-cat"/><strong>LIVE<br/>AND<br/>LOST.</strong></div>
      </section>

      <section className="shell section safety-panel">
        <p className="kicker">STAY SAFE</p>
        <h2>Verify before you click.</h2>
        <div className="safety-grid">
          <div><strong>Contract</strong><p>{CONTRACT}</p></div>
          <div><strong>No DMs asking for keys</strong><p>Admins should never ask for seed phrases, private keys or remote access.</p></div>
          <div><strong>Official links only</strong><p>Use the links published on this website to avoid impersonators.</p></div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand"><span className="brand404">404</span><span>CAT</span></div>
        <p>Memes, internet culture and a confused cat. Nothing on this site is financial advice.</p>
        <div><a href={PUMP}>Pump.fun</a><a href={TG}>Telegram</a><a href={X}>X</a></div>
      </footer>
    </main>
  );
}
