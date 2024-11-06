import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import '../Cadastro/Cadastro.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 
import PrivacyTerms from '../../components/PrivacyTerms/privacyTerms.jsx'; 

function CadastroDadosScreen() {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        apelido: '',
        senha: '',
        confirmaSenha: '', 
    });
    const [message, setMessage] = useState('');
    const [showTerms, setShowTerms] = useState(false); 

    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== '');

    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setMessage('');

        if (!termsAccepted) {
            setMessage('Você deve aceitar os termos para se cadastrar.');
            return;
        }

        if (!formData.email.endsWith('@gmail.com')) {
            setMessage('O e-mail deve ser um endereço @gmail.com.');
            return;
        }

        if (!isValidPassword(formData.senha)) {
            setMessage('A senha deve ter no mínimo 5 caracteres e incluir letras e números.');
            return;
        }

        if (formData.senha !== formData.confirmaSenha) {
            setMessage('As senhas não conferem.');
            return;
        }

        try {
            const url = 'https://back-end-retz.onrender.com/newUser'; 

            const response = await axios.post(url, {
                nome: formData.nome,
                email: formData.email,
                apelido: formData.apelido,
                senha: formData.senha,
                ofensiva: 0,
                vida: 5,
                coin: 10,
                pontos: 0,
                progresso: 0,
                fotoPerfil: "https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/logo%20-%20poupinho.png?alt=media&token=9f122a63-3f73-4f4f-987f-51487582c700",
            });

            if (response.status === 200) {
                localStorage.setItem('userEmail', formData.email); 
                console.log('Email salvo no localStorage:', formData.email);
                localStorage.setItem('userName', formData.nome);
                localStorage.setItem('userId', response.data.ncdUsuario); 
                window.location.href = '/Comecar'; 
            }
            setMessage('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setMessage('Erro ao cadastrar usuário: ' + error.message);
        }
    };

    const handleShowTerms = () => {
        setShowTerms(true);
    };

    const handleCloseTerms = () => {
        setShowTerms(false);
    };

    useEffect(() => {
        return () => {
            setTermsAccepted(false); 
        };
    }, []);

    return (
        <div className='MainBox2'>
            <MainTitle text={'Cadastre seus dados'}/>
            <form onSubmit={handleSubmit}> 
                <MainInput 
                    name='nome' 
                    type={'text'} 
                    text={'Nome completo'} 
                    onChange={handleChange} 
                    value={formData.nome} 
                />
                <MainInput 
                    name='email' 
                    type={'text'} 
                    text={'E-mail'} 
                    onChange={handleChange} 
                    value={formData.email} 
                />
                <MainInput 
                    name='apelido' 
                    type={'text'} 
                    text={'Apelido'} 
                    onChange={handleChange} 
                    value={formData.apelido} 
                />
                <MainInput 
                    name='senha' 
                    type={'password'} 
                    text={'Senha'} 
                    onChange={handleChange} 
                    value={formData.senha} 
                />
                <MainInput 
                    name='confirmaSenha' 
                    type={'password'} 
                    text={'Confirmação de senha'} 
                    onChange={handleChange} 
                    value={formData.confirmaSenha} 
                />

                {termsAccepted ? (
                    <button type="submit" className='botaoPrincipal'>Cadastrar</button>
                ) : (
                    <InactiveButton text={'Cadastrar'} />
                )}
            </form>

            <div className='TermsAccept'>
                <input 
                    type="checkbox" 
                    id="CheckBox" 
                    checked={termsAccepted} 
                    onChange={handleCheckboxChange} 
                    disabled={!allFieldsFilled} 
                />
                <span onClick={handleShowTerms} >Aceito os <a>Termos e Política de Privacidade</a></span>
            </div>

            {message && <p>{message}</p>} 

            {showTerms && <PrivacyTerms onClose={handleCloseTerms} />} 
        </div>
    );
}

export default CadastroDadosScreen;