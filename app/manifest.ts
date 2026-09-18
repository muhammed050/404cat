import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {name:"404 CAT",short_name:"404CAT",description:"The dip you're looking for could not be found.",start_url:"/",display:"standalone",background_color:"#02070c",theme_color:"#02070c"};
}
