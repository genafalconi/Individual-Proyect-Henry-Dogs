import { ASCENDENTE } from "../../Constants/order";
import { AXIOS_RAZAS, SEARCH_RAZAS, SEARCH_TEMPERAMENTS, ORD_ALFABETIC, ORD_PESO, DETAIL_RAZA, CREATE_RAZA, GET_TEMPERAMENT } from "../actions";

const initialState = {
    filtRazas: [],
    temperaments: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AXIOS_RAZAS:
            return {
                ...state,
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
            let names = [...state.filtRazas];

            let sortName = action.payload === ASCENDENTE ?
            names.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }) 
            : names.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                filtRazas: sortName
            }
        case ORD_PESO:
            let pesos = [...state.filtRazas];

            let sortPeso = action.payload === ASCENDENTE ?
            pesos.sort((a, b) => {
                let pesoA = parseInt(a.weight);
                let pesoB = parseInt(b.weight);
                if (pesoA > pesoB) {
                    return 1;
                }
                if (pesoA < pesoB) {
                    return -1;
                }
                return 0;
            }) 
            : pesos.sort((a, b) => {
                let pesoA = parseInt(a.weight);
                let pesoB = parseInt(b.weight);
                if (pesoA > pesoB) {
                    return -1;
                }
                if (pesoA < pesoB) {
                    return 1;
                }
                return 0;
            })

            return {
                ...state,
                filtRazas: sortPeso
            }

        case DETAIL_RAZA:
            return {
                ...state,
                filtRazas: action.payload
            }

        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }

        case CREATE_RAZA:
            return {
                ...state
            }
        default:
            return state
    }
}