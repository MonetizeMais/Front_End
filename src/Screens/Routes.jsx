import React from "react";
import TelaInicial from '../Screens/TelaInicial';
import InsereDados from './InsereDados/InsereDados';
import CadastroDados from './Cadastro/CadastroDados';
import RedefinirSenha from '../Screens/RedefinirSenha';
import ValidaCodigo from '../Screens/ValidaCodigo';
import NovaSenha from './NovaSenha/NovaSenha';
import Comecar from './Começar/Comecar';
import Perguntas from './Perguntas/Perguntas';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<TelaInicial/>}></Route>
                <Route path="/InsereDados" element={<InsereDados/>}></Route>
                <Route path="/CadastreDados" element={<CadastroDados/>}></Route>
                <Route path="/RedefinirSenha" element={<RedefinirSenha/>}></Route>
                <Route path="/ValidaCodigo" element={<ValidaCodigo/>}></Route>
                <Route path="/NovaSenha" element={<NovaSenha/>}></Route>
                <Route path="/Comecar" element={<Comecar/>}></Route>
                <Route path="/Perguntas" element={<Perguntas/>}></Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;