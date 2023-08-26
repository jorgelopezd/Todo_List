
//investigando llegue a que este evento es mejor para renderizado para manipular la info con js
document.addEventListener ("DOMContentLoaded", function(){
    const inputTarea = document.querySelector('#entradaTarea');
    const botonAgregar= document.querySelector('#botonAgregarTarea');
    const listaTareas = document.querySelector('#listaTareas');
    const totalTareasSpan = document.querySelector('#totalTareas');
    const tareasCompletasSpan = document.querySelector('#tareasCompletadas');

    //areglo para guardar tareas
    let tareas =[
        {id: 1, descripcion: 'Comprar despensa', completada: false},
        {id: 2, descripcion: 'Ver pendientes', completada: false},
        {id: 3, descripcion: 'Cita medico', completada: false},
    ];

    //funcion para actualizar contenido en pagina
    function renderizarTareas(){
        listaTareas.innerHTML = `
            <li>
                <span>ID</span>
                <span>Tarea</span>
            </li>
        `;
        //recorre el arreglo y agrega elementos al dom
        tareas.forEach(tarea =>{
            const li = document.createElement('li');
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarea.completada;
            checkbox.addEventListener('change', () => marcarTarea(tarea.id, checkbox.checked));
        
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(tarea.descripcion));

            const idSpan = document.createElement('span');
            idSpan.textContent = tarea.id;

            li.appendChild(idSpan);
            li.appendChild(label);

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarTarea(tarea.id));
            botonEliminar.setAttribute('data-id', tarea.id);

            li.appendChild(botonEliminar);
            listaTareas.appendChild(li);
        });
        actualiuzarContadoresTareas();
    }

    //funcion agregar tarea
    function agregarTarea(descripcion){
        tareas.push({
            id: tareas.length +1,
            descripcion: descripcion,
            completada: false
        })
        renderizarTareas();
    }
    //evente de boton agregar y evalua si el input esta vacio arroja una alerta en caso de agregar un caracter en blanco igual arroja el error
    botonAgregar.addEventListener('click', () =>{
        const nuevaDescripcion = inputTarea.value.trim();
        if(nuevaDescripcion !== ''){
            agregarTarea(nuevaDescripcion);
            inputTarea.value = '';
        }else{
            alert('Favor ingresar tarea');
        }
    });

    //funcion para cambiar el estado de una tarea
    function marcarTarea(id, completada){
        tareas = tareas.map(tarea => tarea.id === id ? {...tarea,completada} : tarea);
        renderizarTareas();
    }

    //funcion para eliminar tarea
    function eliminarTarea (id){
        tareas = tareas.filter(tarea => tarea.id !== id);
        renderizarTareas();
    }

    //funcion para actualizar contadores
    function actualiuzarContadoresTareas(){
        totalTareasSpan.textContent = tareas.length;
        const tareasCompletas = tareas.filter(tarea => tarea.completada).length;
        tareasCompletasSpan.textContent = tareasCompletas;
    }
    renderizarTareas();
});