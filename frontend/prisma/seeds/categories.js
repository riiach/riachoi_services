async function seedCategories(prisma) {
    await prisma.category.createMany({
        data: [
            {
                name: "Static Website Development",
                koreanName: "소개형 사이트",
                description: "Fast and lightweight websites.",
                koreanDescription: "빠르고 가벼운 웹사이트 제작.",
                tag: "Business Card, Portfolio, Landing Page",
                koreanTag: "기업소개, 포트폴리오, 랜딩페이지"
            },
            {
                name: "Dynamic Website Development",
                koreanName: "기능형 사이트",
                description: "Custom web applications with dynamic functionality and backend systems.",
                koreanDescription: "동적인 기능이 포함된 웹사이트 개발.",
                tag: "Auth, Database, API, Payment, Booking",
                koreanTag: "로그인, 데이터 저장, 예약, 결제"
            },
            {
                name: "E-Commerce Development",
                koreanName: "쇼핑몰 개발",
                description: "From simple brand shops to advanced commerce platforms.",
                koreanDescription: "브랜드 쇼핑몰부터 커스텀 커머스 플랫폼까지 제작 가능.",
                tag: "Custom Shop, Shopify, WooCommerce, Stripe",
                koreanTag: "커스텀 제작, Shopify, WooCommerce, Stripe, 아임웹"
            },
            {
                name: "CMS Development / Website Builder",
                koreanName: "컨텐트 관리형 / 웹사이트 빌더 구축 서비스",
                description: "Content management systems for easy website and content updates.",
                koreanDescription: "고객이 직접 콘텐츠를 관리할 수 있는 시스템 구축.",
                tag: "WordPress, WebFlow, Shopify",
                koreanTag: "WordPress, WebFlow, Shopify, 아임웹, Sanity"
            },
            {
                name: "Admin Dashboard",
                koreanName: "관리자 페이지 개발",
                description: "Custom admin dashboards for operations and business management.",
                koreanDescription: "운영 및 데이터 관리를 위한 관리자 시스템 구축.",
                tag: "User Management, Analytics, Order Management, Role Permissions, Content Management",
                koreanTag: "사용자 관리, 통계, 주문 관리, 콘텐츠 관리, 권한 관리"
            },
            {
                name: "Conversion",
                koreanName: "전환 최적화(CRO)",
                description: "Optimizing websites to increase leads, sales, and user actions.",
                koreanDescription: "방문자를 고객으로 전환시키기 위한 최적화 작업.",
                tag: "Traffic, UX Improvements, Form Optimization",
                koreanTag: "트래픽, UX 개선, 폼 최적화"
            },
            {
                name: "Automation",
                koreanName: "자동화 시스템 구축",
                description: "Business workflow and customer automation systems.",
                koreanDescription: "업무 및 고객 흐름 자동화 시스템 구축.",
                tag: "Email Automation, CRM Integration, Quote Automation, Booking Automation, Payment Automation",
                koreanTag: "이메일 자동화, 견적 자동화, CRM 연동, 결제 자동화, 예약 자동화"
            },
            {
                name: "Branding & UI/UX",
                koreanName: "브랜딩 & UI/UX",
                description: "Building modern and memorable digital brand identities.",
                koreanDescription: "브랜드 아이덴티티 및 사용자 경험 설계.",
                tag: "Brand Identity, Color System, Brand Guidelines, UI Design, Design System",
                koreanTag: "로고, 컬러 시스템, UI 디자인, 디자인 시스템, 브랜드 가이드"
            },
            {
                name: "Speed Optimization",
                koreanName: "성능 최적화",
                description: "Improving website speed and overall performance.",
                koreanDescription: "웹사이트 속도 및 사용자 경험 최적화.",
                tag: "Fast Loading, Lazy Loading, User Experience, Performance",
                koreanTag: "빠른 로딩, 순차적 로딩, 사용자 경험, 퍼포먼스"
            },
            {
                name: "SEO",
                koreanName: "검색 엔진 최적화 (SEO)",
                description: "Improving search visibility and organic traffic.",
                koreanDescription: "검색 엔진 노출 및 검색 성능 향상.",
                tag: "Google, Blog, Social Media, Marketing, Content Marketing",
                koreanTag: "Google, 블로그, 소셜 미디어, 네이버, 마케팅"
            },
            {
                name: "AI Integration",
                koreanName: "AI",
                description: "AI-powered features and intelligent automation systems.",
                koreanDescription: "AI 기반 기능 및 자동화 시스템 개발.",
                tag: "AI Chatbot, ChatGPT, Gemini, Claude, AI Search, AI Assistance",
                koreanTag: "AI 챗봇, ChatGPT, Gemini, Claude, AI 기반 검색, AI 생성"
            },
            {
                name: "DevOps Services & Cloud Infrastructure",
                koreanName: "DevOps & 클라우드 인프라 구축",
                description: "Scalable cloud infrastructure and deployment systems.",
                koreanDescription: "배포, 서버 운영 및 클라우드 인프라 관리.",
                tag: "AWS, Azure, GCP, Kubernetes, Docker, CI/CD, Efficient Cloud",
                koreanTag: "AWS, Azure, GCP, Kubernetes, Docker, CI/CD, 효율적 서버"
            },
            {
                name: "Web Security",
                koreanName: "웹 보안",
                description: "Security hardening for websites and cloud infrastructure.",
                koreanDescription: "웹사이트 및 서버 보안 강화.",
                tag: "SSL, Authentication, Encryption, Data Protection",
                koreanTag: "SSL, 인증, 보안, 데이터 보호"
            },
            {
                name: "Website Maintenance",
                koreanName: "웹사이트 유지보수",
                description: "Ongoing website support and maintenance services.",
                koreanDescription: "운영 중인 웹사이트 유지 및 기능 관리.",
                tag: "Content Updates, Bug Fixes, Security Updates, Performance Optimization, Technical Support",
                koreanTag: "컨텐트 수정, 이미지 교체, 버그 수정, 페이지 추가, 성능 모니터링"
            }
        ],

      skipDuplicates: true,
    });

    console.log("Categories seeded.");
}

module.exports = {
  seedCategories,
};