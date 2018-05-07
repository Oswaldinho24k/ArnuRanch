import api from '../../../Api/Django';


export const GET_LINES_SUCCESS = 'GET_LINES_SUCCESS';

export function getLinesSuccess(lines){
    return{
        type:GET_LINES_SUCCESS, lines
    }
}

export const GET_LINES_DATA_SUCCESS = 'GET_LINES_DATA_SUCCESS';

export function getAllLinesSuccess(dataLine){
    return{
        type:GET_LINES_DATA_SUCCESS, dataLine
    }
}

export const getLines=(url)=>(dispatch, getState)=>{
    return api.getLines(url)
        .then(r=>{
            dispatch(getLinesSuccess(r.results));
            dispatch(getAllLinesSuccess(r));
        }).catch(e=>{
            throw e
        })
};


export const NEW_LINE_SUCCESS = 'NEW_LINE_SUCCESS';

export function newLineSuccess(line){
    return{
        type:NEW_LINE_SUCCESS, line
    }
}

export const newLine=(line)=>(dispatch, getState)=>{
    return api.newLine(line)
        .then(r=>{
            dispatch(newLineSuccess(r));
            dispatch(getLines());
        }).catch(e=>{
            throw e
        })
};

export const DELETE_LINE_SUCCESS = 'DELETE_LINE_SUCCESS';

export function deleteLineSuccess(line){
    return{
        type:DELETE_LINE_SUCCESS, line
    }
}

export const deleteLine=(line)=>(dispatch, getState)=>{
    return api.deleteLine(line)
        .then(r=>{
            dispatch(deleteLineSuccess(line));
            dispatch(getLines());
        }).catch(e=>{
            throw e
        })
};