const items = [["cheese", 5, 0, "/public/img/Cheese.png"], ["toy", 5, 0, "/public/img/Toy.png"], ["candy", 5, 0, "/public/img/Candy.png"]]

class item {
    constructor(type, cost, purchaseAmount){
        this.type = type;
        this.cost = cost;
        this.purchaseAmount = purchaseAmount;
    }
}

for (let i = 0; i < items.length; i++) {
    const itemContainer = document.createElement("div");
    const itemImageDisplay = document.createElement("img");
    const itemPurchaseAmountDisplay = document.createElement("p");
    const purchaseAdjustmentContainer = document.createElement("div");
    const itemPurchaseAmountIncrease = document.createElement("button");
    const itemPurchaseAmountDecrease = document.createElement("button");
    const itemListingContainer = document.getElementById("itemListing");

    itemImageDisplay.src = items[i][3];

    itemPurchaseAmountDisplay.innerText = items[i][2];

    itemPurchaseAmountIncrease.innerText = "+";
    itemPurchaseAmountDecrease.innerText = "-";
    purchaseAdjustmentContainer.appendChild(itemPurchaseAmountIncrease, itemPurchaseAmountDecrease);

    itemContainer.appendChild(itemImageDisplay, itemPurchaseAmountDisplay, purchaseAdjustmentContainer);
    itemContainer.title = items[i][0];

    itemListingContainer.appendChild(itemContainer);
}