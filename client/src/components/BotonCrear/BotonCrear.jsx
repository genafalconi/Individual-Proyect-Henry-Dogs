import styles from './BotonCrear.module.css';
import { Link } from 'react-router-dom';

export default function BotonCrear(){

    return <div>
        <Link to='/dogs/dog'><button className={styles.butt}>Create Breed</button></Link>
    </div>
}