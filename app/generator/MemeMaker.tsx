"use client";

import { useRef, useState } from "react";

const examples = ["BOUGHT THE TOP", "DIP NOT FOUND", "PANIC SOLD AGAIN", "STILL SEARCHING"];

export function MemeMaker() {
  const [headline,setHeadline]=useState("DIP NOT FOUND");
  const [sub,setSub]=useState("same cat. different internet.");
  const canvasRef=useRef<HTMLCanvasElement>(null);

  function download() {
    const canvas=canvasRef.current;
    if(!canvas) return;
    const ctx=canvas.getContext("2d");
    if(!ctx) return;
    canvas.width=1080; canvas.height=1080;
    const g=ctx.createLinearGradient(0,0,1080,1080);
    g.addColorStop(0,"#02070c"); g.addColorStop(1,"#071a25");
    ctx.fillStyle=g; ctx.fillRect(0,0,1080,1080);
    ctx.strokeStyle="#22dff3"; ctx.lineWidth=4; ctx.strokeRect(42,42,996,996);
    ctx.fillStyle="#22dff3"; ctx.font="700 54px monospace"; ctx.fillText("404 CAT / $404",70,110);
    ctx.fillStyle="#fff"; ctx.font="900 104px Arial"; wrap(ctx,headline.toUpperCase(),70,260,920,118);
    ctx.fillStyle="#22dff3"; ctx.font="600 42px monospace"; wrap(ctx,sub,70,660,900,58);
    ctx.fillStyle="#0b1117"; ctx.fillRect(70,835,940,125);
    ctx.strokeStyle="#22dff3"; ctx.strokeRect(70,835,940,125);
    ctx.fillStyle="#dffcff"; ctx.font="700 38px monospace"; ctx.fillText("> 404 — MEME GENERATED",105,910);
    ctx.fillStyle="#22dff3"; ctx.font="34px monospace"; ctx.fillText("@404CatCoin",770,1010);
    const a=document.createElement("a"); a.download="404cat-meme.png"; a.href=canvas.toDataURL("image/png"); a.click();
  }

  return <div className="maker-grid">
    <div className="maker-form">
      <label>HEADLINE<input maxLength={42} value={headline} onChange={e=>setHeadline(e.target.value)}/></label>
      <label>SMALL TEXT<input maxLength={58} value={sub} onChange={e=>setSub(e.target.value)}/></label>
      <div className="chips">{examples.map(x=><button key={x} onClick={()=>setHeadline(x)}>{x}</button>)}</div>
      <button className="pill wide" onClick={download}>Download poster ↓</button>
      <p className="micro">Generated entirely in your browser.</p>
    </div>
    <div className="meme-preview">
      <span>404 CAT / $404</span><h2>{headline || "404"}</h2><p>{sub}</p>
      <div className="preview-terminal">&gt; 404 — MEME GENERATED</div>
      <small>@404CatCoin</small>
    </div>
    <canvas ref={canvasRef} hidden/>
  </div>;
}

function wrap(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,max:number,line:number){
  const words=text.split(" "); let current=""; let yy=y;
  for(const word of words){const test=current?current+" "+word:word;if(ctx.measureText(test).width>max&&current){ctx.fillText(current,x,yy);current=word;yy+=line}else current=test} if(current)ctx.fillText(current,x,yy);
}
