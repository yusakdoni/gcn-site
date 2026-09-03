"use client";
import {useLayoutEffect} from "react";

const FROM="Aviation-led procurement, supply & project execution";
const TO="General procurement, supply & project execution";

export function HeroCopyOverride(){
 useLayoutEffect(()=>{
  const apply=()=>{
   const hero=document.querySelector("main > section:first-of-type");
   if(!hero)return;
   const walker=document.createTreeWalker(hero,NodeFilter.SHOW_TEXT);
   let node:Node|null;
   while((node=walker.nextNode())){
    if(node.nodeValue?.trim()===FROM)node.nodeValue=node.nodeValue.replace(FROM,TO);
   }
  };
  apply();
  const observer=new MutationObserver(apply);
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
  return()=>observer.disconnect();
 },[]);
 return null;
}
