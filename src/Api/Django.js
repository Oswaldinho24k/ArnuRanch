import axios from 'axios';

let debug = true;

//Localhost urls
let animalsUrl = 'http://localhost:8000/api/ganado/animals/';
//let logInUrl = 'http://localhost:8000/api/auth/login/';
//let logOutUrl = 'http://localhost:8000/api/auth/logout/';
let tokenUrl = 'http://localhost:8000/api/auth/token-auth/';
let userUrl = 'http://localhost:8000/api/auth/me/';



//heroku urls
if(!debug){

}

//functions

const api = {
    /*-----------------animals functions-----------------------*/

    //Get all animals
    getAnimals:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    newAnimal:(animal)=>{
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + userToken
                }
            });
            instance.post('', animal)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },


    /*-----------------user functions-----------------------*/
    logIn:(data)=>{
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: tokenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + userToken
                }
            });
            instance.post('', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    getUser:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: userUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    }



};

export default api;