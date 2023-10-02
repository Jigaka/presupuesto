const form = document.getElementById("calculador-form");
const steps = form.querySelectorAll("section");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const minDias = 10;
let aplicoCupon = false;

const cupones = {
  'PRIMAVERA': 0.25,
  'PARCIALES': 0.3,
  'SEGUNDA SE RECUPERA': 0.4
}


document.addEventListener("DOMContentLoaded", function () {
  var inputFecha = document.getElementById("myDate");

  // Obtén la fecha actual en el formato "yyyy-mm-dd"
  var fechaActual = new Date().toISOString().split("T")[0];

  // Establece la fecha mínima en el input como la fecha actual
  inputFecha.min = fechaActual;
});

let currentStep = 0;
const objeto = {}


const tipoTrabajo = {
  "documento": 2000,
  "presentacion": 1500,
  "monografia": 3500
}

const categoria = {
  "trabajo-practico": 2000,
  "cientifico": 4000
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarMensajeWhatsApp();
})

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });

  prevButton.classList.toggle("hidden", stepIndex === 0);
  nextButton.classList.toggle("hidden", stepIndex === steps.length - 1);
}

function validateStep(step) {
  const field = document.querySelector(`[data-step="${step+1}"]`);

  if(step == 5 || step == 7){
    return;
  }

  if (field.value === "") {
    document.querySelector("#next-button").disabled = true;
    return true;      
  } else {
    document.querySelector("#next-button").disabled = false;
    return false;
  }
}

function calculateBudget() {
  // Aquí puedes agregar la lógica para calcular el presupuesto
  // y actualizar el resultado en el último paso.
  let precioNumero = 0;
  let dias = 0;
  document.querySelectorAll("[data-step]").forEach(field => {
    objeto[field.name] = field.value;
    if(field.type === "date"){
      dias = diasParaFecha(field.value);
    }
  })

  if(dias > minDias) {
    dias = minDias;
  }
  const precio = document.querySelector(".precio");
  const precioSinCupon = document.querySelector(".precio-sin-cupon");
  const textCupon = document.querySelector(".text-cupon");

  precioNumero = tipoTrabajo[objeto["tipo-trabajo"]]*objeto.hojas + (10-dias)*3000 + categoria[objeto.categoria];
  if(!!cupones[objeto.cupon.toUpperCase()]){
    precioSinCupon.innerHTML = addDot(precioNumero);
    precioSinCupon.classList.remove("hidden");
    textCupon.innerHTML = textCupon.innerHTML + objeto.cupon.toUpperCase() + " " + cupones[objeto.cupon.toUpperCase()]*100 + "% off!!";
    textCupon.classList.remove("hidden");
    precioNumero = precioNumero -  precioNumero * cupones[objeto.cupon.toUpperCase()];
  } else {
    precioSinCupon.classList.add("hidden");
    textCupon.classList.add("hidden");
  }
  precio.innerHTML = addDot(precioNumero);

}

function enviarMensajeWhatsApp() {
  // Número de teléfono al que deseas enviar el mensaje (incluye el código de país sin el símbolo +)
  var numeroTelefono = "595986723105";

  // Objeto JavaScript que deseas envia

  // Convierte el objeto en una cadena JSON y le da formato
  var objetoFormateado = `*Tipo de trabajo*: ${objeto["tipo-trabajo"]}\n*Categoria*: ${objeto["categoria"]}\n*Hojas*: ${objeto.hojas}\n*Fecha*: ${objeto.fecha}\n*Tema*: ${objeto.tema}\n*Observacion*: ${objeto.observacion}`;

  // Mensaje que deseas enviar, incluyendo el objeto formateado
  var mensaje = `¡Hola! Soy ${objeto.nombre}\n Aquí tienes la información del trabajo que quiero que me hagas:\n\n${objetoFormateado}`;

  // Codifica el número de teléfono y el mensaje para que sean válidos en una URL
  var mensajeCodificado = encodeURIComponent(mensaje);

  // Crea el enlace de WhatsApp con el número y el mensaje
  var enlaceWhatsApp = "https://api.whatsapp.com/send?phone=" + numeroTelefono + "&text=" + mensajeCodificado;

  // Abre una nueva ventana o pestaña del navegador con el enlace de WhatsApp
  window.location.href = enlaceWhatsApp;
  // window.open(enlaceWhatsApp);
}

showStep(currentStep);

prevButton.addEventListener("click", function () {
  currentStep = Math.max(currentStep - 1, 0);
  showStep(currentStep);

  const textCupon = document.querySelector(".text-cupon");
  textCupon.innerHTML = "";
});

nextButton.addEventListener("click", function () {
  if(validateStep(currentStep)){
    document.querySelector("#next-button").disabled = false;
    return;
  }
  if (currentStep === steps.length - 1) {
    calculateBudget();
  } else {
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    showStep(currentStep);
    if (currentStep === steps.length - 1) {
      calculateBudget();
    }
  }     
});


function diasParaFecha(fechaFutura) {
  // Obtener la fecha actual
  var fechaActual = new Date();

  // Convertir la fecha futura a un objeto Date
  var fechaFuturaObjeto = new Date(fechaFutura);

  // Calcular la diferencia en milisegundos entre las fechas
  var diferenciaMilisegundos = fechaFuturaObjeto.getTime() - fechaActual.getTime();


  // Calcular la diferencia en días
  var dias = Math.abs(Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24)));

  return dias;
}
  


const addDot = function (numero){
  let numeroString = String(numero);
  let reverse = numeroString.split('').reverse();
  const sizeReverse = reverse.length
  let cantPuntos = 0;
  for(let i = 3; i < sizeReverse; i += 3){
      reverse = add(reverse, i + cantPuntos, '.')
      cantPuntos++

  }
  return reverse.reverse().join('')
}


const add = function (arr, index, newElement){
  return [
      ...arr.slice(0 ,index),
      newElement,
      ...arr.slice(index)
  ]
}