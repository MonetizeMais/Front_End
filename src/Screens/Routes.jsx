import React from "react";
import TelaInicial from './TelaInicial/TelaInicial';
import InsereDados from './InsereDados/InsereDados';
import CadastroDados from './Cadastro/CadastroDados';
import NovaSenha from './NovaSenha/NovaSenha';
import Comecar from './Comecar/Comecar';
import Perguntas from './Perguntas/Perguntas';
import Pergunta1 from './Pergunta1/Pergunta1';
import HomePage from './HomePage/HomePage';
import Pergunta2 from './Pergunta2/Pergunta2';
import Pergunta3 from './Pergunta3/Pergunta3';
import Pergunta4 from './Pergunta4/Pergunta4';
import Perfil from './Perfil/Perfil';
import Finalizar from './Finalizar/Finalizar';
import TelaPersonalizacao from './TelaPersonalizacao/telaPersonalizacao'
import Ranking from './Ranking/Ranking';
import Quizz from "./Quizz/Quizz";
import Conteudo from "./Conteudo/Conteudo";
import Configuracoes from "./Configuracoes/Configuracoes";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

const AppRoutes = () => {
    return (
                <Routes>
                    <Route path="/" element={<TelaInicial />} />
                    <Route path="/InsereDados" element={<InsereDados />} />
                    <Route path="/CadastreDados" element={<CadastroDados />} />
                    <Route path="/NovaSenha" element={<NovaSenha />} />
                    <Route path="/Comecar" element={<Comecar />} />
                    <Route path="/Perguntas" element={<Perguntas />} />
                    <Route path="/Pergunta1" element={<Pergunta1 />} />
                    <Route path="/HomePage" element={<HomePage/>} />
                    <Route path="/Pergunta2" element={<Pergunta2 />} />
                    <Route path="/Pergunta3" element={<Pergunta3 />} />
                    <Route path="/Pergunta4" element={<Pergunta4 />} />
                    <Route path="/Perfil" element={<Perfil />} />
                    <Route path="/Finalizar" element={<Finalizar />} />
                    <Route path="/TelaPersonalizacao" element={<TelaPersonalizacao />} />
                    <Route path="/Ranking" element={<Ranking />} />
                    <Route path="/Quizz" element={<Quizz />} />
                    <Route path="/Conteudo" element={<Conteudo />} />
                    <Route path="/Configuracoes" element={<Configuracoes />} />
                </Routes>
    );
}

export default AppRoutes;