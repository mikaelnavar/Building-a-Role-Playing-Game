let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: 'stick', power: 5},
    { name: 'dagger', power: 30},
    { name: 'claw hammer', power: 50},
    { name: 'sword', power: 100}
];
const monsters = [
    {
        name: "slime",
        level: 2,
        helath:15
    },
    {
        name: "fanged beast",
        level: 8,
        helath: 60
    },
    {
        name: "dragon",
        level: 20,
        helath: 300
    },
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"
        ],
        "button functions": [buyHelath, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: " You enter the cave. You see some monsters."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster."  
    },
    {
        name: "Kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart], 
        text: "Your defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    }, 
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"], 
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randonly chosen between 0 an 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// initialize buttons 
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = location.text;
}   

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHelath() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        } 
    } else{
        text.innerText = "You alredy have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " = currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else{
        text.innerText = "Don't sell your only weapon!";
    }
}

