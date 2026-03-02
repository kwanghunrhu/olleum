import { Project, ThemeConfig } from './types';

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#1a1a1a', // Dark Charcoal
  fontFamily: 'sans',
  siteTitle: '옳음 디자인&컨설팅',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: '럭셔리 호텔 리모델링',
    category: 'hotel',
    description: '글로벌 스탠다드를 뛰어넘는 최상의 휴식과 프리미엄 경험을 제공하는 호텔 인테리어 프로젝트입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2023-12-01',
  },
  {
    id: '2',
    title: '미니멀 주거 공간',
    category: 'residential',
    description: '당신의 삶의 결을 담은 가장 편안하고 세련된 집을 완성했습니다. 미니멀리즘의 정수를 보여줍니다.',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2024-01-15',
  },
  {
    id: '3',
    title: '트렌디한 카페 디자인',
    category: 'commercial',
    description: '성공적인 비즈니스를 위한 브랜드 맞춤형 상업 공간 설계. 감각적인 조명과 가구 배치가 돋보입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2024-02-10',
  },
  {
    id: '4',
    title: '오피스 라운지 컨설팅',
    category: 'commercial',
    description: '창의적인 업무 환경을 위한 오피스 라운지 디자인입니다. 협업과 휴식이 공존하는 공간입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2023-11-20',
  },
  {
    id: '5',
    title: '프리미엄 펜트하우스',
    category: 'residential',
    description: '도시의 전경을 품은 프리미엄 펜트하우스 인테리어입니다. 고급 자재와 세심한 디테일이 특징입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2024-02-28',
  },
  {
    id: '6',
    title: '부티크 호텔 로비',
    category: 'hotel',
    description: '방문객에게 강렬한 첫인상을 남기는 부티크 호텔 로비 디자인입니다. 예술적인 감각이 돋보입니다.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=1600',
    images: [],
    date: '2023-10-05',
  },
];
