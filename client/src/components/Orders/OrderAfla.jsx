import { useDispatch } from "react-redux";
import { ordAlfabetic } from "../../store/actions";
import { ASCENDENTE, DESCENDENTE } from "../../Constants/order";

export default function OrderAlfa({ setCurrPage, setOrder }) {

    let dispatch = useDispatch()
    function onChangeAlf(event) {
        event.preventDefault();
        dispatch(ordAlfabetic(event.target.value));
        setCurrPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    return <div>
        <label>Alfabetic: </label>
        <select name="ordenes" onChange={onChangeAlf}>
            <option>Select</option>
            <option value={ASCENDENTE}>Asc</option>
            <option value={DESCENDENTE}>Desc</option>
        </select>
    </div>
}