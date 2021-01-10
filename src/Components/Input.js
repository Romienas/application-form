import React, { forwardRef } from 'react';
import './input.scss'

const Input = forwardRef((props, ref) => {
    const { label, value, type, onChange, error, errorText, placeholder, id, onKeyPress, labelOf } = props

    const handleInputValue = e => {
        onChange(e.target.value)
    }

    const handleKeyPress = (event) => {
        if (onKeyPress){
            onKeyPress(event)
        }
    }

    return ( 
        <div className={ error ? 'input error' : 'input'}>
            {!labelOf &&
                <label>{label}</label>
            }
            <input 
                id={id}
                value={value}
                type={type}
                onChange={(input) => handleInputValue(input)}
                ref={ref}
                placeholder={placeholder ? placeholder : ''}
                onKeyPress={e => handleKeyPress(e)}
            />
            {error &&
                <div className='input__errorText'>
                    {errorText}
                </div>
            }
        </div>
    )
})
 
export default Input