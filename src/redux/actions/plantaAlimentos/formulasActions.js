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
            
            dispatch(getFormulasSuccess(r));
        }).catch( e => {
            
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
            
            r['items'] = formula['items'];
            let rForRedux = JSON.parse(JSON.stringify(r));
            for(let item of rForRedux.items){
                item.insumo = getState().insumos.list.find( insumo => insumo.id == item.insumo);
            }
            
            dispatch(saveFormulaSuccess(rForRedux));
            return r;
        })
        .catch(e=>{
            
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
            
            let rForRedux = JSON.parse(JSON.stringify(r));
            
            for(let item of rForRedux.items){
                item.insumo = getState().insumos.list.find( insumo => insumo.id == item.insumo);
            }
            
            dispatch(editFormulaSuccess(rForRedux));
            
            return r;
        }).catch(e=>{
            
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
