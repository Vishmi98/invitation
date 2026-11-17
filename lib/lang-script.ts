export const LANG_KEY = "invite-lang";

/**
 * Runs in <head> before first paint: applies ?lang=en|si from the URL, or the
 * language the guest chose last time, so the page never flashes the wrong one.
 */
export const LANG_SCRIPT = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get("lang"),l=q==="en"||q==="si"?q:localStorage.getItem("${LANG_KEY}");if(l==="en"||l==="si"){d.setAttribute("data-lang",l);d.setAttribute("lang",l)}}catch(e){}})()`;
