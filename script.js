const addBtn = document.getElementById('addItem')
const clearAll = document.getElementById('clearAll')
const lista = document.getElementById('lista')
const checkBox = document.querySelector('.checkedSide')
const input = document.querySelector('.inputText')
let titleInput;
//let editButton;

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
    if(e.keyCode === 13) {
        criarElemento()
    }
})

// criar elementos da lista
function criarElemento() {

    const li = document.createElement('li')

    //controle de saida
    if (checkBox.checked == true) {
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

    //atualizarStorage()

    titleInput = document.querySelector('.titleInput')
    
    lista.appendChild(li)
    input.value = ''
    if (titleInput.value != "") {
        titleInput.value = ''
    } else {return}
}

//limpar um único elemento
function excluir(limpar) {
    const itens = document.querySelectorAll('li')

    for (const item of itens) {
        if (item.childNodes[1].isSameNode(limpar)) {
            item.classList.add('clear')
            setTimeout(() => {
                item.remove()
            }, 500) 
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
    }
}

//editar elemento
// editButton = document.querySelector('.editBtn')
// editButton.onclick = () => {
//     alert()
// }  talvez id funcione


//atualizar local storage   ----> fazer tbm botão de tarefa concluida
// let itensLista = lista.childNodes

// let atualizarStorage = () => {
//     localStorage.setItem('itemDaLista',JSON.stringify(itensLista))
// }

// let recuperarStorage = () => {
//     lista.innerHTML = JSON.parse(localStorage.getItem('itemDaLista'))
// }

// console.log(localStorage.getItem('itemDaLista'))
