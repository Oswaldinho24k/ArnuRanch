import axios from 'axios';

let debug = true;

//Localhost urls

//let logInUrl = 'http://localhost:8000/api/auth/login/';
//let logOutUrl = 'http://localhost:8000/api/auth/logout/';
let animalsUrl = 'http://localhost:8000/api/ganado/animals/';
let tokenUrl = 'http://localhost:8000/api/auth/token-auth/';
let userUrl = 'http://localhost:8000/api/auth/me/';
let lotesUrl = 'http://localhost:8000/api/ganado/lotes/';
let corralesUrl = 'http://localhost:8000/api/ganado/corrales/';
let animalGastoUrl = 'http://localhost:8000/api/ganado/alimentos/';

let proveedoresUrl = 'http://localhost:8000/api/egresos/proveedores/';
let clientesUrl = 'http://localhost:8000/api/ingresos/clientes/';


//heroku urls
if(!debug){
    animalsUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/animals/';
    tokenUrl = 'https://arnu-ranch-backend.herokuapp.com/api/auth/token-auth/';
    userUrl = 'https://arnu-ranch-backend.herokuapp.com/api/auth/me/';
    lotesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/lotes/';
    corralesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/corrales/';
    animalGastoUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/alimentos/';

}

//functions

const api = {
    /*-----------------animals functions-----------------------*/
    //Get all animals
    getAnimals:(url)=>{

        if(url)animalsUrl=url;

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
        let data = new FormData();
        for ( var key in animal ) {
            data.append(key, animal[key]);
        }
        let date = animal.fecha_entrada.format("YYYY-MM-DD HH:mm:ss");
        data.append('fierro_original', animal.fierro_original[0].originFileObj);
        data.append('fierro_nuevo', animal.fierro_nuevo[0].originFileObj);
        data.append('fecha_entrada', date);

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(data);
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    editAnimal:(animal)=>{
        let data = new FormData();
        for ( var key in animal ) {
            data.append(key, animal[key]);
        }
        let date = animal.fecha_entrada.format("YYYY-MM-DD HH:mm:ss");
        data.append('fecha_entrada', date);
        console.log(typeof animal.fierro_nuevo)
        if(typeof animal.fierro_original === 'string'){
            data.delete('fierro_original')
        }else{
            data.append('fierro_original', animal.fierro_original.file.originFileObj);
        }

        if(typeof animal.fierro_nuevo === 'string'){
            data.delete('fierro_nuevo')
        }else{
            data.append('fierro_nuevo', animal.fierro_nuevo.file.originFileObj);
        }


        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(animal.id+'/', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(data);
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    deleteAnimal:(animalId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(animalId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    /*-----------------aliments functions-----------------------*/


    newGasto:(gasto)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalGastoUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', gasto)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    /*-----------------lotes functions-----------------------*/
    getLotes:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: lotesUrl,
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
    newLote:(batch)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: lotesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', batch)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    /*-----------------corrales functions-----------------------*/
    getCorrales:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: corralesUrl,
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
    newCorral:(corral)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: corralesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', corral)
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
                   // 'Authorization': 'Token ' + userToken
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
    },

    //*****************EGRESOS FUNCTIONS*********************

    //Proveedores

    getProveedores:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: proveedoresUrl,
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

    newProveedor:(proveedor)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: proveedoresUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', proveedor)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    editProveedor:(proveedor)=>{
        let data = new FormData();
        for ( var key in proveedor ) {
            data.append(key, proveedor[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: proveedoresUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(proveedor.id+'/', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(data);
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteProveedor:(proveedorId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: proveedoresUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(proveedorId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },


    //Clientes
    getClientes:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: clientesUrl,
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

    newCliente:(cliente)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: clientesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', cliente)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    editCliente:(cliente)=>{
        let data = new FormData();
        for ( var key in cliente ) {
            data.append(key, cliente[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: clientesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(cliente.id+'/', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(data);
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCliente:(clienteId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: clientesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(clienteId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },



};

export default api;