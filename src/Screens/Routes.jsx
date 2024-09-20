import React from "react";
import TelaInicial from './TelaInicial/TelaInicial';
import InsereDados from './InsereDados/InsereDados';
import CadastroDados from './Cadastro/CadastroDados';
import RedefinirSenha from './RedefifnirSenha/RedefinirSenha';
import ValidaCodigo from './ValidaCodigo/ValidaCodigo';
import NovaSenha from './NovaSenha/NovaSenha';
import Comecar from './Começar/Comecar';
import Perguntas from './Perguntas/Perguntas';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css'; // Certifique-se de que o CSS está correto

const AppRoutes = () => {
    const location = useLocation();

    return (
        <TransitionGroup component={null}> {/* component={null} remove o div extra */}
            <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Routes location={location}>
                    <Route path="/" element={<TelaInicial />} />
                    <Route path="/InsereDados" element={<InsereDados />} />
                    <Route path="/CadastreDados" element={<CadastroDados />} />
                    <Route path="/RedefinirSenha" element={<RedefinirSenha />} />
                    <Route path="/ValidaCodigo" element={<ValidaCodigo />} />
                    <Route path="/NovaSenha" element={<NovaSenha />} />
                    <Route path="/Comecar" element={<Comecar />} />
                    <Route path="/Perguntas" element={<Perguntas />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default AppRoutes;
