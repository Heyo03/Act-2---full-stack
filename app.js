// Clase Tarea
class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false;
    }

    // Método para cambiar el estado de la tarea
    toggleEstado() {
        this.completa = !this.completa;
    }

    // Método para editar el nombre de la tarea
    editar(nombreNuevo) {
        this.nombre = nombreNuevo;
    }
}

// Clase GestorDeTareas
class GestorDeTareas {
    constructor() {
        this.tareas = this.cargarTareasDesdeStorage();
    }

    // Método para agregar una nueva tarea
    agregarTarea(nombre) {
        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        this.guardarTareasEnStorage();
    }

    // Método para eliminar una tarea de la lista
    eliminarTarea(indice) {
        this.tareas.splice(indice, 1);
        this.guardarTareasEnStorage();
    }

    // Método para editar una tarea
    editarTarea(indice, nuevoNombre) {
        this.tareas[indice].editar(nuevoNombre);
        this.guardarTareasEnStorage();
    }

    // Método para cambiar el estado de una tarea
    cambiarEstadoTarea(indice) {
        this.tareas[indice].toggleEstado();
        this.guardarTareasEnStorage();
    }

    // Método para obtener la lista de tareas
    obtenerTareas() {
        return this.tareas;
    }

    // Método para cargar las tareas desde LocalStorage
    cargarTareasDesdeStorage() {
        const tareasGuardadas = localStorage.getItem('tareas');
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    }

    // Método para guardar las tareas en LocalStorage
    guardarTareasEnStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
}

// Instanciamos el gestor de tareas
const gestorDeTareas = new GestorDeTareas();

// Selección de elementos del DOM
const inputTarea = document.getElementById('nuevaTarea');
const botonAgregarTarea = document.getElementById('agregarTarea');
const listaTareas = document.getElementById('listaTareas');
const errorMensaje = document.getElementById('errorMensaje');

// Función para mostrar las tareas
const mostrarTareas = () => {
    listaTareas.innerHTML = '';
    gestorDeTareas.obtenerTareas().forEach((tarea, indice) => {
        const tareaElement = document.createElement('li');
        tareaElement.textContent = `${tarea.nombre} - ${tarea.completa ? 'Completada' : 'Pendiente'}`;

        const editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar';
        editarBtn.onclick = () => {
            const nuevoNombre = prompt('Editar tarea', tarea.nombre);
            if (nuevoNombre) {
                gestorDeTareas.editarTarea(indice, nuevoNombre);
                mostrarTareas();
            }
        };

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = () => {
            gestorDeTareas.eliminarTarea(indice);
            mostrarTareas();
        };

        const toggleEstadoBtn = document.createElement('button');
        toggleEstadoBtn.textContent = tarea.completa ? 'Marcar como Pendiente' : 'Marcar como Completada';
        toggleEstadoBtn.onclick = () => {
            gestorDeTareas.cambiarEstadoTarea(indice);
            mostrarTareas();
        };

        tareaElement.appendChild(editarBtn);
        tareaElement.appendChild(eliminarBtn);
        tareaElement.appendChild(toggleEstadoBtn);
        listaTareas.appendChild(tareaElement);
    });
};

// Función para agregar tarea
botonAgregarTarea.addEventListener('click', () => {
    const nombreTarea = inputTarea.value.trim();
    if (!nombreTarea) {
        // Mostrar mensaje de error si la entrada está vacía
        errorMensaje.textContent = '¡La tarea no puede estar vacía!';
        return;
    }

    // Limpiar mensaje de error si la tarea es válida
    errorMensaje.textContent = '';
    
    gestorDeTareas.agregarTarea(nombreTarea);
    inputTarea.value = '';
    mostrarTareas();
});

// Inicializamos mostrando las tareas
mostrarTareas();
