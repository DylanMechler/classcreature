const items = [["cheese", 5, 0, "/img/Cheese.png", "Restores Hunger"], ["toy", 5, 0, "/img/Toy.png", "Restores Entertainment"], ["candy", 5, 0, "/img/Candy.png", "Restores Happiness"]]
const constructedItems = [];
var totalPurchaseCost = 0;

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
    itemPurchaseAmountIncrease.addEventListener("click", increasePurchaseAmount(itemPurchaseAmountIncrease.id));
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

function increasePurchaseAmount(buttonId) {
    for (let i = 0; i < constructedItems.length; i++) {
        if (buttonId === constructedItems[i].type + "PurchaseAmountIncrease") {
            constructedItems[i].purchaseAmount++;
            totalPurchaseCost += constructedItems[i].cost;
            document.getElementById(constructedItems[i].type + "PurchaseAmountDisplay").innerText = constructedItems[i].purchaseAmount;
        }
    }
}