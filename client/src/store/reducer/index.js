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
            let nanArr = []
            let ordPeso = []

            pesos.forEach(elem => {
                if(elem.weight ? elem.weight !== 'NaN' : elem.weight_min !== 'NaN') ordPeso.push(elem)
                else nanArr.push(elem)
            })
            
            let sortPeso = action.payload === ASCENDENTE ?
            ordPeso.sort((a, b) => {
                let pesoA = parseInt(a.weight ? a.weight : a.weight_min);
                let pesoB = parseInt(b.weight ? b.weight : b.weight_min);
                if (pesoA > pesoB) {
                    return 1;
                }
                if (pesoA < pesoB) {
                    return -1;
                }
                return 0;
            }) 
            : ordPeso.sort((a, b) => {
                let pesoA = parseInt(a.weight ? a.weight : a.weight_min);
                let pesoB = parseInt(b.weight ? b.weight : b.weight_min);
                if (pesoA > pesoB) {
                    return -1;
                }
                if (pesoA < pesoB) {
                    return 1;
                }
                return 0;
            })

            nanArr.forEach(elem => {
                sortPeso.push(elem)
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