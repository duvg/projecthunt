import React, { Fragment, useState, useContext } from 'react';
import { css } from  '@emotion/core';
import Layout from '../components/layouts/Layout';
import Router, { useRouter }  from 'next/router';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';

import FileUploader from 'react-firebase-file-uploader';

import { FirebaseContext} from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INCIAL = {
  nombre: '',
  empresa: '',
  // imagen: '',
  url: '',
  decsripcion: ''
}


const NuevoProducto = () => {

  // state de ls iamgenes
  const [nombreImagen, setNombreImagen] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [urlImagen, setUrlImagen] = useState('');

  const [ error, setError ] = useState(false); 

  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INCIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url,  descripcion } = valores;

  // hook de routing para redireccionar
  const router = useRouter();

  // context para el crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {

    // si usuario no esta autenticado redireccionar al login
    if( ! usuario ) {
      return router.push('/login');
    } 

    // Crear el objeto para el nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now()
    }

    // Insertar en la base de datos
    firebase.db.collection('productos').add(producto);
  }

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  }

  const handleProgress = progreso => setProgreso({ progreso });

  const handleUploadError = (error) => {
    setSubiendo(error);
    console.log(error);
  }

  const handleUploadSuccess = nombre => {
    setProgreso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase
      .storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setUrlImagen(url);
      } );
  }

  return (
    <div >
      <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >Nuevo Producto</h1>
      <Formulario
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Información General</legend>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.nombre && <Error>{errores.nombre}</Error> }


          <Campo>
            <label htmlFor="empresa">Empresa</label>
            <input
                type="text"
                id="empresa"
                placeholder="Nombre de la empresa"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.empresa && <Error>{errores.empresa}</Error> }


           <Campo>
            <label htmlFor="imagen">Imagen</label>
            <FileUploader
              accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
            />
          </Campo>

          <Campo>
            <label htmlFor="url">Url</label>
            <input
                type="url"
                id="url"
                name="url"
                value={url}
                placeholder="URL del producto"
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.url && <Error>{errores.url}</Error> }
        </fieldset>

        <fieldset>
          <legend>Sobre tu producto</legend>
          <Campo>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
            />
          </Campo>
          { errores.descripcion && <Error>{errores.descripcion}</Error> }
        </fieldset>
          { error && <Error>{error}</Error>}

          <InputSubmit
            type="submit"
            value="Crear Producto"
          />
      </Formulario>
      </Layout>
    </div>
  )
}

export default NuevoProducto;