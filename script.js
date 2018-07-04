let model = {
    money: 1000,
    items: [
      {
        name: 'Google',
        price: 600,
        max: 650,
        min: 550,
        number: 0
      },
      {
        name: 'Facebook',
        price: 500,
        max: 550,
        min: 450,
        number: 0
      },
      {
        name: 'Gold',
        price: 250,
        max: 300,
        min: 200,
        number: 0
      },
      {
        name: 'Silver',
        price: 200,
        max: 250,
        min: 150,
        number: 0
      },
      {
        name: 'Twitter',
        price: 150,
        max: 200,
        min: 100,
        number: 0
      }
    ]
  };
  
  let octopus = {
    init: () => {
      itemsView.init();
      transactionsView.init();
      statsView.init();
      octopus.itemPrice();
    },
    getItems: () => {
      return model.items;
    },
    buyItem: (i) => {
      let items = octopus.getItems();
      let item = items[i];
      if (model.money - item.price >= 0) {
        model.money -= item.price;
        item.number++;
        transactionsView.add('buy', item.name, item.price);
        let sound = new Audio();
        sound.src = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-18146/zapsplat_foley_money_coins_handful_drop_onto_wood_002_18981.mp3?_=10';
        sound.play();
      } else {
        alert('You havent enough money!');
      }
    },
    sellItem: (i) => {
      let items = octopus.getItems();
      let item = items[i];
      if (item.number > 0) {
        item.number--;
        model.money += item.price;
        transactionsView.add('sell', item.name, item.price);
        let sound = new Audio();
        sound.src = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-18146/zapsplat_foley_money_coins_tip_out_of_metal_tin_onto_carpet_002_18996.mp3?_=9';
        sound.play();
        statsView.render();
      } else {
        alert('Have nothing to sell!');
      }
    },
    itemPrice: () => {
      setInterval(function () {
        let items = model.items;
        let item;
        for (let i in items) {
          item = model.items[i];
          switch (true) {
            case (item.price > item.min && item.price < item.max):
              item.price += octopus.random(-10, 10 / (i + 1));
              break;
            case (item.price >= item.max):
              item.price -= octopus.random(0, 10);
              break;
            default:
              item.price += octopus.random(0, 10);
              break;
          }
          itemsView.render();
        }
        // console.log(JSON.stringify(model.items));
      }, 1000);
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
  
  let itemsView = {
    init: () => {
      this.prices = document.getElementsByClassName('price');
      this.numbers = document.getElementsByClassName('number');
      this.mainElem = document.getElementById('item');
      this.moneyElem = document.getElementById('money');
      this.tableElem = document.getElementById('item-table');
      let item;
      let items = octopus.getItems();
      for (let i in items) {
        item = items[i];
        this.itemElem = document.createElement('tr');
        this.nameElem = document.createElement('td');
        this.priceElem = document.createElement('td');
        this.actionElem = document.createElement('td');
        this.countElem = document.createElement('td');
        this.buyItemElem = document.createElement('button');
        this.sellItemElem = document.createElement('button');
        this.itemPriceElem = document.createElement('div');
        this.itemNameElem = document.createElement('div');
        this.itemCountElem = document.createElement('div');
        this.buyItemElem.classList.add('primary');
        this.sellItemElem.classList.add('secondary');
        this.itemPriceElem.classList.add('price');
        this.itemCountElem.classList.add('number');
        this.itemNameElem.classList.add('name');
        this.buyItemElem.classList.add('actions');
        this.sellItemElem.classList.add('actions');
        this.sellItemElem.innerHTML = '-';
        this.buyItemElem.innerHTML = '+';
        this.itemPriceElem.innerHTML = item.price + '&euro;';
        this.itemCountElem.innerHTML = 'x' + item.number;
        this.itemNameElem.innerHTML = item.name;
        this.actionElem.appendChild(this.buyItemElem);
        this.actionElem.appendChild(this.sellItemElem);
        this.nameElem.appendChild(this.itemNameElem);
        this.priceElem.appendChild(this.itemPriceElem);
        this.countElem.appendChild(this.itemCountElem);
        this.itemElem.appendChild(this.nameElem);
        this.itemElem.appendChild(this.priceElem);
        this.itemElem.appendChild(this.actionElem);
        this.itemElem.appendChild(this.countElem);
        this.tableElem.appendChild(this.itemElem);
  
        this.buyItemElem.addEventListener('click', () => {
          octopus.buyItem(i);
          itemsView.render();
        });
        this.sellItemElem.addEventListener('click', () => {
          octopus.sellItem(i);
          itemsView.render();
        });
      }
      itemsView.render();
    },
    render: () => {
      this.moneyElem.innerHTML = model.money + '$';
      let item;
      let items = octopus.getItems();
      for (let i in items) {
        this.itemPriceElem = this.prices[i];
        this,itemCountElem = this.numbers[i];
        item = items[i];
        this.itemPriceElem.innerHTML = item.price + '&euro;';
        this.itemCountElem.innerHTML = 'x' + item.number;
        // console.log(JSON.stringify(item.price))
      }
    }
  };
  
  let transactionsView = {
    init: () => {
      this.transactionElem = document.getElementById('transaction-list');
    },
    add: (action, item, price) => {
      this.newTransaction = document.createElement('li');
      this.newTransaction.classList.add(action);
  
      if (action == 'buy') {
        this.newTransaction.innerHTML = `Bought ${item} for ${price}`;
      } else {
        this.newTransaction.innerHTML = `Sold ${item} for ${price}`;
      }
      this.transactionElem.appendChild(this.newTransaction);
      while (this.transactionElem.childElementCount > 5) {
        this.transactionElem.removeChild(this.transactionElem.childNodes[0]);
      }
    }
  };
  
  let statsView = {
    init: () => {
      this.statsElem = document.getElementById('stats');
      this.statsProgressElem = document.getElementById('stats-progress');
    },
    render: () => {
      this.statsProgressElem.value = model.money;
    }
  };
  
  onload = () => {
    octopus.init();
  }