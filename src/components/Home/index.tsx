import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Home.module.css";

import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaInstagram, 
  FaBuilding, 
  FaRobot, 
  FaCalendarAlt,
  FaCode,
  FaEye,
  FaShoppingCart,
  FaInfoCircle,
  FaCogs,
  FaServer,
  FaRocket
} from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

interface Produto {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  descricaoDetalhada: string;
  preco: string;
  imagem: string;
  demoUrl: string;
  detalhesUrl: string;
  compraUrl: string;
  recursos: string[];
  icone: string;
  cor: string;
  categoria: string;
}

interface CategoriaProdutos {
  categoria: string;
  titulo: string;
  descricao: string;
  produtos: Produto[];
}

const processarCategoria = (categoriaData: CategoriaProdutos): Produto[] => {
  return categoriaData.produtos.map(produto => ({
    ...produto,
    categoria: categoriaData.categoria
  }));
};

function Home() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<CategoriaProdutos[]>([]);
  const [produtosAgrupados, setProdutosAgrupados] = useState<{[key: string]: Produto[]}>({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Inicializando sistema...');

  const categoriasUrls = [
    '/db/produtos-barbearia.json',
    '/db/produtos-tecnologia.json',
    '/db/produtos-consultoria.json'
  ];

  useEffect(() => {
    const loadingMessages = [
      'Inicializando sistema Lazarus...',
      'Carregando módulos de tecnologia...',
      'Preparando soluções para barbearias...',
      'Configurando consultorias especializadas...',
      'Otimizando performance...',
      'Quase pronto...'
    ];

    const fetchProdutos = async () => {
      try {
        // Simular progresso de carregamento
        const updateProgress = (progress: number, message: string) => {
          setLoadingProgress(progress);
          setLoadingMessage(message);
        };

        updateProgress(10, loadingMessages[0]);
        await new Promise(resolve => setTimeout(resolve, 300));

        updateProgress(25, loadingMessages[1]);
        await new Promise(resolve => setTimeout(resolve, 400));

        updateProgress(40, loadingMessages[2]);
        const promises = categoriasUrls.map(url => 
          fetch(url).then(res => res.json())
        );

        updateProgress(60, loadingMessages[3]);
        const resultados = await Promise.all(promises);
        
        updateProgress(80, loadingMessages[4]);
        setCategorias(resultados);
        
        const agrupados: {[key: string]: Produto[]} = {};
        resultados.forEach(categoria => {
          const produtosProcessados = processarCategoria(categoria);
          agrupados[categoria.categoria] = produtosProcessados;
        });
        setProdutosAgrupados(agrupados);
        
        updateProgress(95, loadingMessages[5]);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);


  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleVerDetalhes = (produto: Produto) => {
    navigate(`/produto/${produto.categoria}/${produto.slug}`);
  };

  const handleVerDemo = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleComprar = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className={style.loadingScreen}>
        {/* Background animado */}
        <div className={style.loadingBackground}>
          <div className={style.loadingGrid}></div>
          <div className={style.loadingOrbit}>
            <div className={style.loadingSatellite}></div>
          </div>
        </div>
        
        {/* Container principal */}
        <div className={style.loadingContainer}>
          {/* Logo animada */}
          <div className={style.loadingLogo}>
            
            <div className={style.logoText}>
              <span className={style.logoPrimary}>LAZARUS</span>
              <span className={style.logoSecondary}>TECHNOLOGY</span>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className={style.progressContainer}>
            <div className={style.progressBar}>
              <div 
                className={style.progressFill}
                style={{ width: `${loadingProgress}%` }}
              ></div>
              <div className={style.progressGlow}></div>
            </div>
            <div className={style.progressText}>
              <span className={style.progressPercent}>{loadingProgress}%</span>
              <span className={style.progressMessage}>{loadingMessage}</span>
            </div>
          </div>
          
          {/* Ícones de carregamento */}
          <div className={style.loadingIcons}>
            <div className={style.loadingIcon}>
              <FaCogs className={style.spinning} />
              <span>Processando</span>
            </div>
            <div className={style.loadingIcon}>
              <FaServer className={style.pulsing} />
              <span>Conectando</span>
            </div>
            <div className={style.loadingIcon}>
              <FaRocket className={style.floating} />
              <span>Otimizando</span>
            </div>
          </div>
          
          {/* Loading dots */}
          <div className={style.loadingDots}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
          </div>
          
          {/* Mensagem motivacional */}
          <div className={style.loadingQuote}>
            <p>"Transformando ideias em soluções digitais de alto impacto"</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className={style.areaTextoSlide}>
        <div className={style['hero-overlay']}></div>
        <div className={style['hero-content']}>
          <h1 className={style['hero-title']}>Lazarus Tecnologia</h1>
          <p className={style['hero-subtitle']}>
            Soluções digitais inteligentes para seu negócio crescer
          </p>
          <button 
            className={style['hero-button']}
            onClick={() => scrollToSection('categorias')}
          >
            Ver Produtos <MdArrowForward />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className={style.navBar}>
        <div className={style['nav-container']}>
          <div className={style['nav-logo']} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className={style['logo-text']}>LAZARUS</span>
            <span className={style['logo-tech']}>TECH</span>
          </div>
          
          <div className={style['nav-menu']}>
            <button onClick={() => scrollToSection('categorias')} className={style['nav-link']}>
              Produtos
            </button>
            <button onClick={() => scrollToSection('sobre')} className={style['nav-link']}>
              Sobre
            </button>
            <button onClick={() => scrollToSection('contato')} className={style['nav-link']}>
              Contato
            </button>
            <a 
              href="https://wa.me/5582996878817"
              target="_blank"
              rel="noopener noreferrer"
              className={style['nav-whatsapp']}
            >
              <FaWhatsapp /> Fale Conosco
            </a>
          </div>
        </div>
      </nav>

      {/* Área de Conteúdo */}
      <div className={style.AreaConteudo}>
        
        {/* Sobre */}
        <section id="sobre" className={style['sobre-section']}>
          <div className={style.container}>
            <h2 className={style['section-title']}>Por que escolher a Lazarus?</h2>
            <p className={style['sobre-text']}>
              Somos especialistas em transformar ideias em soluções digitais eficientes. 
              Com tecnologia de ponta e design intuitivo, criamos ferramentas que realmente 
              fazem a diferença no seu negócio.
            </p>
            <div className={style['sobre-grid']}>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaRobot />
                </div>
                <h3>Performance</h3>
                <p>Sistemas otimizados para máxima velocidade e eficiência</p>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaBuilding />
                </div>
                <h3>Responsivo</h3>
                <p>Funciona perfeitamente em todos os dispositivos</p>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaCalendarAlt />
                </div>
                <h3>Manutenção</h3>
                <p>Suporte contínuo e atualizações regulares</p>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaCode />
                </div>
                <h3>Inovação</h3>
                <p>Soluções com as mais recentes tecnologias</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias de Produtos */}
        <section id="categorias" className={style['categorias-section']}>
          {categorias.map((categoriaData, index) => (
            <div key={index} id={categoriaData.categoria} className={style['categoria-container']}>
              <div className={style.container}>
                <h2 className={style['section-title']}>{categoriaData.titulo}</h2>
                <p className={style['section-subtitle']}>{categoriaData.descricao}</p>
                
                <div className={style['produtos-grid']}>
                  {produtosAgrupados[categoriaData.categoria]?.map((produto: Produto) => (
                    <div key={produto.id} className={style['produto-card']}>
                      <div className={style['produto-header']}>
                        
                        <h3 className={style['produto-nome']}>{produto.nome}</h3>
                      </div>
                      
                      <div className={style['produto-imagem-container']}>
                        <div 
                          className={style['produto-imagem']}
                          style={{ 
                            backgroundImage: `url(${produto.imagem})`,
                            backgroundColor: produto.cor + '20'
                          }}
                        />
                      </div>
                      
                      <div className={style['produto-conteudo']}>
                        <p className={style['produto-descricao']}>{produto.descricao}</p>
                        
                        <div className={style['produto-recursos']}>
                          {produto.recursos.slice(0, 3).map((recurso, idx) => (
                            <span key={idx} className={style['produto-recurso']}>
                              {recurso}
                            </span>
                          ))}
                        </div>
                        
                        <div className={style['produto-preco-container']}>
                          <span className={style['produto-preco']}>{produto.preco}</span>
                        </div>
                        
                        <div className={style['produto-botoes']}>
                          {produto.demoUrl && (
                            <button 
                              className={style['produto-botao']}
                              onClick={() => handleVerDemo(produto.demoUrl)}
                              style={{ backgroundColor: '#3498db' }}
                            >
                              <FaEye /> Ver Demo
                            </button>
                          )}
                          
                          <button 
                            className={style['produto-botao']}
                            onClick={() => handleVerDetalhes(produto)}
                            style={{ backgroundColor: produto.cor }}
                          >
                            <FaInfoCircle /> Detalhes
                          </button>
                          
                          <button 
                            className={style['produto-botao']}
                            onClick={() => handleComprar(produto.compraUrl)}
                            style={{ backgroundColor: '#27ae60' }}
                          >
                            <FaShoppingCart /> Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className={style['cta-section']}>
          <div className={style.container}>
            <h2 className={style['cta-title']}>Pronto para transformar seu negócio?</h2>
            <p className={style['cta-text']}>
              Entre em contato agora mesmo e receba uma consultoria gratuita
            </p>
            <a 
              href="https://wa.me/5582996878817"
              target="_blank"
              rel="noopener noreferrer"
              className={style['cta-button']}
            >
              <FaWhatsapp /> Falar no WhatsApp
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className={style['contato-section']}>
          <div className={style.container}>
            <h2 className={style['section-title']}>Entre em Contato</h2>
            
            <div className={style['contato-grid']}>
              <div className={style['contato-info']}>
                <h3>Informações de Contato</h3>
                
                <div className={style['contato-item']}>
                  <FaWhatsapp className={style['contato-icon']} />
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
                
                <div className={style['contato-item']}>
                  <FaPhoneAlt className={style['contato-icon']} />
                  <div>
                    <h4>Telefone</h4>
                    <a href="tel:5582996878817">(82) 9 9687-8817</a>
                  </div>
                </div>
                
                <div className={style['contato-item']}>
                  <FaEnvelope className={style['contato-icon']} />
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:contato@lazarustech.com">contato@lazarustech.com</a>
                  </div>
                </div>
                
              </div>
              
              <div className={style['contato-mapa']}>
                <h3>Onde estamos</h3>
                <div>
                  <p>Maceió - AL, Brasil</p>
                  <p>Atendemos todo o Brasil remotamente</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={style.Footer}>
        <div className={style.container}>
          <div className={style['footer-content']}>
            <div className={style['footer-logo']}>
              <span className={style['logo-text']}>LAZARUS</span>
              <span className={style['logo-tech']}>TECHNOLOGY</span>
              <p className={style['footer-slogan']}>
                Transformando ideias em soluções digitais
              </p>
            </div>
            
            <div className={style['footer-links']}>
              <h4>Links Rápidos</h4>
              <button onClick={() => scrollToSection('categorias')}>Produtos</button>
              <button onClick={() => scrollToSection('sobre')}>Sobre</button>
              <button onClick={() => scrollToSection('contato')}>Contato</button>
            </div>
            
            <div className={style['footer-social']}>
              <h4>Conecte-se</h4>
              <div className={style['social-icons']}>
                <a 
                  href="https://wa.me/5582996878817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style['social-icon']}
                >
                  <FaWhatsapp />
                </a>
                <a 
                  href="https://instagram.com/lazarustech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style['social-icon']}
                >
                  <FaInstagram />
                </a>
                <a 
                  href="mailto:contato@lazarustech.com"
                  className={style['social-icon']}
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
          
          <div className={style['footer-bottom']}>
            <p>&copy; {new Date().getFullYear()} Lazarus Technology. Todos os direitos reservados.</p>
            <p>Desenvolvido para transformar negócios</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;