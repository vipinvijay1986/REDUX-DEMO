const redux =require('redux')
const reduxLogger =require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger =reduxLogger.createLogger()
console.log("From index.js")
const BUY_CAKE ='BUY_CAKE';
const BUY_ICECREAM ='BUY_ICECREAM'
function buyCake(){
    return {
        type: BUY_CAKE,
        info : 'First Redux Action'
    }
}

function buyIcecream(){
    return {
        type: BUY_ICECREAM,
        info : 'First Redux Action'
    }
}
//(previousState, action) => newState

const initialState ={
    numOfCakes :10 ,
    noOfIcecream : 20 
}


const initialCaketate ={
    numOfCakes :10  
}

const initialIcecreamState ={
    noOfIcecream : 20 
}

const reducer = (state=initialState , action) =>{
    switch(action.type) {
        case BUY_CAKE : return {
            ...state,
            numOfCakes : state.numOfCakes -1 
        }
        case BUY_ICECREAM : return {
            ...state,
            noOfIcecream : state.noOfIcecream -1 
        }
        default : return state
    }
}

const cakeReducer = (state=initialCaketate , action) =>{
    switch(action.type) {
        case BUY_CAKE : return {
            ...state,
            numOfCakes : state.numOfCakes -1 
        }
        
        default : return state
    }
}

const icecreamReducer = (state=initialIcecreamState , action) =>{
    switch(action.type) {
        case BUY_ICECREAM : return {
            ...state,
            noOfIcecream : state.noOfIcecream -1 
        }
        default : return state
    }
}

const rootReducer=combineReducers({
    cake : cakeReducer,
    iceCream : icecreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state ',store.getState())
//const unsubscribe = store.subscribe(()=> console.log('updated score ',store.getState()))
const unsubscribe = store.subscribe(()=>{})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream()) 
store.dispatch(buyIcecream())
store.dispatch(buyCake())
unsubscribe()