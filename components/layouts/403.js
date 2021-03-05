import React, { Fragment } from 'react';
import { css } from '@emotion/core';
import Boton from '../ui/Boton';

const Forbidden403 = () => {
    return(
        <Fragment>
            <div css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                align-content: center;
                
            `}>
                <div css={css`
                    width: 600px;
                    text-align: center;
                `}>
                    <h1
                        css={css`
                            margin-top: 5rem;
                            text-align: center;
                        `}
                    >Acceso Denegado</h1>
                    <p>
                    No tienes los permisos suficientes para acceder a esta sección. <br/>
                    Inicia sesion para continuar. <br/>
                    <Boton
                        bgColor="true"
                        href="/login"
                    >
                        Iniciar Sesion
                    </Boton>
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default Forbidden403;