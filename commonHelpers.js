import{a as g,S as h,i as p}from"./assets/vendor-da186403.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();let E=0;const f=document.querySelector(".loader-span"),M=document.querySelector(".load-button"),k=document.querySelector(".load-more");f.style.display="none";M.style.display="none";k.style.display="none";g.defaults.baseURL="https://pixabay.com/api/";const P="42597996-b1dc9edd2aa87e1c7d2b2d72b";async function y(t,s,a){f.style.display="block";const n={key:P,q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a,page:s};try{const e=await g.get("/",{params:n});return E=e.data.totalHits,e.data}catch(e){throw console.log(`Error! ${e}`),new Error}}new h(".gallery-link",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});let R=document.querySelector(".images");const b=document.querySelector(".load-more");b.style.display="none";function S(t){const s=t.map(({webformatURL:a,largeImageURL:n,tags:e,likes:o,views:l,comments:v,downloads:w})=>`<div class="items">
            <a class="gallery-link" href="${n}">
                <img src="${a}" alt="${e}">
            </a>
            <div class="info-gallery">
                <p class="gallery-description">
                    <span class="gallery-description-span">Likes:
                    <span class="span">${o}</span>
                    </span>
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Views: <span class="span">${l}</span>
                    </span>   
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Comments: <span class="span">${v}</span>
                    </span>   
                </p>
                <p class="gallery-description">
                    <span class="gallery-description-span">Downloads: <span class="span">${w}</span>
                    </span>   
                </p>
            </div>
        </div>`).join("");R.innerHTML+=s,b.style.display="none",D()}function D(){const t=document.querySelectorAll(".items");if(t.length>0){const s=t[0].getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}document.querySelector("button");const H=document.querySelector("input"),q=document.querySelector("form");let L=document.querySelector(".images");const u=document.querySelector(".loader-span"),r=document.querySelector(".load-button"),d=document.querySelector(".load-more");u.style.display="none";r.style.display="none";d.style.display="none";const $=new h(".gallery-link",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"});let i="",c,O,m=0;q.addEventListener("submit",C);function C(t){L.innerHTML="",t.preventDefault(),i=H.value.trim(),c=1,i!==""?(y(i,c,O),T()):(p.error({timeout:3e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),r.style.display="none"),q.reset()}function T(){y(i,c,15).then(t=>{S(t.hits),u.style.display="none",r.style.display="block",$.refresh()}).catch(t=>{console.error("Error fetching images:",t)})}r.addEventListener("click",x);function x(){r.style.display="none",d.style.display="block",c++,y(i,c,15).then(t=>{m=t.totalHits,S(t.hits),u.style.display="none",L.children.length>=m?(d.style.display="none",p.info({timeout:3e3,position:"topRight",message:"You've reached the end of search results."})):r.style.display="block",$.refresh()}).catch(t=>{console.error("Error fetching images:",t),p.info({timeout:3e3,position:"topRight",message:"We're sorry, but you've reached the end of search results."})})}
//# sourceMappingURL=commonHelpers.js.map
