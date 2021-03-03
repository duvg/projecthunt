export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar nombre
    if( ! valores.nombre ) {
        errores.nombre = 'El Nombre es requerido';
    }

    // validar empresa
    if ( ! valores.empresa) {
        errores.empresa = 'El Nombre de Empresa es obligatorio';
    }

    // Valdiar Url 
    if( ! valores.url ) {
        errores.url = 'La Url del producto es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = 'La Url ingresada no es valida';
    }

    // Validar descripción
    if( ! valores.descripcion ) {
        errores.descripcion = 'La Descripción del producto es obligatoria';
    } 

    return errores;
}