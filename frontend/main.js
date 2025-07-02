// SIMULACAO DE IA SUGERINDO LIVROS COM BASE NAS EMOCOES SELECIONADS PELO USUARIO (DA PRA APLICAR DEPOIS NA API)
let sugestoesLivros = {};

fetch("livros.json")
    .then(response => response.json())
    .then(data => {
        sugestoesLivros = data;
    })
    .catch(error => {
        console.error("Erro ao carregar livros.json:", error);
    });


// DOM
const botoesEmoji = document.querySelectorAll(".emoji-option");
const sugestoesContainer = document.getElementById("sugestoesContainer");
const gridLivros = document.getElementById("gridLivros");
const modal = document.getElementById("modalAvaliacao");
const modalCapa = document.getElementById("modalCapa");
const modalTitulo = document.getElementById("modalTitulo");
const modalAutor = document.getElementById("modalAutor");
const modalEstrelas = document.getElementById("modalEstrelas");
const modalComentario = document.getElementById("modalComentario");

// CRIACAO DO MODAL DE AVALIACAO
function renderizarEstrelas(container, callback) {
    container.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        const estrela = document.createElement("span");
        estrela.innerHTML = "★";
        estrela.classList.add("estrela");
        estrela.addEventListener("click", () => {
            container.querySelectorAll(".estrela").forEach(e => e.classList.remove("ativa"));
            for (let j = 0; j < i; j++) {
                container.children[j].classList.add("ativa");
            }
            callback(i);
        });
        container.appendChild(estrela);
    }
}

// ACAO DOS BOTOES DE EMOJI
botoesEmoji.forEach(botao => {
    botao.addEventListener("click", () => {
        const humor = botao.dataset.humor;
        const livros = sugestoesLivros[humor] || [];
        gridLivros.innerHTML = "";

        livros.forEach(livro => {
            const card = document.createElement("div");
            card.className = "card-livro";
            card.innerHTML = `
                <img src="${livro.imagem}" alt="Capa do livro">
                <div class="info">
                    <div class="titulo">${livro.titulo}</div>
                    <div class="autor">${livro.autor}</div>
                    <div class="descricao">${livro.descricao}</div>
                    <div class="grupo-botoes">
                        <button class="botao-compra">Li este livro</button>
                        <button class="botao-comprar">Comprar</button>
                    </div>
                </div>
            `;

            // Botão "Comprar"
            card.querySelector(".botao-comprar").addEventListener("click", () => {
                const query = encodeURIComponent(`${livro.titulo} ${livro.autor} livro`);
                window.open(`https://www.google.com/search?q=${query}&tbm=shop`, "_blank");
            });

            // Botão "Li este livro"
            card.querySelector(".botao-compra").addEventListener("click", () => {
                abrirModal(livro);
            });

            gridLivros.appendChild(card);
        });

        sugestoesContainer.style.display = "block";
    });
});

// MODAL DE AVALIACAO
function abrirModal(livro) {
    modal.classList.add("ativo");
    modalCapa.src = livro.imagem;
    modalTitulo.innerText = livro.titulo;
    modalAutor.innerText = "por " + livro.autor;
    modalComentario.value = "";
    renderizarEstrelas(modalEstrelas, (nota) => {
        modal.dataset.nota = nota;
    });
}

// FECHA MODAL NO "X" OU ESC
window.fecharModal = function () {
    modal.classList.remove("ativo");
}

// FECHA MODAL AO CLICAR FORA
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        fecharModal();
    }
})

// SALVAR AVALIACAO AO CLICAR NO BOTAO
window.salvarModal = function () {
    const nota = modal.dataset.nota || 0;
    const comentario = modalComentario.value;
    const titulo = modalTitulo.innerText;

    fetch("http://localhost:3001/avaliacoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            livro: titulo,
            nota: nota,
            comentario: comentario
        })
    })
        .then(response => response.json())
        .then(data => {
            alert("Obrigado pela sua avaliação!");
            console.log("✅ Resposta da API:", data);
            fecharModal();
        })
        .catch(error => {
            alert("Erro ao enviar avaliação.");
            console.error("❌ Erro:", error);
        });
};

// DARK MODE
document.getElementById("toggleTema").addEventListener("click", () => {
    document.body.classList.toggle("tema-escuro");
});

// FUNCÃO PARA CARREGAR AVALIACOES
function carregarAvaliacoes() {
    fetch("http://localhost:3001/avaliacoes")
        .then(response => response.json())
        .then(avaliacoes => {
            const container = document.getElementById("listaAvaliacoes");
            container.innerHTML = "";

            if (avaliacoes.length === 0) {
                container.innerHTML = "<p>Nenhuma avaliação ainda. Seja o primeiro!</p>";
                return;
            }

            avaliacoes
                .filter(avaliacao => avaliacao.comentario && avaliacao.comentario.trim() !== "")
                .slice()
                .reverse()
                .forEach(avaliacao => {


                    const div = document.createElement("div");
                    div.classList.add("avaliacao");
                    div.innerHTML = `
                    <p><strong>Livro:</strong> ${avaliacao.livro}</p>
                    <p><strong>Nota:</strong> ${"⭐".repeat(avaliacao.nota)}</p>
                    <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
                    <hr>
                `;
                    container.appendChild(div);
                });
        });
}

// CARREGA AS AVALIACOES QUANDO A PÁGINA FOR CARREGADA
document.addEventListener("DOMContentLoaded", () => {
    carregarAvaliacoes();
});

window.carregarAvaliacoes = carregarAvaliacoes;




