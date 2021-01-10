import React from 'react'
import './button.scss'

const Button = ({text, onClick}) => {

    const handleClickEvent = () => {
        onClick()
    }

    return (
        <div 
            className='button'
            onClick={() => handleClickEvent()}
        >
            {text}
        </div>
    )
}
 
export default Button