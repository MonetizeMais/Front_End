import React, { useState } from 'react';
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
    });
    const [message, setMessage] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setMessage('');

        if (!termsAccepted) {
            setMessage('Você deve aceitar os termos para se cadastrar.');
            return;
        }

        try {
            const url = 'https://back-end-retz.onrender.com/newUser'; 

            const response = await axios.post(url, {
                id: formData.id,
                nome: formData.nome,
                email: formData.email,
                apelido: formData.apelido,
                senha: formData.senha,
                ofensiva: 0,
                vida: 0,
                coin: 0,
                fotoPerfil: "string",
            });

            if (response.status === 200) {
                window.location.href = '/Comecar'; 
            }
            setMessage('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            setMessage('Erro ao cadastrar usuário: ' + error.message);
        }
    };

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
                />
                <PrivacyTerms />
            </div>

            {message && <p>{message}</p>} 
        </div>
    );
}

export default CadastroDadosScreen;
