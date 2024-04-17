// Array para almacenar todos los proyectos
let proyectos = [];

function Proyecto(nombre, descripcion = "") {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tareas = []; // Array para almacenar las tareas asociadas al proyecto
}

// Estructura básica del objeto tarea
function Tarea(descripcion, estado = "pendiente", fechaVencimiento = null) {
    this.descripcion = descripcion;
    this.estado = estado; // Estado inicialmente establecido en "pendiente"
    this.fechaVencimiento = fechaVencimiento; // Fecha de vencimiento opcional
}

// Función para mostrar la lista de proyectos
function mostrarListaProyectos() {
    const listaProyectos = document.getElementById("lista");
    listaProyectos.innerHTML = ""; // Limpiar la lista antes de agregar los proyectos

    proyectos.forEach(proyecto => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const s = document.createElement("p");
        p.textContent = "Titulo: " + proyecto.nombre;
        s.textContent = "Descripcion: " + proyecto.descripcion;
        li.appendChild(p);
        li.appendChild(s);
        listaProyectos.appendChild(li);
    });
}

// Función para agregar un nuevo proyecto al sistema
function agregarProyecto() {
    const nombre = document.getElementById("nombreProyecto").value;
    const descripcion = document.getElementById("descripcionProyecto").value;

    // Verificar si el nombre del proyecto ya existe
    if (proyectos.some(proyecto => proyecto.nombre === nombre)) {
        document.getElementById("resultado").innerText = "Ya existe un proyecto con ese nombre.";
        return;
    }

    // Crear un nuevo objeto de proyecto
    const nuevoProyecto = new Proyecto(nombre, descripcion);
    
    // Agregar el nuevo proyecto al array de proyectos
    proyectos.push(nuevoProyecto);
    document.getElementById("resultado").innerText = "Proyecto agregado exitosamente: " + JSON.stringify(nuevoProyecto);

    // Mostrar la lista actualizada de proyectos
    mostrarListaProyectos();
}

// Función para agregar una nueva tarea a un proyecto existente
function agregarTareaAProyecto() {
    const nombreProyecto = document.getElementById("proyectoId").value;
    const descripcion = document.getElementById("descripcionTarea").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;

    // Encontrar el proyecto por su nombre
    const proyecto = proyectos.find(proyecto => proyecto.nombre === nombreProyecto);
    
    // Verificar si el proyecto existe
    if (!proyecto) {
        document.getElementById("resultado").innerText = "El proyecto no existe.";
        return;
    }

    // Crear un nuevo objeto de tarea
    const nuevaTarea = new Tarea(descripcion, "pendiente", fechaVencimiento);
    
    // Agregar la nueva tarea al array de tareas del proyecto
    proyecto.tareas.push(nuevaTarea);
    document.getElementById("resultado").innerText = "Tarea agregada al proyecto: " + JSON.stringify(nuevaTarea);

    // Mostrar la lista actualizada de proyectos
    mostrarListaProyectos();
}

// Función para mostrar todas las tareas asociadas a un proyecto
function mostrarTareasDeProyecto() {
    const nombreProyecto = document.getElementById("proyectoIdMostrar").value;
    
    // Encontrar el proyecto por su nombre
    const proyecto = proyectos.find(proyecto => proyecto.nombre === nombreProyecto);
    
    // Verificar si el proyecto existe
    if (!proyecto) {
        document.getElementById("resultado").innerText = "El proyecto no existe.";
        return;
    }

    // Construir la lista de tareas del proyecto
    let listaTareas = "";
    proyecto.tareas.forEach(tarea => {
        listaTareas += "Descripción: " + tarea.descripcion + " | Estado: " + tarea.estado + " | Fecha de Vencimiento: " + (tarea.fechaVencimiento || "N/A") + "<br>";
    });

    // Mostrar las tareas del proyecto
    document.getElementById("resultado").innerHTML = "Tareas del proyecto '" + proyecto.nombre + "':<br>" + listaTareas;
}

// Llamar a la función para mostrar la lista inicial de proyectos al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarListaProyectos();
});