import { SiteNav } from "@/components/SiteNav";

export const metadata = { title: "404 Graveyard", description: "A wall of painfully relatable internet and crypto mistakes." };

const graves = [
  ["BUY HIGH", "Opened the chart after +300%. Decided this was definitely early."],
  ["PANIC SELL", "Held for three weeks. Sold ten minutes before the bounce."],
  ["WRONG TAB", "Checked the 1-minute chart and somehow created a six-hour emotional crisis."],
  ["FOMO.EXE", "Said “I will wait for a dip.” Five minutes later: bought anyway."],
  ["REFRESH", "Refreshed the portfolio 404 times. Nothing changed except the battery percentage."],
  ["NO SLEEP", "Watched candles until sunrise. The cat was disappointed."],
];

export default function Graveyard() {
  return <main><SiteNav/><section className="shell inner-page">
    <p className="kicker">404 GRAVEYARD</p>
    <h1>Bad trades deserve<br/><span>good tombstones.</span></h1>
    <p className="lead narrow">A growing wall for painfully relatable internet mistakes. Laugh at the chaos; do not repeat it.</p>
    <div className="grave-grid">
      {graves.map(([t,d],i)=><article className="grave" key={t}><span>ERR_{404+i}</span><h2>{t}</h2><p>{d}</p><div>RIP ☠</div></article>)}
    </div>
  </section></main>;
}
