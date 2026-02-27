import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Home.module.css";

import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaInstagram, 
  FaRobot, 
  FaCode,
  FaEye,
  FaInfoCircle,
  FaCogs,
  FaServer,
  FaRocket,
  FaSortAmountDown,
  FaBox,
  FaTag,
  FaPercent,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaBolt,
  FaHeadset
} from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

// Interfaces com tipagem correta
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

// Função para processar categoria
const processarCategoria = (categoriaData: CategoriaProdutos): Produto[] => {
  return categoriaData.produtos.map(produto => ({
    ...produto,
    categoria: categoriaData.categoria
  }));
};

function Home() {
  const navigate = useNavigate();
  
  // States com tipagem explícita
  const [categorias, setCategorias] = useState<CategoriaProdutos[]>([]);
  const [produtosAgrupados, setProdutosAgrupados] = useState<{[key: string]: Produto[]}>({});
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Inicializando sistema...');
  
  // NOVOS STATES para funcionalidades de supermercado
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 9;

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
        resultados.forEach((categoria: CategoriaProdutos) => {
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

  // Função para scroll com tipagem
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

  // Handlers com tipagem
  const handleVerDetalhes = (produto: Produto): void => {
    navigate(`/produto/${produto.categoria}/${produto.slug}`);
  };

  const handleVerDemo = (url: string): void => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleComprar = (url: string): void => {
    window.open(url, '_blank');
  };

  // Função para formatar preço como em supermercado
  const formatarPrecoSupermercado = (preco: string) => {
    try {
      const valorNumerico = parseFloat(
        preco
          .replace('R$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      );
      
      if (isNaN(valorNumerico)) {
        return {
          precoFormatado: preco,
          parcelado: ''
        };
      }
      
      const valorParcelado = valorNumerico / 3;
      return {
        precoFormatado: preco,
        parcelado: `ou 3x de R$ ${valorParcelado.toFixed(2).replace('.', ',')}`
      };
    } catch {
      return {
        precoFormatado: preco,
        parcelado: ''
      };
    }
  };

  // Função para calcular desconto simulado (produtos em oferta)
  const calcularDesconto = (produto: Produto) => {
    // Simula que alguns produtos estão em oferta (30% dos produtos)
    const temDesconto = parseInt(produto.id) % 3 === 0;
    if (!temDesconto) return null;
    
    try {
      const valorOriginal = parseFloat(
        produto.preco
          .replace('R$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      );
      
      if (isNaN(valorOriginal)) return null;
      
      const valorComDesconto = valorOriginal * 0.85; // 15% de desconto
      return {
        original: `R$ ${valorOriginal.toFixed(2).replace('.', ',')}`,
        comDesconto: `R$ ${valorComDesconto.toFixed(2).replace('.', ',')}`,
        percentual: 15
      };
    } catch {
      return null;
    }
  };

  // Função para mudar ordenação
  const handleOrdenacaoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrdenacao(e.target.value);
  };

  // Calcular total de produtos
  const totalProdutos = Object.values(produtosAgrupados).flat().length;
  const totalPaginas = Math.ceil(totalProdutos / itensPorPagina);

  // Função para ordenar produtos baseado na seleção
  const ordenarProdutos = (produtos: Produto[]) => {
    const produtosCopy = [...produtos];
    
    switch(ordenacao) {
      case 'menor-preco':
        return produtosCopy.sort((a, b) => {
          const precoA = parseFloat(a.preco.replace('R$', '').replace(/\./g, '').replace(',', '.'));
          const precoB = parseFloat(b.preco.replace('R$', '').replace(/\./g, '').replace(',', '.'));
          return precoA - precoB;
        });
      case 'maior-preco':
        return produtosCopy.sort((a, b) => {
          const precoA = parseFloat(a.preco.replace('R$', '').replace(/\./g, '').replace(',', '.'));
          const precoB = parseFloat(b.preco.replace('R$', '').replace(/\./g, '').replace(',', '.'));
          return precoB - precoA;
        });
      case 'desconto':
        return produtosCopy.sort((a, b) => {
          const descontoA = calcularDesconto(a) ? 1 : 0;
          const descontoB = calcularDesconto(b) ? 1 : 0;
          return descontoB - descontoA;
        });
      default:
        return produtosCopy;
    }
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
        <div className={style['hero-content']}>
          <h1 className={style['hero-title']}>LAZARUS TECHNOLOGY</h1>
          <p className={style['hero-subtitle']}>
            Soluções digitais em oferta toda semana! 
          </p>
          <button 
            className={style['hero-button']}
            onClick={() => scrollToSection('categorias')}
          >
            Ver Promoções <MdArrowForward />
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
            <h2 className={style['section-title']}>Nossos Departamentos</h2>
            <p className={style['sobre-text']}>
              Como em um supermercado, temos seções especializadas para cada necessidade da sua empresa
            </p>
            <div className={style['sobre-grid']}>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaRobot />
                </div>
                <h3>Software House</h3>
                <p>Sistemas sob medida como "produtos importados" - alta qualidade</p>
                <small style={{color: '#28a745', marginTop: '0.5rem', display: 'block'}}>12 itens disponíveis</small>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaCode />
                </div>
                <h3>Barbearia PRO</h3>
                <p>Soluções completas para barbearias - "seção de cuidados"</p>
                <small style={{color: '#28a745', marginTop: '0.5rem', display: 'block'}}>8 itens disponíveis</small>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaHeadset />
                </div>
                <h3>Consultorias</h3>
                <p>Serviços especializados - "produtos premium"</p>
                <small style={{color: '#28a745', marginTop: '0.5rem', display: 'block'}}>6 itens disponíveis</small>
              </div>
              <div className={style['sobre-card']}>
                <div className={style['sobre-icon']}>
                  <FaBolt />
                </div>
                <h3>Promoções</h3>
                <p>Ofertas imperdíveis toda semana!</p>
                <small style={{color: '#dc3545', marginTop: '0.5rem', display: 'block'}}>5 itens com desconto</small>
              </div>
            </div>
          </div>
        </section>

        {/* Barra de Ferramentas - Filtros e Ordenação */}
        {Object.keys(produtosAgrupados).length > 0 && (
          <div className={style['produtos-toolbar']}>
            <div className={style['filtros-info']}>
              <span>
                <FaBox /> {totalProdutos} produtos encontrados
              </span>
              <div className={style['filtros-badge']}>
                <span 
                  className={style['badge-categoria']} 
                  onClick={() => setFiltroCategoria('todas')}
                  style={{fontWeight: filtroCategoria === 'todas' ? 'bold' : 'normal'}}
                >
                  Todas as categorias
                </span>
                {categorias.map((cat: CategoriaProdutos) => (
                  <span 
                    key={cat.categoria} 
                    className={style['badge-categoria']}
                    onClick={() => setFiltroCategoria(cat.categoria)}
                    style={{fontWeight: filtroCategoria === cat.categoria ? 'bold' : 'normal'}}
                  >
                    {cat.titulo}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={style['ordenar-select']}>
              <label><FaSortAmountDown /> Ordenar por:</label>
              <select value={ordenacao} onChange={handleOrdenacaoChange}>
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="desconto">Maior desconto</option>
              </select>
            </div>
          </div>
        )}

        {/* Categorias de Produtos */}
        <section id="categorias" className={style['categorias-section']}>
          {categorias.map((categoriaData: CategoriaProdutos, index: number) => {
            // Filtrar se alguma categoria específica foi selecionada
            if (filtroCategoria !== 'todas' && filtroCategoria !== categoriaData.categoria) {
              return null;
            }
            
            const produtosDaCategoria = produtosAgrupados[categoriaData.categoria] || [];
            const produtosOrdenados = ordenarProdutos(produtosDaCategoria);
            
            return (
              <div key={index} id={categoriaData.categoria} className={style['categoria-container']}>
                <div className={style.container}>
                  <h2 className={style['section-title']}>{categoriaData.titulo}</h2>
                  <p className={style['section-subtitle']}>{categoriaData.descricao}</p>
                  
                  <div className={style['produtos-grid']}>
                    {produtosOrdenados.map((produto: Produto) => {
                      const desconto = calcularDesconto(produto);
                      const precoFormatado = formatarPrecoSupermercado(produto.preco);
                      
                      return (
                        <div 
                          key={produto.id} 
                          className={style['produto-card']}
                          data-destaque={desconto ? "true" : "false"}
                        >
                          {/* Imagem do Produto */}
                          <div className={style['produto-imagem-container']}>
                            <div 
                              className={style['produto-imagem']}
                              style={{ 
                                backgroundImage: `url(${produto.imagem})`,
                              }}
                            />
                          </div>
                          
                          {/* Conteúdo do Card */}
                          <div className={style['produto-conteudo']}>
                            <h3 className={style['produto-nome']}>{produto.nome}</h3>
                            
                            <p className={style['produto-descricao']}>{produto.descricao}</p>
                            
                            {/* Recursos como "selos de qualidade" */}
                            <div className={style['produto-recursos']}>
                              {produto.recursos.slice(0, 2).map((recurso: string, idx: number) => (
                                <span key={idx} className={style['produto-recurso']}>
                                  <FaTag /> {recurso}
                                </span>
                              ))}
                            </div>
                            
                            {/* Preço - Estilo supermercado */}
                            <div className={style['produto-preco-container']}>
                              {desconto && (
                                <span className={style['produto-preco-antigo']}>
                                  {desconto.original}
                                </span>
                              )}
                              <span className={style['produto-preco']}>
                                {desconto ? desconto.comDesconto : produto.preco}
                              </span>
                              {precoFormatado.parcelado && (
                                <span className={style['produto-parcelamento']}>
                                  {precoFormatado.parcelado}
                                </span>
                              )}
                              {desconto && (
                                <span className={style['produto-parcelamento']} style={{color: '#dc3545'}}>
                                  <FaPercent /> {desconto.percentual}% OFF
                                </span>
                              )}
                            </div>
                            
                            {/* Botões de ação */}
                            <div className={style['produto-botoes']}>
                              {produto.demoUrl && (
                                <button 
                                  className={style['produto-botao']}
                                  onClick={() => handleVerDemo(produto.demoUrl)}
                                >
                                  <FaEye /> Ver Demo
                                </button>
                              )}
                              
                              <button 
                                className={style['produto-botao']}
                                onClick={() => handleVerDetalhes(produto)}
                              >
                                <FaInfoCircle /> Detalhes
                              </button>
                              
                              <button 
                                className={style['produto-botao']}
                                onClick={() => handleComprar(produto.compraUrl)}
                              >
                                 Falar no whasapp
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Seção de Marcas/Parceiros */}
        <section className={style['categorias-section']} style={{backgroundColor: '#f8f9fa', padding: '2rem 0'}}>
          <div className={style.container}>
            <h2 className={style['section-title']}>Navegue por Categorias</h2>
            <div className={style['categorias-grid']}>
              <div className={style['categoria-item']}>
                <FaCode size={24} color="#0047ab" />
                <span>Sistemas Web</span>
                <small>12 produtos</small>
              </div>
              <div className={style['categoria-item']}>
                <FaRobot size={24} color="#0047ab" />
                <span>Apps Mobile</span>
                <small>8 produtos</small>
              </div>
              <div className={style['categoria-item']}>
                <FaShieldAlt size={24} color="#0047ab" />
                <span>Segurança</span>
                <small>6 produtos</small>
              </div>
              <div className={style['categoria-item']}>
                <FaTruck size={24} color="#0047ab" />
                <span>Entregáveis</span>
                <small>4 produtos</small>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={style['cta-section']}>
          <div className={style.container}>
            <h2 className={style['cta-title']}>Ofertas exclusivas no WhatsApp!</h2>
            <p className={style['cta-text']}>
              Receba promoções e cupons de desconto diretamente no seu celular
            </p>
            <a 
              href="https://wa.me/5582996878817"
              target="_blank"
              rel="noopener noreferrer"
              className={style['cta-button']}
            >
              <FaWhatsapp /> Quero receber ofertas
            </a>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className={style['contato-section']}>
          <div className={style.container}>
            <h2 className={style['section-title']}>Fale com nosso time</h2>
            
            <div className={style['contato-grid']}>
              <div className={style['contato-info']}>
                <h3>Canais de Atendimento</h3>
                
                <div className={style['contato-item']}>
                  <FaWhatsapp className={style['contato-icon']} />
                  <div>
                    <h4>WhatsApp - Atendimento Rápido</h4>
                    <a 
                      href="https://wa.me/5582996878817"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      (82) 9 9687-8817
                    </a>
                    <small style={{display: 'block', color: '#28a745'}}>Resposta em até 5 minutos</small>
                  </div>
                </div>
                
                <div className={style['contato-item']}>
                  <FaPhoneAlt className={style['contato-icon']} />
                  <div>
                    <h4>Telefone - Sacolão Tech</h4>
                    <a href="tel:5582996878817">(82) 9 9687-8817</a>
                  </div>
                </div>
                
                <div className={style['contato-item']}>
                  <FaEnvelope className={style['contato-icon']} />
                  <div>
                    <h4>Email - Pedidos</h4>
                    <a href="mailto:contato@lazarustech.com">contato@lazarustech.com</a>
                  </div>
                </div>
              </div>
              
              <div className={style['contato-mapa']}>
                <h3>Nosso Endereço</h3>
                <div className={style['mapa-placeholder']}>
                  <p>LAZARUS TECHNOLOGY</p>
                  <p>Maceió - AL</p>
                  <p> Entregamos em todo o Brasil</p>
                  <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>
                    <FaStar color="#ffc107" /> <FaStar color="#ffc107" /> <FaStar color="#ffc107" /> <FaStar color="#ffc107" /> <FaStar color="#ffc107" />
                    <br />4.9/5 - 150 avaliações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            margin: '2rem 0',
            padding: '0 1rem'
          }}>
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #dee2e6',
                background: '#fff',
                borderRadius: '4px',
                cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer',
                opacity: paginaAtual === 1 ? 0.5 : 1
              }}
              onClick={() => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button 
                key={i} 
                style={{
                  padding: '0.5rem 1rem',
                  border: i + 1 === paginaAtual ? '2px solid #0047ab' : '1px solid #dee2e6',
                  background: i + 1 === paginaAtual ? '#e7f1ff' : '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: i + 1 === paginaAtual ? '#0047ab' : '#495057',
                  fontWeight: i + 1 === paginaAtual ? 'bold' : 'normal'
                }}
                onClick={() => setPaginaAtual(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #dee2e6',
                background: '#fff',
                borderRadius: '4px',
                cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer',
                opacity: paginaAtual === totalPaginas ? 0.5 : 1
              }}
              onClick={() => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={style.Footer}>
        <div className={style.container}>
          <div className={style['footer-content']}>
            <div className={style['footer-logo']}>
              <span className={style['logo-text']}>LAZARUS</span>
              <span className={style['logo-tech']}>TECHNOLOGY</span>
              <p className={style['footer-slogan']}>
                O supermercado digital da tecnologia
              </p>
            </div>
            
            <div className={style['footer-links']}>
              <h4>Departamentos</h4>
              <button onClick={() => scrollToSection('categorias')}>Produtos</button>
              <button onClick={() => scrollToSection('sobre')}>Sobre</button>
              <button onClick={() => scrollToSection('contato')}>Contato</button>
            </div>
            
            <div className={style['footer-social']}>
              <h4>Redes Sociais</h4>
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
            <p>&copy; {new Date().getFullYear()} Lazarus Technology - Todos os direitos reservados</p>
            <p>🛒 Preços e condições exclusivos para compras online</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;