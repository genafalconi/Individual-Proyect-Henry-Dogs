import styles from './Raza.module.css';

export default function Raza({ idRaza, name, weight, img, temperament }) {

    function handleClick(event) {
        event.preventDefault();
        const id = event.target.value;
        window.location = '/dogs/' + id
        return id && window.location;
    }

    return <div className={styles.content}>
        <div className={styles.img}>
            <img className={styles.imgRaza} src={img} alt={name} />
        </div>
        <div className={styles.info}>
            <h2>{name}</h2>
            <h4>Temperaments: {temperament}</h4>
            <h4>Weight: ({weight})kg</h4>
        </div>
        <div>
            <button className={styles.butt} onClick={handleClick} value={idRaza}>Details</button>
        </div>
    </div>
}