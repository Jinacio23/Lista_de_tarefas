const addBtn = document.getElementById('addItem')
const clearAll = document.getElementById('clearAll')
const lista = document.getElementById('lista')
const checkBox = document.querySelector('.checkedSide')
const input = document.querySelector('.inputText')
let titleInput;
//let editButton;
let armazenamento = [];

//Adicionar um titulo a anotação ainda pendente
checkBox.style.display = 'none'
document.querySelector('.title').style.color = 'transparent'

document.addEventListener('DOMContentLoaded', () => {
    carregarLocalStorage()
})

// criar elementos da lista
function criarElemento() {
    const li = document.createElement('li')

    //controle de saida
    if (checkBox.checked) {
        titleInput = document.querySelector('.titleInput').value

        if (titleInput != "") {
            li.setAttribute("class", "li1")
            li.innerHTML = `<h2>${titleInput}</h2><button onclick="excluir(this)"><i class="bi bi-x"></i></button><button class="editBtn"><i class="bi bi-pencil-square"></i></button><hr><p class="textNote">${input.value}</p>`
        } else {
            li.setAttribute("class", "li2")
            li.innerHTML = `<p class="textNote">${input.value}</p><button onclick="excluir(this)"><i class="bi bi-x"></i></button><button class="editBtn"><i class="bi bi-pencil-square"></i></button>`
        }
    } else {
        li.setAttribute("class", "li2")
        li.innerHTML = `<p class="textNote">${input.value}</p><button onclick="excluir(this)"><i class="bi bi-x"></i></button><button class="editBtn"><i class="bi bi-pencil-square"></i></button>`
    }

    titleInput = document.querySelector('.titleInput')
    //let titulo = `${titleInput.value}`
    let texto = `${input.value}`

    atualizarLocalStorage(texto)

    lista.appendChild(li)
    input.value = ''
    //titleInput.value = ''
}

checkBox.onclick = () => {
    let title = document.querySelector('.title')
    if (checkBox.checked == true) {
        title.innerHTML = '<input type="text" class="titleInput"></input>'
    } else {
        title.innerHTML = ' <p class="title">Adicionar titulo</p>'
    }
}

//tecla de atalho
input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        criarElemento()
    }
})

//limpar um único elemento
function excluir(limpar) {
    const itens = document.querySelectorAll('li')

    for (const item of itens) {
        if (item.childNodes[1].isSameNode(limpar)) {
            item.classList.add('clear')
            setTimeout(() => {
                item.remove()
            }, 500)
            removerDoLocalStorage(item.innerText)
        }
    }
}

//excluir tudo
clearAll.onclick = () => {
    const itens = document.querySelectorAll('li')

    for (const item of itens) {
        item.classList.add('clear')
        setTimeout(() => {
            item.remove()
        }, 500)

        removerDoLocalStorage(item)
    }
}

//Atualizar localStorage
function atualizarLocalStorage(p) {
    let anotacao = {
        texto: `${p}`
    }

    if (localStorage.itens) {
        armazenamento = JSON.parse(localStorage.getItem('itens'))
    }
    armazenamento.push(anotacao)

    localStorage.itens = JSON.stringify(armazenamento)
}

//Remover do localStorage
function removerDoLocalStorage(item) {
    armazenamento = JSON.parse(localStorage.getItem('itens'))
    let indexItem;

    armazenamento.forEach(objeto => {

        if(objeto.texto.includes(item)){
            indexItem = armazenamento.indexOf(objeto)
        }else {
            
        }

    });

    armazenamento.splice(indexItem, 1)

    localStorage.itens = JSON.stringify(armazenamento)
}

function carregarLocalStorage() {
    if (localStorage.itens) {
        armazenamento = JSON.parse(localStorage.getItem('itens'))
    }

    armazenamento.forEach(anotacao => {
        const li = document.createElement('li')

        li.setAttribute("class", "li2")
        li.innerHTML = `<p class="textNote">${anotacao.texto}</p><button onclick="excluir(this)"><i class="bi bi-x"></i></button><button class="editBtn"><i class="bi bi-pencil-square"></i></button>`

        lista.appendChild(li)
    })
}
