import { useState } from "react";
import { useSelector } from "react-redux";
import BotonCrear from "../BotonCrear/BotonCrear";
import BusquedaRaza from "../BusquedaRaza/BusquedaRaza";
import BusquedaTemp from "../BusquedaTemp/BusquedaTemp";
import OrderAlfa from "../Orders/OrderAfla";
import OrderWeight from "../Orders/OrderWeight";
import Pagination from "../Paginate/Pagination";
import Razas from "../Razas/Razas";
import styles from './PagRazas.module.css';

export default function PagRazas() {

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

    return <div className={styles.pagRaza}>
        <div>
            <a href='/' className={styles.messWelcome}>
                <h1>WELCOME TO MY DOGS PI</h1>
            </a>
        </div>
        <div className={styles.search}>
            <BusquedaRaza key={'busqRaza'} setCurrPage={setCurrPage} />
            <BusquedaTemp key={'busqTemp'} setCurrPage={setCurrPage} />
            <span className={styles.create}>
                <BotonCrear key={'botCrear'} />
            </span>
        </div>
        <br />
        <div className={styles.order}>
            <OrderAlfa setCurrPage={setCurrPage} setOrder={setOrder} />
            <div> / </div>
            <OrderWeight setCurrPage={setCurrPage} setOrder={setOrder} />
        </div>
        <br />
        <div className={styles.razas}>
            <Razas key={'razas'} currRazas={currRazas} />
        </div>
        <div>
            <Pagination key={currPage} razPerPage={razPerPage} razas={lenghtRazas} paginado={paginado} />
        </div>
    </div>
} 