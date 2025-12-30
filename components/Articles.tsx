
import React, { useState } from 'react';
import { Article } from '../types';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'SEO para Títulos: O Guia Definitivo',
    category: 'SEO',
    icon: 'fa-magnifying-glass',
    excerpt: 'Aprenda a estrutura correta para ser encontrado pelos compradores.',
    content: `O título é o fator mais importante para o seu ranqueamento orgânico.
    
**Estrutura Recomendada:**
Produto + Marca + Modelo + Característica Principal.

**Exemplo Correto:** 
*Garrafa Térmica Stanley Adventure 1L Inox Original.*

**O que EVITAR:**
- Emojis ou símbolos.
- Palavras como "Frete Grátis" ou "Promoção" (isso vai no campo de promoção, não no título).
- Letras todas em maiúsculo.
- Repetição de palavras-chave.

**Dica de Ouro:** O Mercado Livre lê as primeiras palavras com mais relevância. Coloque o nome do produto e a marca logo no início.`
  },
  {
    id: '2',
    title: 'Mercado Full: Vale a pena para você?',
    category: 'Logística',
    icon: 'fa-box-open',
    excerpt: 'Descubra quando migrar seu estoque para os galpões do Meli.',
    content: `O Mercado Envios Full é o braço logístico mais potente da plataforma, mas exige estratégia.

**Benefícios:**
- Selo FULL (maior conversão).
- Entrega no dia seguinte ou no mesmo dia.
- Meli cuida de toda a expedição e pós-venda.

**Quando entrar?**
1. Seu produto tem alto giro (vende todo dia).
2. Sua margem suporta os custos de armazenagem.
3. Você quer escalar sem aumentar sua equipe operacional.

**Cuidado:** Produtos parados no Full geram taxas de "armazenagem prolongada". Só envie o que realmente tem saída constante.`
  },
  {
    id: '3',
    title: 'Protegendo sua Reputação',
    category: 'Gestão',
    icon: 'fa-shield-halved',
    excerpt: 'O guia para manter o termômetro no verde e evitar o bloqueio.',
    content: `Sua reputação é o seu maior ativo. Sem ela, seus anúncios perdem até 80% da visibilidade.

**Os 3 Pilares:**
1. **Reclamações:** Mantenha abaixo de 2% (para Mercado Líder).
2. **Tempo de Postagem:** Despache em menos de 24h úteis.
3. **Cancelamentos:** Nunca cancele por falta de estoque. Isso é fatal.

**Como recuperar uma conta "Amarela"?**
Venda produtos de baixo ticket com entrega ultra rápida para diluir a porcentagem de erros rapidamente. Resolva toda mediação em menos de 48h.`
  },
  {
    id: '4',
    title: 'Mercado Ads: Sem Queimar Dinheiro',
    category: 'Publicidade',
    icon: 'fa-chart-pie',
    excerpt: 'Como configurar campanhas de Product Ads de forma lucrativa.',
    content: `Publicidade no Meli serve para impulsionar o que já é bom. Não tente "salvar" anúncio ruim com Ads.

**Regras de Ouro:**
- **ACOS:** Deve ser menor que sua margem líquida.
- **Campanhas por Objetivo:** Separe produtos "Curva A" (Rentabilidade) de "Lançamentos" (Visibilidade).
- **Filtro de Anúncios:** Pause anúncios que gastam muito e não convertem (cliques sem venda).

**Estratégia:** Comece com uma estratégia de "Rentabilidade" para manter o ACOS baixo e só mude para "Crescimento" quando dominar seus custos.`
  },
  {
    id: '5',
    title: 'Atendimento que Converte',
    category: 'Vendas',
    icon: 'fa-comments',
    excerpt: 'Transforme perguntas em vendas com respostas estratégicas.',
    content: `O campo de perguntas é o seu fechamento de vendas.

**Técnicas:**
- **Velocidade:** Responda em menos de 5 minutos durante o horário comercial.
- **Personalização:** Use o nome do cliente se disponível.
- **Chamada para Ação (CTA):** Termine sempre com uma pergunta ou incentivo. "Temos a pronta entrega, se comprar agora envio ainda hoje. Qual cor prefere?"

**Pós-Venda:** Envie uma mensagem automática de agradecimento assim que o produto for entregue. Isso reduz a chance de reclamações impulsivas.`
  }
];

const Articles: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="mb-6 flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Voltar para Artigos
        </button>
        
        <article className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
              <i className={`fa-solid ${selectedArticle.icon} text-xl`}></i>
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{selectedArticle.category}</span>
              <h1 className="text-2xl font-black text-gray-900">{selectedArticle.title}</h1>
            </div>
          </div>
          
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {selectedArticle.content.split('\n').map((line, i) => {
               if (line.trim().startsWith('**')) {
                 return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
               }
               return <p key={i} className="mb-4">{line}</p>;
            })}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900">Central de Conhecimento</h2>
        <p className="text-gray-500">Aprenda com quem entende do jogo para escalar sua operação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article) => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all text-left flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors mb-4">
              <i className={`fa-solid ${article.icon} text-xl`}></i>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{article.category}</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{article.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 flex-1">{article.excerpt}</p>
            <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-xs">
              Ler artigo completo
              <i className="fa-solid fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Articles;
