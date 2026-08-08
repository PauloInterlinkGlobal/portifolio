/**
 * @file portfolioData.ts
 * @description Dados completos e bilingues para o portfólio de Paulo Bunga.
 */

import { Project, ExperienceItem, TechSkill, ServiceItem, CertificateItem, AchievementItem, GithubRepo } from '../types';

export const PERSONAL_INFO = {
  name: "PAULO BUNGA",
  title: {
    pt: "DESENVOLVEDOR FULLSTACK",
    en: "FULL STACK DEVELOPER"
  },
  roles: ["Node.js", "React.js", "Laravel", "React Native", "Next.js", "TypeScript", "Docker"],
  location: "Camama, Luanda, Angola",
  email: "paulobunga16@gmail.com",
  phone: "+244 959 808 056",
  altPhone: "+244 927 148 025",
  github: "https://github.com/Paulo30Pinto",
  githubUsername: "Paulo30Pinto",
  linkedin: "https://linkedin.com/in/paulo30pinto",
  whatsapp: "https://wa.me/244959808056",
  bio: {
    pt: "Desenvolvedor Fullstack com 6 anos de experiência na criação de aplicações web e mobile escaláveis e eficientes. Apaixonado por tecnologia, com foco em entregar soluções inovadoras que geram valor para os negócios.",
    en: "Fullstack Developer with 6 years of experience engineering scalable and high-performance web & mobile solutions. Passionate about technology, focused on delivering business value."
  },
  stats: {
    yearsExperience: 6,
    projectsCount: 40,
    technologiesCount: 25,
    githubCommits: 500
  }
};

export const SKILLS_DATA: TechSkill[] = [
  // Frontend
  { name: "React.js", category: "frontend", icon: "Code2", level: 95, color: "#00E5FF", experienceYears: 5 },
  { name: "Next.js", category: "frontend", icon: "Globe", level: 90, color: "#FFFFFF", experienceYears: 4 },
  { name: "TypeScript", category: "frontend", icon: "FileCode2", level: 88, color: "#3178C6", experienceYears: 4 },
  { name: "JavaScript", category: "frontend", icon: "FileCode", level: 95, color: "#F7DF1E", experienceYears: 6 },
  { name: "Tailwind CSS", category: "frontend", icon: "Palette", level: 92, color: "#38BDF8", experienceYears: 4 },
  { name: "HTML5 / CSS3", category: "frontend", icon: "Layout", level: 98, color: "#E34F26", experienceYears: 6 },
  { name: "Bootstrap", category: "frontend", icon: "Boxes", level: 85, color: "#7952B3", experienceYears: 5 },

  // Backend
  { name: "Node.js", category: "backend", icon: "Server", level: 92, color: "#339933", experienceYears: 5 },
  { name: "Express.js", category: "backend", icon: "Cpu", level: 90, color: "#00FF88", experienceYears: 5 },
  { name: "Laravel", category: "backend", icon: "Flame", level: 88, color: "#FF2D20", experienceYears: 4 },
  { name: "PHP", category: "backend", icon: "Binary", level: 85, color: "#777BB4", experienceYears: 5 },
  { name: "WordPress", category: "backend", icon: "Layers", level: 90, color: "#21759B", experienceYears: 5 },
  { name: "REST APIs", category: "backend", icon: "Network", level: 96, color: "#00E5FF", experienceYears: 6 },
  { name: "JWT Auth", category: "backend", icon: "ShieldCheck", level: 90, color: "#6C63FF", experienceYears: 4 },

  // Mobile
  { name: "React Native", category: "mobile", icon: "Smartphone", level: 88, color: "#61DAFB", experienceYears: 4 },
  { name: "Expo", category: "mobile", icon: "AppWindow", level: 85, color: "#000000", experienceYears: 3 },

  // Database
  { name: "MySQL", category: "database", icon: "Database", level: 90, color: "#4479A1", experienceYears: 6 },
  { name: "PostgreSQL", category: "database", icon: "HardDrive", level: 85, color: "#4169E1", experienceYears: 3 },
  { name: "MongoDB", category: "database", icon: "FolderGit2", level: 80, color: "#47A248", experienceYears: 3 },

  // DevOps & Tools
  { name: "Docker", category: "devops", icon: "Container", level: 82, color: "#2496ED", experienceYears: 3 },
  { name: "Git & GitHub", category: "tools", icon: "GitBranch", level: 95, color: "#F05032", experienceYears: 6 },
  { name: "Linux / Bash", category: "devops", icon: "Terminal", level: 85, color: "#FCC624", experienceYears: 4 }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Fábrica de Software",
    role: {
      pt: "Desenvolvedor Fullstack",
      en: "Full Stack Developer"
    },
    period: "2024 - 2025",
    location: "Luanda, Angola",
    description: {
      pt: "Atuação no desenvolvimento de aplicações web e mobile escaláveis e seguras com foco em alta performance, arquitetura limpa e entrega contínua.",
      en: "Engineered scalable and secure web and mobile applications focused on high performance, clean architecture, and continuous integration."
    },
    highlights: {
      pt: [
        "Desenvolvimento de APIs RESTful de alto throughput e integração com ecossistemas externos.",
        "Criação de portais e ecossistemas web com React.js, Next.js e Tailwind CSS.",
        "Desenvolvimento de aplicações mobile nativas/híbridas com React Native para iOS e Android.",
        "Conteinerização de ambientes com Docker e implementação de fluxos de CI/CD."
      ],
      en: [
        "Designed high-throughput RESTful APIs and seamless third-party service integrations.",
        "Architected modern web apps using React.js, Next.js, and Tailwind CSS.",
        "Developed cross-platform mobile solutions using React Native for iOS & Android.",
        "Implemented Docker containers and automated CI/CD deployment pipelines."
      ]
    },
    technologies: ["Node.js", "Express.js", "React.js", "Next.js", "React Native", "MySQL", "PostgreSQL", "Docker", "Git"],
    type: "fulltime"
  },
  {
    id: "exp-2",
    company: "Van Soluções",
    role: {
      pt: "Desenvolvedor Front-end",
      en: "Front-end Developer"
    },
    period: "2022 - 2024",
    location: "Luanda, Angola",
    description: {
      pt: "Desenvolvimento de interfaces modernas, responsivas e de alta performance para sistemas empresariais com sincronização em tempo real.",
      en: "Built modern, responsive, and high-performance web interfaces for corporate platforms with real-time sync."
    },
    highlights: {
      pt: [
        "Construção de componentes reutilizáveis baseados em Design System com Tailwind CSS e React.",
        "Consumo de dados em tempo real através de APIs RESTful otimizadas.",
        "Aumento expressivo na pontuação do Google Lighthouse (SEO, Acessibilidade e Performance)."
      ],
      en: [
        "Constructed reusable UI component libraries based on clean design systems.",
        "Handled complex client-side state and real-time REST API synchronization.",
        "Boosted web application performance and Lighthouse speed metrics by 40%."
      ]
    },
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Git"],
    type: "fulltime"
  },
  {
    id: "exp-3",
    company: "Kivembasoft",
    role: {
      pt: "Desenvolvedor Web (WordPress & Laravel)",
      en: "Web Developer (WordPress & Laravel)"
    },
    period: "2020 - 2022",
    location: "Luanda, Angola",
    description: {
      pt: "Desenvolvimento de sites institucionais, portais governamentais e sistemas web customizados utilizando ecossistemas PHP avançados.",
      en: "Created corporate portals, institutional websites, and custom web applications utilizing PHP frameworks."
    },
    highlights: {
      pt: [
        "Criação de temas e plugins customizados sob medida no WordPress.",
        "Desenvolvimento de plataformas web dinâmicas em Laravel (MVC, Eloquent ORM, Blade).",
        "Integração de sistemas com gateways de pagamento locais e internacionais."
      ],
      en: [
        "Developed custom bespoke WordPress themes and plugins from scratch.",
        "Built full-featured web applications using Laravel MVC, Eloquent ORM, and Blade.",
        "Integrated payment gateways and custom REST endpoints."
      ]
    },
    technologies: ["WordPress", "Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
    type: "fulltime"
  },
  {
    id: "exp-4",
    company: "TechSolutions Angola",
    role: {
      pt: "Assistente de TI & Suporte Técnico",
      en: "IT Assistant & Technical Support"
    },
    period: "2019 - 2020",
    location: "Luanda, Angola",
    description: {
      pt: "Suporte técnico especializado, administração de redes locais e gerenciamento de infraestrutura computacional.",
      en: "Provided specialized technical support, network administration, and hardware maintenance."
    },
    highlights: {
      pt: [
        "Diagnóstico e resolução de problemas complexos de hardware e software.",
        "Configuração de servidores locais, controle de acessos e segurança da informação."
      ],
      en: [
        "Diagnosed and resolved hardware/software network issues.",
        "Managed local server infrastructure, access controls, and backups."
      ]
    },
    technologies: ["Redes", "Hardware", "Linux", "Windows Server", "Manutenção"],
    type: "fulltime"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "aura-cloud-erp",
    title: "AuraCloud Enterprise ERP",
    subtitle: {
      pt: "Plataforma de Gestão Empresarial Multitenant",
      en: "Multitenant Enterprise ERP System"
    },
    description: {
      pt: "Sistema completo de gestão corporativa com emissão de faturas, controle de estoque em tempo real e analytics financeiro.",
      en: "Comprehensive enterprise management platform with automated invoicing, real-time stock control, and financial analytics."
    },
    longDescription: {
      pt: "AuraCloud é uma plataforma SaaS fullstack projetada para otimizar operações corporativas. Possui painel analítico dinâmico, relatórios em PDF com assinatura digital, suporte multitenant com controle de permissões por perfil, além de sincronização offline-first para módulos industriais.",
      en: "AuraCloud is a fullstack SaaS platform built to streamline corporate operations. Features a dynamic analytical dashboard, PDF reports with digital signatures, multitenant role-based access control, and offline-first sync for industrial modules."
    },
    category: "fullstack",
    technologies: ["Laravel 11", "React.js", "Tailwind CSS", "PostgreSQL", "Docker", "REST API"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/Paulo30Pinto/AuraCloud-ERP",
    demoUrl: "https://auracloud-demo.vercel.app",
    featured: true,
    metrics: {
      pt: "Processamento de +50k transações/mês com latência <120ms",
      en: "Processes +50k monthly transactions with <120ms latency"
    },
    architectureDiagram: ["React / Vite UI", "Laravel REST API", "PostgreSQL Cluster", "Docker Container"]
  },
  {
    id: "pulse-pay-gateway",
    title: "PulsePay Financial Gateway",
    subtitle: {
      pt: "Hub de Pagamentos Eletrônicos & APIs REST",
      en: "Payment Gateway Hub & REST Services"
    },
    description: {
      pt: "Microsserviço de pagamentos de alta disponibilidade com webhooks seguros, autenticação JWT e criptografia AES-256.",
      en: "High-availability payment microservice featuring secure webhooks, JWT authentication, and AES-256 encryption."
    },
    longDescription: {
      pt: "Desenvolvido em Node.js e Express.js para conectar estabelecimentos comerciais a gateways bancários em Angola. Suporta processamento assíncrono de eventos, conciliação bancária automática e painel administrativo em Next.js com gráficos em tempo real.",
      en: "Engineered in Node.js and Express.js to bridge merchants with banking gateways in Angola. Features asynchronous event processing, automated reconciliation, and an interactive Next.js admin portal."
    },
    category: "backend",
    technologies: ["Node.js", "Express.js", "Next.js", "MySQL", "JWT", "REST API"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/Paulo30Pinto/PulsePay-Gateway",
    demoUrl: "https://pulsepay-gateway.verce.app",
    featured: true,
    metrics: {
      pt: "99.99% Uptime com arquitetura assíncrona em Node.js",
      en: "99.99% Uptime powered by asynchronous Node.js engine"
    }
  },
  {
    id: "nova-mobile-app",
    title: "NovaMobile Mobile Banking & Wallet",
    subtitle: {
      pt: "Aplicativo Mobile Multiplataforma (iOS & Android)",
      en: "Cross-Platform Mobile Banking App"
    },
    description: {
      pt: "Carteira digital e serviços financeiros na palma da mão com autenticação biométrica e transferências instantâneas.",
      en: "Digital wallet and mobile banking app featuring biometric login, QR code payments, and instant transfers."
    },
    longDescription: {
      pt: "Criado em React Native e Expo com animações fluidas a 60fps, suporte a tema escuro/claro, notificações push em tempo real e modo offline. Integrado via APIs RESTful a um backend Node.js resiliente.",
      en: "Crafted with React Native and Expo delivering silky 60fps animations, dark/light theme switching, real-time push notifications, and offline capabilities connected to a Node.js REST backend."
    },
    category: "mobile",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/Paulo30Pinto/NovaMobile-Wallet",
    featured: true,
    metrics: {
      pt: "+10k downloads na Google Play e App Store",
      en: "+10k downloads on Google Play & App Store"
    }
  },
  {
    id: "kivemba-commerce",
    title: "Kivemba Custom Commerce Engine",
    subtitle: {
      pt: "Plataforma E-commerce & Plugin WordPress Sob Medida",
      en: "Custom E-commerce Engine & WordPress Plugin"
    },
    description: {
      pt: "Solução e-commerce customizada com integração de estoque, pagamentos locais e carregamento ultrarrápido.",
      en: "Custom e-commerce solution with integrated stock management, local payment options, and sub-second load times."
    },
    longDescription: {
      pt: "Desenvolvido em PHP e WordPress com plugin proprietário customizado para calcular frete e impostos locais em Angola, otimizado para motores de busca (SEO) e alta retenção de usuários.",
      en: "Engineered with PHP and WordPress featuring a proprietary custom plugin for tax and local shipping calculations in Angola, SEO optimized for high conversion."
    },
    category: "wordpress",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "REST API"],
    image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/Paulo30Pinto/Kivemba-Commerce",
    demoUrl: "https://kivemba-demo.com",
    featured: false
  },
  {
    id: "angola-tech-portal",
    title: "Angola CyberNet Community Portal",
    subtitle: {
      pt: "Plataforma Comunitária de Tecnologia e Notícias",
      en: "Tech Community & News Platform"
    },
    description: {
      pt: "Portal de notícias de tecnologia e fórum de desenvolvedores com renderização SSR em Next.js.",
      en: "Technology news portal and developer discussion hub with Next.js Server-Side Rendering."
    },
    longDescription: {
      pt: "Plataforma comunitária construída com Next.js 14, TypeScript e Tailwind CSS. Inclui sistema de comentários com moderação, busca com indexação em tempo real e sistema de autorias com estatísticas.",
      en: "Community hub built with Next.js 14, TypeScript, and Tailwind CSS. Features moderated comments, real-time search indexing, and author analytics."
    },
    category: "frontend",
    technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "REST API"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/Paulo30Pinto/Angola-CyberNet",
    demoUrl: "https://angolacybernet.dev",
    featured: false
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack-dev",
    title: {
      pt: "Desenvolvimento Fullstack",
      en: "Full Stack Development"
    },
    description: {
      pt: "Criação de ecossistemas web e mobile modernos e escaláveis, da arquitetura do banco de dados ao design da interface.",
      en: "End-to-end modern web and mobile solutions, from database architecture to responsive UI design."
    },
    icon: "LayoutGrid",
    features: {
      pt: [
        "Aplicações SPA e SSR com React.js & Next.js",
        "Backends robustos em Node.js, Express & Laravel",
        "Bancos de dados relacionais e otimização de queries",
        "Conteinerização com Docker e hospedagem Cloud"
      ],
      en: [
        "SPA & SSR Applications with React.js & Next.js",
        "Robust backends in Node.js, Express & Laravel",
        "Relational database design & query tuning",
        "Docker containerization & Cloud hosting"
      ]
    },
    techList: ["Node.js", "React", "Next.js", "Laravel", "MySQL"]
  },
  {
    id: "mobile-apps",
    title: {
      pt: "Aplicações Mobile React Native",
      en: "React Native Mobile Apps"
    },
    description: {
      pt: "Desenvolvimento de aplicativos multiplataforma (iOS e Android) com performance nativa e animações de 60fps.",
      en: "Cross-platform mobile applications for iOS & Android with native feel and smooth 60fps animations."
    },
    icon: "Smartphone",
    features: {
      pt: [
        "Código único para iOS e Android com React Native",
        "Suporte a funcionalidades nativas (Câmera, GPS, Biometria)",
        "Sincronização offline-first e Notificações Push",
        "Publicação e preparação para Google Play & App Store"
      ],
      en: [
        "Single codebase for iOS & Android with React Native",
        "Native hardware features (Camera, GPS, Biometrics)",
        "Offline-first sync & real-time Push Notifications",
        "App store deployment & submission ready"
      ]
    },
    techList: ["React Native", "Expo", "TypeScript", "REST API"]
  },
  {
    id: "api-backend",
    title: {
      pt: "APIs RESTful & Microsserviços",
      en: "RESTful APIs & Backend Architecture"
    },
    description: {
      pt: "Projetamento e construção de APIs seguras, de alta disponibilidade e com documentação clara para integração.",
      en: "Designing secure, high-throughput REST APIs and microservices with comprehensive documentation."
    },
    icon: "Server",
    features: {
      pt: [
        "Autenticação segura via JWT, OAuth2 & Sessions",
        "Arquitetura de Microsserviços e Webhooks",
        "Integração com gateways de pagamento locais/globais",
        "Documentação interativa com Swagger / Postman"
      ],
      en: [
        "Secure JWT, OAuth2 & Session management",
        "Microservices & Webhook event architecture",
        "Payment gateway & external API integration",
        "Interactive Swagger / Postman API docs"
      ]
    },
    techList: ["Express.js", "Node.js", "Laravel", "PostgreSQL"]
  },
  {
    id: "wordpress-laravel",
    title: {
      pt: "Sistemas Laravel & WordPress Sob Medida",
      en: "Tailored Laravel & WordPress Systems"
    },
    description: {
      pt: "Desenvolvimento de temas, plugins e plataformas personalizadas que atendem exatamente ao modelo do seu negócio.",
      en: "Bespoke theme and plugin engineering alongside high-complexity web platforms built on PHP."
    },
    icon: "Boxes",
    features: {
      pt: [
        "Plugins e temas proprietários para WordPress sem inchaço",
        "Sistemas administrativos complexos em Laravel (MVC)",
        "Otimização extrema de SEO e tempos de carregamento",
        "Migração segura de bancos de dados e conteúdos"
      ],
      en: [
        "Lightweight bespoke WordPress themes & plugins",
        "Enterprise administrative systems in Laravel",
        "Extreme SEO optimization and sub-second loading",
        "Secure database and content migrations"
      ]
    },
    techList: ["Laravel", "WordPress", "PHP", "MySQL"]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "ach-1",
    title: {
      pt: "Integração de Sistemas Escaláveis",
      en: "Scalable System Integration"
    },
    description: {
      pt: "Desenvolvimento e consumo de APIs RESTful seguras e escaláveis, otimizando a comunicação entre servidores.",
      en: "Engineering secure and scalable RESTful APIs optimizing server-to-server intercommunications."
    },
    metric: "99.9%",
    metricLabel: {
      pt: "Taxa de Sucesso em Requisições",
      en: "API Success Rate"
    },
    icon: "Network"
  },
  {
    id: "ach-2",
    title: {
      pt: "Desenvolvimento à Medida",
      en: "Bespoke Software Engineering"
    },
    description: {
      pt: "Criação de soluções personalizadas em Laravel, temas e plugins WordPress para resolver necessidades específicas.",
      en: "Crafting tailored solutions in Laravel and WordPress custom engines solving complex business needs."
    },
    metric: "40+",
    metricLabel: {
      pt: "Sistemas Entregues",
      en: "Custom Platforms Delivered"
    },
    icon: "Code2"
  },
  {
    id: "ach-3",
    title: {
      pt: "Experiência Multidisciplinar",
      en: "Multidisciplinary Track Record"
    },
    description: {
      pt: "Anos acumulados desenvolvendo em Web, Mobile, Banco de Dados, Redes e Gestão de Servidores.",
      en: "6+ Years bridging Web, Mobile, Databases, Cloud Networks, and Server Systems."
    },
    metric: "6+",
    metricLabel: {
      pt: "Anos de Experiência Prática",
      en: "Years Active Experience"
    },
    icon: "Award"
  }
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-1",
    title: {
      pt: "Ensino Médio concluído no curso de Máquinas e Motor",
      en: "High School Diploma in Machinery & Engines"
    },
    institution: "Escola 17 de Dezembro",
    period: "2010 - 2013",
    type: "education",
    details: {
      pt: "Formação técnica sólida em mecânica, motores e fundamentação analítica para resolução de problemas complexos.",
      en: "Solid technical background in mechanics, engines, and systematic analytical problem solving."
    },
    badgeColor: "#00E5FF"
  },
  {
    id: "cert-2",
    title: {
      pt: "Cursos de Desenvolvimento Web e Mobile",
      en: "Web & Mobile Software Development Mastery"
    },
    institution: "Especialização Técnica",
    period: "2020 - 2021",
    type: "certification",
    details: {
      pt: "React Native, Next.js, APIs REST, Laravel, Node.js e Arquitetura de Software.",
      en: "React Native, Next.js, REST APIs, Laravel, Node.js, and Software Architecture."
    },
    badgeColor: "#6C63FF"
  },
  {
    id: "cert-3",
    title: {
      pt: "Informática e Telecomunicações",
      en: "Computer Science & Telecommunications"
    },
    institution: "Universidade Óscar Ribas",
    period: "2019 - 2021",
    type: "education",
    details: {
      pt: "Frequência no curso superior de Informática e Telecomunicações com foco em arquitetura de redes e sistemas de dados.",
      en: "Undergraduate studies in Computer Science & Telecom focusing on networks and data systems."
    },
    badgeColor: "#00FF88"
  },
  {
    id: "cert-4",
    title: {
      pt: "Cursos Complementares de Programação & Banco de Dados",
      en: "Advanced Fullstack & Database Training"
    },
    institution: "Treinamentos Especializados",
    period: "2019 - 2021",
    type: "course",
    details: {
      pt: "HTML5, CSS3, JavaScript ES6+, PHP, MySQL, React, Node.js, Git, Docker, CI/CD, Metodologias Ágeis (Scrum).",
      en: "HTML5, CSS3, JavaScript ES6+, PHP, MySQL, React, Node.js, Git, Docker, Agile Scrum."
    },
    badgeColor: "#FFB800"
  },
  {
    id: "cert-5",
    title: {
      pt: "Formação em Informática, Redes e Manutenção",
      en: "IT Infrastructure, Networking & Maintenance"
    },
    institution: "Centro de Formação Técnica",
    period: "2015 - 2017",
    type: "course",
    details: {
      pt: "Pacote Office, Manutenção Preventiva/Corretiva de Hardware, Redes e Inglês Técnico Intermediário.",
      en: "Office Suite, Hardware Maintenance, Network Administration, Technical English."
    },
    badgeColor: "#38BDF8"
  }
];

export const GITHUB_REPOS_MOCK: GithubRepo[] = [
  {
    name: "AuraCloud-ERP",
    description: "Multitenant Enterprise ERP system built with Laravel 11, React, PostgreSQL and Docker containerization.",
    stars: 38,
    forks: 12,
    language: "PHP / TypeScript",
    url: "https://github.com/Paulo30Pinto",
    updatedAt: "2025-02-10"
  },
  {
    name: "PulsePay-Gateway",
    description: "Financial REST API microservice in Node.js, Express, JWT, and async bank reconciliation engine.",
    stars: 29,
    forks: 8,
    language: "TypeScript",
    url: "https://github.com/Paulo30Pinto",
    updatedAt: "2025-01-28"
  },
  {
    name: "NovaMobile-Wallet",
    description: "Cross-platform Mobile Wallet app engineered with React Native, Expo, and biometric security.",
    stars: 45,
    forks: 15,
    language: "TypeScript",
    url: "https://github.com/Paulo30Pinto",
    updatedAt: "2024-12-15"
  },
  {
    name: "3d-interactive-portfolio",
    description: "Awwwards-inspired futuristic 3D portfolio and interactive resume in React, Three.js, and GSAP.",
    stars: 62,
    forks: 19,
    language: "TypeScript",
    url: "https://github.com/Paulo30Pinto",
    updatedAt: "2025-03-01"
  }
];
