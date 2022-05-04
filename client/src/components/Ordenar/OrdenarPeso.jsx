import { useDispatch } from "react-redux"
import { ASCENDENTE, DESCENDENTE } from "../../Constants/order";
import { ordPeso } from "../../store/actions";

export default function OrdenarPeso() {
    const dispatch = useDispatch();
    function onChange(event) {
        dispatch(ordPeso(event.target.value))
    }
    return <div>
        <p>Peso</p>
        <select name="ordenes" onChange={onChange}>
            <option>Select</option>
            <option value={ASCENDENTE}>Ascendente</option>
            <option value={DESCENDENTE}>Descendente</option>
        </select>
    </div>
}