import React, { Fragment } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Boton from '../ui/Boton';

const ContenedorHeader = styled.div`
    max-width: 1220px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const usuario = false;

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
                &:hover {
                    cursor: pointer;
                }
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                <Link href="/">
                    <Logo>P</Logo>
                </Link>
                    
                    <Buscar />

                    <Navegacion />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                { usuario ? (
                    <Fragment>
                        <p
                            css={css`
                                margin-right: 2rem;
                            `}
                        >Hola: Duviel</p>

                        <Boton bgColor="true">
                            Cerar Sesión
                        </Boton>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link href="/login">
                            <Boton
                                bgColor="true"
                            >Login</Boton>
                        </Link>
                        <Link href="/crear-cuenta">
                            <Boton>Registrate</Boton>
                        </Link>
                    </Fragment>
                )}
                    

                    
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;