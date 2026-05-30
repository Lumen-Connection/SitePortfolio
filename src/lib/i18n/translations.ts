export const LOCALES = ['pt', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export const LOCALE_LABEL: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
}

export const translations = {
  pt: {
    // Nav
    'nav.home': 'Início',
    'nav.successCases': 'Casos de sucesso',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'nav.lumenAI': 'Lumen AI',
    'nav.contactCta': 'Fale Conosco',
    'nav.openMenu': 'Abrir menu de navegação',
    'nav.closeMenu': 'Fechar menu de navegação',
    'nav.mobileLabel': 'Navegação móvel',
    'nav.mainLabel': 'Navegação principal',
    'nav.goHomeAria': 'Lumen Connection — ir para o início',

    // Hero
    'hero.ctaPrimaryDefault': 'Inicie um Projeto',
    'hero.ctaSecondary': 'Veja Nossos Trabalhos',
    'hero.stats.projectsValue': '+10',
    'hero.stats.projectsLabel': 'Projetos\nEntregues',
    'hero.stats.techValue': '+20',
    'hero.stats.techLabel': 'Tecnologias\nDominadas',
    'hero.stats.dedicationValue': '100%',
    'hero.stats.dedicationLabel': 'Dedicação\nEm Cada Entrega',
    'hero.carousel.previous': 'Slide anterior',
    'hero.carousel.next': 'Próximo slide',
    'hero.carousel.pause': 'Pausar carrossel',
    'hero.carousel.play': 'Reproduzir carrossel',
    'hero.carousel.select': 'Selecionar slide',
    'hero.carousel.label': 'Destaques de serviços',
    'hero.carousel.knowStudio': 'Conheça o Estúdio',
    'hero.carousel.slide': 'Slide',
    'hero.carousel.slideOf': 'de',

    // Sections
    'section.portfolio': 'Portfólio',
    'section.successCases': 'Casos de Sucesso',
    'section.studio': 'Estúdio Digital',
    'section.services': 'Serviços',
    'section.servicesAndProjects': 'Serviços e Projetos',
    'section.allServices': 'Todos os serviços',
    'section.backToAll': 'Voltar para todos os serviços',
    'section.filterByCategory': 'Filtrar por categoria',
    'section.filterBySubcategory': 'Filtrar por subcategoria',

    // Projects section banner
    'projects.banner.title.part1': 'Criado no',
    'projects.banner.title.highlight': 'Blender',
    'projects.banner.body':
      'Explore nosso portfólio diverso de soluções inovadoras criadas com precisão e criatividade.',
    'projects.live.showingCategory': 'Mostrando categoria',
    'projects.live.showingSubcategory': 'subcategoria',
    'projects.live.items': 'itens',
    'projects.live.showingAll': 'Mostrando todos os serviços.',
    'projects.live.categories': 'categorias',
    'projects.categoryAll': 'Todos',

    // Categories (used in filter tabs and as project categories)
    'category.studio': 'Estúdio',
    'category.webDev': 'Desenvolvimento Web',
    'category.softwareDev': 'Desenvolvimento de Software',
    'category.mobileDev': 'Desenvolvimento Mobile',
    'category.videoEditing': 'Edição de Vídeo e Mídia Social',
    'category.design': 'Design Gráfico, Branding e Identidade Visual',
    'category.posters': 'Posters',
    'category.modeling3d': 'Modelagem 3D',
    'category.vfx': 'Edição de VFX',

    // Project item buttons
    'item.viewProject': 'Ver projeto',
    'item.download': 'Download',
    'item.openSource': 'Código Aberto',
    'item.enlarge': 'Ampliar',
    'item.viewGalleryShort': 'Galeria',
    'item.viewGalleryLong': 'Ver Galeria',
    'item.pages': 'Páginas',
    'item.learnMore': 'Saiba mais',
    'item.learnMoreAria': 'Saiba mais sobre',
    'item.viewAria': 'Ver projeto',
    'item.downloadAria': 'Baixar',
    'item.openSourceAria': 'Acessar código aberto de',
    'item.openGalleryAria': 'Abrir galeria de',
    'item.enlargeAria': 'Ampliar imagem de',
    'item.demoVisual': 'Demonstração visual de',
    'item.statsProjectsCompleted': 'Projetos concluídos',

    // About section
    'about.label': 'Sobre Nós',
    'about.intro': 'Um coletivo de desenvolvedores, artistas 3D e estrategistas visuais.',
    'about.pillar1.subtitle': 'O nosso DNA criativo',
    'about.pillar1.body':
      'É o brilho da ideia inicial, a precisão de uma renderização 3D e a estética que torna uma marca inesquecível. Entendemos que o design é o que traz clareza ao mundo digital.',
    'about.pillar2.subtitle': 'A nossa base técnica',
    'about.pillar2.body':
      'Inspirados pela filosofia de construir pontes onde antes havia isolamento, unimos programação, branding e audiovisual para criar ecossistemas que funcionam. Entregamos infraestruturas que conectam sua marca ao público final.',
    'about.quote.part1': '"Nossa missão é simples:',
    'about.quote.highlight1': 'Iluminar conceitos',
    'about.quote.and': 'e',
    'about.quote.highlight2': 'conectar realidades.',
    'about.quote.end': '"',

    // Success cases section
    'successCases.label': 'Estúdio Digital',
    'successCases.title': 'Edição e programação unidas para criar resultados reais.',
    'successCases.body1':
      'Atuamos em dois dos pilares mais importantes da tecnologia moderna: narrativas visuais e desenvolvimento de software.',
    'successCases.body2':
      'Combinamos edição profissional e código limpo para entregar produtos que escalam e encantam usuários.',
    'successCases.bannerAlt': 'Banner de sucesso',
    'successCases.card1.title': 'Edição & Motion',
    'successCases.card1.body': 'Vídeos, Reels e animações com storytelling pensado para retenção.',
    'successCases.card2.title': 'Experiência Digital',
    'successCases.card2.body':
      'Interfaces rápidas, responsivas e focadas na experiência do usuário.',
    'successCases.card3.title': 'Resultados Mensuráveis',
    'successCases.card3.body': 'Projetos guiados por métricas, conversão e crescimento real.',
    'successCases.casePrefix': 'Case',

    // Success cases modal
    'cases.youtubeLabel': 'Edição · YouTube',
    'cases.webDevLabel': 'Desenvolvimento · Web',
    'cases.watchYoutube': 'Assistir no YouTube',
    'cases.visitSite': 'Visitar Site',
    'cases.close': 'Fechar',
    'cases.closeAria': 'Fechar caso de sucesso',
    'cases.youtubeDescription.part1': 'O vídeo do canal',
    'cases.youtubeDescription.channel': 'Universo Nerdístico Studios',
    'cases.youtubeDescription.part2':
      'foi realizado através de um trabalho de edição profissional utilizando o',
    'cases.youtubeDescription.tool': 'Adobe Premiere Pro',
    'cases.youtubeDescription.part3':
      ', com um estilo de edição altamente dinâmico pensado estrategicamente para entreter e prender a atenção dos inscritos do canal do início ao fim.',

    // Lumen AI modal
    'lumenAI.label': 'IA · WhatsApp',
    'lumenAI.title.part1': 'Atendimento inteligente,',
    'lumenAI.title.highlight': 'privado',
    'lumenAI.title.part2': 'e 24/7',
    'lumenAI.intro.before': 'O',
    'lumenAI.intro.brand': 'Lumen AI',
    'lumenAI.intro.middle':
      'integra uma inteligência artificial local diretamente ao WhatsApp da sua empresa. O bot entende o que o cliente fala de forma conversacional, como',
    'lumenAI.exampleMessage': '"tem vaga na próxima semana para um corte?"',
    'lumenAI.intro.end':
      ', interpreta o pedido, verifica a disponibilidade e confirma o horário com naturalidade.',
    'lumenAI.highlight.conversation.title': 'Conversação Natural',
    'lumenAI.highlight.conversation.body':
      'IA que entende intenção e contexto, com agendamentos sem menus rígidos.',
    'lumenAI.highlight.privacy.title': 'Privacidade Total',
    'lumenAI.highlight.privacy.body':
      'Modelos executados em infraestruturas no seu controle.',
    'lumenAI.highlight.availability.title': 'Disponível 24/7',
    'lumenAI.highlight.availability.body':
      'Respostas precisas a qualquer hora, reduzindo abandono de atendimento.',
    'lumenAI.footer':
      'Ideal para salões, clínicas, consultórios, academias, oficinas e qualquer negócio que transforme conversas em agendamentos. Toda a infraestrutura roda em servidor próprio com modelos de IA de 4B a 128B parâmetros, integrados via n8n e WAHA.',
    'lumenAI.cta': 'Quero conhecer o Lumen AI',
    'lumenAI.ctaMessage': 'Olá, gostaria de saber mais sobre o Lumen AI',
    'lumenAI.close': 'Fechar',
    'lumenAI.closeAria': 'Fechar Lumen AI',
    'lumenAI.knowMore': 'Conheça Lumen AI',

    // Desktop only modal
    'desktopOnly.badge': 'Windows · Desktop',
    'desktopOnly.titlePrefix': '',
    'desktopOnly.titleSuffix': 'é um app nativo para PC',
    'desktopOnly.body.intro': 'Notamos que você está em um dispositivo móvel.',
    'desktopOnly.body.middle': 'foi criado exclusivamente para',
    'desktopOnly.body.platform': 'Windows',
    'desktopOnly.body.and': 'e não possui versão para',
    'desktopOnly.android': 'Android',
    'desktopOnly.iosLabel': 'iOS',
    'desktopOnly.body.or': 'ou',
    'desktopOnly.copyHint':
      'Copie o link de download abaixo e abra em um computador Windows para instalar o aplicativo.',
    'desktopOnly.copyLink': 'Copiar link de download',
    'desktopOnly.linkCopied': 'Link copiado',
    'desktopOnly.downloadAnyway': 'Baixar mesmo assim',
    'desktopOnly.close': 'Fechar',
    'desktopOnly.closeAria': 'Fechar aviso',

    // Gallery
    'gallery.page': 'Página',
    'gallery.pageAria': 'página',
    'gallery.of': 'de',
    'gallery.close': 'Fechar galeria',
    'gallery.prev': 'Página anterior',
    'gallery.next': 'Próxima página',
    'gallery.selectPage': 'Selecionar página',
    'gallery.goToPage': 'Ir para página',

    // PWA install
    'pwa.title': 'Adicione à tela inicial',
    'pwa.body':
      'Instale a Lumen Connection para acesso rápido, modo offline e experiência como app nativo.',
    'pwa.iosInstructions.tap': 'Toque em',
    'pwa.iosShare': 'Compartilhar',
    'pwa.iosInstructions.then': 'e depois em',
    'pwa.iosAdd': 'Adicionar à Tela de Início',
    'pwa.install': 'Instalar',
    'pwa.notNow': 'Agora não',
    'pwa.dismissAria': 'Dispensar prompt de instalação',

    // CTA section
    'cta.label': 'Vamos começar',
    'cta.title.part1': 'Pronto para o seu próximo',
    'cta.title.highlight': 'sucesso',
    'cta.title.end': '?',
    'cta.body':
      'Transformamos sua visão em realidade — de uma identidade visual marcante a um sistema digital completo.',
    'cta.start': 'Iniciar Um Projeto',
    'cta.portfolio': 'Ver Portfólio',

    // Contact section
    'contact.label': 'Contato',
    'contact.title.part1': 'Fale com a',
    'contact.title.highlight': 'Lumen Connection',
    'contact.body':
      'O canal direto com o estúdio. Conheça a equipe abaixo e entre em contato pelo nosso canal oficial para discutir seu projeto.',
    'contact.studioName': 'Lumen Connection',
    'contact.studioTagline': 'Estúdio de Engenharia Digital e Produção Visual',
    'contact.callNow': 'Falar Agora',
    'contact.meetTeam': 'Conheça a Equipe',
    'contact.whatsappAria': 'Falar com Lumen Connection no WhatsApp, número +55',
    'team.role.matheus': 'Desenvolvedor de Software | DevOps | Editor de Vídeo',
    'team.role.gabriel': 'Editor de Vídeo | Designer Gráfico | Artista 3D',
    'team.role.luiz': 'Desenvolvedor de Software',

    // Footer
    'footer.tagline':
      'Estúdio digital que une engenharia de software e produção visual de alta fidelidade.',
    'footer.contact': 'Entre em contato',
    'footer.emailAria': 'Enviar e-mail para',
    'footer.whatsappAria': 'Falar no WhatsApp pelo número',
    'footer.copyright': '🄯 2026 Lumen Connection',

    // Language switcher
    'lang.label': 'Idioma',
    'lang.switchTo': 'Mudar para',

    // Project category card / hero subtitle
    'project.studio.description':
      'O elo vital entre engenharia digital e estética visual. Da luz que ilumina ideias ao conceitos que conecta mundos.',
    'project.studio.subtitle': 'Engenharia de Software · Produção Digital de Alta Fidelidade',
    'project.webDev.description':
      'Trabalhamos com linguagens e frameworks como JavaScript, React, Python, Java, C#, Next.js, Tailwind, HTML, CSS, e muito mais',
    'project.softwareDev.description': 'Desenvolvimento nativo eficiente com Rust, C++, WinUI, Qt e Razor',
    'project.mobileDev.description':
      'Criação rápida usando frameworks como Flutter, React Native e Kotlin',
    'project.videoEditing.description':
      'Edição profissional de vídeos com Adobe Premiere Pro, After Effects e Blender — incluindo conteúdo para YouTube, reels, stories e outras mídias sociais',
    'project.design.description':
      'Design de logos, banners, cartões de visitas e outros materiais gráficos para empresas e indivíduos',
    'project.posters.description':
      'Criação de posters artísticos e ilustrações digitais com identidade visual marcante',
    'project.modeling3d.description':
      'Modelagem, texturização e renderização 3D com Blender, incluindo personagens, cenários e objetos',
    'project.vfx.description':
      'Criação de efeitos visuais com After Effects, Blender e outras ferramentas profissionais de VFX',

    // Common
    'common.comingSoon': 'Em breve',
    'common.comingSoonAlt': 'Em Breve',

    // Accessibility widget
    'a11y.openMenu': 'Abrir menu de acessibilidade',
    'a11y.closeMenu': 'Fechar menu de acessibilidade',
    'a11y.panelLabel': 'Recursos de acessibilidade',
    'a11y.title': 'Acessibilidade',
    'a11y.close': 'Fechar',
    'a11y.group.textSize': 'Tamanho do texto',
    'a11y.group.contrast': 'Temas de contraste',
    'a11y.group.vision': 'Visão',
    'a11y.group.screenReader': 'Leitor de tela',
    'a11y.group.colorBlind': 'Daltonismo',
    'a11y.group.libras': 'Libras',
    'a11y.decreaseText': 'Diminuir tamanho do texto',
    'a11y.increaseText': 'Aumentar tamanho do texto',
    'a11y.contrastSelectLabel': 'Selecionar tema de contraste',
    'a11y.colorBlindFilterLabel': 'Filtro de daltonismo',
    'a11y.theme.none.label': 'Nenhum',
    'a11y.theme.none.description': 'Tema padrão do site',
    'a11y.theme.aquatic.label': 'Aquáticos',
    'a11y.theme.aquatic.description': 'Fundo preto, acentos ciano',
    'a11y.theme.desert.label': 'Deserto',
    'a11y.theme.desert.description': 'Fundo creme, texto escuro',
    'a11y.theme.dusk.label': 'Entardecer',
    'a11y.theme.dusk.description': 'Fundo grafite, acentos âmbar',
    'a11y.theme.nightsky.label': 'Céu noturno',
    'a11y.theme.nightsky.description': 'Fundo preto, acentos lavanda',
    'a11y.underlineLinks': 'Sublinhar links',
    'a11y.pauseAnimations': 'Pausar animações',
    'a11y.screenReaderMode': 'Modo leitor de tela',
    'a11y.screenReaderHint':
      'Reforça foco visível, pausa animações, sublinha links, desativa autoplay do carrossel e amplia anúncios para leitores de tela (NVDA, JAWS, VoiceOver, TalkBack).',
    'a11y.colorBlind.none': 'Nenhum',
    'a11y.colorBlind.protanopia': 'Protanopia (vermelho)',
    'a11y.colorBlind.deuteranopia': 'Deuteranopia (verde)',
    'a11y.colorBlind.tritanopia': 'Tritanopia (azul)',
    'a11y.colorBlind.achromatopsia': 'Acromatopsia (tons de cinza)',
    'a11y.libras.toggle': 'Tradução em Libras (VLibras)',
    'a11y.libras.hint':
      'O ícone do VLibras aparecerá na tela. Clique nele para abrir o tradutor.',
    'a11y.restoreDefaults': 'Restaurar padrões',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.successCases': 'Success Stories',
    'nav.projects': 'Projects',
    'nav.contact': 'Contacts',
    'nav.lumenAI': 'Lumen AI',
    'nav.contactCta': 'Contact Us',
    'nav.openMenu': 'Open navigation menu',
    'nav.closeMenu': 'Close navigation menu',
    'nav.mobileLabel': 'Mobile navigation',
    'nav.mainLabel': 'Main navigation',
    'nav.goHomeAria': 'Lumen Connection — go to home',

    // Hero
    'hero.ctaPrimaryDefault': 'Start a Project',
    'hero.ctaSecondary': 'See Our Work',
    'hero.stats.projectsValue': '+10',
    'hero.stats.projectsLabel': 'Projects\nDelivered',
    'hero.stats.techValue': '+20',
    'hero.stats.techLabel': 'Technologies\nMastered',
    'hero.stats.dedicationValue': '100%',
    'hero.stats.dedicationLabel': 'Dedication\nIn Every Delivery',
    'hero.carousel.previous': 'Previous slide',
    'hero.carousel.next': 'Next slide',
    'hero.carousel.pause': 'Pause carousel',
    'hero.carousel.play': 'Play carousel',
    'hero.carousel.select': 'Select slide',
    'hero.carousel.label': 'Service highlights',
    'hero.carousel.knowStudio': 'Meet the members',
    'hero.carousel.slide': 'Slide',
    'hero.carousel.slideOf': 'of',

    // Sections
    'section.portfolio': 'Portfolio',
    'section.successCases': 'Success Stories',
    'section.studio': 'Digital Studio',
    'section.services': 'Services',
    'section.servicesAndProjects': 'Services & Projects',
    'section.allServices': 'All services',
    'section.backToAll': 'Back to all services',
    'section.filterByCategory': 'Filter by category',
    'section.filterBySubcategory': 'Filter by subcategory',

    // Projects section banner
    'projects.banner.title.part1': 'Built with',
    'projects.banner.title.highlight': 'Blender',
    'projects.banner.body':
      'Explore our diverse portfolio of innovative solutions, crafted with precision and creativity.',
    'projects.live.showingCategory': 'Showing category',
    'projects.live.showingSubcategory': 'subcategory',
    'projects.live.items': 'items',
    'projects.live.showingAll': 'Showing all services.',
    'projects.live.categories': 'categories',
    'projects.categoryAll': 'All',

    // Categories
    'category.studio': 'Studio',
    'category.webDev': 'Web Development',
    'category.softwareDev': 'Native Development',
    'category.mobileDev': 'Mobile Development',
    'category.videoEditing': 'Video Editing & Social Media',
    'category.design': 'Graphic Design, Branding & Visual Identity',
    'category.posters': 'Posters',
    'category.modeling3d': '3D Modeling',
    'category.vfx': 'VFX Editing',

    // Project item buttons
    'item.viewProject': 'View project',
    'item.download': 'Download',
    'item.openSource': 'Open Source',
    'item.enlarge': 'Enlarge',
    'item.viewGalleryShort': 'Gallery',
    'item.viewGalleryLong': 'View Gallery',
    'item.pages': 'Pages',
    'item.learnMore': 'Learn more',
    'item.learnMoreAria': 'Learn more about',
    'item.viewAria': 'View project',
    'item.downloadAria': 'Download',
    'item.openSourceAria': 'Open source code of',
    'item.openGalleryAria': 'Open gallery of',
    'item.enlargeAria': 'Enlarge image of',
    'item.demoVisual': 'Visual demo of',
    'item.statsProjectsCompleted': 'Projects completed',

    // About section
    'about.label': 'About Us',
    'about.intro': 'A collective of developers, 3D artists and visual strategists.',
    'about.pillar1.subtitle': 'Our creative DNA',
    'about.pillar1.body':
      'It’s the spark of the initial idea, the precision of a 3D render, and the aesthetic that makes a brand unforgettable. We believe design is what brings clarity to the digital world.',
    'about.pillar2.subtitle': 'Our technical foundation',
    'about.pillar2.body':
      'Inspired by the philosophy of \'building bridges\', we combine engineering, branding and audiovisual to create ecosystems that work. We deliver infrastructures that connect your brand to its audience.',
    'about.quote.part1': '"Our mission is simple:',
    'about.quote.highlight1': 'Illuminate ideas',
    'about.quote.and': 'and',
    'about.quote.highlight2': 'connect realities.',
    'about.quote.end': '"',

    // Success cases section
    'successCases.label': 'Digital Studio',
    'successCases.title': 'Editing and engineering, together to drive real results.',
    'successCases.body1':
      'We operate on two essential pillars of modern technology: visual storytelling and software engineering.',
    'successCases.body2':
      'We use professional editing and development to ship products that scale and delight users.',
    'successCases.bannerAlt': 'Success banner',
    'successCases.card1.title': 'Editing & Motion',
    'successCases.card1.body': 'Videos, Reels and animations with storytelling built for retention.',
    'successCases.card2.title': 'Digital Experience',
    'successCases.card2.body':
      'Fast, responsive interfaces designed around the user experience.',
    'successCases.card3.title': 'Measurable Results',
    'successCases.card3.body': 'Projects guided by metrics, conversion and real growth.',
    'successCases.casePrefix': 'Case',

    // Success cases modal
    'cases.youtubeLabel': 'Editing · YouTube',
    'cases.webDevLabel': 'Development · Web',
    'cases.watchYoutube': 'Watch on YouTube',
    'cases.visitSite': 'Visit Site',
    'cases.close': 'Close',
    'cases.closeAria': 'Close success case',
    'cases.youtubeDescription.part1': 'The video on the',
    'cases.youtubeDescription.channel': 'Universo Nerdístico Studios',
    'cases.youtubeDescription.part2':
      'channel was crafted with professional editing in',
    'cases.youtubeDescription.tool': 'Adobe Premiere Pro',
    'cases.youtubeDescription.part3':
      ', with a highly dynamic style designed to keep the channel’s audience engaged from start to finish.',

    // Lumen AI modal
    'lumenAI.label': 'AI · WhatsApp',
    'lumenAI.title.part1': 'Smart,',
    'lumenAI.title.highlight': 'private',
    'lumenAI.title.part2': 'and 24/7 support',
    'lumenAI.intro.before': '',
    'lumenAI.intro.brand': 'Lumen AI',
    'lumenAI.intro.middle':
      'is a fully local AI service that connects straight into your company’s WhatsApp. The bot understands customers conversationally — like',
    'lumenAI.exampleMessage': '"any opening next week for a haircut?"',
    'lumenAI.intro.end':
      ' — interpreting the request, checking availability and confirming the appointment naturally.',
    'lumenAI.highlight.conversation.title': 'Natural Conversation',
    'lumenAI.highlight.conversation.body':
      'AI that understands intent and context — no rigid menus required.',
    'lumenAI.highlight.privacy.title': 'Total Privacy',
    'lumenAI.highlight.privacy.body':
      'Models run on infrastructure you have total control over.',
    'lumenAI.highlight.availability.title': '24/7 Availability',
    'lumenAI.highlight.availability.body':
      'Accurate replies at any hour, dropping customer abandonment rates.',
    'lumenAI.footer':
      'Made for salons, clinics, gyms, workshops, and any business that turns conversations into appointments. Runs on your own server with AI models from 4B to 128B parameters, integrated via n8n and WAHA.',
    'lumenAI.cta': 'Tell me more about Lumen AI',
    'lumenAI.ctaMessage': 'Hi, I’d like to learn more about Lumen AI',
    'lumenAI.close': 'Close',
    'lumenAI.closeAria': 'Close Lumen AI',
    'lumenAI.knowMore': 'Discover Lumen AI',

    // Desktop only modal
    'desktopOnly.badge': 'Windows · Desktop',
    'desktopOnly.titlePrefix': '',
    'desktopOnly.titleSuffix': 'is a native PC app',
    'desktopOnly.body.intro': 'Looks like you’re on a mobile device.',
    'desktopOnly.body.middle': 'was built exclusively for',
    'desktopOnly.body.platform': 'Windows',
    'desktopOnly.body.and': 'and isn’t available on',
    'desktopOnly.android': 'Android',
    'desktopOnly.iosLabel': 'iOS',
    'desktopOnly.body.or': 'or',
    'desktopOnly.copyHint':
      'Copy the download link below and open it on a Windows computer to install the app.',
    'desktopOnly.copyLink': 'Copy download link',
    'desktopOnly.linkCopied': 'Link copied',
    'desktopOnly.downloadAnyway': 'Download anyway',
    'desktopOnly.close': 'Close',
    'desktopOnly.closeAria': 'Close warning',

    // Gallery
    'gallery.page': 'Page',
    'gallery.pageAria': 'page',
    'gallery.of': 'of',
    'gallery.close': 'Close gallery',
    'gallery.prev': 'Previous page',
    'gallery.next': 'Next page',
    'gallery.selectPage': 'Select page',
    'gallery.goToPage': 'Go to page',

    // PWA install
    'pwa.title': 'Add to home screen',
    'pwa.body':
      'Install Lumen Connection for quick access, offline mode, and a native app-like experience.',
    'pwa.iosInstructions.tap': 'Tap',
    'pwa.iosShare': 'Share',
    'pwa.iosInstructions.then': 'and then',
    'pwa.iosAdd': 'Add to Home Screen',
    'pwa.install': 'Install',
    'pwa.notNow': 'Not now',
    'pwa.dismissAria': 'Dismiss install prompt',

    // CTA section
    'cta.label': 'Let’s get started',
    'cta.title.part1': 'Ready for your next',
    'cta.title.highlight': 'breakthrough',
    'cta.title.end': '?',
    'cta.body':
      'We turn your vision into reality — from a striking visual identity to a complete digital system.',
    'cta.start': 'Start a Project',
    'cta.portfolio': 'See Portfolio',

    // Contact section
    'contact.label': 'Contact',
    'contact.title.part1': 'Talk to',
    'contact.title.highlight': 'Lumen Connection',
    'contact.body':
      'The direct line to the studio. Meet the team below and reach out through our official channel to discuss your project.',
    'contact.studioName': 'Lumen Connection',
    'contact.studioTagline': 'Digital Engineering & Visual Production Studio',
    'contact.callNow': 'Talk Now',
    'contact.meetTeam': 'Meet the Team',
    'contact.whatsappAria': 'Message Lumen Connection on WhatsApp, number +55',
    'team.role.matheus': 'Software Developer | DevOps | Video Editor',
    'team.role.gabriel': 'Video Editor | Graphic Designer | 3D Artist',
    'team.role.luiz': 'Software Developer',

    // Footer
    'footer.tagline':
      'Digital studio combining software engineering and high-fidelity visual production.',
    'footer.contact': 'Contact Us',
    'footer.emailAria': 'Send email to',
    'footer.whatsappAria': 'Message on WhatsApp at',
    'footer.copyright': '🄯 2026 Lumen Connection',

    // Language switcher
    'lang.label': 'Language',
    'lang.switchTo': 'Switch to',

    // Project category card / hero subtitle
    'project.studio.description':
      'The missing link between digital engineering and visual aesthetics. From the light of an idea we make bridges that connect worlds.',
    'project.studio.subtitle': 'Software Engineering · High-Fidelity Digital Production',
    'project.webDev.description':
      'We work with languages and frameworks like JavaScript, React, Python, Java, C#, Next.js, Tailwind, HTML, CSS, and much more',
    'project.softwareDev.description': 'Native, optimized development for targeted systems using Rust, C++, WinUI, Qt and Razor',
    'project.mobileDev.description':
      'Efficient, targeted development with frameworks like Flutter, React Native and Kotlin',
    'project.videoEditing.description':
      'Professional video editing with Adobe Premiere Pro, After Effects and Blender — including YouTube content, Reels, stories and other social media formats',
    'project.design.description':
      'Logos, banners, business cards and other graphic materials for both businesses and individuals',
    'project.posters.description':
      'Artistic posters and digital illustrations with strong visual identity',
    'project.modeling3d.description':
      '3D modeling, texturing and rendering with Blender, including characters, environments and objects',
    'project.vfx.description':
      'Visual effects with After Effects, Blender and other professional VFX tools',

    // Common
    'common.comingSoon': 'Coming soon',
    'common.comingSoonAlt': 'Coming Soon',

    // Accessibility widget
    'a11y.openMenu': 'Open accessibility menu',
    'a11y.closeMenu': 'Close accessibility menu',
    'a11y.panelLabel': 'Accessibility features',
    'a11y.title': 'Accessibility',
    'a11y.close': 'Close',
    'a11y.group.textSize': 'Text size',
    'a11y.group.contrast': 'Contrast themes',
    'a11y.group.vision': 'Vision',
    'a11y.group.screenReader': 'Screen reader',
    'a11y.group.colorBlind': 'Color blindness',
    'a11y.group.libras': 'Sign language',
    'a11y.decreaseText': 'Decrease text size',
    'a11y.increaseText': 'Increase text size',
    'a11y.contrastSelectLabel': 'Select contrast theme',
    'a11y.colorBlindFilterLabel': 'Color blindness filter',
    'a11y.theme.none.label': 'None',
    'a11y.theme.none.description': 'Site default theme',
    'a11y.theme.aquatic.label': 'Aquatic',
    'a11y.theme.aquatic.description': 'Black background, cyan accents',
    'a11y.theme.desert.label': 'Desert',
    'a11y.theme.desert.description': 'Cream background, dark text',
    'a11y.theme.dusk.label': 'Dusk',
    'a11y.theme.dusk.description': 'Graphite background, amber accents',
    'a11y.theme.nightsky.label': 'Night sky',
    'a11y.theme.nightsky.description': 'Black background, lavender accents',
    'a11y.underlineLinks': 'Underline links',
    'a11y.pauseAnimations': 'Pause animations',
    'a11y.screenReaderMode': 'Screen reader mode',
    'a11y.screenReaderHint':
      'Reinforces visible focus, pauses animations, underlines links, disables carousel autoplay, and amplifies announcements for screen readers (NVDA, JAWS, VoiceOver, TalkBack).',
    'a11y.colorBlind.none': 'None',
    'a11y.colorBlind.protanopia': 'Protanopia (red)',
    'a11y.colorBlind.deuteranopia': 'Deuteranopia (green)',
    'a11y.colorBlind.tritanopia': 'Tritanopia (blue)',
    'a11y.colorBlind.achromatopsia': 'Achromatopsia (grayscale)',
    'a11y.libras.toggle': 'Brazilian Sign Language (VLibras)',
    'a11y.libras.hint':
      'The VLibras icon will appear on screen. Click it to open the translator.',
    'a11y.restoreDefaults': 'Restore defaults',
  },
} as const

export type TranslationKey = keyof typeof translations.pt
