document.getElementById("formulario").addEventListener("submit", guardarTarea);
let formulario_btn = document.getElementById("formulario_btn");
let titulo = document.getElementById("titulo").value;
let descripcion = document.getElementById("descripcion").value;


// --------------------FETCH----------------------------------
let contenedorNotas = document.getElementById("mostrarNotas");
let contenedorNota = document.getElementById("vannotas")

fetch("notas.json") 

.then (response => response.json())
.then ( data => {
    data.forEach(data => {
        contenedorNota.innerHTML = `<p> ${data.titulo} </p>
        <p> ${data.descripcion} </p>
        <input type="button" value="BORRAR" onclick="borrarNota('${titulo}')" >`
        contenedorNotas.append(contenedorNota)
        
    });
    
})


// ----------funcion recoger datos de inputs-----------    
    function guardarTarea(e) {
        let titulo = document.getElementById("titulo").value;
        let descripcion = document.getElementById("descripcion").value;
    
        let tarea = {
            titulo,
            descripcion
        };
        
        
            
    
        if ((titulo && descripcion ) == "") {
            Toastify({
                text: "NO HAS CREADO UNA NOTA",
                className: "warning",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  },               
                duration: 3000
            }).showToast() }else{

                if (localStorage.getItem("tareas") === null) {
                    let tareas = [];
                    tareas.push(tarea);
                    localStorage.setItem("tareas", JSON.stringify(tareas));
        
                } else {
                    let tareas = JSON.parse(localStorage.getItem("tareas"));
                    tareas.push(tarea);
                    localStorage.setItem("tareas", JSON.stringify(tareas));
                }
        
        
                Toastify({
                    text: "NOTA CREADA EXISTOSAMENTE",
                    duration: 3000
                }).showToast();
        
        
        
                crearTareas();

            }
    
        document.getElementById("formulario").reset();
        e.preventDefault();
    }

//-------------- funcion pasar datos recogidos al dom--------------
function crearTareas() {

    let tareas = JSON.parse(localStorage.getItem("tareas"));
    let mostrarTareas = document.getElementById("mostrarNotas");


    mostrarTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        let titulo = tareas[i].titulo;
        let descripcion = tareas[i].descripcion;

        mostrarTareas.innerHTML +=
            `<div class="vannotas" id="vannotas"><p>${titulo}</p><p>${descripcion}</p>
            <input type="button" value="BORRAR" onclick="borrarNota('${titulo}')" >
        </div>`;

    }


}

//------------ funcion borrar notas---------------------------
function borrarNota(titulo) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].titulo == titulo) {
            tareas.splice(i, 1);
        }
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
    crearTareas();
}
crearTareas();


// --------------------FIN DE LA APLICACION------------------------

