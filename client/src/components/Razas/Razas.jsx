import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosRazas } from "../../store/actions";
import Raza from '../Raza/Raza';

export default function Razas() {
    let razas = useSelector((state) => state.filtRazas)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(axiosRazas())
    }, [])

    return <div>
        {razas.map(razas => {
            return <Raza key={razas.id} name={razas.name} img={razas.img} weight={razas.weight} temperament={razas.temperament} />
        })}
    </div>
}