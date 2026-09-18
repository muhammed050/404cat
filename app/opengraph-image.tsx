import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "404 CAT — Dip Not Found";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",background:"#02070c",color:"white",fontFamily:"sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:30,border:"2px solid #22dff3",borderRadius:28}}/>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px",width:"70%"}}>
        <div style={{fontSize:34,color:"#22dff3",fontFamily:"monospace"}}>404 CAT / $404</div>
        <div style={{fontSize:92,fontWeight:900,letterSpacing:"-6px",lineHeight:.92,marginTop:34}}>DIP<br/>NOT <span style={{color:"#22dff3"}}>FOUND.</span></div>
        <div style={{fontSize:28,color:"#9bb1bc",marginTop:32}}>Same cat. Different internet.</div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%",fontSize:115,color:"#22dff3",fontFamily:"monospace"}}>ฅ^•ﻌ•^ฅ</div>
    </div>,
    size
  );
}
