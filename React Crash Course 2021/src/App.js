import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {

  //State que nos permite mostrar o esconder la forma para agregar tareas
  const [showAddTask, setShowAddTask] = useState(false)


  //useEffect se suele usar para hacer algo cuando la página termina de cargar
  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

    //[] es un arreglo de dependencias
    //si tenemos algún elemento que queremos que ejecute esta funcion cuando cambie, lo ponemos ahí
    //como no tenemos eso aquí es un arreglo vacío
  }, [])

  //Obtenemos nuestras tasks del backend falso
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Sirve para obtener una sola task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //tasks es el nombre del pedazo de estado
  //setTasks es el nombre de la funcion que usamos para actualizar el estado
  //useState toma el default que usamos para este pedazo de estado
  //Si quisieramos cambiar el estado usariamos setTasks
  const [tasks, setTasks] = useState([])

  //Función para agregar tareas
  //Nos devuelve res
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body:JSON.stringify(task)
  })

  //data es res en formato json
  const data = await res.json()

  //Usamos set tasks para copiar lo que teniamos y añadir la nueva tarea, que esta en data
  setTasks([...tasks, data])

  }

  //Función para borrar tareas
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Función para alternar el recordatorio de las tareas
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method:'PUT',
    headers:{
      'Content-type': 'application/json'
    },

    body:JSON.stringify(updatedTask)
  })

  const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  //El && es un ternario sin el else 
  //Es equivalente a "si es true, entonces haz esto, sino no hagas nada"
  return (

    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      <Route path='/' exact render={(props)=>(

        <>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No hay tareas para mostrar!'}
        </>

      )} />
      <Route path='/about' component={About}/>
      
      <Footer/>
    </div>
    </Router>

  );
}

export default App;
