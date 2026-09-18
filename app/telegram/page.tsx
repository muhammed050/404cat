import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";

export const metadata = {
  title: "Telegram",
  description: "Join the official 404 CAT Telegram community.",
};

const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/The404Cat";

export default function TelegramPage() {
  return (
    <main>
      <SiteNav />
      <section className="shell inner-page">
        <p className="kicker">404 CAT COMMUNITY</p>
        <h1>Join the chaos.<br/><span>Stay with the cat.</span></h1>
        <p className="lead narrow">
          The official Telegram home for 404 CAT community chat, memes, updates and launch announcements.
        </p>

        <div className="telegram-layout">
          <div className="telegram-card">
            <div className="telegram-icon">✈</div>
            <span className="telegram-status">{telegramUrl ? "OFFICIAL LINK READY" : "LINK NOT CONFIGURED YET"}</span>
            <h2>404 CAT on Telegram</h2>
            <p>
              Memes, community chat, launch news and one permanently confused cat.
            </p>

            {telegramUrl ? (
              <a className="pill" href={telegramUrl} target="_blank" rel="noreferrer">
                Join Telegram ↗
              </a>
            ) : (
              <div className="telegram-placeholder">
                Add <code>NEXT_PUBLIC_TELEGRAM_URL</code> in Vercel when the Telegram group is created.
              </div>
            )}
          </div>

          <div className="telegram-side">
            <article className="info-box">
              <b>Official links only.</b>
              <p>Use links published on this website and the official X account. Ignore unsolicited DMs.</p>
            </article>
            <article className="info-box">
              <b>No guaranteed returns.</b>
              <p>404 CAT is meme-first internet culture. Nobody from the team should promise profits.</p>
            </article>
            <article className="info-box">
              <b>Never share seed phrases.</b>
              <p>Admins should never ask for wallet recovery phrases, private keys or remote access.</p>
            </article>
            <Link className="ghost telegram-back" href="/">← Back to 404 CAT</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
