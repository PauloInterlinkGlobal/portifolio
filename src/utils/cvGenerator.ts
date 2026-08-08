/**
 * @file cvGenerator.ts
 * @description Gerador de Currículo PDF e impressão formatada para Paulo Bunga.
 */

export function triggerCVDownload(lang: 'pt' | 'en' = 'pt') {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(lang === 'pt' ? 'Por favor habilite pop-ups para gerar o CV' : 'Please enable popups to download CV');
    return;
  }

  const cvContent = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Paulo Bunga - ${lang === 'pt' ? 'Desenvolvedor Fullstack CV' : 'Fullstack Developer CV'}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; color: #1e293b; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #00E5FF; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
    .name { font-size: 28px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: -0.5px; }
    .role { font-size: 16px; font-weight: 700; color: #0284c7; margin-top: 4px; }
    .contact-info { font-size: 12px; color: #475569; text-align: right; line-height: 1.6; }
    .section-title { font-size: 15px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 4px; margin: 20px 0 12px 0; letter-spacing: 0.5px; }
    .summary { font-size: 13px; color: #334155; margin-bottom: 15px; text-align: justify; }
    .job { margin-bottom: 16px; }
    .job-header { display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; color: #0f172a; }
    .company { color: #0284c7; }
    .date { font-size: 12px; color: #64748b; font-weight: 600; }
    .job-desc { font-size: 12.5px; color: #334155; margin-top: 4px; }
    .job-bullets { list-style-type: disc; margin-left: 18px; margin-top: 6px; font-size: 12px; color: #475569; }
    .job-bullets li { margin-bottom: 3px; }
    .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 12px; }
    .skill-cat { font-weight: 700; color: #0f172a; }
    .skill-list { color: #475569; }
    .tag { display: inline-block; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 4px; margin-bottom: 4px; border: 1px solid #e2e8f0; }
    @media print {
      body { padding: 0; }
      @page { margin: 15mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="name">PAULO BUNGA</div>
      <div class="role">${lang === 'pt' ? 'DESENVOLVEDOR FULLSTACK' : 'FULLSTACK DEVELOPER'}</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Camama bairro 4 de Abril, Luanda, Angola</div>
    </div>
    <div class="contact-info">
      <div>+244 959 808 056 | +244 927 148 025</div>
      <div>paulobunga16@gmail.com</div>
      <div>github.com/Paulo30Pinto</div>
      <div>linkedin.com/in/paulo30pinto</div>
    </div>
  </div>

  <div class="section-title">${lang === 'pt' ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}</div>
  <div class="summary">
    ${lang === 'pt' 
      ? 'Desenvolvedor Fullstack com 6 anos de experiência na criação de aplicações web e mobile escaláveis e eficientes. Apaixonado por tecnologia, com foco em entregar soluções inovadoras que geram valor para os negócios (Node.js, Express, React, Next.js, React Native, Laravel, PHP, MySQL, PostgreSQL, Docker).' 
      : 'Fullstack Developer with 6 years of experience building scalable, high-performance web and mobile applications. Passionate about technology with a focus on delivering innovative solutions that generate business value.'}
  </div>

  <div class="section-title">${lang === 'pt' ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE'}</div>

  <div class="job">
    <div class="job-header">
      <span>Desenvolvedor Fullstack | <span class="company">Fábrica de Software</span></span>
      <span class="date">2024 - 2025</span>
    </div>
    <div class="job-desc">
      ${lang === 'pt' ? 'Atuação no desenvolvimento de aplicações web e mobile com foco em performance, escalabilidade e segurança.' : 'Developed scalable web and mobile applications focused on performance, scalability, and security.'}
    </div>
    <ul class="job-bullets">
      <li>${lang === 'pt' ? 'Desenvolvimento de APIs RESTful e integração com sistemas externos.' : 'RESTful API development and external system integrations.'}</li>
      <li>${lang === 'pt' ? 'Criação de aplicações web robustas com React.js, Next.js e Tailwind CSS.' : 'Building robust web applications using React.js, Next.js, and Tailwind CSS.'}</li>
      <li>${lang === 'pt' ? 'Desenvolvimento de aplicações mobile multiplataforma com React Native.' : 'Developing cross-platform mobile applications with React Native.'}</li>
      <li>${lang === 'pt' ? 'Implementação de autenticação, autorização JWT, Docker e deploys em servidores.' : 'Implementing JWT auth, authorization, Docker containerization, and server deployments.'}</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span>Desenvolvedor Front-end | <span class="company">Van Soluções</span></span>
      <span class="date">2022 - 2024</span>
    </div>
    <div class="job-desc">
      ${lang === 'pt' ? 'Desenvolvimento de interfaces modernas, responsivas e de alta performance para aplicações web.' : 'Engineered modern, responsive, high-performance web interfaces.'}
    </div>
    <ul class="job-bullets">
      <li>${lang === 'pt' ? 'Construção de componentes reutilizáveis e sistemas de design.' : 'Constructed reusable UI component libraries and design systems.'}</li>
      <li>${lang === 'pt' ? 'Integração com APIs REST e consumo de dados em tempo real.' : 'Integrated REST APIs with real-time data consumption.'}</li>
      <li>${lang === 'pt' ? 'Otimização de performance, acessibilidade e experiência do usuário.' : 'Optimized web performance, accessibility, and user experience.'}</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span>Desenvolvedor Web (WordPress & Laravel) | <span class="company">Kivembasoft</span></span>
      <span class="date">2020 - 2022</span>
    </div>
    <div class="job-desc">
      ${lang === 'pt' ? 'Desenvolvimento de sites institucionais, portais e sistemas web utilizando WordPress e Laravel.' : 'Built institutional websites, portals, and web applications with WordPress and Laravel.'}
    </div>
    <ul class="job-bullets">
      <li>${lang === 'pt' ? 'Criação de temas e plugins personalizados no WordPress.' : 'Custom WordPress theme and plugin development.'}</li>
      <li>${lang === 'pt' ? 'Desenvolvimento de sistemas web com Laravel (MVC, Eloquent, Blade).' : 'Engineered web systems using Laravel (MVC, Eloquent, Blade).'}</li>
      <li>${lang === 'pt' ? 'Integração de sistemas com gateways de pagamento e APIs externas.' : 'Integrated payment gateways and third-party APIs.'}</li>
    </ul>
  </div>

  <div class="section-title">${lang === 'pt' ? 'COMPETÊNCIAS TÉCNICAS' : 'TECHNICAL SKILLS'}</div>
  <div style="margin-top: 8px;">
    <span class="tag">Node.js</span><span class="tag">Express.js</span><span class="tag">React.js</span>
    <span class="tag">Next.js</span><span class="tag">React Native</span><span class="tag">PHP</span>
    <span class="tag">Laravel</span><span class="tag">WordPress</span><span class="tag">MySQL</span>
    <span class="tag">PostgreSQL</span><span class="tag">Docker</span><span class="tag">Git & GitHub</span>
    <span class="tag">APIs RESTful</span><span class="tag">TypeScript</span><span class="tag">Tailwind CSS</span>
  </div>

  <div class="section-title">${lang === 'pt' ? 'FORMAÇÃO ACADÉMICA E CURSOS' : 'EDUCATION & TRAINING'}</div>
  <div style="font-size: 12px; line-height: 1.6;">
    <div><strong>2020 - 2021:</strong> Cursos de Desenvolvimento Web e Mobile (React Native, Next.js, Laravel)</div>
    <div><strong>2019 - 2021:</strong> Informática e Telecomunicações (Universidade Óscar Ribas)</div>
    <div><strong>2010 - 2013:</strong> Ensino Médio em Máquinas e Motor (Escola 17 de Dezembro)</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    }
  </script>
</body>
</html>
  `;

  printWindow.document.write(cvContent);
  printWindow.document.close();
}
