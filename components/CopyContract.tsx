"use client";
import { useState } from "react";

export function CopyContract({contract}:{contract:string}) {
  const [copied,setCopied]=useState(false);
  async function copy(){
    await navigator.clipboard.writeText(contract);
    setCopied(true);
    setTimeout(()=>setCopied(false),1600);
  }
  return <div className="contract live-contract">
    <span>CONTRACT ADDRESS</span>
    <div><code>{contract}</code><button onClick={copy}>{copied?"Copied ✓":"Copy"}</button></div>
  </div>;
}
