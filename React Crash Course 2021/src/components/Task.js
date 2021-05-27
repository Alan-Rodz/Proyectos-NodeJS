//Icono que usaremos
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onDelete, onToggle}) => {
    return (
        //Note how the className varies depending on the reminder through ternary operator
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color:'red', cursor:'pointer'}} onClick={() => onDelete(task.id)}/>  </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
