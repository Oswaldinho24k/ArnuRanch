import {combineReducers} from 'redux';
import {GET_EMPRESAS_SUCCESS, SAVE_EMPRESA_SUCCESS, DELETE_EMPRESA_SUCCESS, EDIT_EMPRESA_SUCCESS} from "../../actions/empresasActions";
import {DELETE_ALMACEN_SUCCESS, EDIT_ALMACEN_SUCCESS, SAVE_ALMACEN_SUCCESS} from "../../actions/almacen/almacenActions";


function list(state=[], action){
    switch(action.type){
        case GET_EMPRESAS_SUCCESS:
            return action.empresas;
        case SAVE_EMPRESA_SUCCESS:
            return [...state, action.empresa];
        case EDIT_EMPRESA_SUCCESS:
            let newL = state.filter(a=>{
                return a.id!=action.empresa.id
            });
            return [...newL, action.empresa];
        case DELETE_EMPRESA_SUCCESS:
            let acualL = state.filter(a=>{
                return a.id!=action.empresaId;
            });
            return acualL;

        //CASE ALMACENES

        case SAVE_ALMACEN_SUCCESS:
            let empresas = state.filter(e =>{
                return e.id !== action.almacen.company;
            });

            let empresa = state.find(e=> {
               return e.id === action.almacen.company;
            });

            let bline = empresa.line_comp.find(line => {
               return line.id === action.almacen.bline
            });

            bline.almacenes.push(action.almacen);

            return [empresa, ...empresas];

        case DELETE_ALMACEN_SUCCESS:
            let empresasList = state.filter(e =>{
                return e.id !== action.almacen.company;
            });

            let empresaFind = state.find(e=> {
                return e.id === action.almacen.company;
            });

            let blineFind = empresaFind.line_comp.find(line => {
                return line.id === action.almacen.bline
            });

            let almacenes = blineFind.almacenes.filter(f=>{
                return f.id !== action.almacen.id;
            })

            blineFind["almacenes"] = almacenes;

            return [empresaFind, ...empresasList];

        case EDIT_ALMACEN_SUCCESS:
            let listaEmpresas = state.filter(e =>{
                return e.id !== action.almacen.company;
            });

            let companyFind = state.find(e=> {
                return e.id === action.almacen.company;
            });

            let bussineslFind = companyFind.line_comp.find(line => {
                return line.id === action.almacen.bline
            });

            let newAlmacenes = bussineslFind.almacenes.filter(f=>{
                return f.id !== action.almacen.id;
            })

            newAlmacenes.push(action.almacen);

            bussineslFind["almacenes"] = newAlmacenes;

            return[...listaEmpresas, companyFind];


        default:
            return state;
    }
}


const empresasReducer = combineReducers({
    list:list,
});


export default empresasReducer;