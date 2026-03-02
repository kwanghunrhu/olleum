import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Footer = () => {
  const { theme } = useAppContext();
  
  return (
    <footer className="bg-stone-50 border-t border-black/5 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-serif font-bold mb-4">{theme.siteTitle}</h3>
          <p className="text-stone-500 max-w-md leading-relaxed">
            옳음 디자인&컨설팅은 공간의 본질을 탐구하며, 
            사용자의 삶과 비즈니스의 가치를 높이는 최적의 인테리어 솔루션을 제공합니다.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-stone-400">Contact</h4>
          <ul className="space-y-3 text-sm text-stone-600">
            <li>서울특별시 관악구 신림동 1569-5번지 URBAN HOTEL&GOLF</li>
            <li>02-862-6664</li>
            <li>urban_hotel@naver.com</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-black/5 flex flex-col md:row justify-between items-center gap-4">
        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} {theme.siteTitle}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
