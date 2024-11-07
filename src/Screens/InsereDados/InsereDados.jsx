import React, { useState } from 'react';
import axios from 'axios'; 
import '../../../src/App.css'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 
import PrivacyTerms from '../../components/PrivacyTerms/privacyTerms.jsx'; 
import { useNavigate } from 'react-router-dom';

function InsereDadosScreen() {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        senha: '',
    });
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setShowError(false);
    
        if (!formData.usernameOrEmail || !formData.senha) {
            setMessage('Por favor, preencha todos os campos.');
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
    
        try {
            const loginResponse = await axios.post('https://back-end-retz.onrender.com/userLogin', {
                email: formData.usernameOrEmail,
                senha: formData.senha,
            });
    
            if (loginResponse.status === 200) {
                const userResponse = await axios.get(`https://back-end-retz.onrender.com/findUserByEmail/${formData.usernameOrEmail}`);

                if (userResponse.status === 200 && userResponse.data) {
                    const user = userResponse.data;
                    
                    localStorage.setItem('userId', user.nCdUsuario);
                    localStorage.setItem('userName', user.nome);
                    localStorage.setItem('userEmail', user.email);
                    localStorage.setItem('userNickname', user.apelido);
                    localStorage.setItem('userVida', user.vida);
                    localStorage.setItem('userCoin', user.coin);
                    localStorage.setItem('userPontos', user.pontos);
                    localStorage.setItem('userProgresso', user.progresso);
                    localStorage.setItem('userFotoPerfil', user.fotoPerfil);
                    localStorage.setItem('userOfensiva', user.ofensiva);

                    navigate('/HomePage');
                } else {
                    setMessage('Erro ao carregar os dados do usuário.');
                    setShowError(true);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Senha incorreta.');
            } else if (error.response && error.response.status === 404) {
                setMessage('Usuário não encontrado.');
            } else {
                setMessage('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
            }
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };    

    const handleShowTerms = () => {
        setShowTerms(true);
    };

    const handleCloseTerms = () => {
        setShowTerms(false);
    };

    return (
        <div className='MainBox'>
            <MainTitle text={'Insira seus dados'}/>
            <form onSubmit={handleSubmit}>
                <MainInput 
                    name='usernameOrEmail' 
                    type={'text'} 
                    text={'E-mail ou nome de usuário'} 
                    onChange={handleChange} 
                    value={formData.usernameOrEmail}
                />
                <MainInput 
                    name='senha' 
                    type={'password'} 
                    text={'Senha'} 
                    onChange={handleChange} 
                    value={formData.senha}
                />
            </form>
            <button 
              type="button" 
              className='botaoPrincipal' 
              onClick={handleSubmit}>
              Entrar
            </button>
            <br />
            <a href="/NovaSenha">Esqueci a senha</a>
            <div onClick={handleShowTerms} className='show-terms'>
            <p>
                Ao entrar no Monetize+, você concorda com nossos <a href="#" onClick={handleCloseTerms}>Termos</a> e <a href="#" onClick={handleCloseTerms}>Política de Privacidade</a>.
            </p>
            </div>
            {showTerms && <PrivacyTerms onClose={handleCloseTerms} />}

            {showError && (
                <div className="error">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default InsereDadosScreen;