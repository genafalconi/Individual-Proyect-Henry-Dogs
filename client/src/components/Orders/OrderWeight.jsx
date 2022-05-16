import { useDispatch } from "react-redux";
import { ordPeso } from "../../store/actions";
import { ASCENDENTE, DESCENDENTE } from "../../Constants/order";

export default function OrderWeight({ setCurrPage, setOrder }) {

    let dispatch = useDispatch()
    function onChangePeso(event) {
        event.preventDefault();
        dispatch(ordPeso(event.target.value));
        setCurrPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    return <div>
        <label> Weight: </label>
        <select name="ordenes" onChange={onChangePeso}>
            <option>Select</option>
            <option value={ASCENDENTE}>Asc</option>
            <option value={DESCENDENTE}>Desc</option>
        </select>
    </div>
}