"use client";

import { useMemo, useRef, useState } from "react";
import { CatMark } from "@/components/CatMark";

type Template = "terminal" | "chart" | "minimal" | "alert";
type Accent = "cyan" | "pink" | "lime" | "orange";

const presets = [
  ["DIP NOT FOUND", "same cat. different internet."],
  ["BOUGHT THE TOP", "confidence: 100% • timing: 0%"],
  ["PANIC SOLD AGAIN", "the candle moved 2 pixels."],
  ["STILL SEARCHING", "refreshing the chart since 4:04 AM."],
  ["FOMO.EXE STARTED", "common sense has stopped responding."],
  ["PORTFOLIO NOT FOUND", "but the memes are still here."],
  ["I SAID I WOULD WAIT", "narrator: he did not wait."],
  ["ONE MORE REFRESH", "surely this one fixes everything."],
] as const;

const templateNames: Record<Template,string> = {
  terminal: "Terminal",
  chart: "Chart Panic",
  minimal: "Clean",
  alert: "Error Alert",
};

const accentMap: Record<Accent,string> = {
  cyan: "#22dff3",
  pink: "#ff69b4",
  lime: "#b8ff5a",
  orange: "#ff9b42",
};

export function MemeMaker() {
  const [headline,setHeadline]=useState("DIP NOT FOUND");
  const [sub,setSub]=useState("same cat. different internet.");
  const [template,setTemplate]=useState<Template>("terminal");
  const [accent,setAccent]=useState<Accent>("cyan");
  const [size,setSize]=useState(100);
  const [showCat,setShowCat]=useState(true);
  const [showTicker,setShowTicker]=useState(true);
  const canvasRef=useRef<HTMLCanvasElement>(null);

  const accentColor=accentMap[accent];

  const previewStyle = useMemo(() => ({
    "--meme-accent": accentColor,
    "--meme-scale": String(size/100),
  } as React.CSSProperties), [accentColor,size]);

  function surprise() {
    const item=presets[Math.floor(Math.random()*presets.length)];
    setHeadline(item[0]);
    setSub(item[1]);
    const templates:Template[]=["terminal","chart","minimal","alert"];
    setTemplate(templates[Math.floor(Math.random()*templates.length)]);
    const accents:Accent[]=["cyan","pink","lime","orange"];
    setAccent(accents[Math.floor(Math.random()*accents.length)]);
  }

  function renderCanvas() {
    const canvas=canvasRef.current;
    if(!canvas) return null;
    const ctx=canvas.getContext("2d");
    if(!ctx) return null;

    canvas.width=1080;
    canvas.height=1080;
    drawBackground(ctx,template,accentColor);
    drawDecor(ctx,template,accentColor);

    ctx.textBaseline="top";
    ctx.fillStyle=accentColor;
    ctx.font="700 38px monospace";
    ctx.fillText("404 CAT",70,62);

    if(showTicker){
      ctx.fillStyle="#dffcff";
      ctx.font="700 28px monospace";
      ctx.fillText("$404",920,70);
    }

    ctx.fillStyle="#f8fdff";
    ctx.font=`900 ${Math.round(102*size/100)}px Arial`;
    const endY=wrap(ctx,(headline || "404").toUpperCase(),70,235,780,Math.round(112*size/100),4);

    ctx.fillStyle=accentColor;
    ctx.font="600 38px monospace";
    wrap(ctx,sub || "same cat. different internet.",70,Math.max(endY+42,650),770,52,3);

    if(showCat) drawCat(ctx,805,355,accentColor);

    ctx.fillStyle="rgba(2,7,12,.84)";
    ctx.strokeStyle=accentColor;
    ctx.lineWidth=3;
    roundRect(ctx,70,870,940,112,18,true,true);
    ctx.fillStyle="#dffcff";
    ctx.font="700 30px monospace";
    ctx.fillText(template==="alert" ? "> ERROR_404 // MEME READY" : "> 404 — MEME GENERATED",105,910);

    ctx.fillStyle=accentColor;
    ctx.font="26px monospace";
    ctx.fillText("@404CatCoin",800,1012);
    return canvas;
  }

  function download() {
    const canvas=renderCanvas();
    if(!canvas) return;
    const a=document.createElement("a");
    a.download=`404cat-${template}-meme.png`;
    a.href=canvas.toDataURL("image/png",1);
    a.click();
  }

  async function share() {
    const canvas=renderCanvas();
    if(!canvas) return;
    canvas.toBlob(async blob=>{
      if(!blob) return;
      const file=new File([blob],"404cat-meme.png",{type:"image/png"});
      try{
        if(navigator.share && (!navigator.canShare || navigator.canShare({files:[file]}))){
          await navigator.share({title:"404 CAT Meme",text:"404 — meme generated.",files:[file]});
        } else {
          download();
        }
      } catch {}
    },"image/png",1);
  }

  return (
    <div className="meme-studio">
      <div className="studio-toolbar">
        <div>
          <span className="studio-label">TEMPLATE</span>
          <div className="template-tabs">
            {(Object.keys(templateNames) as Template[]).map(key=>(
              <button className={template===key?"active":""} key={key} onClick={()=>setTemplate(key)}>
                {templateNames[key]}
              </button>
            ))}
          </div>
        </div>
        <button className="surprise-btn" onClick={surprise}>↻ Surprise me</button>
      </div>

      <div className="maker-grid upgraded">
        <div className="maker-form">
          <div className="control-head"><span>CONTENT</span><small>{headline.length}/46</small></div>
          <label>HEADLINE
            <textarea maxLength={46} rows={3} value={headline} onChange={e=>setHeadline(e.target.value)} />
          </label>
          <label>CAPTION
            <textarea maxLength={88} rows={2} value={sub} onChange={e=>setSub(e.target.value)} />
          </label>

          <span className="studio-label">QUICK IDEAS</span>
          <div className="chips">
            {presets.slice(0,6).map(([h,s])=>(
              <button key={h} onClick={()=>{setHeadline(h);setSub(s)}}>{h}</button>
            ))}
          </div>

          <div className="control-row">
            <div>
              <span className="studio-label">ACCENT</span>
              <div className="swatches">
                {(Object.keys(accentMap) as Accent[]).map(a=>(
                  <button key={a} aria-label={a} className={accent===a?"active":""} style={{background:accentMap[a]}} onClick={()=>setAccent(a)} />
                ))}
              </div>
            </div>
            <label className="range-wrap">TEXT SIZE <b>{size}%</b>
              <input type="range" min="78" max="116" value={size} onChange={e=>setSize(Number(e.target.value))}/>
            </label>
          </div>

          <div className="switch-row">
            <button className={showCat?"toggle active":"toggle"} onClick={()=>setShowCat(v=>!v)}>CAT {showCat?"ON":"OFF"}</button>
            <button className={showTicker?"toggle active":"toggle"} onClick={()=>setShowTicker(v=>!v)}>$404 {showTicker?"ON":"OFF"}</button>
          </div>

          <div className="studio-actions">
            <button className="pill wide" onClick={download}>Download PNG ↓</button>
            <button className="ghost wide" onClick={share}>Share meme ↗</button>
          </div>
          <p className="micro">1080×1080 • generated locally • no upload required</p>
        </div>

        <div className={`meme-preview pro template-${template}`} style={previewStyle}>
          <div className="preview-noise"/>
          <div className="preview-brand"><span>404</span> CAT</div>
          {showTicker && <div className="preview-ticker">$404</div>}
          <div className="preview-copy">
            <h2>{headline || "404"}</h2>
            <p>{sub || "same cat. different internet."}</p>
          </div>
          {showCat && <div className="preview-cat-wrap"><CatMark className="preview-cat"/></div>}
          {template==="chart" && <div className="fake-chart" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>}
          {template==="alert" && <div className="alert-badge">ERROR_404</div>}
          <div className="preview-terminal">&gt; {template==="alert" ? "ERROR_404 // MEME READY" : "404 — MEME GENERATED"}</div>
          <small>@404CatCoin</small>
        </div>
      </div>
      <canvas ref={canvasRef} hidden/>
    </div>
  );
}

function drawBackground(ctx:CanvasRenderingContext2D,template:Template,accent:string){
  const g=ctx.createLinearGradient(0,0,1080,1080);
  if(template==="minimal"){g.addColorStop(0,"#081018");g.addColorStop(1,"#02070c")}
  else if(template==="alert"){g.addColorStop(0,"#12070a");g.addColorStop(1,"#02070c")}
  else {g.addColorStop(0,"#02070c");g.addColorStop(1,"#071a25")}
  ctx.fillStyle=g;ctx.fillRect(0,0,1080,1080);
  ctx.strokeStyle=accent;ctx.lineWidth=3;roundRect(ctx,34,34,1012,1012,26,false,true);
}

function drawDecor(ctx:CanvasRenderingContext2D,template:Template,accent:string){
  ctx.save();ctx.globalAlpha=.16;ctx.strokeStyle=accent;ctx.lineWidth=2;
  if(template==="terminal"){
    for(let y=150;y<840;y+=48){ctx.beginPath();ctx.moveTo(70,y);ctx.lineTo(1010,y);ctx.stroke()}
  }
  if(template==="chart"){
    ctx.beginPath();ctx.moveTo(80,745);ctx.lineTo(220,670);ctx.lineTo(330,710);ctx.lineTo(470,545);ctx.lineTo(590,600);ctx.lineTo(720,430);ctx.lineTo(980,610);ctx.stroke();
  }
  if(template==="alert"){
    ctx.fillStyle=accent;ctx.globalAlpha=.08;ctx.fillRect(0,0,1080,155);ctx.fillRect(0,820,1080,260);
  }
  ctx.restore();
}

function drawCat(ctx:CanvasRenderingContext2D,cx:number,cy:number,accent:string){
  ctx.save();ctx.translate(cx,cy);
  ctx.shadowColor=accent;ctx.shadowBlur=30;
  ctx.fillStyle="#9aa6b2";ctx.strokeStyle="#07131d";ctx.lineWidth=14;
  ctx.beginPath();ctx.moveTo(-120,-35);ctx.lineTo(-145,-150);ctx.lineTo(-65,-100);ctx.quadraticCurveTo(0,-135,65,-100);ctx.lineTo(145,-150);ctx.lineTo(120,-35);ctx.quadraticCurveTo(145,95,0,130);ctx.quadraticCurveTo(-145,95,-120,-35);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle="#ff8f9f";
  ctx.beginPath();ctx.moveTo(-130,-125);ctx.lineTo(-82,-93);ctx.lineTo(-118,-72);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(130,-125);ctx.lineTo(82,-93);ctx.lineTo(118,-72);ctx.closePath();ctx.fill();
  ctx.fillStyle="#fff";
  for(const x of [-55,55]){ctx.beginPath();ctx.ellipse(x,-15,35,46,0,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle="#061018";
  for(const x of [-55,55]){ctx.beginPath();ctx.ellipse(x,-5,13,21,0,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle=accent;
  for(const x of [-60,50]){ctx.beginPath();ctx.arc(x,-15,5,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle="#ff8f9f";ctx.beginPath();ctx.moveTo(-10,45);ctx.lineTo(10,45);ctx.lineTo(0,57);ctx.closePath();ctx.fill();
  ctx.restore();
}

function wrap(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,max:number,line:number,maxLines:number){
  const words=text.split(/\s+/);let current="";let yy=y;let lines=0;
  for(const word of words){
    const test=current?current+" "+word:word;
    if(ctx.measureText(test).width>max&&current){
      ctx.fillText(current,x,yy);current=word;yy+=line;lines++;
      if(lines>=maxLines) break;
    } else current=test;
  }
  if(current&&lines<maxLines){ctx.fillText(current,x,yy);yy+=line}
  return yy;
}

function roundRect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number,fill:boolean,stroke:boolean){
  ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill)ctx.fill();if(stroke)ctx.stroke();
}
