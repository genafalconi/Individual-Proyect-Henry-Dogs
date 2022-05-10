import BotonCrear from "../BotonCrear/BotonCrear";
import BusquedaRaza from "../BusquedaRaza/BusquedaRaza";
import BusquedaTemp from "../BusquedaTemp/BusquedaTemp";
import Razas from "../Razas/Razas";
import styles from './PagRazas.module.css';

export default function PagRazas() {

    return <div className={styles.pagRaza}>
        <div className={styles.search}>
            <BusquedaRaza key={'busqRaza'} />
            <BusquedaTemp key={'busqTemp'} />
            <span className={styles.create}>
                <BotonCrear key={'botCrear'} />
            </span>
        </div>
        <br />
        <div className={styles.razas}>
            <Razas key={'razas'} />
        </div>
    </div>
} 