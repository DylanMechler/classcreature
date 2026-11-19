/**
 * @param {import('knex').Knex} knex
 */

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: '/data/app.sqlite'
    },
});

const items = [["cheese", 5, 0, "/img/Cheese.png", "Restores Hunger"], ["toy", 5, 0, "/img/Toy.png", "Restores Entertainment"], ["candy", 5, 0, "/img/Candy.png", "Restores Happiness"]]
const constructedItems = [];
var totalPurchaseCost = 0;
var fakeDigipogs = 1000;

class item {
    constructor(type, cost, purchaseAmount){
        this.type = type;
        this.cost = cost;
        this.purchaseAmount = purchaseAmount;
    }
}

for (let i = 0; i < items.length; i++) {
    // Create item elements
    const itemContainer = document.createElement("div");
    const itemImageDisplay = document.createElement("img");
    const itemPurchaseAmountDisplay = document.createElement("p");
    const purchaseAdjustmentContainer = document.createElement("div");
    const itemPurchaseAmountIncrease = document.createElement("button");
    const itemPurchaseAmountDecrease = document.createElement("button");
    const itemListingContainer = document.getElementById("itemListing");

    // Assign image source
    itemImageDisplay.src = items[i][3];

    //Assign purchase amount: Should be 0
    itemPurchaseAmountDisplay.innerText = items[i][2];
    itemPurchaseAmountDisplay.class = "itemPurchaseAmountDisplay";
    itemPurchaseAmountDisplay.id = items[i][0] + "PurchaseAmountDisplay";

    // Create purchase adjustment buttons
    itemPurchaseAmountIncrease.innerText = "+";
    itemPurchaseAmountDecrease.innerText = "-";
    itemPurchaseAmountIncrease.id = items[i][0] + "PurchaseAmountIncrease";
    itemPurchaseAmountDecrease.id = items[i][0] + "PurchaseAmountDecrease";
    itemPurchaseAmountIncrease.addEventListener("click", (event) => {
        increasePurchaseAmount(event.target.id);
    });
    itemPurchaseAmountDecrease.addEventListener("click", (event) => {
        decreasePurchaseAmount(event.target.id);
    });
    purchaseAdjustmentContainer.appendChild(itemPurchaseAmountIncrease);
    purchaseAdjustmentContainer.appendChild(itemPurchaseAmountDecrease);

    // Combine item elements into item container
    itemContainer.appendChild(itemImageDisplay);
    itemContainer.appendChild(itemPurchaseAmountDisplay);
    itemContainer.appendChild(purchaseAdjustmentContainer);
    itemContainer.title = items[i][4];

    // Add item to shop page
    itemListingContainer.appendChild(itemContainer);

    // Create new item object and add to constructedItems array
    constructedItems.push(new item(items[i][0], items[i][1], items[i][2]));
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", (event) => {
    clearPurchases();
});

const purchaseButton = document.getElementById("purchaseButton");
purchaseButton.addEventListener("click", (event) => {
    acceptPurchase();
});

function increasePurchaseAmount(buttonId) {
    console.log("Increase button clicked: " + buttonId);
    for (let i = 0; i < constructedItems.length; i++) {
        if (buttonId === constructedItems[i].type + "PurchaseAmountIncrease") {
            constructedItems[i].purchaseAmount++;
            totalPurchaseCost += constructedItems[i].cost;
            document.getElementById(constructedItems[i].type + "PurchaseAmountDisplay").innerText = constructedItems[i].purchaseAmount;
            document.getElementById("costDisplay").innerText = "Cost: " + totalPurchaseCost + " digipogs";
            break;
        }
    }
}

function decreasePurchaseAmount(buttonId) {
    console.log("Decrease button clicked: " + buttonId);
    for (let i = 0; i < constructedItems.length; i++) {
        if (buttonId === constructedItems[i].type + "PurchaseAmountDecrease") {
            if (constructedItems[i].purchaseAmount > 0) {
                constructedItems[i].purchaseAmount--;
                totalPurchaseCost -= constructedItems[i].cost;
                document.getElementById(constructedItems[i].type + "PurchaseAmountDisplay").innerText = constructedItems[i].purchaseAmount;
                document.getElementById("costDisplay").innerText = "Cost: " + totalPurchaseCost + " digipogs";
                break;
            }
        }
    }
}

function clearPurchases() {
    totalPurchaseCost = 0;
    document.getElementById("costDisplay").innerText = "Cost: " + totalPurchaseCost + " digipogs";
    for (let i = 0; i < constructedItems.length; i++) {
        constructedItems[i].purchaseAmount = 0;
        document.getElementById(constructedItems[i].type + "PurchaseAmountDisplay").innerText = constructedItems[i].purchaseAmount;
    }
}

function acceptPurchase() {
    purchaseApproved = window.confirm("Are you sure you want to purchase these items for " + totalPurchaseCost + " digipogs?");
    if (purchaseApproved) {
        if (totalPurchaseCost <= fakeDigipogs) {
            updatePlayerInventory();
            fakeDigipogs -= totalPurchaseCost;
            console.log("Purchase successful! Remaining digipogs: " + fakeDigipogs);
            clearPurchases();
        } else {
            window.alert("You do not have enough digipogs to complete this purchase.");
        }
    }
}

function updatePlayerInventory() {
    var cheeseCount = knex.select('cheese').from('inventory').where({ user_id: '1' });
    console.log("Current cheese count: " + cheeseCount);
    cheeseCount += constructedItems[0].purchaseAmount;
    console.log("New cheese count: " + cheeseCount);
    var toyCount = knex.select('toys').from('inventory').where({ user_id: '1' });
    console.log("Current toy count: " + toyCount);
    toyCount += constructedItems[1].purchaseAmount;
    console.log("New toy count: " + toyCount);
    var candyCount = knex.select('candy').from('inventory').where({ user_id: '1' });
    console.log("Current candy count: " + candyCount);
    candyCount += constructedItems[2].purchaseAmount;
    console.log("New candy count: " + candyCount);
    knex('inventory').where({ user_id: '1' }).update({
        cheese: cheeseCount,
        toys: toyCount,
        candy: candyCount
    })
}