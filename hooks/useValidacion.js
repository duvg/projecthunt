import React, { useState, useEffect } from 'react';

const useValidation = (stateInicial, validar, fn) => {

    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if(noErrores) {
                fn() //Fn = Función que se ejecuta en el componente;
            }

            setSubmitForm(false);
        }
    }, [errores]);

    // Función que se ejecuta conforme el ususario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        });
    }

    // Función que se ejecuta cuando el usuario ahce submt
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    // Cuando se realiza el evento blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleChange,
        handleSubmit,
        handleBlur
    }
}
 
export default useValidation;