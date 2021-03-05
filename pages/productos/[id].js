import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';

import Layout from '../../components/layouts/Layout';
import Error404 from '../../components/layouts/404';
import { css } from '@emotion/core';
import styled  from '@emotion/styled';
import Loader from '../../components/layouts/Loader';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 3fr 1fr;
        column-gap: 3rem;
    }
`;

const CreadorProducto = styled.p`
    padding:.5rem 2rem;
    background-color: #DA552F;
    color: #FFF;
    text-transform: uppercase;
    font-weight:  bold;
    display: inline-block;
    text-align: center;
`;

const Producto = (props) => {
    
    //State del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    // Obtener el id del producto actual
    const router = useRouter();
    const { query: {id} } = router;

    // Context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();

            
                if (producto.exists) {
                   setProducto(producto.data());
                   setConsultarDB(false);
                } else {
                    setError( true );
                    setConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);
    
    const {nombre, creado, comentarios, descripcion, empresa, url, urlImagen, votos, creador, haVotado} = producto;

   
    
    // Administrar y valida los votos
    const votarProducto = () => {
        // Si no esta autenticado redireccionar al login
        if ( ! usuario ) {
            return router.push('/login');
        }

        // Obtener y sumar votos
        const nuevoTotal = votos + 1;

        // Verificar is el usaurio actual ya ha votado
        if(haVotado.includes(usuario.uid)) return;

        // Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...hanVotado, usuario.uid];

        // Actualizar en la BD
        firebase.db.collection('productos').doc(id).update({
            votos:  nuevoTotal,
            haVotado: nuevoHaVotado
        });

        // Actualizar el State
        setProducto({
            ...producto,
            votos: nuevoTotal
        });

        setConsultarDB(true);
    }

    // Actualizar los comentarios
    const comentarioOnChange = e => {
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    // Identificar si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }

    // Agregar el comentario
    const agregarComentario = e => {
        e.preventDefault();

        // Si no esta autenticado redireccionar al login
        if ( ! usuario ) {
            return router.push('/login');
        }

        // Información adicional al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar DB
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        });

        // Actualizar State
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        });

        setConsultarDB(true);
    }

     // Carga del producto
     console.log('error',error);
     console.log('cargando',cargando);
    

    return (
        
        <Layout>
            <Fragment>
             { (Object.keys(producto).length === 0) & (!error) ? <Loader /> : 

                    <div className="contenedor">
                        
                        { error ? <Error404 /> : (
                            <Fragment>
                                <h1
                                    css={css`
                                        text-align: center;
                                        margin-top: 5rem;
                                    `}
                                >
                                    {nombre}
                                </h1>

                                <ContenedorProducto>
                                    <div>
                                        
                                        <p>Publicado hace: { formatDistanceToNow(new Date(creado), {locale: es}) }</p>
                                        <p>Publicado por: {creador.nombre}</p>
                                        <img src={urlImagen} />
                                        <p>{descripcion}</p>

                                        { usuario && (
                                            <Fragment>
                                                <h2>Agregar un comentario</h2>
                                                <form
                                                    onSubmit={agregarComentario}
                                                >
                                                    <Campo>
                                                        <input
                                                            type="text"
                                                            name="mensaje"
                                                            onChange={comentarioOnChange}
                                                        />
                                                    </Campo>
                                                    <InputSubmit
                                                        type="submit"
                                                        value="Agregar Comentario"
                                                    />
                                                </form>
                                            </Fragment>
                                        ) }

                                        <hr css={css`margin: 4rem 0; `}/>

                                        <h2 css={css`margin: 2rem 0;`}>Comentarios</h2>

                                        { comentarios.length === 0 ? (
                                            <p css={css`border-bottom: thin solid #a49999; padding-bottom: 1rem;`}>
                                                Sin comentarios aun.
                                            </p>
                                        ) : 
                                            <ul>
                                                {comentarios.map((comentario, i) => (
                                                    <li
                                                        key={`${comentario.usuarioId}-${i}`}
                                                        css={css`
                                                            border: thin solid #e1e1e1;
                                                            padding:  2rem;
                                                        `}
                                                    >
                                                        <p>{comentario.mensaje}</p>
                                                        <p>Escrito por: 
                                                            <span css={css`
                                                                font-weight: bold;
                                                            `}>
                                                                {' '}{comentario.usuarioNombre}
                                                            </span>

                                                        </p>
                                                        { esCreador( comentario.usuarioId ) && 
                                                            <CreadorProducto> Es Creador </CreadorProducto>}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        
                                    </div>

                                    <aside>
                                        <Boton
                                            target="_blank"
                                            bgColor="true"
                                            href={url}
                                        >Visitar URL</Boton>
                                        
                                        <div css={css`margin-top: 4rem;`}>
                                            <p css={css`
                                                text-align:center;`}>
                                                    {votos} Votos</p>
                                            {usuario && (
                                                <Boton
                                                    onClick={votarProducto}
                                                >
                                                    Votar
                                                </Boton>
                                            )}
                                        </div>
                                        
                                    </aside>
                                </ContenedorProducto>
                            </Fragment>
                        )}
                    </div>
                 }
                
            </Fragment>
            
        </Layout>
    );
}
 
export default Producto;