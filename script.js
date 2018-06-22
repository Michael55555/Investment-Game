var cship = chouse = ccar = cbike = 0;
var pship = 10, phouse = 5, pcar = 3, pbike = 1, cmoney = 10;
var id = ["money","ship","house","car","bike", "bship", "bhouse", "bcar", "bbike"];
onload = function (){

    for(var stp = 0; stp < id.length; stp++){
        id[stp] = document.getElementById(id[stp]);
    }

    setInterval(function(){
       money.innerHTML = 'Money: ' + cmoney;
       house.innerHTML = 'House: ' + chouse;
       ship.innerHTML = 'Ship: ' + cship;
       car.innerHTML = 'Car: ' + ccar;
       bike.innerHTML = 'Bike: ' + cbike;
    });

    setInterval(function(){
        if(pship>5){pship += random(-2, 2);}else{
            pship += random(0, 2)
        }
        bship.innerHTML = "Buy Ship for " + pship + "$";
    }, 1000);
}

function mone(){
    alert("You havent enough money");
}

function buyShip(){
    if((cmoney - pship) >= 0){
        cmoney -= pship;
        cship++;
    } else {
        mone();
    }
}

function sellShip(){
    if(cship > 0){
        cmoney += pship;
        cship--;
        alert("Ship sold for: " + pship)
    } else {
        alert("You havent a ship to sell")
    }
}

function buyHouse(){
    if((cmoney - phouse) >= 0){
        cmoney -= phouse;
        chouse++;
    } else {
        mone();
    }
}

function sellHouse(){
    if(chouse > 0){
        cmoney += phouse;
        chouse--;
        alert("House sold for: " + phouse)
    } else {
        alert("You havent a house to sell")
    }
}

function buyCar(){
    if((cmoney - pcar) >= 0){
        cmoney -= pcar;
        ccar++;
    } else {
        mone();
    }
}

function sellCar(){
    if(ccar > 0){
        cmoney += pcar;
        ccar--;
        alert("Car sold for: " + pcar);
    } else {
        alert("You havent a car to sell");
    }
}

function buyBike(){
    if((cmoney - pbike) >= 0){
        cmoney -= pbike;
        cbike++;
    } else {
        mone();
    }
}

function sellBike(){
    if(cbike > 0){
        cmoney += pbike;
        cbike--;
        alert("Bike sold for: " + pbike);
    } else {
        alert("You havent a bike to sell");
    }
}

function random(from, to, rounded) {
    if (from === undefined) {
        return "#" + ((Math.random() * 16777215) | 0).toString(16);
    } else {
        to = to === undefined ? from : to;
        from = from == to ? 0 : from;
        var tmp = [Math.min(from, to), Math.max(from, to)];
        from = tmp[0];
        to = tmp[1];
        return !rounded ? (Math.random() * (to - from) + from) | 0 : (Math.random() * (to - from) + from);
    }
}
