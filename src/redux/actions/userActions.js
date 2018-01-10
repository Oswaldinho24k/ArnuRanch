import api from "../../Api/Django";

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export function logInSuccess(user){
    return{
        type:LOG_IN_SUCCESS, user
    }
}


export const logIn=(data)=>(dispatch, getState)=>{
    return api.logIn(data)
        .then(r=>{
            console.log(r)
            localStorage.setItem('userRanchoToken', JSON.stringify(r.token));
            api.getUser()
                .then(r=>{
                dispatch(logInSuccess(r))
            }).catch(e=>{

            })
        }).catch(e=>{
        console.log(e)
    })

};

