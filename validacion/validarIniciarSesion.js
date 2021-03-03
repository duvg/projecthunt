export default function validarIniciarSesion(valores) {
    let errores = {};
    
    // Validar email
    if( valores.email === undefined ) {
        errores.email = 'El Email es requerido';
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = 'El email ingresado no es valido';
    }

    // Validar password
    if( ! valores.password ) {
        errores.password = 'El password es requerido'
    } else if( valores.password.length < 6 ) {
        errores.password = 'El password debe ser de al menos 6 caracteres';
    }

    return errores;
}