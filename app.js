document.addEventListener("submit" , (event)=>{
    console.log("Validating")
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5500/authorize");
    console.log("Validated")

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`user=${user}&password=${password}`);

    event.preventDefault()
})

const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value])=>({...acc, [key.trim()]: value }), {}); 
        return cookies[key]
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value}`;
    },
};

const storageType = sessionStorage;
const consentPropertyName = 'gdprConcent'
const checkPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
    changeBG2();
    const gdprWindow = document.getElementById("gdpr")
    const gdprAccept = document.getElementById("gdpr-accept")
    
    const acceptFn = event => {
        saveToStorage();
        gdprWindow.classList.add("hidden");
    };

    gdprAccept.addEventListener("click", acceptFn);

    if (checkPopup()){
        gdprWindow.classList.remove("hidden");
    }
};

function changeBG(){
    document.body.style.background = "url('images/background.jpg')";
}

function changeBG2(){
    document.body.style.background = "url('images/background3.jpg')";
}

function login() {
    let password = document.getElementById("password");
    let user = document.getElementById("user");
    let loginPrompt = document.getElementById("loginPrompt");
    let mainPage = document.getElementById("mainPage");

    if (user.value === "user" && password.value === "password"){
        loginPrompt.style.display = "none";
        mainPage.style.display = "block";
        changeBG();
    }
  }

  
  function logout(){
      let loginPrompt = document.getElementById("loginPrompt");
      let mainPage = document.getElementById("mainPage");
      loginPrompt.style.display = "block";
      mainPage.style.display = "none";
      document.getElementById("dices").innerHTML = "";
      changeBG2();
    }

function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function rollDice(){
    let dice1 = randomIntFromInterval(1,6);
    let dice2 = randomIntFromInterval(1,6);
    let total = dice1 + dice2;
    let answer = `You roll two dices and got: <br><br>${dice1} and ${dice2}<br><br> Which is a total value of: <br><br>${total}`;

    document.getElementById("dices").innerHTML = answer;
}