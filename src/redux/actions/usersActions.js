import api from "../../Api/Django";


export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export function getUsersSuccess(users){
    return{
        type:GET_USERS_SUCCESS, users
    }
}

export const getAllUsers=()=>(dispatch, getState)=>{
    return api.getAllUsers()
        .then(r=>{
            dispatch(getUsersSuccess(r))
        }).catch(e=>{
            throw e
        })
};

export const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';

export function newUserSuccess(user){
    return{
        type:NEW_USER_SUCCESS, user
    }
}

export const newUser=(user)=>(dispatch, getState)=>{
    return api.newUser(user)
        .then(r=>{
            dispatch(newUserSuccess(r))

            let profile={};
            profile['user']=r.id;
            if(user.permiso){
                if(user.permiso === 'ganado'){
                    profile['ganado']=true;
                }
                if(user.permiso === 'admin'){
                    profile['admin']=true;
                }
            }
            dispatch(saveProfile(profile));
        }).catch(e=>{
            throw e
        })
};

export const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE';

export function saveUserProfile(profile){
    return{
        type:SAVE_USER_PROFILE, profile
    }
}

export const saveProfile=(profile)=>(dispatch, getState)=>{
    return api.saveProfile(profile)
        .then(r=>{
            dispatch(saveUserProfile(r))

        }).catch(e=>{
            throw e
        })
}

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export function deleteUserSuccess(user){
    return{
        type:DELETE_USER_SUCCESS, user
    }
}

export const deleteUser=(user)=>(dispatch, getState)=>{
    return api.deleteUser(user)
        .then(r=>{
            dispatch(deleteUserSuccess(user))
        }).catch(e=>{
            throw e
        })
}