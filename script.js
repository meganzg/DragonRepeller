let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 20
    },
    {
        name: "sword",
        power: 50
    },
    {
        name: "mom's slipper",
        power: 100
    }
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
        power: 10,
        gold: 13
    },
    {
        name: "beast",
        level: 8,
        health: 60,
        power: 10,
        gold: 35
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
        power: 10,
        gold: 100
    }
]

function goStore(){
    button1.innerText = "Buy 10 health (10 gold)";
    button1.onclick = buyHealth;
    button2.innerText = "Buy weapon (30 gold)";
    button2.onclick = buyWeapon;
    button3.innerText = "Go to town square";
    button3.onclick = goTown;
    text.innerText = "You are now in the store";
}
function goCave(){
    text.innerText = "You are now in the cave. You see some monsters."
    button1.innerText = "Fight slime";
    button1.onclick = fightSlime;
    button2.innerText = "Fight fanged beast";
    button2.onclick = fightBeast;
    button3.innerText = "Go to town square";
    button3.onclick = goTown;
}
function fightDragon(){
    fighting = 2;
    button1.innerText = "Attack";
    button1.onclick = attack;
    button2.innerText = "Dodge";
    button2.onclick = dodge;
    button3.innerText = "Run";
    button3.onclick = run;
    goFight();
    text.innerText = "You are fighting a "+monsters[fighting].name;
}
function buyHealth(){
    if(gold>=10){
        health += 10;
        gold -= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You bought health";
    }
    else{
        text.innerText = "You too poor.";
    }

}
function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold>=30){
            gold-=30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            console.log("yyyy");
            text.innerText = "You have a new weapon! Your weapons are now: " + inventory;
        }
        else{
            text.innerText = "You too poor.";
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon.";
    }

}
function goTown(){
    button1.innerText = "Go to store";
    button1.onclick = goStore;
    button2.innerText = "Go to cave";
    button2.onclick = goCave;
    button3.innerText = "Fight dragon";
    button3.onclick = fightDragon;
    text.innerText = "You are now in the town square. You see a sign that says \"store\"";
}
function fightSlime(){
    fighting = 0;
    button1.innerText = "Attack";
    button1.onclick = attack;
    button2.innerText = "Dodge";
    button2.onclick = dodge;
    button3.innerText = "Run";
    button3.onclick = run;
    goFight();
    text.innerText = "You are fighting a "+monsters[fighting].name;

}
function fightBeast(){
    fighting = 1;
    button1.innerText = "Attack";
    button1.onclick = attack;
    button2.innerText = "Dodge";
    button2.onclick = dodge;
    button3.innerText = "Run";
    button3.onclick = run;
    goFight();
    text.innerText = "You are fighting a "+monsters[fighting].name;
}
function attack(){
    if(monsterHealth > 1){
        text.innerText = "You attack the "+monsters[fighting].name+" with your "+weapons[currentWeapon].name;
        monsterHealth -= weapons[currentWeapon].power;
        monsterHealthText.innerText = monsterHealth;
        health -= monsters[fighting].power;
        health -= monsters[fighting].level;
        healthText.innerText = health;
    }
    if(monsterHealth < 1){
        text.innerText = "You killed the " + monsters[fighting].name + " with a " + weapons[currentWeapon].name + "! You gain experience and find gold."
        xpText.innerText = xp += monsters[fighting].level;
        goldText.innerText = gold += monsters[fighting].gold; 
        button1.innerText = "go to Town Square";
        button1.onclick = goTown;
        button2.innerText = "go to Town Square";
        button2.onclick = goTown;
        button3.innerText = "go to Town Square";
        button3.onclick = goTown;
    } 
    if(health < 1){
        playerDie();
    }
}
function dodge(){
    text.innerText = "You dodged the attack from the " + monsters[fighting].name;

}
function run(){
    button1.innerText = "Go to store";
    button1.onclick = goStore;
    button2.innerText = "Go to cave";
    button2.onclick = goCave;
    button3.innerText = "Fight dragon";
    button3.onclick = fightDragon;
    text.innerText = "You are now in the town square.";
    monsterStats.style.display = "none";
}
function goFight(){
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    monsterHealth = monsters[fighting].health;
}
function isDead(){
    if(monsters[fighting].health <= 0){
        return true;
    }
    return false;
}
function playerDie(){
    text.innerText = "You die. Play again?";
    button1.innerText = "REPLAY";
    button1.onclick = replay;
    button2.innerText = "REPLAY";
    button2.onclick = replay;
    button3.innerText = "REPLAY";
    button3.onclick = replay;
    
}
function replay(){
    xp = 0;
    xp.innerText = xp;
    health = 100;
    healthText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    inventory = ["stick"];
    monsterStats.style.display = "none";
    goTown();
}