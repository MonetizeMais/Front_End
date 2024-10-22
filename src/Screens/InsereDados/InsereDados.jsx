import React, { useState } from 'react';
import axios from 'axios'; 
import '../../../src/App.css'; 
import MainButton from '../../components/Button/button.jsx'; 
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
            const response = await axios.post('https://back-end-retz.onrender.com/userLogin', {
                email: formData.usernameOrEmail,
                senha: formData.senha,
            });

            if (response.status === 200) {
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
            }, 3000);
        }
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

            <a href="/RedefinirSenha">Esqueci a senha</a>
            <PrivacyTerms/>

            {showError && (
                <div className="error-popup">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default InsereDadosScreen;
