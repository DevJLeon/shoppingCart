const $openShopping = document.querySelector(".shopping");
const $closeShopping = document.querySelector(".closeShopping");
const $list = document.querySelector(".list");
const $listCard = document.querySelector(".listCard");
const $body = document.querySelector("body");
const $total = document.querySelector(".total");
const quantity = document.querySelector(".quantity");

$openShopping.addEventListener("click", ()=>{
    $body.classList.add("active");
});
$closeShopping.addEventListener("click", ()=>{
    $body.classList.remove("active");
});

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '2.jpg',
        price: 120000
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.jpg',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.jpg',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.jpg',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.jpg',
        price: 120000
    }
];

let listCards = [];

function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        $list.appendChild(newDiv);
    })
}

initApp();

function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){
    $listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                $listCard.appendChild(newDiv);
        }
    })
    $total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}