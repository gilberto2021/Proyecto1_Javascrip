
let deck = [];
const tipos = ['C', 'D', 'H', 's'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;


//Referencias al HTML
const pedir = document.querySelector('#pedir');

const stop = document.querySelector('#stop');

const nuevo = document.querySelector('#nuevo');

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');

const divCartasComputadora = document.querySelector('#computadora-cartas');
 

const crearDeck = () =>{

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for( let tipo of tipos){
        for( let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    //console.log(deck);
    deck = _.shuffle( deck );
    console.log(deck);
    return deck
}
crearDeck();

//Esta funcion me permite tomar una carta

const pedirCarta = () =>{
    if ( deck.length === 0 ){
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();
    return carta;
}



const valorCarta = ( carta ) =>{

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN (valor) ) ?
        ( valor === 'A' ) ? 11:10
        : valor * 1;
}


//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora; 
        //crear imagen de forma dinamica
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; 
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ){
            break;
        }
    } while( ( puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ));

    setTimeout(() => {       
        if ( puntosMinimos > 21){
            alert('La computadora gana');
        } else if ( puntosMinimos === puntosComputadora){
            alert('Es un empate');
        } else if (puntosMinimos > puntosComputadora){
            alert('El jugador gana');
        } else if(puntosComputadora > 21){
            alert('El jugador gana');
        } else alert('La computadora gana');
    }, 100 );
}


//Eventos
pedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador; 
    //crear imagen de forma dinamica
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; 
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento, has perdido');
        pedir.disabled = true;
        stop.disabled=true;
        turnoComputadora();
    } else if ( puntosJugador === 21 ){
        console.warn('21 Genial')
        pedir.disabled = true;
        stop.disabled=true;
        turnoComputadora( puntosJugador );
    }
})


stop.addEventListener('click', () => {
    pedir.disabled = true;
    stop.disabled=true;
    turnoComputadora( puntosJugador ); 

})




nuevo.addEventListener('click', () => {

    console.clear;
    deck = [];
    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    pedir.disabled =false;
    stop.disabled=false;

})

