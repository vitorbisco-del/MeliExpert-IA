import React, { useState, useEffect } from 'react';

interface CategoryTax {
  name: string;
  classic: number;
  premium: number;
}

const CATEGORY_TAXES: CategoryTax[] = [
  { name: 'Acessórios para Veículos', classic: 12.5, premium: 17.5 },
  { name: 'Alimentos e Bebidas', classic: 12, premium: 17 },
  { name: 'Beleza e Cuidado Pessoal', classic: 14, premium: 19 },
  { name: 'Calçados, Roupas e Bolsas', classic: 14, premium: 19 },
  { name: 'Câmeras e Acessórios', classic: 11.5, premium: 16.5 },
  { name: 'Casa, Móveis e Decoração', classic: 12.5, premium: 17.5 },
  { name: 'Celulares e Telefones', classic: 11.5, premium: 16.5 },
  { name: 'Eletrodomésticos', classic: 12.5, premium: 17.5 },
  { name: 'Eletrônicos, Áudio e Vídeo', classic: 11.5, premium: 16.5 },
  { name: 'Ferramentas', classic: 12.5, premium: 17.5 },
  { name: 'Games', classic: 12.5, premium: 17.5 },
  { name: 'Informática', classic: 11.5, premium: 16.5 },
  { name: 'Instrumentos Musicais', classic: 12, premium: 17 },
  { name: 'Joias e Relógios', classic: 14, premium: 19 },
  { name: 'Brinquedos e Hobbies', classic: 13, premium: 18 },
  { name: 'Saúde', classic: 14, premium: 19 },
  { name: 'Esportes e Fitness', classic: 12.5, premium: 17.5 },
  { name: 'Outros', classic: 12.5, premium: 17.5 },
];

const AdEditor: React.FC = () => {
  const [price, setPrice] = useState<number>(0);
  const [adType, setAdType] = useState<'classic' | 'premium'>('classic');
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORY_TAXES[0].name);
  const [categoryFee, setCategoryFee] = useState<number>(CATEGORY_TAXES[0].classic);

  // Auto-update fee when category or ad type changes
  useEffect(() => {
    const category = CATEGORY_TAXES.find(c => c.name === selectedCategory);
    if (category) {
      setCategoryFee(adType === 'classic' ? category.classic : category.premium);
    }
  }, [selectedCategory, adType]);

  const calculateFees = () => {
    const isUnderThreshold = price > 0 && price < 79;
    const fixedFee = isUnderThreshold ? 6.00 : 0;
    const percentageFee = (price * categoryFee) / 100;
    const totalFees = fixedFee + percentageFee;
    const totalReceived = price > 0 ? Math.max(0, price - totalFees) : 0;

    return {
      fixedFee,
      percentageFee,
      totalFees,
      totalReceived,
      isUnderThreshold
    };
  };

  const { fixedFee, percentageFee, totalFees, totalReceived, isUnderThreshold } = calculateFees();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-900">Simulador de Custos</h2>
        <p className="text-gray-500">Selecione a categoria e veja as taxas oficiais do Mercado Livre.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="fa-solid fa-sliders text-blue-500"></i>
              Configurações do Anúncio
            </h3>

            <div className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Categoria do Produto</label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition-all cursor-pointer"
                  >
                    {CATEGORY_TAXES.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Preço de Venda (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                  <input 
                    type="number"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="0,00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-12 py-4 text-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setAdType('classic')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${adType === 'classic' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-100 bg-gray-50'}`}
                >
                  <span className={`block text-[10px] font-bold uppercase mb-1 ${adType === 'classic' ? 'text-blue-600' : 'text-gray-400'}`}>Tipo de Anúncio</span>
                  <span className="block font-black text-gray-800">Clássico</span>
                  <span className="text-[10px] text-gray-500">Exposição Alta</span>
                </button>
                <button 
                  onClick={() => setAdType('premium')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${adType === 'premium' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-100 bg-gray-50'}`}
                >
                  <span className={`block text-[10px] font-bold uppercase mb-1 ${adType === 'premium' ? 'text-blue-600' : 'text-gray-400'}`}>Tipo de Anúncio</span>
                  <span className="block font-black text-gray-800">Premium</span>
                  <span className="text-[10px] text-gray-500">Sem juros p/ comprador</span>
                </button>
              </div>

              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-600 uppercase">Taxa Calculada</span>
                <span className="text-sm font-black text-blue-700">{categoryFee}%</span>
              </div>
            </div>
          </section>

          <a 
            href="https://vendedores.mercadolivre.com.br/calculadora-de-custos/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gray-900 text-white p-6 rounded-3xl hover:bg-black transition-all group"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1">Dúvidas sobre regras?</p>
              <p className="font-black text-sm">Verificar na Ajuda Oficial</p>
            </div>
            <i className="fa-solid fa-external-link text-xl group-hover:scale-110 transition-transform"></i>
          </a>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-8 flex items-center gap-2">
              <i className="fa-solid fa-receipt text-yellow-500"></i>
              Resumo Financeiro
            </h3>

            <div className="flex-1 space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Taxa de Venda ({categoryFee}%)</span>
                <span className="font-bold text-gray-900">R$ {percentageFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  {/* Escaped '<' to prevent it from being parsed as a JSX tag start */}
                  <span className="text-gray-500 font-medium">Custo Fixo (Anúncios &lt; R$79)</span>
                  {isUnderThreshold && <span className="text-[10px] text-yellow-600 font-bold uppercase tracking-tighter">Aplicado ao preço atual</span>}
                </div>
                <span className={`font-bold ${isUnderThreshold ? 'text-gray-900' : 'text-gray-300'}`}>R$ {fixedFee.toFixed(2)}</span>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-xs">Total em Taxas</span>
                <span className="text-xl font-black text-red-500">- R$ {totalFees.toFixed(2)}</span>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 mt-8 flex flex-col items-center text-center">
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Você recebe</span>
                <h4 className="text-3xl font-black text-green-700">R$ {totalReceived.toFixed(2)}</h4>
                <p className="text-[10px] text-green-600/60 mt-2 font-medium">Líquido após taxas do Marketplace</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex gap-3 items-start">
              <i className="fa-solid fa-circle-info text-blue-500 mt-1"></i>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Este cálculo automatizado usa a média das categorias. Para produtos acima de **R$ 79**, o frete grátis é obrigatório e não está incluso neste cálculo (o valor varia conforme peso e reputação).
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdEditor;