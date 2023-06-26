//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//EventListeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}



//Funciones

function agregarTweet(e){
    e.preventDefault();

    //Text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio'); //Funcion mostrar error

        return; //Con el return se evita que se ejecuten 
                //mas lineas de codigo
                
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }
    
    //Añadir al Array de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado, crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
    
}


//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

//Insertar contenido
const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

setTimeout(() => {
    mensajeError.remove(); //A los 2 segundos se quita el Mensaje de error
}, 2000);
}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {

            //Agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweeet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agregar los tweets a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//Elimina un tweet
function borrarTweeet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar el HTML
function limpiarHTML(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
