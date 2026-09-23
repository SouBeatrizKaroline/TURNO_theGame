# TURNO

> **Seu dia em blocos. Sua vida no seu ritmo.**

TURNO é um protótipo funcional de jogo de rotina estudantil. Ele ajuda a visualizar o que cabe no dia, preparar uma prova, preservar energia, acompanhar gastos e reorganizar planos quando a realidade muda, sem streaks, culpa ou linguagem de fracasso.

## Sumário

- [Propósito](#propósito)
- [Problema](#problema)
- [Origem da solução](#origem-da-solução)
- [O que já funciona](#o-que-já-funciona)
- [Fluxo da experiência](#fluxo-da-experiência)
- [Demonstração](#demonstração)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Como executar](#como-executar)
- [Decisões de design](#decisões-de-design)
- [Acessibilidade](#acessibilidade)
- [Limitações atuais](#limitações-atuais)
- [Próximos passos](#próximos-passos)
- [Licença](#licença)

## Propósito

Transformar planejamento em uma experiência acolhedora de percepção e escolha. Antes do dia, o TURNO funciona como uma **bússola**, tornando limites e prioridades visíveis. Depois das ações, funciona como um **espelho**, permitindo rever familiaridade, energia e margem financeira sem converter a vida em uma nota de produtividade.

## Problema

Estudantes conciliam aulas, estágio, provas, dinheiro, sono, lazer e imprevistos. Ferramentas tradicionais frequentemente separam esses temas e tratam o plano como uma lista ideal. Quando algo muda, o atraso pode parecer falha individual. O TURNO explora outra hipótese: oferecer blocos finitos, consequências legíveis e um caminho explícito para reorganizar sem culpa.

## Origem da solução

A solução nasceu do teste de três caminhos e da comparação pelo método ROTA:

- **Sandbox Preditivo:** trouxe a visão antecipada da rotina e a percepção de gargalos antes que a semana fique inviável.
- **Deckbuilder Tático:** inspirou recursos limitados, escolhas e custos de oportunidade: ocupar um bloco significa deixar outra ação para depois.
- **Bioma Espelho:** orientou o ambiente acolhedor, o feedback visual e a linguagem não punitiva com poucas interações.

A combinação resultou em um ciclo mínimo: **perceber → escolher → agir → observar → reorganizar**.

## O que já funciona

- **Quarto como hub:** cenário 2D em Cozy Pixel Art, com atalhos interativos e atmosferas de manhã, tarde e noite.
- **Blocos do Dia:** compromissos organizados por turno, com ações de concluir, adiar e remover; adiamento é tratado como reorganização.
- **Montar meu dia:** criação de atividades próprias com título, horário, turno e marcação de compromisso fixo.
- **Desafio acadêmico:** o Enigma de Estrutura de Dados reúne tópicos com familiaridade Nebuloso, Razoável ou Firme.
- **Sessão de foco:** cronômetro de 25 minutos com pausa, conclusão antecipada e check-in qualitativo ao final.
- **Três potes financeiros:** Essenciais, Flexível e Reserva, com registro rápido de gastos.
- **Começo de semana:** introdução guiada para definir o nome do turno e o orçamento inicial de cada pote, todos começando com gasto zero.
- **Nova semana:** a Caixa permite reabrir a configuração e ajustar os limites sem apagar o conceito de registro da semana anterior.
- **Tudo Mudou:** fluxo de resgate que reorganiza tarefas flexíveis e protege energia, sem apagar compromissos fixos.
- **Estado compartilhado:** uma sessão de foco atualiza o tópico e a tarefa correspondente; um gasto atualiza o pote e o HUD.

## Fluxo da experiência

```text
Quarto
├── Calendário → Blocos do Dia → concluir ou adiar
├── Mesa ──────→ Desafio → escolher tópico → Foco → check-in
├── Cofrinho ──→ Três potes → registrar gasto
├── Tudo Mudou → reorganizar tarefas flexíveis
└── retorno ao Quarto
```

## Demonstração

Para percorrer a vertical slice completa:

1. altere o turno no topo e observe a iluminação do Quarto;
2. abra **Blocos** e conclua ou adie uma atividade;
3. abra **Desafios**, selecione **Árvores Binárias** e inicie o foco;
4. conclua a sessão e informe como o conteúdo ficou;
5. abra **Caixa**, registre R$ 10 no pote Flexível;
6. use **Tudo Mudou** para reorganizar o restante do dia;
7. volte ao Quarto.

> A pasta `docs/screenshots/` está preparada para receber capturas da versão publicada sem misturar arquivos de interface com o código-fonte.

## Tecnologias

- React
- TypeScript
- Vite
- SVG e CSS para a arte e a interface
- ESLint
- GitHub Actions

Não há backend, autenticação, rastreamento ou dependência de dados pessoais nesta versão.

## Arquitetura

```text
turno/
├── .github/workflows/quality.yml
├── docs/screenshots/
├── src/
│   ├── components/
│   │   ├── boss/       # desafio acadêmico
│   │   ├── finance/    # potes e gastos
│   │   ├── focus/      # cronômetro e check-in
│   │   ├── planner/    # blocos e tarefas
│   │   ├── room/       # hub visual e hotspots
│   │   ├── BottomNavigation.tsx
│   │   ├── RescueModal.tsx
│   │   └── ResourceHUD.tsx
│   ├── App.tsx         # estado e integração da vertical slice
│   ├── index.css       # tokens visuais e estilos globais
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── vite.config.ts
├── LICENSE
└── README.md
```

A aplicação usa estado local no componente principal. Os módulos recebem dados e ações por propriedades, deixando explícita a relação entre planejamento, estudo e finanças.

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
git clone https://github.com/SouBeatrizKaroline/TURNO_theGame.git
cd TURNO_theGame
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite. Para validar a versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

## Decisões de design

- **Blocos, não minutos:** reduz microgerenciamento e destaca capacidade limitada.
- **Sem sequência punitiva:** não existem streaks, perda de pontos por adiamento ou mensagens de culpa.
- **Familiaridade qualitativa:** o check-in descreve a relação com o conteúdo; não prevê nota ou aprovação.
- **Compromissos fixos continuam visíveis:** o fluxo Tudo Mudou reorganiza prioridades sem fingir que prazos reais desapareceram.
- **Pixel art em código:** o quarto e o monumento são SVGs, leves e versionáveis, sem imagens externas obrigatórias.
- **Mobile first:** a experiência foi desenhada para uma interação curta durante uma semana corrida.

## Acessibilidade

- HTML em português e estrutura semântica com `header`, `main` e `nav`.
- Botões e hotspots com rótulos acessíveis.
- Informações não dependem apenas da cor: texto, ícones e estados acompanham o feedback visual.
- Tipografia de leitura separada da fonte pixel usada em títulos.
- Controles grandes e fluxo utilizável por teclado.
- Mensagens diretas, acolhedoras e sem penalização por mudança de plano.
- Respeito à preferência de movimento reduzido nos estilos globais.

## Limitações atuais

- É uma vertical slice com cenário e dados demonstrativos, não um produto concluído.
- O estado ainda não é persistido entre recarregamentos.
- Não há criação livre de tarefas, datas reais, notificações ou sincronização com calendário.
- Finanças são um registro manual simplificado, sem integração bancária.
- O Quarto muda conforme o período, mas ainda reage pouco às decisões tomadas nos outros módulos.
- A familiaridade agregada do desafio é uma representação lúdica derivada de autoavaliação, não uma medida científica.
- A proposta precisa ser validada com estudantes reais, incluindo pessoas neurodivergentes e usuárias de tecnologias assistivas.
- A personalização atual começa pelos blocos; edição avançada de atividades, tópicos, nome do dia e limites dos potes ainda é uma próxima camada.
- O onboarding não é uma orientação financeira: os valores são definidos pela própria pessoa e servem apenas para organização pessoal.

## Próximos passos

1. validar clareza, atrito e sensação de jogo com estudantes reais;
2. conectar escolhas a consequências visuais mais perceptíveis no Quarto;
3. tornar custo de oportunidade explícito ao ocupar ou mover um bloco;
4. permitir configurar blocos, prazos e potes sem aumentar a burocracia;
5. adicionar persistência local com controles claros para exportar ou apagar dados;
6. testar contraste, zoom, leitor de tela, teclado e movimento reduzido;
7. publicar uma demonstração web e registrar screenshots no repositório.

## Licença

Distribuído sob a licença [MIT](LICENSE).
