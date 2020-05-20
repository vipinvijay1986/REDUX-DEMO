const redux =require('redux')
const thunkMiddleware =require('redux-thunk').default
const axios =require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState ={
    loading : false,
    users  : [],
    error : ''
}

const FETCH_USERS_REQUEST ='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS ='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE ='FETCH_USERS_FAILURE'

const fetchUserRequest = () =>{
    return {
        type : FETCH_USERS_REQUEST
    }
}
const fetchUserSuccess =users =>{
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

const fetchUserFailure =error =>{
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}

const reducer =(state =initialState , action) =>{
    switch(action.type){
        case FETCH_USERS_REQUEST : 
        return {
            ...state,
            laoding : true 
        }
        case FETCH_USERS_SUCCESS : 
        return {
            ...state,
            laoding : false,
            users : action.payload,
            error : ''
        }

        case FETCH_USERS_FAILURE : 
        return {
            ...state,
            laoding : false,
            users : action.payload,
            error : ''
        }
    }

}

const fetchUsers = () =>{
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios.get('http://jsonplaceholder.typicode.com/users').then(response =>{
            let users = response.data.map(user => user.id)
            dispatch(fetchUserSuccess(users))
        }).catch(error =>{
            dispatch(fetchUserFailure(error.message))
        })
    }
}


const store =createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchUsers())
