import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({onAdd, showAdd}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>Aplicación de Tareas Pendientes</h1>            
            {location.pathname==='/' && <Button color={showAdd?'red':'green'} text={showAdd ? 'Cerrar' : 'Agregar'} onClick={onAdd}/>}
        </header>
    )
}



export default Header
