import axios from 'axios';

let debug = true;

//Localhost urls

//let logInUrl = 'http://localhost:8000/api/auth/login/';
//let logOutUrl = 'http://localhost:8000/api/auth/logout/';
/*************************Users Urls***************************/

let tokenUrl = 'http://localhost:8000/api/auth/token-auth/';
let userUrl = 'http://localhost:8000/api/auth/me/';
let allUsersUrl = 'http://localhost:8000/api/auth/users/';
let profilesUrl = 'http://localhost:8000/api/auth/profiles/';

/********************Ganado Urls*******************/

let animalsUrl = 'http://localhost:8000/api/ganado/animals/';
let lotesUrl = 'http://localhost:8000/api/ganado/lotes/';
let corralesUrl = 'http://localhost:8000/api/ganado/corrales/';
let animalGastoUrl = 'http://localhost:8000/api/ganado/alimentos/';
let pesadasUrl = 'http://localhost:8000/api/ganado/pesadas/';
let razasUrl = 'http://localhost:8000/api/ganado/razas/';
let gastosGanadoUrl = 'http://localhost:8000/api/egresos/gastos/';
let saleNotesUrl = 'http://localhost:8000/api/ganado/sale_notes/';
let resumenUrl = 'http://localhost:8000/api/ganado/resumen/';
let facturasUrl = 'http://localhost:8000/api/ganado/facturas/';
let fierroOUrl = 'http://localhost:8000/api/ganado/fierrosO/';
let fierroNUrl = 'http://localhost:8000/api/ganado/fierrosN/';


/********************Planta de Alimentos Urls*******************/

let insumosUrl = 'http://localhost:8000/api/planta_alimentos/insumos/';
let itemsUrl = 'http://localhost:8000/api/planta_alimentos/items/';
let formulasUrl = 'http://localhost:8000/api/planta_alimentos/formulas/';
let egresosUrl = 'http://localhost:8000/api/egresos/egresos/';

/********************Egresos Urls*******************/

let proveedoresUrl = 'http://localhost:8000/api/egresos/proveedores/';
let comprasUrl = 'http://localhost:8000/api/egresos/compras/';

/********************Ingresos Urls*******************/

let almacenesUrl = 'http://localhost:8000/api/inventario/almacenes/';
let itemsAlmacenUrl = 'http://localhost:8000/api/inventario/items/';
let empresasUrl = 'http://localhost:8000/api/ingresos/empresas/';
let blinesUrl = 'http://localhost:8000/api/ingresos/blines/';

let clientesUrl = 'http://localhost:8000/api/ingresos/clientes/';
let salesUrl = 'http://localhost:8000/api/ingresos/ingresos/';
let cuentasUrl = 'http://localhost:8000/api/ingresos/cuentas/';
/********************Vacunas Urls*******************/

let vacunasUrl = 'http://localhost:8000/api/vacunas/vacunas/';

/********************Catologos Urls*******************/

let catProductsUrl = 'http://localhost:8000/api/catalogos/products/';
let catUnidadesUrl ='http://localhost:8000/api/catalogos/unidades/'
let catCfdisUrl = 'http://localhost:8000/api/catalogos/cfdis/';
let catPagosUrl = 'http://localhost:8000/api/catalogos/pagos/';
let catBankUrl ='http://localhost:8000/api/catalogos/banks/';
let catAlmacenUrl = 'http://localhost:8000/api/catalogos/almacenes/';
let catPresupuestosUrl = 'http://localhost:8000/api/catalogos/presupuestos/';

/********************Creditos Urls*******************/
let acreedoresUrl = 'http://localhost:8000/api/creditos/acreedores/'
let disposicionesUrl = 'http://localhost:8000/api/creditos/disposiciones/'






if(!debug){
    /******************************AWS Urls********************************/

    /********************Users Urls*******************/
    tokenUrl = 'https://rancho.davidzavala.me/api/auth/token-auth/';
    userUrl = 'https://rancho.davidzavala.me/api/auth/me/';
    allUsersUrl = 'https://rancho.davidzavala.me/api/auth/users/';
    profilesUrl = 'https://rancho.davidzavala.me/api/auth/profiles/';

    /********************Ganado Urls*******************/
    animalsUrl = 'https://rancho.davidzavala.me/api/ganado/animals/';
    lotesUrl = 'https://rancho.davidzavala.me/api/ganado/lotes/';
    corralesUrl = 'https://rancho.davidzavala.me/api/ganado/corrales/';
    animalGastoUrl = 'https://rancho.davidzavala.me/api/ganado/alimentos/';
    pesadasUrl = 'https://rancho.davidzavala.me/api/ganado/pesadas/';
    razasUrl = 'https://rancho.davidzavala.me/api/ganado/razas/';
    facturasUrl = 'https://rancho.davidzavala.me/api/ganado/facturas/';
    saleNotesUrl = 'https://rancho.davidzavala.me/api/ganado/sale_notes/';
    resumenUrl = 'https://rancho.davidzavala.me/api/ganado/resumen/';
    fierroOUrl = 'https://rancho.davidzavala.me/api/ganado/fierrosO/';
    fierroNUrl = 'https://rancho.davidzavala.me/api/ganado/fierrosN/';



    /********************Egresos Urls*******************/
    proveedoresUrl = 'https://rancho.davidzavala.me/api/egresos/proveedores/';
    egresosUrl = 'https://rancho.davidzavala.me/api/egresos/egresos/';
    comprasUrl = 'https://rancho.davidzavala.me/api/egresos/compras/';
    gastosGanadoUrl = 'https://rancho.davidzavala.me/api/egresos/gastos/';

    /********************Ingresos Urls*******************/
    clientesUrl = 'https://rancho.davidzavala.me/api/ingresos/clientes/';
    salesUrl = 'https://rancho.davidzavala.me/api/ingresos/ingresos/';
    empresasUrl = 'https://rancho.davidzavala.me/api/ingresos/empresas/';
    blinesUrl = 'https://rancho.davidzavala.me/api/ingresos/blines/';
    cuentasUrl = 'https://rancho.davidzavala.me/api/ingresos/cuentas/';
    //almacen
    almacenesUrl = 'https://rancho.davidzavala.me/api/inventario/almacenes/';
    itemsAlmacenUrl = 'https://rancho.davidzavala.me/api/inventario/items/';


    /********************PlantaAlimentos Urls*******************/
    insumosUrl = 'https://rancho.davidzavala.me/api/planta_alimentos/insumos/';
    itemsUrl = 'https://rancho.davidzavala.me/api/planta_alimentos/items/';
    formulasUrl = 'https://rancho.davidzavala.me/api/planta_alimentos/formulas/';


    /********************Vacunas Urls*******************/
    vacunasUrl = 'https://rancho.davidzavala.me/api/vacunas/vacunas/';


    /********************Catalogos Urls*******************/
    catProductsUrl = 'https://rancho.davidzavala.me/api/catalogos/products/';
    catUnidadesUrl ='https://rancho.davidzavala.me/api/catalogos/unidades/'
    catCfdisUrl = 'https://rancho.davidzavala.me/api/catalogos/cfdis/';
    catPagosUrl = 'https://rancho.davidzavala.me/api/catalogos/pagos/';
    catBankUrl ='https://rancho.davidzavala.me/api/catalogos/banks/';
    catAlmacenUrl = 'https://rancho.davidzavala.me/api/catalogos/almacenes/';
    catPresupuestosUrl = 'https://rancho.davidzavala.me/api/catalogos/presupuestos/';

    /********************Creditos Urls*******************/
    acreedoresUrl = 'https://rancho.davidzavala.me/api/creditos/acreedores/'
    disposicionesUrl = 'https://rancho.davidzavala.me/api/creditos/disposiciones/'

}





const api = {
    /*******************Creditos y Acreedores*****************/

    getAcreedores:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:acreedoresUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    newAcreedor:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:acreedoresUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', item)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    editAcreedor:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:acreedoresUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(item.id+'/', item)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    deleteAcreedor:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:acreedoresUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(item.id+'/')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },

    getDisposiciones:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:disposicionesUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    newDisposicion:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:disposicionesUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', item)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    editDisposicion:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:disposicionesUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(item.id+'/', item)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    deleteDisposicion:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:disposicionesUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(item.id+'/')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },




    /*******************Upload fierrosO*****************/
    getFierrosO:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:fierroOUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    newFierrosO:(object)=>{
        let data = new FormData();

        for ( var key in object ) {
            data.append(key, object[key]);
        }


        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:fierroOUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', data)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    editFierroO:(object)=>{

        let data = new FormData();
        for ( var key in object ) {
            data.append(key, object[key]);
        }


        if(object.imagen){

            if(object.imagen === null || object.imagen === undefined || typeof object.imagen === 'string'){
                data.delete('imagen')
            }else{
                data.append('imagen', object.imagen.file.originFileObj);
            }
        }else{
            data.delete('fierro_original')
        }



        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: fierroOUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(object.id+'/', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {


                    reject(error);
                });


        });
    },
    /*******************Upload fierrosN*****************/
    getFierrosN:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:fierroNUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    newFierrosN:(object)=>{
        let data = new FormData();

        for ( var key in object ) {
            data.append(key, object[key]);
        }



        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL:fierroNUrl,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', data)
                .then(function(response){
                    resolve(response.data)
                })
                .catch(function(error){
                    reject(error)
                })
        })
    },
    editFierroN:(obj)=>{

        let data = new FormData();
        for ( var key in obj ) {
            data.append(key, obj[key]);
        }


        if(obj.imagen){

            if(obj.imagen === null || obj.imagen === undefined || typeof obj.imagen === 'string'){
                data.delete('imagen')
            }else{
                data.append('imagen', obj.imagen.file.originFileObj);
            }
        }else{
            data.delete('fierro_original')
        }



        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: fierroNUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(obj.id+'/', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {


                    reject(error);
                });


        });
    },

    /***********************Reporte********************/
    getReporte:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: resumenUrl,
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
                    
                    reject(error);
                });
        })
     },
     /***********************Sale Notes********************/
     getSaleNotes:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: saleNotesUrl,
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
                    
                    reject(error);
                });
        })
     },
     newSaleNote:(saleNote)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: saleNotesUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', saleNote)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data)
                    reject(error);
                });
        })
    },
    editSaleNote:(saleNote)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: saleNotesUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post(saleNote.id+'/', saleNote)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });
        })
    },
    deleteSaleNote:(snId)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: saleNotesUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(snId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });
        })
    },

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
                    
                    reject(error);
                });
        })
    },
    editUser:(user)=>{
        if(user.password==='********')delete user.password
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: allUsersUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(user.id+'/', user)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
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
                    
                    reject(error);
                });
        });
    },
    getSingleAnimal:(id)=>{
       // let newUrl = animalsUrl;
        //if(url)newUrl=url;

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
            instance.get(id+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });
        });
    },
    newAnimal:(animal)=>{
        let data = new FormData();
        let date;
        for ( var key in animal ) {
            data.append(key, animal[key]);
        }
        if (animal.fecha_entrada){
            date = animal.fecha_entrada.format("YYYY-MM-DD HH:mm:ss");
            data.append('fecha_entrada', date);
        }
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
                    
                    
                    reject(error);
                });


        });
    },
    editAnimal:(animal)=>{
        
        let data = new FormData();
        for ( var key in animal ) {
            data.append(key, animal[key]);
        }
        if(animal.fecha_entrada){
            let date = animal.fecha_entrada.format("YYYY-MM-DD HH:mm:ss");
            data.append('fecha_entrada', date);
        }

       if(animal.fierro_original){
            
           if(animal.fierro_original === null || animal.fierro_original === undefined || typeof animal.fierro_original === 'string'){
               data.delete('fierro_original')
           }else{
               data.append('fierro_original', animal.fierro_original.file.originFileObj);
           }
       }else{
           data.delete('fierro_original')
       }
       if(animal.fierro_nuevo){
           
           if(animal.fierro_nuevo === null || animal.fierro_nuevo === undefined || typeof animal.fierro_nuevo === 'string'){
               data.delete('fierro_nuevo');
           }else{
               data.append('fierro_nuevo', animal.fierro_nuevo.file.originFileObj);
           }
       }else{
           data.delete('fierro_nuevo');
       }

        if(animal.ref_factura_original_id === null || animal.ref_factura_original_id === undefined || typeof animal.ref_factura_original_id === 'string'){
            data.delete('ref_factura_original_id')
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
                    
                    reject(error);
                });


        });
    },
    deleteLote:(batch)=>{
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
            instance.delete(batch+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
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
                    
                    reject(error);
                });


        });
    },
    deleteCorral:(corral)=>{
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
            instance.delete(corral+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
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
                    
                    reject(error.response);
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
                    
                    reject(error);
                });


        });
    },

    //*****************EGRESOS FUNCTIONS*********************

    //Proveedores

    getProveedores:(url)=>{
        let newUrl = proveedoresUrl;
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
                    
                    reject(error);
                });


        });
    },


    //Clientes
    getClientes:(url)=>{
        let newUrl = clientesUrl;
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
                    
                    reject(error);
                });


        });
    },

    //Empresas
    getEmpresas:(url)=>{
        let newUrl = empresasUrl;
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
                    
                    reject(error);
                });


        });
    },
    editEmpresa:(empresa)=>{
       /* let data = new FormData();
        for ( var key in empresa ) {
            data.append(key, empresa[key]);
        }*/

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
            instance.patch(empresa.id+'/', empresa)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    
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
                    
                    reject(error);
                });


        });
    },


    /*********************INGRESOS API*************/
    getIngresos:(url)=>{
        let newUrl = salesUrl;
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
                    
                    reject(error);
                });


        });
    },

    editIngreso:(ingreso)=>{
        console.log("INGRESO", ingreso)
        let dataIngreso = new FormData();
        for ( var key in ingreso ) {
            dataIngreso.append(key, ingreso[key]);
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
            instance.patch(ingreso.id+'/', ingreso)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    
                    console.log(ingreso);
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

    getEgresos:(url)=>{
        let newUrl = egresosUrl;
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
                    
                    reject(error);
                });


        });
    },
    /**************************BLINES***************************************/
    getLines:(url)=>{
        let nUrl = blinesUrl;
        if(url)nUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: nUrl,
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
                    
                    reject(error);
                });


        });
    },
    newLine:(line)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: blinesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', line)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },
    deleteLine:(line)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: blinesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(line+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    editLinea:(linea)=>{
        let dataL = new FormData();
        for ( var id in linea ) {
            dataL.append(id, linea[id]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: blinesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(linea.id+'/', dataL)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    
                    reject(error);
                });


        });
    },

    //ALMACEN

    getAlmacenes:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: almacenesUrl,
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
                    
                    reject(error);
                });


        });
    },


    newAlmacen:(almacen)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: almacenesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', almacen)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    deleteAlmacen:(almacenId)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: almacenesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(almacenId+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    editAlmacen:(almacen)=>{

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: almacenesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(almacen.id+'/', almacen)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    
                    reject(error);
                });


        });
    },

    //ITEMS ALMACEN

    newItemAlmacen:(item)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: itemsAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', item)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    deleteItem:(item, almacen)=>{
        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: itemsAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(item+'/')
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    //FACTURAS
    //CUENTAS

    getFacturas:(url)=>{
        let nUrl = facturasUrl;
        if(url)nUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: nUrl,
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
                    
                    reject(error);
                });


        });
    },
    newFactura:(factura)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: facturasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', factura)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },
    deleteFactura:(factura)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: facturasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(factura+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    editFactura:(factura)=>{
        let dataF = new FormData();
        for ( var id in factura ) {
            dataF.append(id, factura[id]);
        }

        
        

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: facturasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(factura.id+'/', dataF)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    
                    reject(error);
                });


        });
    },

    //CUENTAS

    getCuentas:(url)=>{
        let cUrl = cuentasUrl;
        if(url)cUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: cUrl,
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
                    
                    reject(error);
                });


        });
    },
    newCuenta:(cuenta)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: cuentasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', cuenta)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },
    deleteCuenta:(cuenta)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: cuentasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(cuenta+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    
                    reject(error);
                });


        });
    },

    editCuenta:(cuenta)=>{
        let dataC = new FormData();
        for ( var id in cuenta ) {
            dataC.append(id, cuenta[id]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: cuentasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(cuenta.id+'/', dataC)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    
                    reject(error);
                });


        });
    },

    //COMPRAS

    getCompras:(url)=>{
        let cUrl = comprasUrl;
        if(url)cUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: cUrl,
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
    newCompra:(compra)=>{
        let info = new FormData();
        let fecha;
        for ( var key in compra ) {
            info.append(key, compra[key]);
        }
        if (compra.fecha_creacion){
            fecha = compra.fecha_creacion.format("YYYY-MM-DD");
            info.append('fecha_creacion', fecha);
        }
        console.log("COMPRA_ENVIAR", compra)
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: comprasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', info)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    deleteCompra:(compra)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: comprasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(compra+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    editCompra:(compra)=>{
        let dataC = new FormData();
        for ( var id in compra ) {
            dataC.append(id, compra[id]);
        }

        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: comprasUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(compra.id+'/', dataC)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    //GastoGanado

    getGastoGanado:(url)=>{
        let gUrl = gastosGanadoUrl;
        if(url)gUrl=url;
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: gUrl,
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
    newGastoGanado:(gasto)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: gastosGanadoUrl,
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
    deleteGastoGanado:(gasto)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: gastosGanadoUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(gasto+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    editGastoGanado:(gasto)=>{
        return new Promise(function (resolve, reject) {
            const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
            const instance = axios.create({
                baseURL: gastosGanadoUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(gasto.id+'/', gasto)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    //DASH GANADO

    getDataDash:()=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: resumenUrl,
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

    //Catálogo
 /*-----Products------*/
   getCatProduts:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catProductsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatProduct:(catProduct)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catProductsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catProduct)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatProducts:(catProduct)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catProductsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
          instance.delete(catProduct+'/' )
              .then(function (response) {
                  resolve(response.data);
              })
              .catch(function (error) {
                  console.log('el error: ', error.response);
                  reject(error);
              });

        })
    },
    editCatProduct:(catProduct)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catProductsUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catProduct.id+'/', catProduct)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    /*--------Unidades-------*/

    getCatUnidades:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catUnidadesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatUnidad:(catUnidad)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catUnidadesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catUnidad)
                .then(function (response) {
                    console.log("django r:",response.data)
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatUnidad:(catUnidad)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catUnidadesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catUnidad+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatUnidad:(catUnidad)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catUnidadesUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catUnidad.id+'/', catUnidad)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    /*----------------------CFDIS-------------------------*/


    getCatCfdis:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catCfdisUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatCfdis:(catCfdis)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catCfdisUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catCfdis)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatCfdis:(catCfdis)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catCfdisUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catCfdis+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatCfdis:(catCfdis)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catCfdisUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catCfdis.id+'/', catCfdis)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    /*----------Pagos------------*/

    getCatPagos:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPagosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatPago:(catPago)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPagosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catPago)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatPago:(catPago)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPagosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catPago+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatPago:(catPago)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPagosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catPago.id+'/', catPago)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },


    /*---------Banks-----------*/

    getCatBanks:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catBankUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatBank:(catBank)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catBankUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catBank)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatBank:(catBank)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catBankUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catBank+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatBank:(catBank)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catBankUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catBank.id+'/', catBank)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {

                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
  /*-----------------Almacenes---------------------*/
    getCatAlmacenes:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatAlmacen:(catAlmacen)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catAlmacen)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatAlmacen:(catAlmacen)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catAlmacen+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatAlmacen:(catAlmacen)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catAlmacenUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catAlmacen.id+'/', catAlmacen)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },
    /*-------------Presupuesto----------*/

    getCatPresupuestos:()=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPresupuestosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.get('')
                .then(function(response){
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error', error.response)
                    reject(error);
                });
        })
    },

    newCatPresupuesto:(catPresupuesto)=>{

        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPresupuestosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.post('', catPresupuesto)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });


        });
    },

    deleteCatPresupuesto:(catPresupuesto)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPresupuestosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.delete(catPresupuesto+'/' )
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log('el error: ', error.response);
                    reject(error);
                });

        })
    },
    editCatPresupuesto:(catPresupuesto)=>{
        const userToken = JSON.parse(localStorage.getItem('userRanchoToken'));
        return new Promise(function (resolve, reject){
            const instance = axios.create({
                baseURL: catPresupuestosUrl,
                // timeout: 2000,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + userToken
                }
            });
            instance.patch(catPresupuesto.id+'/', catPresupuesto)
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


