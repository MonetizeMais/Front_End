import React from 'react';

function Option({ id, name, value, selectedOption, onChange, label }) {
    return (
        <div className={`option ${selectedOption === value ? 'selected' : ''}`}>
            <input 
                type="radio" 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default Option;
