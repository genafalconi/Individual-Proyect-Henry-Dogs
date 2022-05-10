import axios from 'axios';
import img from '../../dog.png';
import styles from './BotonHome.module.css'

export default function BotonHome(){
    function ppalRoute()  {
        const iniciateTemp = () => axios.get('http://localhost:3001/temperament')
        iniciateTemp()
        return window.location = 'http://localhost:3000/dogs'
    }
    return <div className={styles.container}>
        <h1>Bienvenidos a mi PI</h1>
        <img className={styles.img} src={img} alt="dogHome" />
        <button className={styles.button} onClick={ppalRoute}>Acceder</button>
    </div>
}

