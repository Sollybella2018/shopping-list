const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');

let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDom(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value.trim();

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //check for edit mode 
    if (isEditMode){
        const itemToEdit = itemList.querySelector('edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else {
        if (checkItemExists(newItem)) {
            alert('That item already exists');
            return;
        }
    }

    // Create item DOM element
    addItemToDom(newItem);

    // Add item to local storage
    addItemsToStorage(newItem);

    checkUI();
    itemInput.value = '';
}

function addItemToDom(item) {
    // Create a new list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemsToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e);
    }else {
        setItemToEdit(e.target);
    }
}

function checkItemExists(item){
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
        
}

function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    itemInput.value = item.textContent.trim();
    formBtn.style.backgroundColor = '#228B22';
}


function removeItem(e) {
    e.target.parentElement.parentElement.remove();

    // Remove item from storage
    removeItemFromStorage(e.target.parentElement.parentElement.textContent.trim());

    checkUI();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    checkUI();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {

    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;

}

// Initialize app
function init() {
    // Event listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();

//const intervallId = setInterval(myCallback, 1000,'Hello');

//function myCallback(a){
    //console.log(a,Date.now());

//};

let intervalId ;
function startChange (){
    if(!intervalId){
        intervalId= setInterval(changeRandomColor,1000);

    }
}

//function changeColor(){
   // if (document.body.style.backgroundColor !== 'black'){
       // document.body.style.backgroundColor = 'black';
       // document.body.style.color = 'white';
    //}else {
      //  document.body.style.backgroundColor = 'white';
       // document.body.style.color = 'black';
    //}

//}

function changeRandomColor(){
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;

}

function stopChange(){
    clearInterval(intervalId);
}

document.getElementById('stop').addEventListener('click',stopChange);
document.getElementById('start').addEventListener('click', startChange);


//setTimeout(changeText, 2000);

//function changeText(){
    //document.querySelector('h1').textContent = 'Hello from callback';

//}

