import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../Constants/order";
import { axiosRazas, ordAlfabetic, ordPeso } from "../../store/actions";
import Pagination from "../Paginate/Pagination";
import Raza from '../Raza/Raza';
import styles from './Razas.module.css';
import BotonReloadRaza from "../BotonReloadRaza/BotonReloadRaza";

export default function Razas() {

    let dispatch = useDispatch();
    let razas = useSelector((state) => state.filtRazas);
    let lenghtRazas = Object.keys(razas).length

    const [currPage, setCurrPage] = useState(1);
    const [razPerPage] = useState(8);
    // eslint-disable-next-line
    const [order, setOrder] = useState('');
    const indexLastRaza = currPage * razPerPage;
    const indexFirstRaza = indexLastRaza - razPerPage;

    const currRazas = razas.slice(indexFirstRaza, indexLastRaza);

    const paginado = (pageNum) => {
        setCurrPage(pageNum);
    }

    useEffect(() => { // fill the state when the component is mount
        dispatch(axiosRazas());
        // eslint-disable-next-line
    }, [])

    function onChangeAlf(event) {
        event.preventDefault();
        dispatch(ordAlfabetic(event.target.value));
        setCurrPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    function onChangePeso(event) {
        event.preventDefault();
        dispatch(ordPeso(event.target.value));
        setCurrPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    return (
        <div>
            <div>
                <label>Alfabetic: </label>
                <select name="ordenes" onChange={onChangeAlf}>
                    <option>Select</option>
                    <option value={ASCENDENTE}>Ascendente</option>
                    <option value={DESCENDENTE}>Descendente</option>
                </select>
                <label> Weight: </label>
                <select name="ordenes" onChange={onChangePeso}>
                    <option>Select</option>
                    <option value={ASCENDENTE}>Ascendente</option>
                    <option value={DESCENDENTE}>Descendente</option>
                </select>
            </div>
            <br />
            <div className={styles.grid}>
                {currRazas ? currRazas.map((r) => {
                    return <Raza key={r.idRaza} idRaza={r.id} name={r.name} weight={r.weight ? r.weight : r.weight = r.weight_min + ' - ' + r.weight_max} img={r.img} temperament={r.temperament ? r.temperament : r.temperamentos?.map(e => e.nameTemp + ', ')} />
                }) : <h2>Loading...</h2>}
            </div>
            <div>
                {currRazas.length === 0 && <div>
                    <h2>There is not a breed compatible with that search</h2>
                    <BotonReloadRaza/>
                </div>
                }
            </div>
            <div>
                <Pagination key={currPage} razPerPage={razPerPage} razas={lenghtRazas} paginado={paginado} />
            </div>
        </div>
    )
}