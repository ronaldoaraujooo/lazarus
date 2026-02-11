import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './ProdutoDetalhes.module.css';
import {
  FaWhatsapp,
  FaArrowLeft,
  FaCheck,
  FaEye,
  FaShoppingCart,
  FaCalendarAlt,
  FaRobot,
  FaCode,
  FaBuilding,
  FaCut,
  FaLink,
  FaEnvelope
} from 'react-icons/fa';

interface ProdutoDetalhes {
  id: string;
  nome: string;
  slug: string;
  categoria: string;
  descricao: string;
  descricaoDetalhada: string;
  preco: string;
  imagem: string;
  demoUrl: string;
  compraUrl: string;
  recursos: string[];
  icone: string;
  cor: string;
}

function ProdutoDetalhes() {
  const { categoria, slug } = useParams<{ categoria: string; slug: string }>();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<ProdutoDetalhes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        // Determinar qual JSON carregar baseado na categoria
        let jsonUrl = '';
        if (categoria === 'barbearia') jsonUrl = '/db/produtos-barbearia.json';
        else if (categoria === 'tecnologia') jsonUrl = '/db/produtos-tecnologia.json';
        else if (categoria === 'consultoria') jsonUrl = '/db/produtos-consultoria.json';
        
        const response = await fetch(jsonUrl);
        const data = await response.json();
        
        const produtoEncontrado = data.produtos.find(
          (p: any) => p.slug === slug
        );
        
        if (produtoEncontrado) {
          setProduto({ ...produtoEncontrado, categoria: data.categoria });
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [categoria, slug]);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      FaWhatsapp: <FaWhatsapp />,
      FaEnvelope: <FaEnvelope />,
      FaCut: <FaCut />,
      FaBuilding: <FaBuilding />,
      FaRobot: <FaRobot />,
      FaCalendarAlt: <FaCalendarAlt />,
      FaCode: <FaCode />,
      FaLink: <FaLink />
    };
    return icons[iconName] || <FaBuilding />;
  };

  const handleVoltar = () => {
    navigate(-1);
  };

  const handleComprar = () => {
    if (produto?.compraUrl) {
      window.open(produto.compraUrl, '_blank');
    }
  };

  const handleVerDemo = () => {
    if (produto?.demoUrl) {
      window.open(produto.demoUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className={style.notFoundContainer}>
        <h2>Produto não encontrado</h2>
        <button onClick={handleVoltar} className={style.backButton}>
          <FaArrowLeft /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className={style.produtoDetalhesContainer}>
     
      {/* Header */}
      <header className={style.header}>
        <div className={style.container}>
          <nav className={style.navBar}>
             <div className={style['nav-container']}>
               <div className={style['nav-logo']} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                 <span className={style['logo-text']}>LAZARUS</span>
                 <span className={style['logo-tech']}>TECH</span>
               </div>
               
               <div className={style['nav-menu']}>
                <button onClick={handleVoltar} className={style.backButton}>
                    <FaArrowLeft /> Voltar
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
        </div>
      </header>
        <h1 className={style.titulo}>{produto.nome}</h1>
        
      {/* Conteúdo Principal */}
      <div className={style.container}>
        <div className={style.grid}>
          {/* Coluna da Imagem */}
          <div className={style.colunaImagem}>
            <div 
              className={style.imagemPrincipal}
              style={{ 
                backgroundImage: `url(${produto.imagem})`,
                backgroundColor: produto.cor + '20'
              }}
            />
            
            <div className={style.infoPreco}>
              <div className={style.preco}>{produto.preco}</div>
              
              <div className={style.botoesAcao}>
                {produto.demoUrl && (
                  <button onClick={handleVerDemo} className={style.botaoDemo}>
                    <FaEye /> Ver Demo Online
                  </button>
                )}
                
                <button onClick={handleComprar} className={style.botaoComprar}>
                  <FaShoppingCart /> Comprar Agora
                </button>
                
                <a 
                  href="https://wa.me/5582996878817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.botaoWhatsApp}
                >
                  <FaWhatsapp /> Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Coluna de Detalhes */}
          <div className={style.colunaDetalhes}>
            <div className={style.descricaoContainer}>
              <h2>Descrição</h2>
              <p className={style.descricao}>{produto.descricao}</p>
              <p className={style.descricaoDetalhada}>{produto.descricaoDetalhada}</p>
            </div>

            <div className={style.recursosContainer}>
              <h2>Recursos Incluídos</h2>
              <ul className={style.listaRecursos}>
                {produto.recursos.map((recurso, index) => (
                  <li key={index} className={style.recursoItem}>
                    <FaCheck className={style.recursoIcone} />
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.beneficiosContainer}>
              <h2>Benefícios</h2>
              <div className={style.beneficiosGrid}>
                <div className={style.beneficioCard}>
                  <div className={style.beneficioIcone} style={{ color: produto.cor }}>
                    {getIconComponent(produto.icone)}
                  </div>
                  <h3>Prático</h3>
                  <p>Fácil de usar e implementar</p>
                </div>
                <div className={style.beneficioCard}>
                  <div className={style.beneficioIcone} style={{ color: produto.cor }}>
                    <FaCalendarAlt />
                  </div>
                  <h3>Suporte</h3>
                  <p>Atendimento especializado</p>
                </div>
                <div className={style.beneficioCard}>
                  <div className={style.beneficioIcone} style={{ color: produto.cor }}>
                    <FaRobot />
                  </div>
                  <h3>Moderno</h3>
                  <p>Tecnologia de ponta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={style.faqContainer}>
          <h2>Perguntas Frequentes</h2>
          <div className={style.faqLista}>
            <div className={style.faqItem}>
              <h3>Como funciona o processo de compra?</h3>
              <p>Entre em contato via WhatsApp, nosso time irá entender suas necessidades e configurar a solução ideal para você.</p>
            </div>
            <div className={style.faqItem}>
              <h3>Quanto tempo para entrega?</h3>
              <p>Sites estáticos: 2-3 dias úteis. Sistemas completos: 5-7 dias úteis após aprovação do projeto.</p>
            </div>
            <div className={style.faqItem}>
              <h3>Oferecem garantia?</h3>
              <p>Sim, todos nossos produtos têm garantia de 30 dias para funcionamento correto.</p>
            </div>
          </div>
        </div>
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
                    
                
                    
                    </div>
                  
                  <div className={style['footer-bottom']}>
                    <p>&copy; {new Date().getFullYear()} Lazarus Technology. Todos os direitos reservados.</p>
                    <p>Desenvolvido para transformar negócios</p>
                  </div>
                </div>
              </footer>
    </div>
    
  );
}

export default ProdutoDetalhes;