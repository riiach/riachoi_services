"use client";

import { createContext, useState } from "react";

export const ServiceContext = createContext();
export const allServices = [
  "Web",
  "DevOps",
  "Maintenance",
  "Additional"
];
export const serviceDetails = [
  {
    name: "Web",
    description: "Turn your brand into a website",
    koreanDescription: "브랜드 정체성을 웹사이트로 가져오세요",
    image: "https://images.pexels.com/photos/3952080/pexels-photo-3952080.jpeg",
  },
  {
    name: "Web",
    description: "Manage everything in one place: Admin Dashboard",
    koreanDescription: "관리자 페이지로 모든 것을 한번에 관리하세요",
    image: "https://images.pexels.com/photos/6578430/pexels-photo-6578430.jpeg",
  },
  {
    name: "Web",
    description: "E-Commerce Development",
    koreanDescription: "쇼핑몰 개발",
    image:
      "https://images.pexels.com/photos/32432713/pexels-photo-32432713.jpeg",
  },
  {
    name: "Web",
    description: "Start your website budget friendly: Website Builder",
    koreanDescription: "부담 없이 시작하기 좋은 웹사이트 빌더 플랜",
    image:
      "https://images.pexels.com/photos/37295034/pexels-photo-37295034.jpeg",
  },
  {
    name: "DevOps",
    description: "We help you find the best option for your deployment",
    koreanDescription: "AWS 등 비지니스에 가장 적합한 플랜으로 배포하세요",
    image: "https://images.pexels.com/photos/4920888/pexels-photo-4920888.jpeg",
  },
  {
    name: "DevOps",
    description: "Docker Setup",
    koreanDescription: "Docker 셋업",
    image: "https://images.pexels.com/photos/4498125/pexels-photo-4498125.jpeg",
  },
  {
    name: "DevOps",
    description: "CI/CD Pipeline",
    koreanDescription: "CI/CD 파이프라인 구축",
    image:
      "https://images.pexels.com/photos/14805031/pexels-photo-14805031.jpeg",
  },
  {
    name: "DevOps",
    description: "Does your business experience seasonal traffic?: Use Auto Scaling.",
    koreanDescription: "오토 스케일링 서비스로 시즌 트래픽을 자동으로 관리하세요",
    image: "https://images.pexels.com/photos/8736970/pexels-photo-8736970.jpeg",
  },
  {
    name: "Maintenance",
    description: "Don't bother hiring a developer, we'll handle it for you: Content Update",
    koreanDescription: "개발자를 고용하기 부담 된다면, 저렴한 비용으로 컨텐츠를 관리하세요",
    image: "https://images.pexels.com/photos/7964693/pexels-photo-7964693.jpeg",
  },
  {
    name: "Maintenance",
    description: "Is your website moving somewhere? We'll help you migrate it",
    koreanDescription: "웹사이트 이전을 고민 중이세요?",
    image: "https://images.pexels.com/photos/4245911/pexels-photo-4245911.jpeg",
  },
  {
    name: "Maintenance",
    description: "Bug Fixing",
    koreanDescription: "버그 수정",
    image: "https://images.pexels.com/photos/9562708/pexels-photo-9562708.jpeg",
  },
  {
    name: "Maintenance",
    description: "Feature Updates",
    koreanDescription: "기능 추가",
    image: "https://images.pexels.com/photos/11372623/pexels-photo-11372623.jpeg",
  },
  {
    name: "Additional",
    description: "Make your customers happy with AI",
    koreanDescription: "AI를 연동해서 고객 만족률을 높이세요",
    image: "https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg",
  },
  {
    name: "Additional",
    description: "UI/UX Design that shows your brand identity",
    koreanDescription:
      "당신의 브랜드의 정체성을 고객에게 보여주는 UI/UX 디자인",
    image: "https://images.pexels.com/photos/16160251/pexels-photo-16160251.jpeg",
  },
  {
    name: "Additional",
    description: "We help your business find your customer: SEO Optimization",
    koreanDescription: "SEO 최적화 서비스로 고객을 찾아가세요",
    image: "https://images.pexels.com/photos/4340082/pexels-photo-4340082.jpeg",
  },
  {
    name: "Additional",
    description: "Mobile App Development",
    koreanDescription: "모바일 앱 개발",
    image: "https://images.pexels.com/photos/5054355/pexels-photo-5054355.jpeg",
  },
];

export const ServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState("web");

  return (
    <ServiceContext.Provider
      value={{
        selectedService,
        setSelectedService,
        allServices,
        serviceDetails
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};