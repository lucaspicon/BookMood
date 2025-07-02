<p align="center">
  <img src="./frontend/Banner BookMood.png" alt="Capa BookMood" width="100%">
</p>

<h1 align="center">BookMood</h1>

<p align="center">
  <img src="https://img.shields.io/badge/vers%C3%A3o-1.0.0-4c3cff?style=flat-square" />
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/feito%20com-%F0%9F%96%A4%20e%20%F0%9F%93%98-4c3cff?style=flat-square" />
</p>

<p align="center">
  <em>✨ Um livro certo no momento certo muda tudo ✨</em><br>
  Sistema de recomendação literária baseado nas suas emoções.
</p>

O BookMood é uma aplicação web que recomenda livros com base no seu estado emocional e permite que os usuários deixem avaliações com comentários e estrelas. Totalmente acessível, responsiva e com back-end em Node.js + SQLite, o projeto promove uma experiência literária personalizada e empática. Futuramente, com a implantação de IA para recomendações, bem como avaliação das avaliações em conjunto com a IA, podemos criar uma espécie de comunidade empática voltada a literatura, ainda mais no cenário atual onde o nível de leitores brasileiro vem caindo consideravelmente.

A aplicação foi pensada inicialmente para a minha esposa, uma leitora "compulsiva" que tem dificuldades de achar o próximo livro bem como organizar os já lidos, partindo desse princípio cheguei no resultado aqui apresentado.

## Funcionalidades (versão 1.0.0)

<p align="center">
  <img src="./frontend/demoBookMood.gif" alt="Demonstração do BookMood" width="100%">
</p>

- Recomendação de livros com base no humor do usuário (ex: animado, introspectivo, etc.)
- Rating com nota de 1 a 5 estrelas + comentário/obs
- Interface leve com dark mode
- Validação de dados no backend
- Banco de dados relacional com SQLite
- Arquitetura modular usando `controllers/` e `routes/`
- Acessibilidade pensada para daltonismo (sou daltonico) e contraste visual

## Tecnologias utilizadas

| Camada      | Tecnologias                                    |
|-------------|------------------------------------------------|
| Front-end   | HTML, CSS, JavaScript                          |
| Back-end    | Node.js, Express.js, SQLite3                   |
| Banco       | SQLite local (`bookmood.db`)                   |
| Layout      | Responsivo, com dark mode e contraste adaptado |
| Extras      | JSON (`livros.json`) com curadoria literária   |


---

## Para roda-lo localmente

Clone o repositório

```bash
git clone https://github.com/lucaspicon/bookmood.git
cd bookmood

cd backend
npm install
node server.js

