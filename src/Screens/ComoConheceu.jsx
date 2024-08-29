import React, { useState } from 'react';
import '.././App.css'; 
import logo from '../Assets/Mascote2.png'; 
import Typical from 'react-typical';
import MainButton from '../components/button';
import Option from '../components/option';

function ComoConheceu() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        console.log('Opção selecionada:', selectedOption);
    };

    return (
        <div className="form-container">
            <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
            <div className='Dialog2'>
                <Typical
                    loop={Infinity}
                    steps={['Responda algumas perguntas rápidas para que possamos começar o aprendizado!', 400]}
                />
            </div>
            <form className="option-form">
                <Option 
                    id="tiktok" 
                    name="comoConheceu" 
                    value="Tiktok" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Tiktok" 
                />
                <Option 
                    id="escola" 
                    name="comoConheceu" 
                    value="Escola" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Escola" 
                />
                <Option 
                    id="appStore" 
                    name="comoConheceu" 
                    value="Play Store ou App Store" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Play Store ou App Store" 
                />
                <Option 
                    id="noticia" 
                    name="comoConheceu" 
                    value="Notícia" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Notícia" 
                />
                <Option 
                    id="google" 
                    name="comoConheceu" 
                    value="Busca do Google" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Busca do Google" 
                />
                <Option 
                    id="outros" 
                    name="comoConheceu" 
                    value="Outros" 
                    selectedOption={selectedOption} 
                    onChange={handleOptionChange} 
                    label="Outros" 
                />
            </form>
            <MainButton text={'Continuar'} onClick={handleSubmit}/>
        </div>
    );
}

export default ComoConheceu;
