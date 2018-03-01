import axios from 'axios';

let debug = false;

//Localhost urls

//let logInUrl = 'http://localhost:8000/api/auth/login/';
//let logOutUrl = 'http://localhost:8000/api/auth/logout/';
let animalsUrl = 'http://localhost:8000/api/ganado/animals/';
let tokenUrl = 'http://localhost:8000/api/auth/token-auth/';
let userUrl = 'http://localhost:8000/api/auth/me/';
let lotesUrl = 'http://localhost:8000/api/ganado/lotes/';
let corralesUrl = 'http://localhost:8000/api/ganado/corrales/';
let animalGastoUrl = 'http://localhost:8000/api/ganado/alimentos/';
let pesadasUrl = 'http://localhost:8000/api/ganado/pesadas/';
let proveedoresUrl = 'http://localhost:8000/api/egresos/proveedores/';
let clientesUrl = 'http://localhost:8000/api/ingresos/clientes/';
let salesUrl = 'http://localhost:8000/api/ingresos/ingresos/';
let allUsersUrl = 'http://localhost:8000/api/auth/users/';
let profilesUrl = 'http://localhost:8000/api/auth/profiles/';
let razasUrl = 'http://localhost:8000/api/ganado/razas/';
// planta_alimentos
let insumosUrl = 'http://localhost:8000/api/planta_alimentos/insumos/';
let itemsUrl = 'http://localhost:8000/api/planta_alimentos/items/';
let formulasUrl = 'http://localhost:8000/api/planta_alimentos/formulas/';
let egresosUrl = 'http://localhost:8000/api/egresos/egresos/';

//empresas
let empresasUrl = 'http://localhost:8000/api/ingresos/empresas/';
//vacunas
let vacunasUrl = 'http://localhost:8000/api/vacunas/vacunas/';



//heroku urls
if(!debug){

    /******************************AWS Urls********************************/
    animalsUrl = 'https://rancho.fixter.org/api/ganado/animals/';
    tokenUrl = 'https://rancho.fixter.org/api/auth/token-auth/';
    userUrl = 'https://rancho.fixter.org/api/auth/me/';
    lotesUrl = 'https://rancho.fixter.org/api/ganado/lotes/';
    corralesUrl = 'https://rancho.fixter.org/api/ganado/corrales/';
    animalGastoUrl = 'https://rancho.fixter.org/api/ganado/alimentos/';
    pesadasUrl = 'https://rancho.fixter.org/api/ganado/pesadas/';
    proveedoresUrl = 'https://rancho.fixter.org/api/egresos/proveedores/';
    clientesUrl = 'https://rancho.fixter.org/api/ingresos/clientes/';
    salesUrl = 'https://rancho.fixter.org/api/ingresos/ingresos/';
    allUsersUrl = 'https://rancho.fixter.org/api/auth/users/';
    profilesUrl = 'https://rancho.fixter.org/api/auth/profiles/';
    razasUrl = 'https://rancho.fixter.org/api/ganado/razas/';
// planta_alimentos
    insumosUrl = 'https://rancho.fixter.org/api/planta_alimentos/insumos/';
    itemsUrl = 'https://rancho.fixter.org/api/planta_alimentos/items/';
    formulasUrl = 'https://rancho.fixter.org/api/planta_alimentos/formulas/';
    egresosUrl = 'https://rancho.fixter.org/api/egresos/egresos/';
    empresasUrl = 'https://rancho.fixter.org/api/api/ingresos/empresas/';
    vacunasUrl = 'https://rancho.fixter.org/api/vacunas/vacunas/';

    /******************************Heroku Urls********************************/
    /*animalsUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/animals/';
    tokenUrl = 'https://arnu-ranch-backend.herokuapp.com/api/auth/token-auth/';
    userUrl = 'https://arnu-ranch-backend.herokuapp.com/api/auth/me/';
    lotesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/lotes/';
    corralesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/corrales/';
    animalGastoUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/alimentos/';
    pesadasUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ganado/pesadas/';
    proveedoresUrl = 'https://arnu-ranch-backend.herokuapp.com/api/egresos/proveedores/';
    clientesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ingresos/clientes/';
    salesUrl = 'https://arnu-ranch-backend.herokuapp.com/api/ingresos/ingresos/';

// planta_alimentos
    insumosUrl = 'https://arnu-ranch-backend.herokuapp.com/api/planta_alimentos/insumos/';
    itemsUrl = 'https://arnu-ranch-backend.herokuapp.com/api/planta_alimentos/items/';
    formulasUrl = 'https://arnu-ranch-backend.herokuapp.com/api/planta_alimentos/formulas/';
    egresosUrl = 'https://arnu-ranch-backend.herokuapp.com/api/egresos/egresos/';*/
}





const api = {
    /*-----------------Users functions-----------------------*/
    getAllUsers:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: allUsersUrl,
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
        })
    },
    newUser:(user)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: allUsersUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', user)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });
        })
    },

    deleteUser:(user)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: allUsersUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(user+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    saveProfile:(profile)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: profilesUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', profile)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });
        })
    },

    /*-----------------animals functions-----------------------*/
    //Get all animals
    getAnimals:(url)=>{
        let newUrl = animalsUrl;
        if(url)newUrl=url;

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: newUrl,
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
        //data.append('fierro_original', animal.fierro_original[0].originFileObj);
        //data.append('fierro_nuevo', animal.fierro_nuevo[0].originFileObj);

        if(animal.fierro_original === null || animal.fierro_original === undefined){
            data.delete('fierro_original')
        }else{
            data.append('fierro_original', animal.fierro_original[0].originFileObj);
        }


        if(animal.fierro_nuevo === null || animal.fierro_nuevo === undefined){
            data.delete('fierro_nuevo')
        }else{
            data.append('fierro_nuevo', animal.fierro_nuevo[0].originFileObj);
        }

        data.append('fecha_entrada', date);

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'multipart/form-data',
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
        console.log(animal)
        let data = new FormData();
        for ( var key in animal ) {
            data.append(key, animal[key]);
        }
        if(animal.fecha_entrada){
            let date = animal.fecha_entrada.format("YYYY-MM-DD HH:mm:ss");
            data.append('fecha_entrada', date);
        }

       if(animal.fierro_original){
            console.log(typeof animal.fierro_original)
           if(animal.fierro_original === null || animal.fierro_original === undefined || typeof animal.fierro_original === 'string'){
               data.delete('fierro_original')
           }else{
               data.append('fierro_original', animal.fierro_original.file.originFileObj);
           }
       }else{
           data.delete('fierro_original')
       }
       if(animal.fierro_nuevo){
           console.log(typeof animal.fierro_nuevo)
           if(animal.fierro_nuevo === null || animal.fierro_nuevo === undefined || typeof animal.fierro_nuevo === 'string'){
               data.delete('fierro_nuevo');
           }else{
               data.append('fierro_nuevo', animal.fierro_nuevo.file.originFileObj);
           }
       }else{
           data.delete('fierro_nuevo');
       }


        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: animalsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'multipart/form-data',
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
    /*-----------------gastos functions-----------------------*/


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
    getLotes:(url)=>{
        let newLoteUrl = lotesUrl;
        if(url)newLoteUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: newLoteUrl,
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
    editLote:(batch)=>{
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
            instance.patch(batch.id+'/', batch)
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

    /*-----------------pesadas functions-----------------------*/

    newPesada:(pesada)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: pesadasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', pesada)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    getPesadas:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: pesadasUrl,
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

    //Empresas
    getEmpresas:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: empresasUrl,
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

    newEmpresa:(empresa)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: empresasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', empresa)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    editEmpresa:(empresa)=>{
        let data = new FormData();
        for ( var key in empresa ) {
            data.append(key, empresa[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: empresasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(empresa.id+'/', data)
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

    deleteEmpresa:(empresaId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: empresasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(empresaId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    //vacunas
    getVacunas:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: vacunasUrl,
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

    newVacuna:(vacuna)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: vacunasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', vacuna)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    editVacuna:(vacuna)=>{
        let data = new FormData();
        for ( var key in vacuna ) {
            data.append(key, vacuna[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: vacunasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(vacuna.id+'/', data)
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

    deleteVacuna:(vacunaId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: vacunasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(vacunaId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },


    /*********************INGRESOS API*************/
    getIngresos:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: salesUrl,
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
    newIngreso:(ingreso)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: salesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', ingreso)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    editIngreso:(ingreso)=>{
        let data = new FormData();
        for ( var key in ingreso ) {
            data.append(key, ingreso[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: salesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(ingreso.id+'/', data)
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

    deleteIngreso:(ingresoId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: salesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(ingresoId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },


    /*************** Planta Alimentos ************************/
    // Inicio Items
    getItems: url => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        itemsUrl = url ? url : itemsUrl;
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: itemsUrl,
                headers: headers
            });
            instance.get('')
                .then( response => {
                    resolve(response.data)
                })
                .catch( error => {
                    console.log('el error: ', error.response);
                    reject(error);
                });
        });
    },
    newItem: item => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject ) => {
           const instance = axios.create({
               baseURL: itemsUrl,
               headers: headers
           });
           instance.post( '', item )
               .then( response => {
                   resolve(response.data)
               })
               .catch( error => {
                   console.log(error.response);
                   reject(error);
               });
        });
    },
    updateItem : item => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: itemsUrl,
                headers: headers
            });
            instance.patch(item.id + '/',item)
                .then( response => {
                    resolve(response.data);
                })
                .catch( error => {
                console.error(error.response);
                reject(error);
            });
        })
    },
    removeItem: idItem => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: itemsUrl,
                headers: headers
            });
            instance.delete(idItem + '/')
                .then( response => {
                    resolve(response.data);
                }).catch( error => {
                    console.error(error.response);
                    reject(error);
            });
        });
    },

    //Final Items
    //  Insumos begin
    getInsumos: url => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        insumosUrl = url ? url : insumosUrl;
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: insumosUrl,
                headers: headers
            });
            instance.get('')
                .then( response => {
                    resolve(response.data)
                })
                .catch( error => {
                    console.log('el error: ', error.response);
                    reject(error);
                });
        });
    },
    newInsumo: insumo => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( ( resolve, reject ) => {
            const instance = axios.create({
                baseURL: insumosUrl,
                headers: headers
            });
            instance.post( '', insumo )
                .then( response => {
                    resolve(response.data)
                })
                .catch( error => {
                    console.log(error.response);
                    reject(error);
                });
        });
    },
    updateInsumo : insumo => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: insumosUrl,
                headers: headers
            });
            instance.patch(insumo.id + '/',insumo)
                .then( response => {
                    resolve(response.data);
                })
                .catch( error => {
                    console.error(error.response);
                    reject(error);
                });
        })
    },
    removeInsumo: idInsumo => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: insumosUrl,
                headers: headers
            });
            instance.delete(idInsumo + '/')
                .then( response => {
                    resolve(response.data);
                }).catch( error => {
                console.error(error.response);
                reject(error);
            });
        });
    },

    // Insumos end
    // Formulas begin
    getFormulas: url => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        formulasUrl = url ? url : formulasUrl;
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: formulasUrl,
                headers: headers
            });
            instance.get('')
                .then( response => {
                    resolve(response.data)
                })
                .catch( error => {
                    console.log('el error: ', error.response);
                    reject(error);
                });
        });
    },
    newFormula: formula => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject ) => {
            const instance = axios.create({
                baseURL: formulasUrl,
                headers: headers
            });
            instance.post( '', formula )
                .then( response => {
                    resolve(response.data)
                })
                .catch( error => {
                    console.log(error.response);
                    reject(error);
                });
        });
    },
    updateFormula : formula => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: formulasUrl,
                headers: headers
            });
            instance.patch(formula.id + '/',formula)
                .then( response => {
                    resolve(response.data);
                })
                .catch( error => {
                    console.error(error.response);
                    reject(error);
                });
        })
    },
    removeFormula: idFormula => {
        let userTokenKey = 'userRanchoToken';
        const userToken = JSON.parse(localStorage.getItem(userTokenKey));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + userToken
        };
        return new Promise( (resolve, reject) => {
            const instance = axios.create({
                baseURL: formulasUrl,
                headers: headers
            });
            instance.delete(idFormula + '/')
                .then( response => {
                    resolve(response.data);
                }).catch( error => {
                console.error(error.response);
                reject(error);
            });
        });
    },

    //Final Items
    /*******************Fin planta alimentos *********************/

    /*********EGRESOS API******/

    getEgresos:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: egresosUrl,
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
    newEgreso:(egreso)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: egresosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', egreso)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    editEgreso:(egreso)=>{
        let data = new FormData();
        for ( var key in egreso ) {
            data.append(key, egreso[key]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: egresosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(egreso.id+'/', data)
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

    deleteEgreso:(egresoId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: egresosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(egresoId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    /**************************Razas***************************************/
    getRazas:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: razasUrl,
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
    newRaza:(raza)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: razasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', raza)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    deleteRaza:(raza)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: razasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(raza+'/' )
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


