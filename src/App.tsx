import React from 'react';
import './App.css';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaInstagram, 
  FaLink, 
  FaCut, 
  FaBuilding, 
  FaRobot, 
  FaCalendarAlt,
  FaCode
} from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  icone: React.ReactNode;
  cor: string;
}

function App() {
const produtos: Produto[] = [
  {
    id: 1,
    nome: "Lazarus CMS – Plano Básico",
    descricao: "Sistema de agendamentos, controle de clientes e painel administrativo. Ideal para barbearias que estão começando no digital.",
    preco: "R$ 97/mês",
    imagem: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
    icone: <FaCalendarAlt className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 2,
    nome: "Lazarus CMS – Plano Premium",
    descricao: "CMS completo + chatbot WhatsApp + página inicial personalizada. A solução mais vendida para barbearias que querem automatizar tudo.",
    preco: "R$ 147/mês",
    imagem: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=500&q=80",
    icone: <FaRobot className='produto-icone' />,
    cor: "#1abc9c"
  },
  {
    id: 3,
    nome: "Setup de Implantação",
    descricao: "Configuração completa do sistema, personalização visual, cadastro inicial de serviços e integração com WhatsApp.",
    preco: "R$ 399 (único)",
    imagem: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80",
    icone: <FaCode className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 4,
    nome: "Licença Completa do Lazarus",
    descricao: "Compra definitiva do sistema para uso próprio, com código hospedado e suporte básico. Ideal para quem não quer mensalidade.",
    preco: "R$ 1.997",
    imagem: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80",
    icone: <FaBuilding className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 5,
    nome: "Chatbot WhatsApp Avançado",
    descricao: "Bot com IA, agendamento automático, respostas inteligentes, integração com CRM e funil de vendas.",
    preco: "R$ 59/mês",
    imagem: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=500&q=80",
    icone: <FaRobot className='produto-icone' />,
    cor: "#2ecc71"
  },
  {
    id: 6,
    nome: "Site Profissional para Barbearias",
    descricao: "Site completo com portfólio, depoimentos, mapa, SEO e integração com o Lazarus CMS.",
    preco: "Sob consulta",
    imagem: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=500&q=80",
    icone: <FaCut className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 7,
    nome: "Landing Page de Agendamentos",
    descricao: "Página única otimizada para conversão, ideal para campanhas de tráfego pago e captação de novos clientes.",
    preco: "R$ 249",
    imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
    icone: <FaLink className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 8,
    nome: "Consultoria Digital para Barbearias",
    descricao: "Análise completa do posicionamento digital, estratégias de marketing, fidelização e automação.",
    preco: "R$ 197",
    imagem: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=500&q=80",
    icone: <FaBuilding className='produto-icone' />,
    cor: "#34495e"
  },
  {
    id: 9,
    nome: "Site Menu de Links Premium",
    descricao: "Versão avançada com analytics, integração com WhatsApp, pixel de conversão e design exclusivo.",
    preco: "R$ 89",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRzh8h5a29ussOpwnlX9lxKA2pLywS2CV1w&s",
    icone: <FaLink className='produto-icone' />,
    cor: "#1abc9c"
  }
];


  const enviarWhatsApp = (produtoNome: string): void => {
    const numero = "5582996878817";
    const mensagem = `Olá! Gostaria de solicitar um orçamento para: ${produtoNome}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura da navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="areaTextoSlide">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Lazarus Tecnologia</h1>
          <p className="hero-subtitle">
            Soluções digitais inteligentes para seu negócio crescer
          </p>
          <button 
            className="hero-button"
            onClick={() => scrollToSection('produtos')}
          >
            Ver Produtos <MdArrowForward />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navBar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="logo-text">LAZARUS</span>
            <span className="logo-tech">TECH</span>
          </div>
          
          <div className="nav-menu">
            <button onClick={() => scrollToSection('produtos')} className="nav-link">
              Produtos
            </button>
            <button onClick={() => scrollToSection('sobre')} className="nav-link">
              Sobre
            </button>
            <button onClick={() => scrollToSection('contato')} className="nav-link">
              Contato
            </button>
            <a 
              href="https://wa.me/5582996878817"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp"
            >
              <FaWhatsapp /> Fale Conosco
            </a>
          </div>
        </div>
      </nav>

      {/* Área de Conteúdo */}
      <div className="AreaConteudo">
        
        {/* Sobre */}
        <section id="sobre" className="sobre-section">
          <div className="container">
            <h2 className="section-title">Por que escolher a Lazarus?</h2>
            <p className="sobre-text">
              Somos especialistas em transformar ideias em soluções digitais eficientes. 
              Com tecnologia de ponta e design intuitivo, criamos ferramentas que realmente 
              fazem a diferença no seu negócio.
            </p>
            <div className="sobre-grid">
              <div className="sobre-card">
                <div className="sobre-icon">
                  <FaRobot />
                </div>
                <h3>Performance</h3>
                <p>Sistemas otimizados para máxima velocidade e eficiência</p>
              </div>
              <div className="sobre-card">
                <div className="sobre-icon">
                  <FaBuilding />
                </div>
                <h3>Responsivo</h3>
                <p>Funciona perfeitamente em todos os dispositivos</p>
              </div>
              <div className="sobre-card">
                <div className="sobre-icon">
                  <FaCalendarAlt />
                </div>
                <h3>Manutenção</h3>
                <p>Suporte contínuo e atualizações regulares</p>
              </div>
              <div className="sobre-card">
                <div className="sobre-icon">
                  <FaCode />
                </div>
                <h3>Inovação</h3>
                <p>Soluções com as mais recentes tecnologias</p>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos */}
        <section id="produtos" className="produtos-section">
          <div className="container">
            <h2 className="section-title">Nossas Soluções</h2>
            <p className="section-subtitle">
              Escolha a solução perfeita para alavancar seu negócio
            </p>
            
            <div className="produtos-grid">
              {produtos.map((produto: Produto) => (
                <div key={produto.id} className="produto-card">
                  <div className="produto-header">
                    
                    <h3 className="produto-nome">{produto.nome}</h3>
                  </div>
                  
                  <div className="produto-imagem-container">
                    <div 
                      className="produto-imagem"
                      style={{ 
                        backgroundImage: `url(${produto.imagem})`,
                        backgroundColor: produto.cor + '20'
                      }}
                    />
                  </div>
                  
                  <div className="produto-conteudo">
                    <p className="produto-descricao">{produto.descricao}</p>
                    
                    <div className="produto-preco-container">
                      <span className="produto-preco">{produto.preco}</span>
                    </div>
                    
                    <button 
                      className="produto-botao"
                      onClick={() => enviarWhatsApp(produto.nome)}
                      style={{ backgroundColor: produto.cor }}
                    >
                      <FaWhatsapp /> Solicitar Orçamento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2 className="cta-title">Pronto para transformar seu negócio?</h2>
            <p className="cta-text">
              Entre em contato agora mesmo e receba uma consultoria gratuita
            </p>
            <a 
              href="https://wa.me/5582996878817"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <FaWhatsapp /> Falar no WhatsApp
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="contato-section">
          <div className="container">
            <h2 className="section-title">Entre em Contato</h2>
            
            <div className="contato-grid">
              <div className="contato-info">
                <h3>Informações de Contato</h3>
                
                <div className="contato-item">
                  <FaWhatsapp className="contato-icon" />
                  <div>
                    <h4>WhatsApp</h4>
                    <a 
                      href="https://wa.me/5582996878817"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (82) 9 9687-8817
                    </a>
                  </div>
                </div>
                
                <div className="contato-item">
                  <FaPhoneAlt className="contato-icon" />
                  <div>
                    <h4>Telefone</h4>
                    <a href="tel:5582996878817">(82) 9 9687-8817</a>
                  </div>
                </div>
                
                <div className="contato-item">
                  <FaEnvelope className="contato-icon" />
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:contato@lazarustech.com">contato@lazarustech.com</a>
                  </div>
                </div>
                
              </div>
              
              <div className="contato-mapa">
                <h3>Onde estamos</h3>
                <div className="mapa-placeholder">
                  <p>Maceió - AL, Brasil</p>
                  <p>Atendemos todo o Brasil remotamente</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="Footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-text">LAZARUS</span>
              <span className="logo-tech">TECHNOLOGY</span>
              <p className="footer-slogan">
                Transformando ideias em soluções digitais
              </p>
            </div>
            
            <div className="footer-links">
              <h4>Links Rápidos</h4>
              <button onClick={() => scrollToSection('produtos')}>Produtos</button>
              <button onClick={() => scrollToSection('sobre')}>Sobre</button>
              <button onClick={() => scrollToSection('contato')}>Contato</button>
            </div>
            
            <div className="footer-social">
              <h4>Conecte-se</h4>
              <div className="social-icons">
                <a 
                  href="https://wa.me/5582996878817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <FaWhatsapp />
                </a>
                <a 
                  href="https://instagram.com/lazarustech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="mailto:contato@lazarustech.com"
                  className="social-icon"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Lazarus Technology. Todos os direitos reservados.</p>
            <p>Desenvolvido para transformar negócios</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;