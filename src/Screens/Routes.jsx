import React from "react";
import TelaInicial from '../Screens/TelaInicial';
import InsereDados from '../Screens/InsereDados';
import CadastroDados from '../Screens/CadastroDados';
import RedefinirSenha from '../Screens/RedefinirSenha';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<TelaInicial/>}></Route>
                <Route path="/InsereDados" element={<InsereDados/>}></Route>
                <Route path="/CadastreDados" element={<CadastroDados/>}></Route>
                <Route path="/RedefinirSenha" element={<RedefinirSenha/>}></Route>
            </Routes>
        </Router>
    )
}
export default AppRoutes;