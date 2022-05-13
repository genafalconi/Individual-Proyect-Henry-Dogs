import { useDispatch } from "react-redux";
import { axiosRazas } from "../../store/actions";

export default function BotonReloadRaza() {

    let dispatch = useDispatch()

    function handleClick(event){
        event.preventDefault();
        dispatch(axiosRazas())
    }

    return <div>
        <button onClick={handleClick}>Reload breeds</button>
    </div>
}