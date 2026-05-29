//Importem els estils i les funcions del canvas
import './style.css';
import { iniciarCanvas, setModeNit, getModeNit, sketchInstance } from './sketch.js';
//Importem el plugin de càmera de Capacitor
import { Camera, MediaTypeSelection } from '@capacitor/camera';

//Agafem les tres pantalles del DOM
const pantalla1 = document.getElementById("pantalla1");
const pantalla2 = document.getElementById("pantalla2");
const pantalla3 = document.getElementById("pantalla3");

//Només és veu la Pantalla 1, amaguem les altres
pantalla2.style.display = "none";
pantalla3.style.display = "none";

//Funció per seleccionar una foto de la galeria
const seleccionarFoto = async () =>{
    try {
        const photo = await Camera.getPhoto({
        quality: 90,
        resultType: "uri",
        source: "PHOTOS"   // Obrir galeria
        });

        //Guardem la foto al localStorage
        localStorage.setItem("foto", photo.webPath);

        //Mostra la Pantalla 2, amaguem la 1
        pantalla1.style.display = "none";
        pantalla2.style.display = "block";

        carregarPantalla2();
    } 
    
    catch (error) {
        console.error("Error seleccionant foto:", error);
    }
}

//Quan cliquem el botó, va a la funció seleccionarFoto i s'obre la galeria
document.getElementById("botoFoto").addEventListener("click", seleccionarFoto);


//Pantalla 2
//Botó per tornar a seleccionar una foto
document.getElementById("botoTornar").addEventListener("click", () => {
    localStorage.removeItem("foto");
    localStorage.removeItem("colorSeleccionat");

    document.getElementById("pantalla2").style.display = "none";
    document.getElementById("pantalla1").style.display = "flex";
});

//Funció per carregar la foto i generar la paleta
function carregarPantalla2(){
    //Posem la foto triada a l'element <img>
    const img = document.getElementById("fotoTriada");
    img.crossOrigin = "anonymous";
    img.src = localStorage.getItem("foto");

    //Quan la imatge està carregada fem ColorThief
    img.onload = () =>{
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 4);

        //Guardem la paleta per utilitzar-la al canvas
        localStorage.setItem("paleta", JSON.stringify(palette));

        //Mostrem la paleta a la pantalla
        const paletaDiv = document.getElementById("paleta");
        paletaDiv.innerHTML = "";

        //Creem un quadrat per cada color
        palette.forEach(color => {
            const div = document.createElement("div");
            div.className = "colorBox";
            div.style.backgroundColor = `rgb(${color})`;
            paletaDiv.appendChild(div);
        });
    };
}

// Botó per anar a la Pantalla 3
document.getElementById("botoCanvas").addEventListener("click", () => {
  pantalla2.style.display = "none";
  pantalla3.style.display = "flex";

  iniciarCanvas();
});


//Pantalla3
//Botó per tornar a la Pantalla 2
document.getElementById("botoEnrere").addEventListener("click", () => {
  pantalla3.style.display = "none";
  pantalla2.style.display = "block";
});

//Elements del panell de configuració
const botoConfig = document.getElementById("botoConfig");
const configPanel = document.getElementById("configPanel");
const colorSwitch = document.querySelector('#switch input[type="checkbox"]');

//Obrir o tancar el panell de configuració
botoConfig.addEventListener("click", () =>{
  configPanel.style.display =
    configPanel.style.display === "block" ? "none" : "block";
});

//Funció per canviar entre mode clar i mode nit
function cambiaTema(ev){

  if(ev.target.checked){
    //// Mode nit activat
    document.documentElement.setAttribute('tema', 'dark');
    setModeNit(true);
  }else{
    //Mode clar
    document.documentElement.setAttribute('tema', 'light');
    setModeNit(false);
  }

  //Repintar fons canvas, perque també es pinti quan canviem de mode
  if(sketchInstance){
    sketchInstance.background(getModeNit() ? 0 : 255);
  }
}

//Quan l'usuari activa/desactiva el switch, canviem el tema
colorSwitch.addEventListener('change', cambiaTema);