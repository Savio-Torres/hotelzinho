# Hotelzinho Criativa

Hotelzinho Criativa é uma plataforma web desenvolvida para apresentar e gerenciar um hotelzinho infantil.

O projeto foi criado com o objetivo de unir uma página institucional moderna com funcionalidades administrativas simples, permitindo que responsáveis conheçam os serviços oferecidos, entendam a rotina do espaço e enviem solicitações de reserva, mensalidade ou visita.

## Sobre o projeto

O Hotelzinho Criativa funciona como um site institucional com sistema administrativo integrado.  
Na parte pública, os responsáveis podem conhecer melhor o espaço, visualizar os serviços, entender a rotina das crianças e preencher um formulário de solicitação.

Na parte administrativa, a equipe pode visualizar as solicitações recebidas, acompanhar os dados das crianças, alterar o status das reservas e organizar melhor o atendimento.

## Funcionalidades

### Página pública

- Apresentação do Hotelzinho Criativa
- Seção sobre o espaço
- Seção de serviços oferecidos
- Rotina diária das crianças
- Informações sobre funcionamento das 06h às 20h
- Divisão por faixa etária
- Formulário de solicitação
- Layout responsivo

### Formulário de solicitação

- Dados do responsável
- Dados da criança
- Data de nascimento
- Cálculo automático da idade
- Definição automática do prédio indicado
- Tipo de serviço
- Data da reserva
- Horário de chegada e saída
- Interesse em reforço escolar
- Interesse em balé
- Campo para alergias
- Campo para restrições alimentares
- Observações gerais
- Validação de telefone com DDD
- Validação de horário entre 06h e 20h

### Painel administrativo

- Login administrativo simples
- Listagem das solicitações recebidas
- Cards de resumo
- Filtro por status
- Filtro por prédio
- Filtro por data
- Campo de busca
- Alteração de status da solicitação
- Botão para contato via WhatsApp
- Exclusão de solicitações
- Controle de login com sessionStorage

## Dados reais considerados

O projeto foi baseado em uma rotina real de hotelzinho infantil, considerando:

- Funcionamento das 06h às 20h
- Café da manhã
- Almoço
- Lanche da tarde
- Janta
- Lanche do fim do dia
- Banho e higiene
- Soneca opcional pela manhã
- Soneca pós-almoço
- Recreação
- Reforço escolar
- Balé nas quartas e sextas
- Divisão das crianças por idade
- Prédio dos menores: 4 meses até 4 ou 5 anos
- Prédio dos maiores: 5 até 11 ou 12 anos

## Tecnologias utilizadas

- React
- Vite
- Tailwind CSS
- JavaScript
- LocalStorage
- SessionStorage

## Estrutura do projeto

```txt
hotelzinho-criativa/
│
├── public/
│   └── Logo-hotelzinho.png
│
├── src/
│   ├── assets/
│   │   ├── About.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ReservationForm.jsx
│   │   ├── Routine.jsx
│   │   └── Services.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
