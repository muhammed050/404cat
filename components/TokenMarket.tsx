"use client";

import { useEffect, useState } from "react";

type Data = {
  ok: boolean;
  source: string;
  priceUsd: number | null;
  marketCap: number | null;
  fdv: number | null;
  liquidityUsd: number | null;
  volume24h: number | null;
  priceChange1h: number | null;
  priceChange24h: number | null;
  buys24h: number | null;
  sells24h: number | null;
  dex: string | null;
  pairUrl: string | null;
  updatedAt: string;
};

export function TokenMarket() {
  const [data,setData]=useState<Data|null>(null);

  useEffect(()=>{
    let alive=true;
    const load=async()=>{
      try{
        const res=await fetch("/api/token",{cache:"no-store"});
        if(!res.ok) return;
        const json=await res.json();
        if(alive) setData(json);
      }catch{}
    };
    load();
    const id=setInterval(load,30000);
    return()=>{alive=false;clearInterval(id)};
  },[]);

  const mc=data?.marketCap ?? data?.fdv ?? null;

  return (
    <section className="market-panel" aria-label="$404 live market data">
      <div className="market-head">
        <div><span className="market-live-dot"/><strong>$404 MARKET</strong><small>Live public market data</small></div>
        <span className="market-source">{data?.ok ? `via ${prettySource(data.source)}` : "waiting for first indexed market data"}</span>
      </div>

      <div className="market-grid">
        <Metric label="PRICE" value={data?.priceUsd == null ? "—" : moneyPrice(data.priceUsd)} />
        <Metric label="MARKET CAP" value={money(mc)} />
        <Metric label="24H VOLUME" value={money(data?.volume24h)} />
        <Metric label="LIQUIDITY" value={money(data?.liquidityUsd)} />
        <Change label="1H CHANGE" value={data?.priceChange1h} />
        <Change label="24H CHANGE" value={data?.priceChange24h} />
      </div>

      <div className="market-foot">
        <div className="trade-counts">
          <span>24H BUYS <b>{fmtInt(data?.buys24h)}</b></span>
          <span>24H SELLS <b>{fmtInt(data?.sells24h)}</b></span>
        </div>
        <div>
          {data?.pairUrl && <a href={data.pairUrl} target="_blank" rel="noreferrer">Open chart ↗</a>}
          <span className="market-refresh">Auto-refresh 30s</span>
        </div>
      </div>
    </section>
  );
}

function Metric({label,value}:{label:string;value:string}) {
  return <div className="market-metric"><span>{label}</span><strong>{value}</strong></div>;
}

function Change({label,value}:{label:string;value:number|null|undefined}) {
  const val=value ?? null;
  return <div className="market-metric"><span>{label}</span><strong className={val==null?"":val>=0?"up":"down"}>{val==null?"—":`${val>=0?"+":""}${val.toFixed(2)}%`}</strong></div>;
}

function money(v:number|null|undefined){
  if(v==null) return "—";
  if(v>=1_000_000_000) return `$${(v/1_000_000_000).toFixed(2)}B`;
  if(v>=1_000_000) return `$${(v/1_000_000).toFixed(2)}M`;
  if(v>=1_000) return `$${(v/1_000).toFixed(2)}K`;
  return `$${v.toFixed(v<10?2:0)}`;
}

function moneyPrice(v:number){
  if(v>=1) return `$${v.toFixed(4)}`;
  if(v>=0.01) return `$${v.toFixed(6)}`;
  if(v>=0.0001) return `$${v.toFixed(8)}`;
  return `$${v.toPrecision(5)}`;
}

function fmtInt(v:number|null|undefined){ return v==null?"—":Math.round(v).toLocaleString(); }
function prettySource(v:string){ return v==="dexscreener"?"DEX Screener":v==="geckoterminal"?"GeckoTerminal":v; }
