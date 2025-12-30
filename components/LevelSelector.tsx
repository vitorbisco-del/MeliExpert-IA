
import React from 'react';
import { UserLevel } from '../types';

interface LevelSelectorProps {
  selectedLevel: UserLevel;
  onSelect: (level: UserLevel) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ selectedLevel, onSelect }) => {
  const levels = [
    { id: UserLevel.INICIANTE, icon: 'fa-seedling', desc: 'Primeiras vendas' },
    { id: UserLevel.INTERMEDIARIO, icon: 'fa-chart-line', desc: 'Otimizando anúncios' },
    { id: UserLevel.AVANCADO, icon: 'fa-rocket', desc: 'Escala e automação' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl mx-auto px-4">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => onSelect(level.id)}
          className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            selectedLevel === level.id 
              ? 'border-yellow-500 bg-yellow-50 shadow-md' 
              : 'border-gray-200 bg-white hover:border-yellow-200'
          }`}
        >
          <i className={`fa-solid ${level.icon} text-2xl mb-2 ${
            selectedLevel === level.id ? 'text-yellow-600' : 'text-gray-400'
          }`}></i>
          <span className="font-bold text-sm text-gray-800">{level.id}</span>
          <span className="text-[10px] text-gray-500">{level.desc}</span>
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;
