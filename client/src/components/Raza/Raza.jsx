import styles from './Raza.module.css';

export default function Raza({name, weight, img, temperament}){
    return <div className={styles.razasUn}>
        <img className={styles.imgRaza} src={img} alt={name} />
        <h3>{name}</h3>
        <h4>Temperamentos: {temperament}</h4>
        <h4>Peso: ({weight})kg</h4>
    </div>
}