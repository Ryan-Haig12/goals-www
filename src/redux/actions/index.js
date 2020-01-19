import axios from 'axios'
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
} from '../actions/types' 

// Taken from another project, needs to be tweaked
//
//
// Register a user
// export const register = ({ name, email, password, screenName }) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     const body = JSON.stringify({ name, email, password, screenName })

//     try {
//         const res = await axios.post('/api/users', body, config)
//         dispatch({ type: REGISTER_SUCCESS, payload: res.data })
//         dispatch(loadUser())
//     } catch(err) {
//         const errors = err.response.data.errors
//         if(errors){
//             console.log( errors.forEach(error => error.msg) )
//         }
//         dispatch({ type: REGISTER_FAIL })
//     }
// }