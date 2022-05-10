import styles from './RazaId.module.css';

export default function Raza({img, name, temperament, height, weight, lifeSpan}){
    return <div className={styles.razasUn}>
        <img className={styles.imgRaza} src={img} alt={name} />
        <h3>{name}</h3>
        <h4>Temperamentos: {temperament}</h4>
        <h4>Altura: ({height})m</h4>
        <h4>Peso: ({weight})kg</h4>
        <h4>Años de vida: ({lifeSpan})</h4>
    </div>
}