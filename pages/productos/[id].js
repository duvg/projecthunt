import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';

import Layout from '../../components/layouts/Layout';
import Error404 from '../../components/layouts/404';
import { css } from '@emotion/core';
import { styled } from '@emotion/styled';
import Loader from '../../components/layouts/Loader';
const Producto = (props) => {
    
    //State del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    // Obtener el id del producto actual
    const router = useRouter();
    const { query: {id} } = router;

    // Context de firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if(id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
            
                if (producto.exists) {
                   setProducto(producto.data());
                } else {
                    setError( true );
                }
            }
            obtenerProducto();
        }
    }, [id]);
    
    //if(Object.keys(producto).length === 0) return <Loader />;
    
    return (
        
        <Layout>
            <Fragment>
            <Loader />
                {
                    Object.keys(producto).length === 0 ? 
                        <p>asd</p>
                    :
                    <div className="contenedor">
                        { error && <Error404 />}
                        
                        <h1
                            css={css`
                                text-align: center;
                                margin-top: 5rem;
                            `}
                        >
asddsa
                        </h1>
                    </div>
                }
                
            </Fragment>
            
        </Layout>
    );
}
 
export default Producto;