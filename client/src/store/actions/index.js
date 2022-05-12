import axios from 'axios';
export const AXIOS_RAZAS = 'AXIOS_RAZAS';
export const SEARCH_RAZAS = 'SEARCH_RAZAS';
export const SEARCH_TEMPERAMENTS = 'SEARCH_TEMPERAMENTS';
export const ORD_ALFABETIC = 'ORD_ALFABETIC';
export const ORD_PESO = 'ORD_PESO';
export const DETAIL_RAZA = 'DETAIL_RAZA';
export const CREATE_RAZA = 'CREATE_RAZA';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT';
export const DELETE_RAZA = 'DELETE_RAZA';

const routeRaza = '/dogs';
const routeRazaCreate = '/dogs/dog';
const routeTemp = '/temperament';

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

export function detailRaza(razaId) {
    return (async (dispatch) => {
        try {
            const raza = await axios.get(routeRaza + '/' + razaId);
            dispatch({
                type: DETAIL_RAZA,
                payload: raza.data
            });
        } catch (error) {
            console.log(error);
        }
    })
}

export function getTemperaments() {
    return (async (dispatch) => {
        axios.get(routeTemp)
        .then((temp) => {
            dispatch({
                type: GET_TEMPERAMENT,
                payload: temp.data
            })
        }).catch((error) => { console.log(error) })
    })
}

export function createRaza(payload) {
    return (async (dispatch) => {
        try {
            const newRaza = await axios.post(routeRazaCreate,payload);
            return newRaza;
        } catch (error) {
            console.log(error)
        }
    })
}