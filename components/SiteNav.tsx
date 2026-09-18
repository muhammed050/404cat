import Link from "next/link";

export function SiteNav() {
  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <Link className="brand" href="/" aria-label="404 CAT home">
          <span className="brand404">404</span><span>CAT</span>
        </Link>
        <div className="nav-links">
          <Link href="/generator">Meme Lab</Link>
          <Link href="/graveyard">Graveyard</Link>
          <Link href="/about">About</Link>
        </div>
        <a className="pill small" href="https://x.com/404CatCoin" target="_blank" rel="noreferrer">Follow on X</a>
      </nav>
    </header>
  );
}
