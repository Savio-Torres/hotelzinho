# Pousada Aconchego - Sistema Web para Hotelzinho Infantil

Sistema web desenvolvido para apresentar a **Pousada Aconchego**, um hotelzinho infantil com funcionamento das **06h às 20h**, oferecendo informações sobre serviços, rotina, estrutura, solicitações, portal dos responsáveis e painel administrativo.

O projeto foi criado com foco em uma experiência visual acolhedora, profissional e organizada, usando React no front-end e armazenamento temporário via `localStorage`.

---

## Visão geral

A aplicação possui uma área pública para visitantes, uma área de solicitação para responsáveis, um portal dos responsáveis e um painel administrativo para gerenciamento das informações.

O sistema permite simular um fluxo real de atendimento:

```txt
Visitante acessa o site
↓
Responsável faz uma solicitação
↓
Admin avalia a solicitação
↓
Admin confirma, cancela ou finaliza
↓
Sistema cria assinatura/cobrança automaticamente quando necessário
↓
Responsável acompanha tudo pelo portal
