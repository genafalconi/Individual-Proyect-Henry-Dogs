import { ASCENDENTE } from "../../Constants/order";
import { AXIOS_RAZAS, SEARCH_RAZAS, SEARCH_TEMPERAMENTS, ORD_ALFABETIC, ORD_PESO } from "../actions";

const initialState = {
    razas: [],
    filtRazas: [],
    newRazas: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AXIOS_RAZAS:
            return {
                ...state,
                razas: action.payload,
                filtRazas: action.payload
            }
        case SEARCH_RAZAS:
            return {
                ...state,
                filtRazas: action.payload
            }
        case SEARCH_TEMPERAMENTS:
            return {
                ...state,
                filtRazas: action.payload
            }
        case ORD_ALFABETIC:
            let orderAlf = [...state.razas]
            orderAlf = orderAlf.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name > b.name) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                filtRazas: orderAlf
            }
        case ORD_PESO:
            let orderPeso = [...state.razas]
            orderPeso = orderPeso.sort((a, b) => {
                if (parseInt(a.weight) < parseInt(b.weight)) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (parseInt(a.weight) > parseInt(b.weight)) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                if (typeof a.weight === 'string' || typeof b.weight === 'string') {
                    return -1;
                }
                if (isNaN(a.weight) || isNaN(b.weight)) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                filtRazas: orderPeso
            }
        default:
            return state
    }
}