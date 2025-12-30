
import React, { useState } from 'react';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(0);
  const [calcCost, setCalcCost] = useState<number>(0);
  const [calcTax, setCalcTax] = useState<number>(11.5); // Default ML tax (Classic)
  const [calcShipping, setCalcShipping] = useState<number>(0);

  const calculateProfit = () => {
    const mlFee = (calcPrice * calcTax) / 100;
    const fixedFee = calcPrice > 0 && calcPrice < 79 ? 6 : 0;
    const net = calcPrice - calcCost - mlFee - fixedFee - calcShipping;
    const margin = calcPrice > 0 ? (net / calcPrice) * 100 : 0;
    return { net, margin, mlFee: mlFee + fixedFee };
  };

  const { net, margin, mlFee } = calculateProfit();

  const TOOLS = [
    {
      id: 'calc',
      name: 'Calculadora de Rentabilidade',
      description: 'Calcule lucro líquido, taxas do ML e margem real por produto.',
      icon: 'fa-calculator',
      type: 'internal',
      badge: 'Essencial'
    },
    {
      id: 'trends',
      name: 'Tendências ML',
      description: 'Descubra o que as pessoas mais buscam no Mercado Livre agora.',
      icon: 'fa-arrow-trend-up',
      type: 'external',
      url: 'https://tendencias.mercadolivre.com.br/',
      badge: 'Oficial'
    },
    {
      id: 'insights',
      name: 'Real Trends (Análise)',
      description: 'Análise profunda de concorrência e vendas em tempo real.',
      icon: 'fa-chart-simple',
      type: 'external',
      url: 'https://www.real-trends.com/br/',
      badge: 'Parceiro'
    },
    {
      id: 'ean_gen',
      name: 'Validador de EAN/GTIN',
      description: 'Verifique se o seu código universal é válido para o algoritmo.',
      icon: 'fa-barcode',
      type: 'external',
      url: 'https://www.gs1br.org/',
      badge: 'Oficial'
    }
  ];

  if (activeTool === 'calc') {
    return (
      <div className="max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setActiveTool(null)}
          className="mb-6 flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Voltar para Ferramentas
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
              <i className="fa-solid fa-calculator text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Calculadora de Lucro</h1>
              <p className="text-sm text-gray-500">Saiba exatamente quanto sobra no seu bolso.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Preço de Venda (R$)</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Custo do Produto (R$)</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={calcCost}
                  onChange={(e) => setCalcCost(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Comissão ML (%)</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={calcTax}
                  onChange={(e) => setCalcTax(Number(e.target.value))}
                >
                  <option value={11.5}>Clássico (11.5% aprox)</option>
                  <option value={16.5}>Premium (16.5% aprox)</option>
                  <option value={14}>Outras Categorias (14%)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Frete / Outros Custos (R$)</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={calcShipping}
                  onChange={(e) => setCalcShipping(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-6 text-white flex flex-col justify-center items-center text-center space-y-6">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase mb-1 tracking-widest">Lucro Líquido</p>
                <h2 className={`text-4xl font-black ${net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  R$ {net.toFixed(2)}
                </h2>
              </div>
              
              <div className="w-full h-px bg-white/10"></div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Margem</p>
                  <p className="text-lg font-bold">{margin.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Taxas ML</p>
                  <p className="text-lg font-bold text-red-400">R$ {mlFee.toFixed(2)}</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 italic mt-4">
                * Valores aproximados baseados nas regras gerais de 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900">Análise & Ferramentas</h2>
        <p className="text-gray-500">Recursos estratégicos para validar seus produtos e mercado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            onClick={() => {
              if (tool.type === 'internal') {
                setActiveTool(tool.id);
              } else {
                window.open(tool.url, '_blank');
              }
            }}
            className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 group-hover:bg-green-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                <i className={`fa-solid ${tool.icon} text-xl`}></i>
              </div>
              {tool.badge && (
                <span className="text-[8px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase tracking-tighter">
                  {tool.badge}
                </span>
              )}
            </div>
            
            <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{tool.name}</h3>
            <p className="text-xs text-gray-500 flex-1 leading-relaxed">{tool.description}</p>
            
            <div className="mt-6 flex items-center gap-2 text-gray-900 font-bold text-[10px] uppercase tracking-wider">
              {tool.type === 'internal' ? 'Abrir Ferramenta' : 'Acessar Link'}
              <i className={`fa-solid ${tool.type === 'internal' ? 'fa-arrow-right' : 'fa-external-link'} text-[8px] group-hover:translate-x-1 transition-transform`}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
