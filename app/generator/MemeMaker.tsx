"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

type Format = "square" | "portrait" | "landscape";
type Theme = "cyber" | "warning" | "clean" | "night";
type CatSide = "right" | "left" | "off";

const ideas = [
  ["DIP NOT FOUND", "same cat. different internet."],
  ["BOUGHT THE TOP", "timing.exe has stopped responding."],
  ["PANIC SOLD AGAIN", "the candle moved two pixels."],
  ["FOMO DETECTED", "common sense is currently offline."],
  ["ONE MORE REFRESH", "surely this one fixes everything."],
  ["PORTFOLIO NOT FOUND", "but the memes are still here."],
];

const formats: Record<Format,{label:string;width:number;height:number}> = {
  square:{label:"Post 1:1",width:1080,height:1080},
  portrait:{label:"Story 9:16",width:1080,height:1920},
  landscape:{label:"X 16:9",width:1600,height:900},
};

const themes: Record<Theme,{label:string;accent:string;bg1:string;bg2:string;ink:string}> = {
  cyber:{label:"Cyber",accent:"#22dff3",bg1:"#02070c",bg2:"#071c28",ink:"#f6fdff"},
  warning:{label:"Warning",accent:"#ff9f43",bg1:"#100905",bg2:"#2b1409",ink:"#fff8ef"},
  clean:{label:"Clean",accent:"#111827",bg1:"#f7fbfc",bg2:"#dcecf0",ink:"#071018"},
  night:{label:"Night",accent:"#a78bfa",bg1:"#050510",bg2:"#12122b",ink:"#f7f5ff"},
};

export function MemeMaker() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const imageRef=useRef<HTMLImageElement | null>(null);
  const [headline,setHeadline]=useState("DIP NOT FOUND");
  const [caption,setCaption]=useState("same cat. different internet.");
  const [format,setFormat]=useState<Format>("square");
  const [theme,setTheme]=useState<Theme>("cyber");
  const [catSide,setCatSide]=useState<CatSide>("right");
  const [fontScale,setFontScale]=useState(100);
  const [overlay,setOverlay]=useState(44);
  const [background,setBackground]=useState<string | null>(null);

  useEffect(()=>{ draw(); },[headline,caption,format,theme,catSide,fontScale,overlay,background]);

  function onUpload(e:ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")) return;
    const reader=new FileReader();
    reader.onload=()=>{
      const src=String(reader.result || "");
      const img=new Image();
      img.onload=()=>{ imageRef.current=img; setBackground(src); };
      img.src=src;
    };
    reader.readAsDataURL(file);
  }

  function clearImage(){
    imageRef.current=null;
    setBackground(null);
  }

  function randomize(){
    const idea=ideas[Math.floor(Math.random()*ideas.length)];
    setHeadline(idea[0]); setCaption(idea[1]);
    const themeKeys=Object.keys(themes) as Theme[];
    setTheme(themeKeys[Math.floor(Math.random()*themeKeys.length)]);
    setCatSide(Math.random()>.5?"right":"left");
  }

  function draw(){
    const canvas=canvasRef.current;
    if(!canvas) return;
    const ctx=canvas.getContext("2d");
    if(!ctx) return;
    const f=formats[format];
    canvas.width=f.width; canvas.height=f.height;
    const t=themes[theme];

    drawBackdrop(ctx,f.width,f.height,t,theme);

    if(imageRef.current){
      drawCover(ctx,imageRef.current,f.width,f.height);
      ctx.fillStyle=`rgba(1,7,12,${Math.min(.82,Math.max(.08,overlay/100))})`;
      ctx.fillRect(0,0,f.width,f.height);
    }

    const pad=Math.round(f.width*.055);
    const top=Math.round(f.height*.055);
    const brandSize=Math.max(26,Math.round(f.width*.028));
    ctx.textBaseline="top";

    ctx.font=`800 ${brandSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillStyle=t.ink;
    ctx.fillText("404",pad,top);
    const w404=ctx.measureText("404").width;
    ctx.fillStyle=t.accent;
    ctx.fillText(" CAT",pad+w404,top);

    ctx.textAlign="right";
    ctx.fillStyle=t.accent;
    ctx.font=`700 ${Math.max(22,Math.round(f.width*.023))}px ui-monospace, monospace`;
    ctx.fillText("$404",f.width-pad,top+3);
    ctx.textAlign="left";

    const wide=format==="landscape";
    const textMax=catSide==="off" ? f.width-pad*2 : (wide?f.width*.58:f.width*.76);
    const base=Math.round((wide?f.width*.074:f.width*.09)*(fontScale/100));
    const startY=Math.round(f.height*(format==="portrait"?.23:.25));
    ctx.fillStyle=t.ink;
    ctx.font=`900 ${base}px Arial, Helvetica, sans-serif`;
    const headlineEnd=wrapFit(ctx,(headline || "404").toUpperCase(),pad,startY,textMax,base*1.02,4);

    ctx.fillStyle=t.accent;
    ctx.font=`600 ${Math.max(28,Math.round(base*.34))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    wrapFit(ctx,caption || "same cat. different internet.",pad,headlineEnd+Math.round(base*.26),textMax,Math.round(base*.46),3);

    if(catSide!=="off"){
      const portrait=format==="portrait";
      const scale=portrait?1.08:(wide?.83:1);
      const catW=Math.round(f.width*(portrait?.58:.43)*scale);
      const catH=Math.round(catW*.86);
      const x=catSide==="right"?f.width-catW-pad*.35:pad*.35;
      const y=portrait?Math.round(f.height*.53):Math.round(f.height*.43);
      drawCat(ctx,x,y,catW,catH,t.accent,theme==="clean");
    }

    const footerH=Math.max(76,Math.round(f.height*.09));
    const footerY=f.height-pad-footerH;
    ctx.fillStyle=theme==="clean"?"rgba(255,255,255,.72)":"rgba(2,7,12,.72)";
    rounded(ctx,pad,footerY,f.width-pad*2,footerH,Math.round(footerH*.24));
    ctx.fill();
    ctx.strokeStyle=t.accent; ctx.lineWidth=Math.max(2,f.width/500); ctx.stroke();

    ctx.fillStyle=theme==="clean"?"#071018":"#dffcff";
    ctx.font=`700 ${Math.max(20,Math.round(f.width*.023))}px ui-monospace, monospace`;
    ctx.fillText("> 404 — MEME GENERATED",pad*1.5,footerY+footerH*.34);

    ctx.textAlign="right"; ctx.fillStyle=t.accent;
    ctx.fillText("@404CatCoin",f.width-pad*1.5,footerY+footerH*.34);
    ctx.textAlign="left";
  }

  function download(){
    draw();
    const canvas=canvasRef.current;
    if(!canvas) return;
    const a=document.createElement("a");
    a.href=canvas.toDataURL("image/png",1);
    a.download=`404cat-${format}-meme.png`;
    a.click();
  }

  async function share(){
    draw();
    const canvas=canvasRef.current;
    if(!canvas) return;
    canvas.toBlob(async blob=>{
      if(!blob) return;
      const file=new File([blob],"404cat-meme.png",{type:"image/png"});
      try{
        if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
          await navigator.share({title:"404 CAT Meme",text:"404 — Dip Not Found",files:[file]});
        } else download();
      }catch{}
    },"image/png",1);
  }

  return (
    <div className="mm-shell">
      <aside className="mm-panel">
        <div className="mm-panel-head">
          <div><span>MEME BUILDER</span><strong>Make it yours.</strong></div>
          <button onClick={randomize} className="mm-random">↻ Random</button>
        </div>

        <section className="mm-section">
          <label className="mm-label">FORMAT</label>
          <div className="mm-segment">
            {(Object.keys(formats) as Format[]).map(key=>
              <button key={key} className={format===key?"active":""} onClick={()=>setFormat(key)}>{formats[key].label}</button>
            )}
          </div>
        </section>

        <section className="mm-section">
          <label className="mm-label">TEXT</label>
          <textarea className="mm-input mm-headline" value={headline} maxLength={52} rows={2} onChange={e=>setHeadline(e.target.value)} placeholder="Main meme text"/>
          <textarea className="mm-input" value={caption} maxLength={100} rows={2} onChange={e=>setCaption(e.target.value)} placeholder="Optional caption"/>
          <div className="mm-ideas">
            {ideas.slice(0,4).map(([h,c])=><button key={h} onClick={()=>{setHeadline(h);setCaption(c)}}>{h}</button>)}
          </div>
        </section>

        <section className="mm-section">
          <div className="mm-label-row"><label className="mm-label">BACKGROUND IMAGE</label>{background&&<button onClick={clearImage}>Remove</button>}</div>
          <label className="mm-upload">
            <input type="file" accept="image/*" onChange={onUpload}/>
            <span>＋ Upload your image</span>
            <small>JPG, PNG or WebP • stays in your browser</small>
          </label>
          {background&&<label className="mm-range">Dark overlay <b>{overlay}%</b><input type="range" min="10" max="75" value={overlay} onChange={e=>setOverlay(Number(e.target.value))}/></label>}
        </section>

        <section className="mm-section mm-two">
          <div><label className="mm-label">STYLE</label><div className="mm-theme-grid">
            {(Object.keys(themes) as Theme[]).map(key=><button key={key} title={themes[key].label} className={theme===key?"active":""} onClick={()=>setTheme(key)}><i style={{background:themes[key].accent}}/>{themes[key].label}</button>)}
          </div></div>
          <div><label className="mm-label">CAT</label><div className="mm-cat-buttons">
            {(["left","right","off"] as CatSide[]).map(key=><button key={key} className={catSide===key?"active":""} onClick={()=>setCatSide(key)}>{key}</button>)}
          </div></div>
        </section>

        <section className="mm-section">
          <label className="mm-range">Headline size <b>{fontScale}%</b><input type="range" min="78" max="118" value={fontScale} onChange={e=>setFontScale(Number(e.target.value))}/></label>
        </section>

        <div className="mm-actions">
          <button className="pill" onClick={download}>Download PNG ↓</button>
          <button className="ghost" onClick={share}>Share ↗</button>
        </div>
        <p className="mm-note">No login. No upload. Your image never leaves your device.</p>
      </aside>

      <section className="mm-preview-area">
        <div className="mm-preview-head"><span>LIVE PREVIEW</span><small>{formats[format].width} × {formats[format].height}</small></div>
        <div className={`mm-canvas-frame format-${format}`}>
          <canvas ref={canvasRef} aria-label="Live 404 CAT meme preview"/>
        </div>
        <div className="mm-preview-foot"><span>What you see is what you download.</span><button onClick={download}>Export PNG</button></div>
      </section>
    </div>
  );
}

function drawBackdrop(ctx:CanvasRenderingContext2D,w:number,h:number,t:{accent:string;bg1:string;bg2:string;ink:string},theme:Theme){
  const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,t.bg1);g.addColorStop(1,t.bg2);ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  ctx.save();
  if(theme!=="clean"){
    ctx.globalAlpha=.12;ctx.strokeStyle=t.accent;ctx.lineWidth=1;
    const gap=Math.max(34,Math.round(w/22));
    for(let x=0;x<w;x+=gap){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
    for(let y=0;y<h;y+=gap){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
    ctx.globalAlpha=.1;ctx.fillStyle=t.accent;
    ctx.beginPath();ctx.arc(w*.78,h*.24,w*.22,0,Math.PI*2);ctx.fill();
  }else{
    ctx.globalAlpha=.55;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(w*.8,h*.23,w*.2,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}

function drawCover(ctx:CanvasRenderingContext2D,img:HTMLImageElement,w:number,h:number){
  const s=Math.max(w/img.width,h/img.height);const dw=img.width*s,dh=img.height*s;
  ctx.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);
}

function drawCat(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,accent:string,light:boolean){
  ctx.save();ctx.translate(x,y);
  const sx=w/430,sy=h/370;ctx.scale(sx,sy);
  ctx.shadowColor=accent;ctx.shadowBlur=24;
  ctx.fillStyle=light?"#9aa6b2":"#aeb7c1";ctx.strokeStyle="#071018";ctx.lineWidth=12;
  ctx.beginPath();ctx.moveTo(70,105);ctx.lineTo(45,25);ctx.lineTo(135,78);ctx.quadraticCurveTo(215,38,295,78);ctx.lineTo(385,25);ctx.lineTo(360,105);ctx.quadraticCurveTo(405,220,215,300);ctx.quadraticCurveTo(25,220,70,105);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle="#ff91a4";
  ctx.beginPath();ctx.moveTo(62,51);ctx.lineTo(116,82);ctx.lineTo(70,96);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(368,51);ctx.lineTo(314,82);ctx.lineTo(360,96);ctx.closePath();ctx.fill();
  ctx.fillStyle="#fff";
  for(const cx of [155,275]){ctx.beginPath();ctx.ellipse(cx,150,46,57,0,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle="#071018";
  for(const cx of [155,275]){ctx.beginPath();ctx.ellipse(cx,160,17,27,0,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle=accent;
  for(const cx of [149,269]){ctx.beginPath();ctx.arc(cx,149,6,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle="#ff91a4";ctx.beginPath();ctx.moveTo(198,214);ctx.lineTo(232,214);ctx.lineTo(215,233);ctx.closePath();ctx.fill();
  ctx.strokeStyle="#071018";ctx.lineWidth=7;ctx.lineCap="round";
  ctx.beginPath();ctx.moveTo(215,234);ctx.lineTo(215,252);ctx.moveTo(215,252);ctx.lineTo(198,262);ctx.moveTo(215,252);ctx.lineTo(232,262);ctx.stroke();
  ctx.restore();
}

function wrapFit(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,maxWidth:number,lineHeight:number,maxLines:number){
  const words=text.trim().split(/\s+/);let line="";let yy=y;let count=0;
  for(const word of words){
    const test=line?line+" "+word:word;
    if(ctx.measureText(test).width>maxWidth&&line){
      ctx.fillText(line,x,yy);line=word;yy+=lineHeight;count++;
      if(count>=maxLines-1) break;
    }else line=test;
  }
  if(line&&count<maxLines){ctx.fillText(line,x,yy);yy+=lineHeight}
  return yy;
}

function rounded(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
