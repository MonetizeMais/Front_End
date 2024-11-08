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
            }, 10000);
            return;
        }
    
        try {
            const response = await axios.post('https://back-end-retz.onrender.com/userLogin', {
                email: formData.usernameOrEmail,
                senha: formData.senha,
            });
    
            if (response.status === 200) {
                localStorage.setItem('userEmail', formData.usernameOrEmail); 
                navigate('/HomePage');
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
            }, 10000);
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