import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Building2, Trophy, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Philosophy: Honest Pricing */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-900 text-white p-12 md:p-20 rounded-[3rem] mb-32"
        >
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8 block">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-10 leading-tight">
              "인테리어 견적의 10%는 하자보수 비용?" <br />
              <span className="text-stone-400">옳음은 이 낡은 관행을 거부합니다.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-300 leading-relaxed">
              <p>
                업계에선 이미 공공연한 관행입니다. 시공사의 실수로 생길 하자를 처음부터 소비자 견적에 포함시켜 받는 구조. 
                잘못한 쪽이 책임지는 것이 아니라, 소비자가 선결제하는 이 불합리한 구조를 옳음은 바로잡고자 합니다.
              </p>
              <p>
                우리는 리스크 비용을 소비자에게 전가하지 않습니다. 견적에 '숨겨진 하자보험료' 같은 항목은 넣지 않습니다. 
                오직 <strong>정직한 원가와 정직한 공사비</strong>로 승부합니다. 그것이 우리가 믿는 '옳은' 길입니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Strengths: Operational Experience */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 block">Our Strength</span>
              <h2 className="text-4xl md:text-5xl font-serif">운영자의 마음으로 설계합니다</h2>
            </div>
            <p className="text-stone-500 max-w-sm">
              우리는 단순히 도면을 그리는 회사가 아닙니다. 직접 사업체를 운영하며 얻은 실전 노하우를 디자인에 녹여냅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-stone-50 rounded-3xl border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Building2 className="text-stone-800" />
              </div>
              <h3 className="text-xl font-bold mb-4">직영 호텔 운영</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                현재 2개의 호텔을 직접 운영하고 있습니다. 고객의 투숙 경험부터 운영 효율성까지, 실제 오너의 시각에서 공간을 바라봅니다.
              </p>
            </div>
            <div className="p-10 bg-stone-50 rounded-3xl border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Trophy className="text-stone-800" />
              </div>
              <h3 className="text-xl font-bold mb-4">실내체육시설 운영</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                스크린골프 등 실내체육시설을 직접 운영하며, 특수 시설의 설비와 마감재의 내구성, 사용자 편의성을 몸소 체험하고 검증했습니다.
              </p>
            </div>
            <div className="p-10 bg-stone-50 rounded-3xl border border-black/5 hover:bg-white hover:shadow-xl transition-all duration-500 group">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Users className="text-stone-800" />
              </div>
              <h3 className="text-xl font-bold mb-4">오피스 공간 운영</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                자체 사무실 운영을 통해 업무 효율을 극대화하는 공간 구성을 연구합니다. 일하는 사람을 위한 최적의 환경을 제안합니다.
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="border-t border-black/5 pt-32">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 block">Timeline</span>
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter">Milestones</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { year: '2020', title: '옳음 컨설팅 설립', desc: '공간 컨설팅 및 디자인 서비스 시작' },
              { year: '2020', title: "서초 HOTEL LA'LIA", desc: '첫 번째 직영 호텔 운영 및 디자인' },
              { year: '2021', title: '신림 URBAN HOTEL&GOLF', desc: '리모델링 및 인수, 실내체육시설 운영 확장' },
              { year: '2022', title: '숙박시설 전문화', desc: '국내 주요 중소형 숙박시설 리모델링 전문화' },
              { year: '2024', title: '신촌 URBAN HOTEL&PLAY', desc: '리모델링 및 인수, 복합 문화 숙박 공간 구축' },
              { year: '2024', title: '주식회사 와이앤와이', desc: '사업 확장 및 전문성 강화를 위한 법인 설립' },
              { year: '2024', title: '홈 인테리어 전문화', desc: '프리미엄 주거 공간 디자인 서비스 런칭' },
              { year: '2025', title: '상업 공간 전문화', desc: '브랜드 맞춤형 상업 인테리어 솔루션 고도화' },
            ].map((item, i) => (
              <div key={i} className="relative pl-8 border-l border-stone-200 group">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-stone-300 group-hover:bg-black transition-colors"></div>
                <span className="text-xl font-serif italic mb-2 block text-stone-400 group-hover:text-black transition-colors">{item.year}</span>
                <h3 className="text-lg font-bold mb-2 leading-tight">{item.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
