const apiKey = "uv5wjRxUs3LNASV1jIcW2xdYUdCx6AcT";



const first = document.getElementById("recordGif");

const second = document.getElementById("myGuifosContainer");

const third = document.getElementById("captureBoxshow");

const five = document.getElementById("captureContainer")

const six = document.getElementById("timerSection")

const seven = document.getElementById("redyContainer")

const eigth = document.getElementById("loadingContainer")

const nine = document.getElementById("cameraSec")

const ten = document.getElementById("upLoadSec")

const eleven = document.getElementById("finalSec")

const tuelve = document.getElementById("guif") // verr

const theteen = document.getElementById("mysguifos")


let upLoadKey = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;


let form = new FormData();

let gifPrev = document.getElementById('isAvideo'); //antes var
let videoprev = document.getElementById('guif')
let misGuifosCont = document.getElementById('suggestConteiner');
var stream = '';

var downloadref = document.getElementById('btn-download');

var recorder = '';


//GEORGE STYLE
let gifRecorder;
let vidRecorder;
let gifBlob;
let Gifsize;
let videoBlob;

//jose style
let newGif = '';
let gifId = '';

let videoConfig = {
    audio: false,
    video: {
        facingMode: "user",
        width: {
            min: 640
        },
        height: {
            min: 480
        }
    }
};
let formatConfig_gif = {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
};
let formatConfig_video = {
    type: 'video',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
};



document.getElementById("beginButton").onclick = () => {
    first.style.display = "none";
    second.style.display = "none";
    third.style.display = "block";


    navigator.mediaDevices.getUserMedia(videoConfig)
        .then(function (mediaStreamObj) {

            gifPrev.srcObject = mediaStreamObj;
            gifPrev.play();

            gifRecorder = RecordRTC(mediaStreamObj, formatConfig_gif);
            vidRecorder = RecordRTC(mediaStreamObj, formatConfig_video);
        })

        .catch(console.log("Cannot access webcam"))


};



const titelChange = document.getElementById("capButton").onclick = () => {
    document.getElementById("recordTitel").innerHTML = "Capturando Tu Guifo";
    five.style.display = "none";
    six.style.display = "flex";

    gifRecorder.reset();
    vidRecorder.reset();
    gifRecorder.startRecording();
    vidRecorder.startRecording();
    console.log("El estado del gif recorder es: " + gifRecorder.state);

    document.getElementById('btn-stop-recording').disabled = false;
};



document.getElementById('btn-stop-recording').onclick = () => {

    this.disabled = true;
    document.getElementById("recordTitel").innerHTML = "Vista Previa"
    document.getElementById("isAvideo").innerHTML = "img"
    seven.style.display = "none";
    eigth.style.display = "flex";


    gifPrev.srcObject = null;

    gifRecorder.stopRecording(function (blob) {
        gifBlob = gifRecorder.getBlob();


    });

    vidRecorder.stopRecording(function () {
        videoBlob = vidRecorder.getBlob();
        gifPrev.src = URL.createObjectURL(videoBlob);
        descargaGif = URL.createObjectURL(gifBlob);

    });

};


document.getElementById('play').onclick = () => {

    if (gifPrev.paused) {
        gifPrev.play();
    } else {
        video.pause();
    }
    //Loading bar function
    var i = 0;

    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 0.2);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }

}




let urlGif = '';
let dataId = '';

document.getElementById('uplButton').onclick = () => {
    nine.style.display = "none";
    ten.style.display = "flex";


    var i = 0;

    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar2");
        var width = 1;
        var id = setInterval(frame, 0.1);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    }

    setTimeout(function () {
        /* ACA VER DE QUE ENTRE LA ULTIMA SECCION */
        /*       nine.style.display = "none"; */
        ten.style.display = "none";
    }, 3000);

    setTimeout(function () {
        /* ACA VER DE QUE ENTRE LA ULTIMA SECCION */
        /*       nine.style.display = "none"; */
        eleven.style.display = "flex"
        second.style.display = "flex"
    }, 3000);

    videoprev.src = URL.createObjectURL(gifBlob)




    form.append('file', gifRecorder.getBlob(), 'myGif.gif')
    uno()

}


function uno() {

    downloadref.href = descargaGif;

    fetch(upLoadKey, {
            method: "POST",
            body: form,
            json: true
        })
        .then(response => {
            return response.json();

        })
        .then(data => {
            dataId = data.data.id;
            fetch("https://api.giphy.com/v1/gifs/" + dataId + "?&api_key=" + apiKey)
                .then(response => {
                    return response.json()
                })
                .then(obj => {


                    urlGif = obj.data.images.original.url;

                    localStorage.setItem(dataId, JSON.stringify(obj));
                    var kv = localStorage.getItem(dataId);
                    var kvParse = JSON.parse(kv);
                    var keyUrl = kvParse.data.images.original.url;

                    const trendCaja = document.createElement('div');
                    misGuifosCont.appendChild(trendCaja);
                    trendCaja.classList.add('gridCont');

                    const nuevoGif = document.createElement('img');
                    trendCaja.appendChild(nuevoGif);
                    nuevoGif.src = keyUrl;


                })
        })
}


function cargarLocalStorage() {

    for (i = 0; i < localStorage.length; i++) {
        var keyval = localStorage.key(i);

        var kv = localStorage.getItem(keyval);
        var kvParse = JSON.parse(kv);
        var urlGif = kvParse.data.images.original.url;
        var keyUrl = kvParse.data.images.original.url;
        const trendCaja = document.createElement('div');
        misGuifosCont.appendChild(trendCaja);
        trendCaja.classList.add('gridCont');

        const nuevoGif = document.createElement('img');
        trendCaja.appendChild(nuevoGif);
        nuevoGif.src = keyUrl;
    }
}
cargarLocalStorage();




document.getElementById("btn-copylink").onclick = (text) => {
    const input = document.createElement("textarea");
    document.body.appendChild(input);
    input.value = urlGif;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
}


function redirectToMisGuifos() {
    location.replace("upload.html")
}

function redirectToIndex() {
    location.replace("index.html")
}