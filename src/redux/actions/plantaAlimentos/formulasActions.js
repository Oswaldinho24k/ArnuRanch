import api from "../../../Api/Django";

/*************************get All********************************+*/
export const GET_FORMULAS_SUCCESS = 'GET_FORMULAS_SUCCESS';

export const getFormulasSuccess = formulas => ({
    type:GET_FORMULAS_SUCCESS,
    formulas
});


export const getFormulas = url => (dispatch, getState) => {
    api.getFormulas( url )
        .then( r => {
            //console.log(r);
            dispatch(getFormulasSuccess(r));
        }).catch( e => {
            console.log( e );
    });
};

/*************************save new********************************+*/

export const SAVE_FORMULA_SUCCESS = 'SAVE_FORMULA_SUCCESS';

export const saveFormulaSuccess = formula => ({
    type:SAVE_FORMULA_SUCCESS,
    formula
});

export const saveFormula = formula => (dispatch, getState) => {
    return api.newFormula(formula)
        .then( r => {
            console.log(formula.items);
            r['items'] = formula['items'];
            let rForRedux = JSON.parse(JSON.stringify(r));
            for(let item of rForRedux.items){
                item.insumo = getState().insumos.list.find( insumo => insumo.id == item.insumo);
            }
            console.log(rForRedux);
            dispatch(saveFormulaSuccess(rForRedux));
            return r;
        })
        .catch(e=>{
            console.log(e);
    });
};

/*************************edit********************************+*/

export const EDIT_FORMULA_SUCCESS = 'EDIT_FORMULA_SUCCESS';

export const editFormulaSuccess = formula => ({
    type: EDIT_FORMULA_SUCCESS,
    formula
});

export const editFormula = formula => (dispatch, getState) => {
    let formulaForRedux = JSON.parse(JSON.stringify(formula));
    return api.updateFormula(formula)
        .then( r => {
            r['items'] = formula['items'];
            console.log('R normal',r);
            let rForRedux = JSON.parse(JSON.stringify(r));
            console.log('R clonado',rForRedux);
            for(let item of rForRedux.items){
                item.insumo = getState().insumos.list.find( insumo => insumo.id == item.insumo);
            }
            console.log(rForRedux);
            dispatch(editFormulaSuccess(rForRedux));
            console.log(r);
            return r;
        }).catch(e=>{
            console.log(e);
            return e;
    });
};

/*************************delete********************************+*/

export const DELETE_FORMULA_SUCCESS = 'DELETE_FORMULA_SUCCESS';

export const deleteFormulaSuccess = formulaId => ({
    type:DELETE_FORMULA_SUCCESS,
    formulaId
});

export const deleteFormula = formulaId => (dispatch, getState) =>{
    return api.removeFormula(formulaId)
        .then( r => {
            dispatch(deleteFormulaSuccess(formulaId));
            return r;
        }).
        catch(e=>{
            return e;
    });
};
