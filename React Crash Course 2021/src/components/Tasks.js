//Task component
import Task from './Task'

//Cuando usamos .map y hacemos que el output sea jsx tenemos una lista 
//El padre de la lista debe tener una key y debe ser algo unico
const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}></Task>
            ))}
        </>
    )
}

export default Tasks
