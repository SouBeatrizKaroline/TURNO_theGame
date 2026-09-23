import React from 'react';
import { TimeOfDay } from '../../types';

interface RoomVisualProps {
  timeOfDay: TimeOfDay;
  onNavigate: (tab: 'planner' | 'boss' | 'finance') => void;
}

export const RoomVisual: React.FC<RoomVisualProps> = ({ timeOfDay, onNavigate }) => {
  // Paletas de iluminação da janela baseadas no período
  const skyColors = {
    morning: { sky: '#8EC5FC', sun: '#FDE047', tint: 'rgba(235, 160, 89, 0.08)' },
    afternoon: { sky: '#6798C0', sun: '#FDBA74', tint: 'rgba(255, 255, 255, 0)' },
    night: { sky: '#0F1026', sun: '#E2E8F0', tint: 'rgba(15, 16, 38, 0.35)' }
  }[timeOfDay];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '4 / 3',
      background: '#1F1B2C',
      border: '2px solid var(--surface-light)',
      borderRadius: '6px',
      overflow: 'hidden',
      imageRendering: 'pixelated'
    }}>
      {/* SVG Pixel Art do Quarto com Hotspots Acessíveis */}
      <svg
        viewBox="0 0 320 240"
        style={{ width: '100%', height: '100%', display: 'block', shapeRendering: 'crispEdges' }}
        role="img"
        aria-label="Cenário aconchegante do quarto em pixel art"
      >
        {/* Parede de Fundo */}
        <rect x="0" y="0" width="320" height="190" fill="#2E2840" />
        {/* Rodapé e Piso */}
        <rect x="0" y="190" width="320" height="10" fill="#201C2E" />
        <rect x="0" y="200" width="320" height="40" fill="#3D3227" />
        {/* Tábuas de madeira do chão */}
        <rect x="0" y="212" width="320" height="2" fill="#2E2419" />
        <rect x="0" y="226" width="320" height="2" fill="#2E2419" />

        {/* JANELA */}
        <g>
          <rect x="110" y="25" width="100" height="70" fill={skyColors.sky} />
          {/* Sol ou Lua */}
          <rect 
            x={timeOfDay === 'morning' ? "170" : timeOfDay === 'afternoon' ? "150" : "130"} 
            y="35" 
            width="16" 
            height="16" 
            fill={skyColors.sun} 
          />
          {/* Estrelas na noite */}
          {timeOfDay === 'night' && (
            <>
              <rect x="120" y="40" width="2" height="2" fill="#FFFFFF" />
              <rect x="180" y="50" width="3" height="3" fill="#FFFFFF" />
              <rect x="195" y="32" width="2" height="2" fill="#FFFFFF" />
            </>
          )}
          {/* Moldura da janela */}
          <rect x="106" y="21" width="108" height="4" fill="#4B3D60" />
          <rect x="106" y="95" width="108" height="6" fill="#4B3D60" />
          <rect x="106" y="25" width="4" height="70" fill="#4B3D60" />
          <rect x="210" y="25" width="4" height="70" fill="#4B3D60" />
          <rect x="158" y="25" width="4" height="70" fill="#4B3D60" />
          <rect x="106" y="58" width="108" height="4" fill="#4B3D60" />
        </g>

        {/* PRATELEIRA ALTA COM LIVROS E PLANTA */}
        <rect x="20" y="35" width="70" height="5" fill="#4E3B2B" />
        <rect x="24" y="22" width="6" height="13" fill="#6798C0" />
        <rect x="31" y="19" width="7" height="16" fill="#DC6A6A" />
        <rect x="39" y="24" width="8" height="11" fill="#F3C969" />
        {/* Vaso de Suculenta */}
        <rect x="68" y="25" width="12" height="10" fill="#8C5338" />
        <rect x="70" y="18" width="8" height="7" fill="#7FB685" />

        {/* CALENDÁRIO NA PAREDE (Interativo -> Blocos) */}
        <g 
          onClick={() => onNavigate('planner')} 
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          role="button"
          aria-label="Calendário na parede: Abrir rotina e blocos do dia"
        >
          <rect x="240" y="35" width="40" height="42" fill="#F5F3F7" />
          <rect x="240" y="35" width="40" height="10" fill="#DC6A6A" />
          <rect x="245" y="32" width="4" height="5" fill="#121017" />
          <rect x="271" y="32" width="4" height="5" fill="#121017" />
          {/* Grade de dias do calendário */}
          <rect x="246" y="52" width="5" height="4" fill="#9D97B5" />
          <rect x="257" y="52" width="5" height="4" fill="#9D97B5" />
          <rect x="268" y="52" width="5" height="4" fill="#EBA059" />
          <rect x="246" y="62" width="5" height="4" fill="#9D97B5" />
          <rect x="257" y="62" width="5" height="4" fill="#9D97B5" />
        </g>

        {/* CAMA (Sono e Recuperação) */}
        <g>
          <rect x="15" y="150" width="85" height="45" fill="#4B3B2B" />
          <rect x="15" y="135" width="10" height="25" fill="#3D2E20" />
          {/* Colchão e Lençol */}
          <rect x="25" y="155" width="75" height="35" fill="#7FB685" />
          {/* Travesseiro macio */}
          <rect x="25" y="146" width="22" height="14" fill="#F5F3F7" />
          <rect x="23" y="158" width="77" height="4" fill="#5F9465" />
        </g>

        {/* TAPETE CENTRAL & GATINHO */}
        <ellipse cx="150" cy="212" rx="42" ry="14" fill="#483D59" />
        {/* Gato dormindo encolhido */}
        <ellipse cx="145" cy="210" rx="11" ry="8" fill="#EBA059" />
        <polygon points="138,204 142,201 143,206" fill="#C97B35" />
        <polygon points="149,204 153,201 154,206" fill="#C97B35" />

        {/* COFRINHO NO CHÃO (Interativo -> Finanças) */}
        <g 
          onClick={() => onNavigate('finance')} 
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          role="button"
          aria-label="Cofrinho no tapete: Abrir finanças e potes"
        >
          <rect x="175" y="202" width="16" height="12" rx="3" fill="#DC6A6A" />
          <rect x="177" y="200" width="4" height="3" fill="#B24949" />
          <rect x="187" y="205" width="2" height="3" fill="#1A1823" />
          <circle cx="182" cy="207" r="1.5" fill="#F3C969" />
        </g>

        {/* MESA DE TRABALHO & AVATAR (Interativo -> Boss) */}
        <g 
          onClick={() => onNavigate('boss')} 
          style={{ cursor: 'pointer' }}
          tabIndex={0}
          role="button"
          aria-label="Mesa de estudos: Acessar Arena de Desafios e Boss"
        >
          {/* Base da mesa */}
          <rect x="205" y="145" width="95" height="8" fill="#694C35" />
          <rect x="215" y="153" width="8" height="45" fill="#523925" />
          <rect x="285" y="153" width="8" height="45" fill="#523925" />

          {/* Cadeira de madeira */}
          <rect x="235" y="150" width="28" height="6" fill="#3D2B1D" />
          <rect x="246" y="156" width="6" height="42" fill="#2E2015" />

          {/* AVATAR SENTADO ESTUDANDO */}
          {/* Tronco / Casaco */}
          <rect x="238" y="128" width="22" height="26" fill="#6798C0" />
          {/* Cabeça */}
          <rect x="241" y="112" width="16" height="16" fill="#F2C49B" />
          {/* Cabelo Castanho em pixel art */}
          <rect x="239" y="108" width="20" height="8" fill="#3D2314" />
          <rect x="238" y="114" width="5" height="12" fill="#3D2314" />
          {/* Braço debruçado sobre a mesa */}
          <rect x="252" y="136" width="14" height="7" fill="#6798C0" />

          {/* Livro Aberto sobre a mesa com páginas iluminadas */}
          <polygon points="266,144 274,139 284,144 284,146 274,142 266,146" fill="#F5F3F7" />
          <rect x="274" y="140" width="1" height="5" fill="#9D97B5" />

          {/* Luminária de Mesa (Acesa à Noite) */}
          <rect x="288" y="128" width="4" height="17" fill="#9D97B5" />
          <polygon points="282,128 298,128 294,120 286,120" fill="#EBA059" />
          {timeOfDay === 'night' && (
            <polygon points="275,145 305,145 296,128 284,128" fill="rgba(235, 160, 89, 0.2)" />
          )}
        </g>

        {/* Camada global de luz atmosférica por horário */}
        <rect x="0" y="0" width="320" height="240" fill={skyColors.tint} pointerEvents="none" />
      </svg>

      {/* Rótulos discretos de orientação espacial */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}>
        <span style={{ fontSize: '0.62rem', background: 'rgba(26,24,35,0.75)', padding: '2px 6px', borderRadius: '3px' }}>
          🛌 Cama: Descanso
        </span>
        <span style={{ fontSize: '0.62rem', background: 'rgba(26,24,35,0.75)', padding: '2px 6px', borderRadius: '3px' }}>
          📅 Parede: Rotina
        </span>
        <span style={{ fontSize: '0.62rem', background: 'rgba(26,24,35,0.75)', padding: '2px 6px', borderRadius: '3px' }}>
          📖 Mesa: Boss
        </span>
      </div>
    </div>
  );
};

