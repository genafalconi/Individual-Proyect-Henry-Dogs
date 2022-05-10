import axios from 'axios';
import img from '../../dog.png';
import styles from './BotonHome.module.css';
import { Link } from 'react-router-dom';

export default function BotonHome(){
    function ppalRoute()  {
        const iniciateTemp = () => axios.get('/temperament')
        iniciateTemp()
        
    }
    return <div className={styles.container}>
        <h1>WELCOME TO MY PI</h1>
        <img className={styles.img} src={img} alt="dogHome" />
        <Link to='/dogs'><button className={styles.button} onClick={ppalRoute}>Acceder</button></Link>
    </div>
}

