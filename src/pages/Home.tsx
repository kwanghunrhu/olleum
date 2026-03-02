import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { projects } = useAppContext();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Interior"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500 mb-6 block">
              Ol-eum Design & Consulting
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8">
              공간에 <br />
              <span className="italic">가치를</span> 더하다
            </h1>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-lg">
              우리는 단순한 인테리어를 넘어, 그 공간에 머무는 사람들의 삶과 
              비즈니스의 본질을 담아내는 디자인을 추구합니다.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-stone-800 transition-colors group"
            >
              포트폴리오 보기
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              옳음의 철학: <br />
              공간의 본질에 집중하다
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                공간은 그곳에 머무는 사람의 삶을 담는 그릇입니다. 
                '옳음'은 이름 그대로 화려한 기교나 일시적인 트렌드보다 
                공간이 가져야 할 본질적인 가치와 올바른 쓰임새를 고민합니다.
              </p>
              <p>
                우리는 사용자의 동선과 기능성을 최우선으로 고려하며, 
                보이지 않는 디테일까지 세밀하게 설계합니다. 
                상업 공간의 성공적인 브랜딩부터 주거 공간의 깊은 안식까지, 
                시간이 흐를수록 가치가 더해지는 최적의 솔루션을 제안합니다.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-12">
              <img src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800" alt="Interior detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800" alt="Interior detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 block">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-serif">주요 포트폴리오</h2>
            </div>
            <Link to="/portfolio" className="text-sm font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity">
              전체 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-8">당신의 공간을 위한 <br />옳은 선택</h2>
          <p className="text-stone-400 text-lg mb-12">전문적인 컨설팅과 감각적인 디자인으로 꿈꾸던 공간을 실현해 드립니다.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full hover:bg-stone-200 transition-colors font-bold"
          >
            상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
