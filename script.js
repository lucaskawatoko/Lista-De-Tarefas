const listaDeTarefas = document.getElementById("lista-de-tarefas");
const novaTarefa = document.getElementById("nova-tarefa");
const titulo = document.querySelector("h1");

// adiciona o efeito no título
window.addEventListener("load", function() {
  let i = 0;
  let tituloTexto = titulo.textContent;
  titulo.textContent = "";
  const intervalId = setInterval(function() {
    if (i < tituloTexto.length) {
      titulo.textContent += tituloTexto.charAt(i);
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, 200);
});

// verifica se há dados salvos no armazenamento local e os carrega na lista de tarefas
if (localStorage.getItem("tarefas")) {
  listaDeTarefas.innerHTML = localStorage.getItem("tarefas");
  if (listaDeTarefas.children.length > 0) {
    listaDeTarefas.style.display = "block";
  }
}

function adicionarTarefa() {
  if (novaTarefa.value === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const novaTarefaElemento = document.createElement("li");
  novaTarefaElemento.innerHTML = `
    <span class="tarefa">${novaTarefa.value}</span>
    <button class="editar" onclick="editarTarefa(this)">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button class="remover" onclick="removerTarefa(this)">
      <i class="fas fa-trash"></i>
    </button>
    <button class="concluir" onclick="concluirTarefa(this)">
      <i class="fas fa-check fa-inverse"></i>
    </button>
  `;
  listaDeTarefas.appendChild(novaTarefaElemento);

  novaTarefa.value = "";

  if (listaDeTarefas.children.length > 0) {
    listaDeTarefas.style.display = "block";
  }

  // salva a lista de tarefas no armazenamento local
  localStorage.setItem("tarefas", listaDeTarefas.innerHTML);
}

function editarTarefa(botaoEditar) {
  const tarefa = botaoEditar.parentElement.querySelector(".tarefa");
  const novoTexto = prompt("Insira o novo texto da tarefa:", tarefa.textContent);
  if (novoTexto === null || novoTexto === "") {
    return;
  }
  tarefa.textContent = novoTexto;

  // salva a lista de tarefas no armazenamento local
  localStorage.setItem("tarefas", listaDeTarefas.innerHTML);
}

function removerTarefa(botaoRemover) {
  if (confirm("Tem certeza que deseja remover esta tarefa?")) {
    botaoRemover.parentElement.remove();
  }
  if (listaDeTarefas.children.length === 0) {
    listaDeTarefas.style.display = "none";
  }

  // salva a lista de tarefas no armazenamento local
  localStorage.setItem("tarefas", listaDeTarefas.innerHTML);
}

function concluirTarefa(botaoConcluir) {
  const tarefa = botaoConcluir.parentElement.querySelector(".tarefa");
  const fundo = tarefa.parentElement;
  tarefa.classList.toggle("concluida");
  botaoConcluir.classList.toggle("ativo");
  if (botaoConcluir.classList.contains("ativo")) {
    fundo.style.backgroundColor = "#8BC34A"; // verde
  } else {
    fundo.style.backgroundColor = ""; // volta à cor original
  }
  // salva a lista de tarefas no armazenamento local
  localStorage.setItem("tarefas", listaDeTarefas.innerHTML);
}

// adiciona o evento de pressionar a tecla "Enter" para adicionar uma tarefa
novaTarefa.addEventListener("keypress", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});
