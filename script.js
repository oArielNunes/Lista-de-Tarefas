//selecionando as classes do input, botão e ul//
const inputTarefa = document.querySelector('.inputTarefa');
const bAddTarefa = document.querySelector('.bAddTarefa');
const tarefas = document.querySelector('.tarefas');

//função que cria li//

function criaLi() {
    const li = document.createElement('li')
    return li;
}

//selecionando a ação de pressionar o botão "enter" e usando-o para enviar o valor do input//

inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

//função que limpa o valor de input e o deixa em 'focus'//

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//função que cria o botão de apagar//

function criaBApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar Tarefa');
    li.appendChild(botaoApagar);
}

//função que cria tarefa//
function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBApagar(li);
    salvar();
}

//selecionando a ação de click no botão e retornando o valor do input// 

bAddTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});
document.addEventListener('click', function(e) {
    const el = e.target;
  
    if (el.classList.contains('apagar')) {
      el.parentElement.remove();
      salvar();
    }
  });

// função que salva a tarefa no localstorage, transforma ela em array e apaga o valor de txt do button//
function salvar() {
    const litarefas = tarefas.querySelectorAll('li');
    const lista = [];

    for (let tarefa of litarefas) {
        let tarefaTxt = tarefa.innerText;
        tarefaTxt = tarefaTxt.replace('Apagar', ' ').trim();
        lista.push(tarefaTxt);
    }
    const tJSON = JSON.stringify(lista);
    localStorage.setItem('tarefas', tJSON);

}

// função que adiciona as tarefas salvas à ul novamente//

function addTSalva() {
    const t = localStorage.getItem('tarefas');
    const list = JSON.parse(t);

    for (let t of list) {
        criaTarefa(t);
    }
}
addTSalva();
