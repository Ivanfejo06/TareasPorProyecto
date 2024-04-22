// Array para almacenar todos los proyectos
let proyectos = [];

function Proyecto(nombre, descripcion = "") {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tareas = []; // Array para almacenar las tareas asociadas al proyecto
}

// Estructura básica del objeto tarea
function Tarea(nombreProyecto, nombre, descripcion, estado = "Pendiente", fechaVencimiento = null) {
    this.nombreProyecto = nombreProyecto; // Nuevo parámetro de nombreProyecto
    this.nombre = nombre; // Nuevo parámetro de nombre
    this.descripcion = descripcion;
    this.estado = estado; // Estado inicialmente establecido en "pendiente"
    this.fechaVencimiento = fechaVencimiento; // Fecha de vencimiento opcional
}

function mostrarListaProyectos() {
    const listaProyectos = document.getElementById("lista");
    listaProyectos.innerHTML = ""; // Limpiar la lista antes de agregar los proyectos

    proyectos.forEach(proyecto => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const s = document.createElement("p");
        const buttonMostrarTareas = document.createElement("button");
        const buttonAgregarTarea = document.createElement("button");
        const inputHidden = document.createElement("input");

        inputHidden.type = "hidden";
        inputHidden.value = proyecto.nombre;
        inputHidden.id = "idProyecto";

        buttonMostrarTareas.textContent = "Mostrar Tareas";
        buttonMostrarTareas.className = "btnbl";
        buttonMostrarTareas.addEventListener("click", function() {
            const proyectoId = inputHidden.value;
            mostrarTareasDeProyecto(proyectoId);
        });

        buttonAgregarTarea.textContent = "Agregar Tarea";
        buttonAgregarTarea.className = "btn";
        buttonAgregarTarea.addEventListener("click", function() {
            const proyectoId = inputHidden.value;
            const nombreTarea = nombreTareaInput.value;
            const descripcionTarea = descripcionTareaInput.value; // Nuevo input para descripción de tarea
            const fechaVencimiento = fechaVencimientoInput.value;
            agregarTareaAProyecto(proyectoId, nombreTarea, descripcionTarea, fechaVencimiento);
            // Limpiar los inputs después de agregar la tarea
            nombreTareaInput.value = "";
            descripcionTareaInput.value = ""; // Limpiar input de descripción de tarea
            fechaVencimientoInput.value = "";
        });

        // Crear input para el nombre de la tarea
        const nombreTareaInput = document.createElement("input");
        nombreTareaInput.type = "text";
        nombreTareaInput.placeholder = "Nombre de la tarea";

        // Crear input para la descripción de la tarea
        const descripcionTareaInput = document.createElement("input");
        descripcionTareaInput.type = "text";
        descripcionTareaInput.placeholder = "Descripción de la tarea";

        // Crear input para la fecha de vencimiento
        const fechaVencimientoInput = document.createElement("input");
        fechaVencimientoInput.type = "date";
        fechaVencimientoInput.placeholder = "Fecha de vencimiento (opcional)";

        p.textContent = "Titulo: " + proyecto.nombre;
        s.textContent = "Descripcion: " + proyecto.descripcion;
        li.appendChild(p);
        li.appendChild(s);
        li.appendChild(inputHidden);
        li.appendChild(buttonMostrarTareas);
        li.appendChild(nombreTareaInput);
        li.appendChild(descripcionTareaInput); // Agregar input de descripción de tarea
        li.appendChild(fechaVencimientoInput);
        li.appendChild(buttonAgregarTarea); // Agregamos el botón de agregar tarea
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
function agregarTareaAProyecto(nombreProyecto, nombreTarea, descripcionTarea, fechaVencimiento) {
    // Encontrar el proyecto por su nombre
    const proyecto = proyectos.find(proyecto => proyecto.nombre === nombreProyecto);
    
    // Verificar si el proyecto existe
    if (!proyecto) {
        document.getElementById("resultado").innerText = "El proyecto no existe.";
        return;
    }

    // Verificar si ya existe una tarea con el mismo nombre en el proyecto
    if (proyecto.tareas.some(tarea => tarea.nombre === nombreTarea)) {
        document.getElementById("resultado").innerText = "Ya existe una tarea con ese nombre en el proyecto.";
        return;
    }

    // Crear un nuevo objeto de tarea con el nombre del proyecto
    const nuevaTarea = new Tarea(nombreProyecto, nombreTarea, descripcionTarea, "Pendiente", fechaVencimiento);
    
    // Agregar la nueva tarea al array de tareas del proyecto
    proyecto.tareas.push(nuevaTarea);
    document.getElementById("resultado").innerText = "Tarea agregada al proyecto: " + JSON.stringify(nuevaTarea);

    // Mostrar la lista actualizada de proyectos
    mostrarListaProyectos();
}

// Función para mostrar todas las tareas asociadas a un proyecto
function mostrarTareasDeProyecto(nombreProyecto) {
    const listaTareas = document.getElementById("resultado");
    listaTareas.innerHTML = ""; // Limpiar la lista antes de agregar los proyectos
    
    // Encontrar el proyecto por su nombre
    const proyecto = proyectos.find(proyecto => proyecto.nombre === nombreProyecto);
    const lii = document.createElement("li");
    const nombreP = document.createElement("h3");

    // Verificar si el proyecto existe
    if (!proyecto) {
        document.getElementById("resultado").innerText = "El proyecto no existe.";
        return;
    }

    // Limpiar el resultado anterior
    document.getElementById("resultado").innerHTML = "";
    nombreP.textContent = nombreProyecto;
    lii.appendChild(nombreP);

    // Construir la lista de tareas del proyecto y agregarlas debajo del proyecto correspondiente
    proyecto.tareas.forEach(tarea => {
        const Nombre = document.createElement("p");
        const Desc = document.createElement("p");
        const Estado = document.createElement("p");
        const Venc = document.createElement("p");
        const buttonEstado = document.createElement("button");
        const li = document.createElement("li");

        Nombre.textContent = "Nombre: " + tarea.nombre;
        Desc.textContent = "Descripción: " + tarea.descripcion;
        Estado.textContent = "Estado: " + tarea.estado;
        Venc.textContent = "Fecha de Vencimiento: " + (tarea.fechaVencimiento || "N/A")
        
        buttonEstado.textContent = "Cambiar Estado";
        buttonEstado.className = "btn";
        buttonEstado.addEventListener("click", function() {
            CambiarEstadoTarea(tarea.nombre);
        });

        li.appendChild(Nombre);
        li.appendChild(Desc);
        li.appendChild(Estado);
        li.appendChild(Venc);
        li.appendChild(buttonEstado);
        lii.appendChild(li);
    });
    document.getElementById("resultado").appendChild(lii);
}

function mostrarTareasPorFechaDeVencimiento() {
    // Obtengo las variables
    const nombreProyecto = document.getElementById("proyectoId").value;
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    
    // Encontrar el proyecto por su nombre
    const proyecto = proyectos.find(proyecto => proyecto.nombre === nombreProyecto);
    
    // Verificar si el proyecto existe
    if (!proyecto) {
        document.getElementById("resultado").innerText = "El proyecto no existe.";
        return;
    }

    // Filtrar las tareas del proyecto por fecha de vencimiento
    const tareasConFechaVencimiento = proyecto.tareas.filter(tarea => tarea.fechaVencimiento === fechaVencimiento);
    
    // Verificar si hay tareas con la fecha de vencimiento especificada
    if (tareasConFechaVencimiento.length === 0) {
        document.getElementById("resultado").innerText = "No hay tareas con esa fecha de vencimiento en el proyecto.";
        return;
    }

    // Construir la lista de tareas con la fecha de vencimiento especificada
    let listaTareas = "";
    tareasConFechaVencimiento.forEach(tarea => {
        listaTareas += "Nombre: " + tarea.nombre + " | Descripción: " + tarea.descripcion + " | Estado: " + tarea.estado + " | Fecha de Vencimiento: " + (tarea.fechaVencimiento || "N/A") + "<br>";
    });

    // Mostrar las tareas del proyecto con la fecha de vencimiento especificada
    document.getElementById("resultado").innerHTML = "Tareas del proyecto '" + proyecto.nombre + "' con fecha de vencimiento '" + fechaVencimiento + "':<br>" + listaTareas;
}

function CambiarEstadoTarea(nombre){
    proyectos.forEach(proyecto => {
        proyecto.tareas.forEach(tarea => {
            if(tarea.nombre === nombre && tarea.estado === "Pendiente"){
                tarea.estado = "Completa"; // Cambiamos el estado a "completa"
                mostrarTareasDeProyecto(tarea.nombreProyecto); // Mostrar tareas actualizadas del proyecto
            } else if(tarea.nombre === nombre && tarea.estado === "Completa"){
                tarea.estado = "Pendiente"; // Cambiamos el estado a "pendiente"
                mostrarTareasDeProyecto(tarea.nombreProyecto); // Mostrar tareas actualizadas del proyecto
            }
        });
    });
}

// Llamar a la función para mostrar la lista inicial de proyectos al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarListaProyectos();
});