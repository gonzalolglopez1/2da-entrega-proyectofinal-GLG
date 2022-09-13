document.getElementById("formulario").addEventListener("submit", guardarTarea);

function guardarTarea(e) {
    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;

    let tarea = {
        titulo,
        descripcion
    };

    if (localStorage.getItem("tareas") === null) {
        let tareas = [];
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }else{
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
    crearTareas();
    document.getElementById("formulario").reset();
    e.preventDefault();
}

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

function borrarNota(titulo) {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
  for(let i = 0; i < tareas.length; i++) {
    if(tareas[i].titulo == titulo) {
      tareas.splice(i, 1);
    }
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  crearTareas();
}
crearTareas();