import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-5db3a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingList = ref(database, 'Shopping List')

const CartButton = document.getElementById('add-btn')
const inputEl = document.getElementById('input-field')
const listEl = document.getElementById('shopping-list')

CartButton.addEventListener('click', () => {
    let inputValue = inputEl.value
    if (inputValue != "") {
        push(shoppingList, inputValue)
        clearInputEl()
    }
})

onValue(shoppingList, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            addToCart(itemsArray[i])
        }
    }
    else {
        listEl.innerHTML = "No items here....yet"
    }
})

function clearListEl() {
    listEl.innerHTML = ""
}

function clearInputEl() {
    inputEl.value = ''
}

function addToCart(item) {
    let itemId = item[0]
    let itemVal = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemVal
    listEl.append(newEl)

    newEl.addEventListener("click", () => {
        let locationOfItem = ref(database, `Shopping List/${itemId}`)
        remove(locationOfItem)
    })
}