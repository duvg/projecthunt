
import React, { Fragment, useState } from 'react';
import { css } from  '@emotion/core';
import Layout from '../components/layouts/Layout';
import Router  from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';


import firebase from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INCIAL = {
  email: '',
  password: ''
}


const Login = () => {

  const [ error, setError ] = useState(false); 

  const { valores, errores, handleChange, handleSubmit, handleBlur } = 
    useValidacion(STATE_INCIAL, validarIniciarSesion, iniciarSesion);

  const { nombre, email, password } = valores;


  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
      console.log(usuario);
      Router.push('/');
    } catch (error) {
      console.log('Error al autenticar el usuario', error.message);
      setError(error.message);
    }
  }

  return (
    <div >
      <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >Iniciar Sesion</h1>
      <Formulario
        onSubmit={handleSubmit}
      >
          <Campo>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.email && <Error>{errores.email}</Error> }

          <Campo>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.password && <Error>{errores.password}</Error> }
          { error && <Error>{error}</Error>}

          <InputSubmit
            type="submit"
            value="Iniciar Sesion"
          />
      </Formulario>
      </Layout>
    </div>
  )
}

export default Login;