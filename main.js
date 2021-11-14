
const frutas =[
{
id:1,
nombre:'Kiwi',
precio:2.35,
imagen:'/imagenes/kiwi.png',
},
{
id:2,
nombre:'Fresas',
precio:2.10,
imagen:'/imagenes/fresas.jpg',
},
{
id:3,
nombre:'Limón',
precio:1.10,
imagen:'/imagenes/limon.jpg'
},
{
id:4,
nombre:'Mandarinas',
precio:2.20,
imagen:'/imagenes/mandarinas.jpg',
},
{
 id:5,
 nombre:'Manzanas',
 precio:0.99,
 imagen:'/imagenes/manzanas.jpg'   
},
{
id:6,
nombre:'Melocotón',
precio:0.80,
imagen:'/imagenes/melocot.jpg' 
},
{
id:7,
nombre:'Melón',
precio:1.50,
imagen:'/imagenes/melon.jpg'
},

{
 id:8,
 nombre:'Naranjas',
 precio:3.90,
 imagen:'/imagenes/naranjas.jpg',   
},
{
id:9,
nombre:'Plátanos',
precio:0.80,
imagen:'/imagenes/platanos.jpg'
},
{
id:10,
nombre:'Sandía',
precio:2.05,
imagen:'/imagenes/sandia.jpg'
},
{
 id:11,
 nombre:'Tomates',
 precio:1.10,
 imagen:'/imagenes/tomates.jpg'   
},
{
id:12,
nombre:'Uvas',
precio:2.20,
imagen:'/imagenes/uvas.jpg'
},
{
id:13,
nombre:'Zanahorias',
precio:0.99,
imagen:'/imagenes/zanahorias.jpg'
},

];

let carrito =[];
let total =0;
const $items= document.querySelector('#items');
const $carrito= document.querySelector('#carrito');
const $total = document.querySelector('#total');
const $boton = document.querySelector('#boton-vaciar');

//dibujar productos a partir de la base de datos

function drawElements(){
    frutas.forEach((info)=>{
        //estructura
        const miNodoCard = document.createElement('div');
        miNodoCard.classList.add('card', 'col-sm-4');
        //body
        const nodoCardBody = document.createElement('div');
        nodoCardBody.classList.add('card-body');
        //Titulo
        const nodoTitulo = document.createElement('h5');
        nodoTitulo.classList.add('card-title');
        nodoTitulo.textContent = info.nombre;
        //imagen
        const nodoImagen = document.createElement('img');
        nodoImagen.classList.add('img-fluid');
        nodoImagen.setAttribute('src', info.imagen);
        //precio
        const nodoPrecio = document.createElement('p');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = info.precio + '€';
        //boton

        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btn', 'btn-primary');
        nodoBoton.textContent= 'Añadir';
        nodoBoton.setAttribute('marcador', info.id);
        nodoBoton.addEventListener('click', anyadirAlCarrito);


        //insertarmos

        nodoCardBody.appendChild(nodoTitulo);
        nodoCardBody.appendChild(nodoImagen);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        miNodoCard.appendChild(nodoCardBody);
        $items.appendChild(miNodoCard);

    });
}



//añadir un elemento al carrito

function anyadirAlCarrito(evento){
// añadir el nodo al carrito
carrito.push(evento.target.getAttribute('marcador'))

//calcular el total
calcularTotal();

//Actualizar

actualizarCarrito();

}

//dibujar productos guardados en el carrito

function actualizarCarrito(){
    //vaciar el carrito
    $carrito.textContent='';

    //quitar los duplicados

    const carritoSinDuplicados = [...new Set(carrito)];
    // generar los Nodos a partir del carrito
carritoSinDuplicados.forEach((item)=>{
    //Obtenemos el item de la base de datos
    const getItemBD = frutas.filter((itemBaseDatos)=>{
        return itemBaseDatos.id ===parseInt(item);
    });

    //contar las veces que el producto se repite

    const numeroItem = carrito.reduce((total, itemId)=>{
        //Si coincice id contador suma
        return itemId === item ? total +=1 : total;

    },0);

    //crear nodo del item del carrito
    const nodoList = document.createElement('li');
    nodoList.classList.add('list-group-item', 'text-right', 'mx-1');
    nodoList.textContent = `${numeroItem} x ${getItemBD[0].nombre} - ${getItemBD[0].precio}€`;

    //boton borrar
    const botonBorrar = document.createElement('button');
    botonBorrar.classList.add('btn', 'btn-danger', 'mx-3');
    botonBorrar.textContent = 'X'
    botonBorrar.style.marginLeft ='1rem';
    botonBorrar.dataset.item = item;
    botonBorrar.addEventListener('click', borrarItemCarrito);

    //mezclar nodos

    nodoList.appendChild(botonBorrar);
    $carrito.appendChild(nodoList);

});


}

//borrar un elemento del carrito

function borrarItemCarrito(evento){
    //obtener id del producto
    const getId = evento.target.dataset.item;
    //borrar todos los productos
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== getId;
    });
    //volvemos a renderizar la pag
    actualizarCarrito();
    //calculamos de nuevo el precio
    calcularTotal();
}

//calcular precio total

function calcularTotal(){

//limpiamos total anterior
total = 0;
//recorremos el array del carrito
carrito.forEach((item)=>{
    //obtenemos de cada element su precio

    const getItemBD = frutas.filter((itemBaseDatos)=>{
        return itemBaseDatos.id ===parseInt(item); 
});
total = total + getItemBD[0].precio;
});

// renderizar el precio en el html
$total.textContent = total.toFixed(2);
}


//vaciar el carrito y volver a pitarlo
function vaciarElCarro(){
    //limpiar productos
    carrito =[];
    //renderizar carrito
    actualizarCarrito();
    calcularTotal();
}


          // Eventos
          $boton.addEventListener('click', vaciarElCarro);

          // Inicio
          drawElements()