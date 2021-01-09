enum rolUsuario {
    ADMINISTRADOR = 'administrador',
    USUARIO = 'usuario'
}

function esAdministrador(c: rolUsuario){
    if(c === rolUsuario.ADMINISTRADOR){
        return true;
    }
    return false;
}

const rol: rolUsuario = rolUsuario.ADMINISTRADOR;
console.log(esAdministrador(rol));

