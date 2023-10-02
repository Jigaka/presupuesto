
const form = document.querySelector('.presupuesto-form');
const hojas = document.querySelector('.hojas');
const materia = document.querySelector('.materia');
const totalSpan = document.querySelector('.total-span');
const precioBaseMateria = 1000;



const matePeso = {
    'Matematica' : 5,
    'Ciencias' : 4,
    'Quimica' : 3,
    'Fisica' : 6,
    'Castellano' : 2
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let total = matePeso[materia.value] * precioBaseMateria * hojas.value;
    totalSpan.innerHTML = 'Gs. ' + addDot(total)
})

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