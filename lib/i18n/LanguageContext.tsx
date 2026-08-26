"use client";
import {createContext,useContext,useEffect,useState,useCallback} from "react";

export type Lang = "en" | "id";
interface LanguageContextValue {lang:Lang;setLang:(l:Lang)=>void;toggle:()=>void;}

const LanguageContext=createContext<LanguageContextValue>({lang:"id",setLang:()=>{},toggle:()=>{}});
const STORAGE_KEY="gcn-lang";

export function LanguageProvider({children}:{children:React.ReactNode}){
 // Bahasa Indonesia adalah default situs (target audiens utama Indonesia).
 // Preferensi tersimpan (localStorage/cookie) tetap dihormati saat hydrate.
 const[lang,setLangState]=useState<Lang>("id");

 useEffect(()=>{
  try{
   const saved=window.localStorage.getItem(STORAGE_KEY);
   const cookieMatch=document.cookie.match(/(?:^|; )gcn-lang=([^;]+)/);
   const fromCookie=cookieMatch?decodeURIComponent(cookieMatch[1]):null;
   const initial=(saved==="id"||saved==="en")?saved:(fromCookie==="id"||fromCookie==="en")?fromCookie:null;
   if(initial){setLangState(initial as Lang);document.documentElement.lang=initial;}
  }catch{}
 },[]);

 const setLang=useCallback((l:Lang)=>{
  setLangState(l);
  try{
   window.localStorage.setItem(STORAGE_KEY,l);
   document.cookie=`gcn-lang=${l}; path=/; max-age=31536000`;
   document.documentElement.lang=l;
  }catch{}
 },[]);

 const toggle=useCallback(()=>{setLang(lang==="en"?"id":"en")},[lang,setLang]);

 return <LanguageContext.Provider value={{lang,setLang,toggle}}>{children}</LanguageContext.Provider>;
}

export function useLanguage(){return useContext(LanguageContext)}
