import { NextResponse } from "next/server";

const MINT = "4PATCCTpkLTJjSnjQ75emHEA3bfd3zBnpWzNHfm3pump";

type MarketData = {
  ok: boolean;
  source: "dexscreener" | "geckoterminal" | "none";
  name: string;
  symbol: string;
  mint: string;
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
  pairCreatedAt: string | null;
  updatedAt: string;
};

const blank = (): MarketData => ({
  ok: false,
  source: "none",
  name: "404 CAT",
  symbol: "$404",
  mint: MINT,
  priceUsd: null,
  marketCap: null,
  fdv: null,
  liquidityUsd: null,
  volume24h: null,
  priceChange1h: null,
  priceChange24h: null,
  buys24h: null,
  sells24h: null,
  dex: null,
  pairUrl: null,
  pairCreatedAt: null,
  updatedAt: new Date().toISOString(),
});

export async function GET() {
  const fallback = blank();

  try {
    const dexRes = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${MINT}`,
      { next: { revalidate: 20 }, headers: { Accept: "application/json" } }
    );

    if (dexRes.ok) {
      const json = await dexRes.json();
      const pairs = Array.isArray(json?.pairs) ? json.pairs.filter((p: any) => p?.chainId === "solana") : [];
      const pair = pairs.sort((a: any, b: any) => Number(b?.liquidity?.usd || 0) - Number(a?.liquidity?.usd || 0))[0];

      if (pair) {
        const tx = pair?.txns?.h24 || {};
        return NextResponse.json({
          ok: true,
          source: "dexscreener",
          name: pair?.baseToken?.name || "404 CAT",
          symbol: pair?.baseToken?.symbol || "$404",
          mint: MINT,
          priceUsd: num(pair?.priceUsd),
          marketCap: num(pair?.marketCap),
          fdv: num(pair?.fdv),
          liquidityUsd: num(pair?.liquidity?.usd),
          volume24h: num(pair?.volume?.h24),
          priceChange1h: num(pair?.priceChange?.h1),
          priceChange24h: num(pair?.priceChange?.h24),
          buys24h: num(tx?.buys),
          sells24h: num(tx?.sells),
          dex: pair?.dexId || null,
          pairUrl: pair?.url || null,
          pairCreatedAt: pair?.pairCreatedAt ? new Date(pair.pairCreatedAt).toISOString() : null,
          updatedAt: new Date().toISOString(),
        } satisfies MarketData, { headers: cacheHeaders() });
      }
    }
  } catch {}

  try {
    const gtRes = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/solana/tokens/${MINT}/pools`,
      {
        next: { revalidate: 60 },
        headers: {
          Accept: "application/json;version=20230203",
          "User-Agent": "404cat.vercel.app",
        },
      }
    );

    if (gtRes.ok) {
      const json = await gtRes.json();
      const pools = Array.isArray(json?.data) ? json.data : [];
      const pool = pools.sort(
        (a: any, b: any) => Number(b?.attributes?.reserve_in_usd || 0) - Number(a?.attributes?.reserve_in_usd || 0)
      )[0];

      if (pool?.attributes) {
        const a = pool.attributes;
        const tx = a?.transactions?.h24 || {};
        const dexId = pool?.relationships?.dex?.data?.id || null;
        return NextResponse.json({
          ok: true,
          source: "geckoterminal",
          name: "404 CAT",
          symbol: "$404",
          mint: MINT,
          priceUsd: num(a?.base_token_price_usd),
          marketCap: num(a?.market_cap_usd),
          fdv: num(a?.fdv_usd),
          liquidityUsd: num(a?.reserve_in_usd),
          volume24h: num(a?.volume_usd?.h24),
          priceChange1h: num(a?.price_change_percentage?.h1),
          priceChange24h: num(a?.price_change_percentage?.h24),
          buys24h: num(tx?.buys),
          sells24h: num(tx?.sells),
          dex: dexId,
          pairUrl: a?.address ? `https://www.geckoterminal.com/solana/pools/${a.address}` : null,
          pairCreatedAt: a?.pool_created_at || null,
          updatedAt: new Date().toISOString(),
        } satisfies MarketData, { headers: cacheHeaders() });
      }
    }
  } catch {}

  return NextResponse.json(fallback, { headers: cacheHeaders() });
}

function num(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function cacheHeaders() {
  return {
    "Cache-Control": "public, s-maxage=20, stale-while-revalidate=40",
  };
}
