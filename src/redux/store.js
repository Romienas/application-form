import { createStore, combineReducers } from 'redux'
import addressInputReduce from './reducers/addressInputReduce'

const rootReducer = combineReducers({
    addressInputReduce
})

const store = createStore(rootReducer)

export default store