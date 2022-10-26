import {validarCampoVacio,validarRadioButton,setError,setSuccess,validarCheckeos} from "./Validadores.js"; 
import {crearTabla} from './tablaDinamica.js';
import { Anuncio } from "./Anuncio.js";

const listadoAnunciosLocal = traerLocalStorage('anuncios');


//Local storage Manejo
function traerLocalStorage(nombre)
{
    let anuncios = JSON.parse(localStorage.getItem(nombre));
    if(anuncios == null)
    {
        anuncios = [];
        localStorage.setItem(nombre,JSON.stringify(anuncios));
    }
    return anuncios;
}

function guardar_localStorage(nombre,anuncios)
{
    //console.log("Al guardar me lleg:",anuncios);
    if(anuncios != null)
    {
        document.getElementById("ruedaSpinner").removeAttribute("hidden");
        setTimeout(function(){
            document.getElementById("ruedaSpinner").hidden = true;
        },3000);
        localStorage.setItem(nombre,JSON.stringify(anuncios))
        //console.log("guarde");
    }
}


//---------------------------------------------------------------------------------

const formulario = document.forms[0];
const tabla = document.querySelector(".divTabla");
cargarTabla(); //cargo la tabla apenas inicia el programa
//----------------

//Manejador para traer data de la tabla al hace click
tabla.addEventListener("click",(e)=>{
    const emisor = e.target;
    if(emisor.matches("tbody tr td"))
    {
        let id = emisor.parentElement.dataset.id;
        //console.log(id);//anda me trae el id, despues ahregarle la busqueda del local storage

        const objeto = listadoAnunciosLocal.find((el) => el.id == id);
        //cargo la data al form
        cargarFormData(objeto);
        $btnBorrar.removeAttribute("hidden");
        $btnCancelar.removeAttribute("hidden");
        $btnModificar.removeAttribute("hidden");
        
        $btnCancelar.addEventListener("click",cancelarMod);
        $btnModificar.addEventListener("click",modificarAnuncio);
        $btnBorrar.addEventListener("click",eliminarAnuncio);
    }
});


const {Titulo,Transaccion,Descripcion,Precio,Puertas,Kilometros,Potencia} = formulario;

function cancelarMod()
{
    Titulo.value = "";
    Descripcion.value = "";
    Precio.value = "";
    Puertas.value = "";
    Kilometros.value = "";
    Potencia.value = ""; 

    $btnBorrar.hidden = true;
    $btnCancelar.hidden = true;
    $btnModificar.hidden = true;

    formulario.removeAttribute("id");
}

function cargarFormData(anuncio)
{
    Titulo.value = anuncio.titulo;
    Descripcion.value = anuncio.descripcion;
    Precio.value = anuncio.precio;
    Puertas.value = anuncio.puertas;
    Kilometros.value = anuncio.kilometros;
    Potencia.value = anuncio.potencia; 

    formulario.setAttribute("id",anuncio.id);
}

function modificarAnuncio()
{
    let idForm = formulario.getAttribute("id");
    const anuncioAmodificar = listadoAnunciosLocal.find((el) => el.id == idForm);

    anuncioAmodificar.titulo = Titulo.value;
    anuncioAmodificar.descripcion = Descripcion.value;
    anuncioAmodificar.precio = Precio.value;
    anuncioAmodificar.puertas = Puertas.value;
    anuncioAmodificar.kilometros = Kilometros.value;
    anuncioAmodificar.potencia = Potencia.value;
    

    guardar_localStorage('anuncios',listadoAnunciosLocal);
    vaciarTabla();
    cargarTabla();
    cancelarMod(); //asi libera los inputs y le remueve el atributo id al formulario
}

function eliminarAnuncio()
{
    let idForm = formulario.getAttribute("id");
    let indiceAborrar = listadoAnunciosLocal.findIndex((el)=>el.id == idForm);
    listadoAnunciosLocal.splice(indiceAborrar,1);
    guardar_localStorage('anuncios',listadoAnunciosLocal);
    vaciarTabla();
    cargarTabla();
    cancelarMod(); //asi libera los inputs y le remueve el atributo id al formulario
}

const controles = recuperarInputs(formulario.elements);
const radioBtns = document.getElementsByName("Transaccion"); 

//asigno la tabla
function cargarTabla()
{
    tabla.appendChild(crearTabla(listadoAnunciosLocal));
}

function vaciarTabla()
{
    let elemento = tabla.lastChild;
    elemento.remove();
}



//asigno manejadores al form, para que validen
for(let i=0;i<controles.length;i++)
{
    controles[i].addEventListener("blur",validarCampoVacio);
}

//-------------BOTONES

//mme traigo el btn de guardar., el next sibling del next sibling, por que le sigue un br al form antesdel boton..
const $btnGuardar = (formulario.nextElementSibling).nextElementSibling;
//agrego manejador, para guardar
$btnGuardar.addEventListener("click",agregarLista);

//me traigo el ultimo radio button asi le asigno al gestor de error, al small
const $smallRadioBtn = radioBtns[1].nextElementSibling;

const $btnBorrar = $btnGuardar.nextElementSibling;
const $btnCancelar = $btnBorrar.nextElementSibling;
const $btnModificar = $btnCancelar.nextElementSibling;

//console.log("Boton borrar:", $btnBorrar);
//console.log("Boton cancelar:", $btnCancelar);

function agregarLista()
{
    //console.log("Entre");
    let radioButtonSeleccionado = validarRadioButton(radioBtns);
    if(radioButtonSeleccionado != null)
    {
        $smallRadioBtn.classList.remove("danger");
        $smallRadioBtn.textContent = "";
        radioBtns[0].classList.add("checkeado");
        radioBtns[1].classList.add("checkeado");
        if(validarCheckeos(controles))
        {
            console.log("Entre, esta todo recontra okey");
            const nuevoAnuncio = new Anuncio(
                                    Date.now(),
                                    controles[0].value,
                                    radioButtonSeleccionado.value,
                                    controles[3].value,
                                    controles[4].value,
                                    controles[5].value,
                                    controles[6].value,
                                    controles[7].value);
            listadoAnunciosLocal.push(nuevoAnuncio);
            guardar_localStorage('anuncios',listadoAnunciosLocal);
            //Refresco la tabla
            vaciarTabla();
            cargarTabla();
        }
        else
        {
            alert("Error, complete todos los campos!");
        }
    }
    else
    {
        $smallRadioBtn.classList.add("danger");
        $smallRadioBtn.textContent = "Campo mandatorio, seleccione Venta o Alquiler..";
    }
}

function recuperarInputs(controlesForm)
{
    const arrayControles = new Array();
    if(controlesForm != null)
    {
        for(let i=0;i<controlesForm.length;i++)
        {
            if(controlesForm[i].matches("input"))
            {
                arrayControles.push(controlesForm[i]);
            }
        }
        return arrayControles;
    }
}
