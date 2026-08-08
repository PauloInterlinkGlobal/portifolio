# GUIA DE CONFIGURAÇÃO DO GOOGLE ADSENSE & MONETIZAÇÃO

Este documento explica passo a passo como configurar, testar e publicar o sistema de anúncios no seu portfólio web usando o **Google AdSense** (ou redes alternativas).

---

## 1. Como Criar uma Conta no Google AdSense
1. Acesse o site oficial do [Google AdSense](https://www.google.com/adsense/start/).
2. Faça login com sua conta do Google.
3. Insira o URL completo do seu site/portfólio publicado (ex: `https://meuportfolio.com` ou seu link de produção).
4. Aceite os termos de serviço e conclua o cadastro.

---

## 2. Como Adicionar seu Site no AdSense
1. No painel do AdSense, vá para a seção **Sites** (Sites).
2. Clique em **Adicionar site** e insira o domínio do seu portfólio.
3. O Google fornecerá um script de verificação de propriedade ou solicitará a revisão do site.
4. Aguarde a aprovação oficial do domínio pelo Google (geralmente leva de 24h a alguns dias).

---

## 3. Como Obter seu Publisher ID (ID de Cliente)
1. No painel do AdSense, vá para **Conta** -> **Informações da conta**.
2. Procure pelo campo **ID do editor** (Publisher ID).
3. O código possui o formato: `ca-pub-XXXXXXXXXXXXXXXX` (ex: `ca-pub-1234567890123456`).

---

## 4. Onde Inserir o Publisher ID no Projeto
Abra o arquivo `.env` (ou crie um a partir do `.env.example`) na raiz do seu projeto e preencha a variável:

```env
VITE_ADSENSE_CLIENT_ID="ca-pub-1234567890123456"
```

---

## 5. Como Criar Blocos de Anúncios (Ad Slots)
1. No painel do AdSense, acesse **Anúncios** -> **Por bloco de anúncios** (By ad unit).
2. Escolha o formato **Anúncios de display** (Display ads).
3. Selecione o tamanho como **Responsivo** (Responsive).
4. Dê um nome identificável ao bloco (ex: `Portfolio - Entre Secoes`, `Portfolio - Antes do Rodape`).
5. Clique em **Criar**.
6. O AdSense gerará o código HTML onde você poderá copiar o valor de `data-ad-slot="XXXXXXXXXX"`.

---

## 6. Onde Inserir os Ad Slots no Projeto
No seu arquivo `.env`, adicione os IDs gerados para cada posição:

```env
# ID do Bloco entre as seções "Sobre" e "Habilidades"
VITE_AD_SLOT_BETWEEN_SECTIONS="1234567890"

# ID do Bloco no final da página (Antes do Rodapé)
VITE_AD_SLOT_BEFORE_FOOTER="0987654321"

# ID do Bloco no meio da área de Projetos/Serviços
VITE_AD_SLOT_PROJECTS="1122334455"
```

---

## 7. Como Ativar ou Desativar os Anúncios Globalmente
Para ativar ou desativar rapidamente o sistema de anúncios sem alterar o código, altere no `.env`:

* **Ativar anúncios:**
  ```env
  VITE_ADS_ENABLED="true"
  ```

* **Desativar anúncios:**
  ```env
  VITE_ADS_ENABLED="false"
  ```

---

## 8. Como Testar Localmente
Em ambiente de desenvolvimento (`npm run dev`):
* Se as variáveis contiverem IDs fictícios ou estiverem vazias, o sistema exibirá automaticamente um **Card de Demonstração (Cyberpunk Dev Placeholder)** que simula o espaço publicitário sem fazer chamadas ao servidor do Google e sem gerar erros no console.
* Se você desejar testar o comportamento de produção localmente, insira suas credenciais reais no `.env`.

---

## 9. Como Publicar em Produção
1. Configure as variáveis de ambiente na plataforma de hospedagem (ex: Vercel, Netlify, Cloud Run, Cloudflare Pages, GitHub Actions):
   - `VITE_ADS_ENABLED=true`
   - `VITE_ADSENSE_CLIENT_ID=ca-pub-SuaChaveReal`
   - `VITE_AD_SLOT_BETWEEN_SECTIONS=SeuSlot1`
   - `VITE_AD_SLOT_BEFORE_FOOTER=SeuSlot2`
   - `VITE_AD_SLOT_PROJECTS=SeuSlot3`
2. Faça o build e deploy da aplicação (`npm run build`).
3. Em produção, se as credenciais forem válidas e aprovadas, o AdSense carregará automaticamente os anúncios. Caso contrário, nenhum anúncio ou placeholder será exibido para o visitante.

---

## 10. Arquitetura Multi-Redes (Expansões Futuras)
A infraestrutura criada suporta trocar de rede de publicidade através da variável `VITE_AD_NETWORK`:

```env
# Opções disponíveis: 'google_adsense' | 'adsterra' | 'propellerads'
VITE_AD_NETWORK="google_adsense"
```

O sistema utilizará a arquitetura modular em `src/components/ads/AdBanner.tsx` para direcionar a renderização sem necessidade de alterar as seções ou páginas do portfólio.
