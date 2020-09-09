/* BTN DROPDOWN */

let dropBtn = document.getElementById("themeselector");
let dropdownContent = document.getElementById("dropdownList");
let desplegar = 0;

function cambio() {
    if (desplegar == 0) {

        dropdownContent.classList.add("show");
        desplegar = 1;
    } else {
        dropdownContent.classList.remove("show");
        desplegar = 0;
    }
}

dropBtn.addEventListener("click", cambio, true);


// Select the button
const btnDark = document.querySelector(".themeBtnDark");
const btnLight = document.querySelector(".themeBtnLight");
const showDark = () => {
    document.getElementById("style").setAttribute("href", "./styles/styleDark.css");
    document.getElementById("logo").setAttribute("src", "./assets/gifOF_logo_dark.png");

}

const showLight = () => {
    document.getElementById("style").setAttribute("href", "./styles/style.css");
    document.getElementById("logo").setAttribute("src", "./assets/gifOF_logo.png");

}

btnDark.addEventListener("click", showDark);
btnLight.addEventListener("click", showLight);



const searchbutton = document.getElementById("findButton")
const searchInput = document.getElementById("findBox")
const results = document.getElementById("trendContent")

searchbutton.addEventListener("click", function (e) {
    e.preventDefault()
    const q = searchInput.value
    search(q)
    if (event.keyCode === 13) {
        document.getElementById("click").click();
    }
})


function search(q) {

    const apiKey = "uv5wjRxUs3LNASV1jIcW2xdYUdCx6AcT";
    const Path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}`;

    fetch(Path).then(function (res) {
        return res.json()

    }).then(function (json) {
        
        let resultS = ""

        json.data.forEach(function (obj) {
            const urlResult = obj.images.fixed_width.url
            const width = obj.images.fixed_width.width
            const height = obj.images.fixed_width.height
            const title = obj.title


            resultS += `
            <div class="trendContainer">
            <img class="trend2" 
            src="${urlResult}" 
             width="${width}"
             height="${height}
             "alt="${title}" 
       >
       <h3 class="trendTitle">${title}</h3>
       </div>
       `
        })
        results.innerHTML = resultS
    }).catch(function (err) {
        console.log(err.message)
    })


    tagDrpdwn(q);
}





const trending = () => {
    const apiKey = "uv5wjRxUs3LNASV1jIcW2xdYUdCx6AcT";
    const PathTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
    fetch(PathTrending)
        .then((resp) => resp.json())
        .then((data) => {
            for (i = 0; i < data.data.length; i++) {
                let element = document.getElementById("trendContent");
                element.innerHTML += `
        <div class="trendContainer">
        <img class="trend2" src=${data.data[i].images.fixed_height.url}>
        <h3 class="trendTitle">${data.data[i].title}</h3>
        </div>`; //VER LOS TITLE Y DARLE FORMATO CORRECTO
            }
        })
        .catch((err) => console.log(err));
}

trending();




const sugestions = () => {
    const apiKey = "uv5wjRxUs3LNASV1jIcW2xdYUdCx6AcT";
    ids = [
        "9DlDFQnAB66wC59MVX",
        "jrijP60lUxjUjpa7YF",
        "Dh9jqNm8YcGVG",
        "vzO0Vc8b2VBLi",
    ];
    const PathTrending = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`;
    fetch(PathTrending)
        .then((resp) => resp.json())
        .then((data) => {
            for (i = 0; i < data.data.length; i++) {
                let element = document.getElementById("suggestConteiner");
                element.innerHTML += `
        <div class="suggestConteiner">
          <h3 class="sugestionTitle">${data.data[i].title}</h3>
          <img class="trend2" src=${data.data[i].images.fixed_height.url}>
          <a href="${data.data[i].embed_url}" class="btn">Ver mas...</a> 
        </div>`; 
            }
        })
        .catch((err) => console.log(err));
}

sugestions();


document.getElementById("btnMyGifs").onclick = () => {

    location.replace("upload.html")

}

const sheldon = "sheldon"
const bleach = "bleach"
const meme = "meme"


let searchMenu = document.getElementById("findBox");
let menuAutocomplete = document.getElementById("reBusqueda");
let btnBuscar = document.getElementById("findButton");

function showMenuSuggestion() {
    menuAutocomplete.style.display = "block";
}

function hideSuggestionMenu() {
    menuAutocomplete.style.display = "none";
}

searchMenu.addEventListener('input', showMenuSuggestion);
searchMenu.addEventListener('click', hideSuggestionMenu);
window.addEventListener("click", hideSuggestionMenu);

class searchTag {
    constructor(date, info) {
        this.info = info;
        this.date = date;
    }
}

let arraySearch = [];

const tagDrpdwn = (val) => {

    let busqueda = val;
    let fecha = Date.now();
    let elementSearch = new searchTag(fecha, busqueda);
    arraySearch.push(elementSearch);
    localStorage.setItem("busqueda", JSON.stringify(arraySearch));

    createBtn();
}

const createBtn = () => {
    let arraySearch = JSON.parse(localStorage.getItem("busqueda"));
    let newBtn = "";
    arraySearch.forEach(e => {
        newBtn += `<button type="button" id="tagBtn" class = "tagBtn">#${e.info}</button>`
    })
    document.getElementById("resultado").innerHTML = newBtn;
    
}

