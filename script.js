var model = {
  currentItem: null,
  money: 10,
  items: [
    {
      name: 'ship',
      price: 10,
      number: 0
    },
    {
      name: 'house',
      price: 5,
      number: 0
    },
    {
      name: 'car',
      price: 3,
      number: 0
    },
    {
      name: 'bike',
      price: 1,
      number: 0
    }
  ]
};

var itemsView = {
  init: () => {
    this.itemElem = document.getElementById('item-items');
    this.moneyElem = document.getElementById('money');
    let item;
    let items = octopus.getItems();
    for (let i in items) {
      item = items[i];
      this.buyItemElem = document.createElement('button');
      this.sellItemElem = document.createElement('button');
      this.itemPriceElem = document.createElement('div');
      this.itemNameElem = document.createElement('div');
      this.buyItemElem.classList.add(['primary'], ['panel']);
      this.sellItemElem.classList.add(['danger'], ['panel']);
      this.itemNameElem.classList.add('name');
      this.sellItemElem.innerHTML = 'Sell';
      this.buyItemElem.innerHTML = 'Buy';
      this.itemPriceElem.innerHTML = item.price;
      this.itemNameElem.innerHTML = item.name;
      this.itemElem.appendChild(this.buyItemElem);
      this.itemElem.appendChild(this.sellItemElem);
      this.itemElem.appendChild(this.itemNameElem);
      this.itemElem.appendChild(this.itemPriceElem);
      itemsView.render();
      this.buyItemElem.addEventListener('click', () => {
        octopus.buyItem(item.name);
        itemsView.render();
      });
      this.sellItemElem.addEventListener('click', () => {
        octopus.sellItem();
        itemsView.render();
      });
      let acc;
      acc = document.createElement('div');
      acc.addEventListener("click", () => {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  },
  render: () => {
    /*this.moneyElem.innerHTML = 'Money: ' + model.money;
    for(let i in model.items){
      this.itemPriceElem.innerHTML = model.items[i].price + '€';
      this.itemNameElem.innerHTML = model.items[i].name;
    }*/
  }
};

var inventoryView = {
  init: () => {
    this.itemsCount = document.getElementById('items');
    inventoryView.render();
  },
  render: () => {
    let item;
    let items = octopus.getItems();
    this.itemsCount.innerHTML = '';
    for (let i in items) {
      item = items[i];
      var elem = document.createElement('li');
      elem.innerHTML = item.name + ': ' + item.number + '<br>';
      this.itemsCount.appendChild(elem);
    }
  }
};

var octopus = {
  init: () => {
    model.currentItem = model.items[0];
    itemsView.init();
    inventoryView.init();
    octopus.itemPrice();
  },
  getItems: () => {
    return model.items;
  },
  getCurrentItem: () => {
    return model.currentItem;
  },
  setCurrentItem: item => {
    model.currentItem = item;
  },
  buyItem: () => {
    var item = octopus.getCurrentItem();
    if (model.money - item.price >= 0) {
      model.money -= item.price;
      item.number++;
      inventoryView.render();
      let sound = new Audio();
      sound.src = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-18146/zapsplat_foley_money_coins_handful_drop_onto_wood_002_18981.mp3?_=10';
      sound.play();
    } else {
      alert('You havent enough money!');
    }
  },
  sellItem: () => {
    var item = octopus.getCurrentItem();
    if (item.number > 0) {
      item.number--;
      model.money += item.price;
      inventoryView.render();
      let sound = new Audio();
      sound.src = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-18146/zapsplat_foley_money_coins_tip_out_of_metal_tin_onto_carpet_002_18996.mp3?_=9';
      sound.play();
    } else {
      alert('Have nothing to sell!');
    }
  },
  itemPrice: () => {
    setInterval(function () {
      for (let i in model.items) {
        if (model.items[i].price > 1) {
          model.items[i].price += octopus.random(-2, 2);
        } else {
          model.items[i].price += octopus.random(0, 2);
        }
        itemsView.render();
      }
    }, 500);
  },
  random: (from, to, rounded) => {
    if (from === undefined) {
      return '#' + ((Math.random() * 16777215) | 0).toString(16);
    } else {
      to = to === undefined ? from : to;
      from = from == to ? 0 : from;
      const TMP = [
        Math.min(from, to),
        Math.max(from, to)
      ];
      from = TMP[0];
      to = TMP[1];
      return !rounded ? (Math.random() * (to - from) + from) | 0 : (Math.random() * (to - from) + from);
    }
  }
};

onload = () => {
  octopus.init();
}