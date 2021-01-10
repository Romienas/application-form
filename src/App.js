import React,  { useEffect, useState } from 'react'
import Input from './Components/Input'
import AutocompletePlaceSearch from './Components/AutocompletePlaceSearch'
import { connect } from 'react-redux'
import Button from './Components/Button'
import { addressInputAction } from './redux/actions/addressInputAction'
import EditField from './Components/EditField'

function App({address, setAddress}) {
  // Inputs states
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [surname, setSurname] = useState('')
  const [surnameError, setSurnameError] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [mailValidationError, setEmailValidationError] = useState(false)
  const [addressError, setAddressError] = useState(false)

  const [usersList, setUsersList] = useState([])

  const [change, setChange] = useState(true)

  
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('registeredUsersArray'))) {
        localStorage.setItem('registeredUsersArray', JSON.stringify([]))
    } else {
      let localStorageArray = JSON.parse(localStorage.getItem('registeredUsersArray'))
      setUsersList(localStorageArray)
    }
  },[name, change])

  const addContactToList = () => {
    const isEmailValid = email => {
        // eslint-disable-next-line
        let pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(pattern.test(email)){
            return true
        } else {
            return false
        }
    }
    if( name !== '' && surname !== '' && isEmailValid(email) && address !== ''){
        let newObject = {
            name,
            surname,
            email,
            address
        }

        let localStorageArray = JSON.parse(localStorage.getItem('registeredUsersArray'))
        let newArray = [...localStorageArray, newObject]
        localStorage.setItem('registeredUsersArray', JSON.stringify(newArray))

        // Reset inputs
        setName('')
        setSurname('')
        setEmail('')
        setAddress('')

        // Reset errors
        setNameError(false)
        setSurnameError(false)
        setEmailError(false)
        setEmailValidationError(false)
        setAddressError(false)
    } else {
        if(name === '') {
            setNameError(true)
        } else {
            setNameError(false)
        }

        if(surname === '') {
            setSurnameError(true)
        } else {
            setSurnameError(false)
        }

        if(email === '') {
            setEmailError(true)
        } else {
            setEmailError(false)
        }

        if(isEmailValid(email)) {
            setEmailValidationError(false)
        } else {
            setEmailValidationError(true)
        }

        if(address === ''){
            setAddressError(true)
        } else {
            setAddressError(false)
        }
    }
  }

  return (
    <div className="app">
      <div className='form'>
            <div className='form__box'>
                <Input 
                    label='Name'
                    value={name}
                    type='text'
                    onChange={(i) => setName(i)} 
                    error={nameError}
                    errorText='Name is required'
                />
                <Input 
                    label='Surname'
                    value={surname}
                    type='text'
                    onChange={(i) => setSurname(i)} 
                    error={surnameError}
                    errorText='Surname is required'
                />
                <Input 
                    label='Email'
                    value={email}
                    type='email'
                    onChange={(i) => setEmail(i)} 
                    error={emailError ? true : mailValidationError ? true : false}
                    errorText={emailError ? 'Email is required' : mailValidationError ? 'Enter valid email' : null}
                />
                <AutocompletePlaceSearch
                    inputError={addressError}
                    inputErrorText='Address is required'
                />
                <div className='form__button'>
                    <Button 
                        text='add'
                        onClick={() => addContactToList()}
                    />
                </div>
            </div>
        </div>
      
      {usersList.length > 0 ?
        <div className='list'>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                    {usersList.map( (el, i) => (
                        <tr key={i}> 
                            <td>
                                <EditField
                                    value={el.name}
                                    type='text'
                                    arrayName='registeredUsersArray'
                                    elName='name'
                                    index={i}
                                    onChange={() => setChange(!change)}
                                >
                                    {el.name}
                                </EditField>
                            </td>
                            <td>
                                <EditField
                                    value={el.surname}
                                    type='text'
                                    arrayName='registeredUsersArray'
                                    elName='surname'
                                    index={i}
                                    onChange={() => setChange(!change)}
                                >
                                    {el.surname}
                                </EditField>
                            </td>
                            <td>
                                <EditField
                                    value={el.email}
                                    type='email'
                                    arrayName='registeredUsersArray'
                                    elName='email'
                                    index={i}
                                    onChange={() => setChange(!change)}
                                >
                                    {el.email}
                                </EditField>
                            </td>
                            <td>
                                <EditField
                                    value={el.address}
                                    arrayName='registeredUsersArray'
                                    elName='address'
                                    index={i}
                                    onChange={() => setChange(!change)}
                                >
                                    {el.address}
                                </EditField>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> :
        <div className='list__message'>
          There is no contacts, please add some
        </div>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  address: state.addressInputReduce.str
})

const mapDispatchToProps = dispatch => ({
  setAddress: str => dispatch(addressInputAction(str))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
