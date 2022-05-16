import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosRazas } from "../../store/actions";
import Raza from '../Raza/Raza';
import styles from './Razas.module.css';
import BotonReloadRaza from "../BotonReloadRaza/BotonReloadRaza";


export default function Razas({ currRazas }) {

    let dispatch = useDispatch();

    useEffect(() => { // fill the state when the component is mount
        dispatch(axiosRazas());
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <br />
            <div className={styles.grid}>
                {currRazas.map((r) => {
                    return <Raza key={r.idRaza} idRaza={r.id} name={r.name} weight={r.weight ? r.weight : r.weight = r.weight_min + ' - ' + r.weight_max} img={r.img} temperament={r.temperament ? r.temperament : r.temperamentos?.map(e => e.nameTemp + ', ')} />
                })}
            </div>
            <div>
                {currRazas.length === 0 && <div>
                    <h2>There is not a breed compatible with that search</h2>
                    <BotonReloadRaza />
                </div>}
            </div>
            {/* <div>
                <Pagination key={currPage} razPerPage={razPerPage} razas={lenghtRazas} paginado={paginado} />
            </div> */}
        </div>
    )
}