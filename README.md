This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

Com base no documento fornecido, segue uma documentação completa em estilo Postman, pronta para ser usada como `README.md` no projeto frontend do sistema **InterASD – A Igreja Interagindo**:

---

# 📘 InterASD – A Igreja Interagindo

Sistema de atendimento digital durante os cultos e programações da igreja, baseado na leitura de QR Codes que direcionam os fiéis a um formulário categorizado. Cada interação gera uma fila de atendimento, otimizando o cuidado com os membros e visitantes.

---

## 📌 Sumário

* [Visão Geral](#visão-geral)
* [Funcionamento do QRCode](#funcionamento-do-qrcode)
* [Categorias do Formulário](#categorias-do-formulário)
* [Fluxo de Atendimento](#fluxo-de-atendimento)
* [API REST - Endpoints](#api-rest---endpoints)

  * [🔑 Autenticação](#-autenticação)
  * [📋 Formulários](#-formulários)
  * [👤 Usuário](#-usuário)
  * [🛠️ Administrador](#️-administrador)
* [🧩 Relacionamentos e Estrutura](#-relacionamentos-e-estrutura)
* [📎 Observações](#-observações)

---

## 📖 Visão Geral

Durante os cultos, um QR Code será projetado em momentos estratégicos. Ao escanear, o membro é direcionado a um formulário já identificado com a igreja de origem, permitindo um atendimento automático e personalizado.

---

## 📲 Funcionamento do QRCode

* QR Code é projetado durante o culto ou fixado no ambiente físico (acrílicos nos bancos, murais).
* Ao escanear, o formulário já vem com o ID da igreja (`nu_igreja`) associado.
* O formulário pode ser preenchido conforme a necessidade do membro e enviado.
* A resposta gera uma **interação** que entra na fila da igreja.
* Um **gestor ou pastor** é responsável por distribuir ações aos **departamentais**.

---

## 🧾 Categorias do Formulário

Cada formulário pode conter dados de diferentes categorias. Veja os principais campos:

### 1. Espiritual

* `no_detalhe` – string(500)
* `ic_apoio_espiritual` – string(1) de 1 a 5

### 2. Emocional e Apoio

* `ic_pessoa_apoio` – 'S' ou 'N'
* `no_areas` – string(500)
* `no_solicitante`, `no_email`, `no_telefone`, `no_endereco`, `de_observacoes`

### 3. Sociais e Conexão

* `ic_visita_pastoral` – 'S' ou 'N'
* `ic_pessoa_apoio` – 'S' ou 'N'
* `no_email`, `no_telefone`, `no_endereco`, `de_observacoes`

### 4. Materiais e Práticas

* `ic_necessidade_pratica` – 'S' ou 'N'
* `no_necessidade`, `no_telefone`
* `ic_precisa_apoio` – 'S' ou 'N'
* `no_detalhe_apoio`

### 5. Crescimento e Desenvolvimento

* `no_detalhe_ministerio`, `no_desejo_envolver`

### 6. Feedback dos Cultos

* `ic_feedback_cultos` – valores de 1 a 5
* `no_detalhe_feedback` – string(500)

---

## 🔄 Fluxo de Atendimento

1. Usuário envia o formulário com dados.
2. Gera-se uma **interação** vinculada à igreja.
3. Vai para a **fila de atendimento**.
4. O gestor encaminha para um **responsável** (departamento ou pastor).
5. Cada responsável pode adicionar **ações** no histórico.

---

## 🧪 API REST – Endpoints

### 🔑 Autenticação

`POST /api/login`

**Body:**

```json
{
  "no_email": "usuario@example.com",
  "no_senha": "senha_usuario"
}
```

**Response:**

```json
{
  "token": "<jwt_token>",
  "usuario": {
    "nu_usuario": 1,
    "nu_perfil": 1,
    "no_solicitante": "Nome do Usuário",
    "no_email": "usuario@example.com",
    "no_telefone": "(00) 00000-0000"
  }
}
```

---

### 📋 Formulários

#### Criar nova interação/formulário

`POST /api/formulario`

**Body:**

```json
{
  "nu_igreja": 1,
  "usuario": {
    "no_solicitante": "Usuário",
    "nu_perfil": 4,
    "no_email": "usuario@example.com",
    "no_telefone": "11999999999",
    "no_endereco": "Rua Exemplo, 123"
  },
  "formularios": [
    {
      "categoria": "Espiritual",
      "detalhes": [
        {
          "nu_tipo_pergunta": "Pelo que posso orar por você?",
          "resposta": "Minha família"
        }
      ]
    }
  ]
}
```

**Response:**

```json
{
  "nu_interacao": 101,
  "mensagem": "Formulário enviado com sucesso!",
  "dt_interacao": "2024-05-30T12:00:00"
}
```

---

#### Consultar formulário específico

`GET /api/formulario/{nu_interacao}`

**Header:**

```http
Authorization: Bearer <token>
```

---

### 👤 Usuário

#### Consultar interações do usuário

`GET /api/usuario/interacoes`

**Header:**

```http
Authorization: Bearer <token>
```

**Response:** Lista de interações com formulários e ações.

---

### 🛠️ Administrador

#### Consultar interações por igreja

`GET /api/admin/interacoes/{nu_igreja}`

**Header:**

```http
Authorization: Bearer <token>
```

---

#### Atualizar status do atendimento

`PATCH /api/admin/interacoes/{nu_interacao}`

**Body:**

```json
{
  "status": "Em atendimento",
  "nu_responsavel": 3
}
```

**Response:**

```json
{
  "nu_interacao": 100,
  "status": "Em atendimento",
  "responsavel": {
    "nu_responsavel": 3,
    "no_responsavel": "Ancião Paulo"
  },
  "dt_alteracao": "2024-05-30T10:20:00"
}
```

---

## 🧩 Relacionamentos e Estrutura

* **Igreja** possui múltiplas **interações**
* Cada **interação** pertence a um **usuário**
* Uma **interação** possui múltiplos **formulários**
* Cada **formulário** possui **detalhes**
* Cada interação gera uma **fila de atendimento**
* A fila possui um **responsável** e **ações registradas**

---

## 📎 Observações

* Todos os campos de email e telefone são espelhados entre categorias para evitar repetição.
* O campo `nu_perfil` define o tipo de usuário:

  * `1`: Admin
  * `2`: Gestor da Igreja (Pastor/Ancião)
  * `3`: Departamental
  * `4`: Usuário comum

---

## 📦 API de CEP recomendada

Consulta automática de endereço via CEP:

`https://viacep.com.br/ws/{cep}/json`

Exemplo:

```bash
https://viacep.com.br/ws/87130000/json
```

---

Esse `README.md` está pronto para ser incluído no projeto frontend do InterASD.

Se quiser, posso gerar o arquivo `.md` diretamente para download. Deseja isso?
