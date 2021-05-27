//Forma para añadir tareas
import {useState} from 'react'

const AddTask = ({onAdd}) => {

    //El estado que estamos cambiando y la funcion que usamos para cambiarlo con el default que queremos que tenga
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        //Prevenimos que haga el submit a alguna pagina
        e.preventDefault()

        //Validación de campos
        if(!text){
            alert('Por favor agrega una tarea válida')
            return
        }

        onAdd({text, day, reminder})
        
        //Limpiamos la form
        setText('')
        setDay('')
        setReminder(false)
    }


    //Value es el default, onChange es lo que se activa cada vez que cambiamos el estado
    //(en text y day, cada que escribimos, en recordatorio, cada que movemos el checkbox)
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Tarea</label>
                <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Agregar tarea'/>
            </div>
            <div className='form-control'>
                <label>Día y Hora</label>
                <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder='Agregar día y hora' />
            </div>
            <div className='form-control form-control-check'>
                <label>Recordatorio</label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type="submit" className='btn btn-block' value='Guardar tarea'/>
        </form>
    )
}

export default AddTask
