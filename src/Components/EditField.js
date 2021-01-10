import React,  { useEffect, useState } from 'react'
import './editField.scss'
import Input from './Input'

const EditField = ({children, value, type, arrayName, elName, index, onChange}) => {
    const [editField, setEditField] = useState(false)
    const [input, setInput] = useState('')

    useEffect(() => {
        setInput(value)
    },[value])



    const putEditedFieldToArray = (event, input, index, name) => {
        if(event.key === 'Enter') {
            const array = JSON.parse(localStorage.getItem(arrayName))
            array[index][name] = input
            localStorage.setItem(arrayName, JSON.stringify(array))
            setEditField(false)
            onChange()
        }
    }

    return (
        <div className='editField'>
            {editField === true ?
                <Input 
                    value={input}
                    type={type}
                    onKeyPress={e => putEditedFieldToArray(e, input, index, elName)}
                    onChange={i => setInput(i)}
                    labelOf={true}
                /> :
                <div className='editField__children' onClick={() => setEditField(!editField)}>
                    {children}
                </div>
            }
        </div>
    )
}
 
export default EditField