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
            r['items'] = formula['items'];
            dispatch(saveFormulaSuccess(r));
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
    return api.updateFormula(formula)
        .then( r => {
            dispatch(editFormulaSuccess(r));
            console.log(r)
        }).catch(e=>{
            console.log(e)
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
