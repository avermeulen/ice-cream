import "./style.css"


function radioButtonList(name, list) {
    return list.map(
        f => `<li> 
                <input type="radio" name="${name}" value="${f.price}" data-description="${f.price}" data-price="${f.price}" />
                <label >${f.name} @ ${f.price}</label>
            </li>`
    ).join('')
}

function toppingsList(toppings) {
    return toppings
            .map(t => `<li data-type="topping" >
        <input type="checkbox" id="${t.name}" value="${t.name}" data-topping="${t.name}" data-price="${t.price}" >
        <label for="${t.name}" >${t.name} @ ${t.price}</label>
    </li>`).join('');
}


function setup(data) {
    data.json().then(data => {

        const { toppings, flavours, containers } = data;

        const toppingsHtml = toppingsList(toppings);
        const flavoursHTML = radioButtonList("flavour", flavours);
        const containersHTML = radioButtonList("container", containers);

        document.querySelector('.toppings').innerHTML = toppingsHtml;
        document.querySelector('.flavours').innerHTML = flavoursHTML;
        document.querySelector('.containers').innerHTML = containersHTML;


    })
}

fetch("./data.json").then(setup)

let selectedFlavour = {

};
let selectedContainer = {

};

let selectedToppings = [];

function totalPrice() {
    let total = 0;
    const toppingsTotal = selectedToppings.reduce((total, current) => total += Number(current.price), 0)
    console.log(selectedToppings.length);

    total += toppingsTotal;

    if (selectedContainer.price) {
        total += selectedContainer.price;
    }

    if (selectedFlavour.price) {
        total += selectedFlavour.price;
    }

    return total;
}

function showTotal() {
    document.querySelector(".total").innerHTML = totalPrice().toFixed(2);
}

function toppingChange(event) {
    const { topping, price } = event.target.dataset;

    if (event.target.checked) {
        const storedTopping = selectedToppings.find(st => st.topping === topping);
        if (!storedTopping) {
            selectedToppings.push({
                topping, price
            });
        }
    } else {
        selectedToppings = selectedToppings.filter(st => st.topping != topping)
    }

    console.log(selectedToppings);

    showTotal();
}

function flavourChange(event) {
    const { description, price } = event.target.dataset;

    selectedFlavour = {
        flavour: description,
        price: Number(price)
    }

    showTotal();
}

function containerChange(event) {
    const { description, price } = event.target.dataset;
    selectedContainer = {
        container: description,
        price: Number(price)
    }
    showTotal()
}

window.flavourChange = flavourChange;
window.containerChange = containerChange;
window.toppingChange = toppingChange;