import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { searchTemperamentos } from "../../store/actions";
import Raza from "../Raza/Raza";

export default function TemperamentRaza() {
    let tempRaza = useSelector((state) => state.filtRazas);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchTemperamentos())
    }, [])
    return <div>
        {tempRaza.map(razas => {
            return <Raza key={razas.id} name={razas.name} img={razas.img} weight={razas.weight} temperament={razas.temperament} />
        })}
    </div>
}