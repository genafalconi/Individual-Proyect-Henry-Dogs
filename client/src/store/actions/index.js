import axios from 'axios';
export const AXIOS_RAZAS = 'AXIOS_RAZAS';
export const SEARCH_RAZAS = 'SEARCH_RAZAS';
export const SEARCH_TEMPERAMENTS = 'SEARCH_TEMPERAMENTS';
export const ORD_ALFABETIC = 'ORD_ALFABETIC';
export const ORD_PESO = 'ORD_PESO';

const routeRaza = 'http://localhost:3001/dogs';
const routeTemp = 'http://localhost:3001/temperament';

export function axiosRazas() {
    return ((dispatch) => { //dispach give us an await to get the data
        axios.get(routeRaza)
            .then((razas) => {
                dispatch({
                    type: AXIOS_RAZAS,
                    payload: razas.data
                })
            }).catch((error) => { console.log(error) })
    })
}

export function searchRazas(search) {
    return (async (dispatch) => {
        try {
            const razas = await axios.get(routeRaza + '?name=' + search);
            dispatch({
                type: SEARCH_RAZAS,
                payload: razas.data
            });
        } catch (error) {
            console.log(error);
        }
    })
}

export function searchTemperamentos(search) {
    return (async (dispatch) => {
        try {
            const temperament = await axios.get(routeTemp + '?temperament=' + search);
            dispatch({
                type: SEARCH_TEMPERAMENTS,
                payload: temperament.data
            });
            console.log(temperament) // seguir con ruta temperaments
        } catch (error) {
            console.log(error);
        }
    })
}

export function ordAlfabetic(order) {
    return {
        type: ORD_ALFABETIC,
        payload: order
    }
}

export function ordPeso(order) {
    return {
        type: ORD_PESO,
        payload: order
    }
}