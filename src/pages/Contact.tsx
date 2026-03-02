import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif mb-8">Contact</h1>
            <p className="text-stone-500 text-lg mb-12 max-w-md">
              새로운 프로젝트를 계획 중이신가요? 
              옳음의 전문가들이 당신의 비전을 현실로 만들어 드립니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Office</h4>
                  <p className="text-stone-500">서울특별시 관악구 신림동 1569-5번지 URBAN HOTEL&GOLF</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-stone-500">02-862-6664</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-stone-500">urban_hotel@naver.com</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-stone-50 p-10 md:p-16 rounded-3xl border border-black/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/5 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/5 bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/5 bg-white">
                  <option>상업 공간 인테리어 문의</option>
                  <option>주거 공간 인테리어 문의</option>
                  <option>호텔 디자인 컨설팅 문의</option>
                  <option>기타 문의</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Message</label>
                <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-black/5 bg-white h-40"></textarea>
              </div>
              <button className="w-full py-5 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-stone-800 transition-colors">
                <Send size={18} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
