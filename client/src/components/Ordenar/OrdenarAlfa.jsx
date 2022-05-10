import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../Constants/order";
import { ordAlfabetic } from "../../store/actions";

export default function OrdenarAlfa() {
    const dispatch = useDispatch();
    
    function onChange(event) {
        event.preventDefault();
        dispatch(ordAlfabetic(event.target.value));
    }

    return <div>
        <select name="ordenes" onChange={onChange}>
            <option>Select</option>
            <option value={ASCENDENTE}>Ascendente</option>
            <option value={DESCENDENTE}>Descendente</option>
        </select>
    </div>
}