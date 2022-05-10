import styles from './BotonCrear.module.css';

export default function BotonCrear(){

    function handleClick(event){
        event.preventDefault();
        window.location = 'http://localhost:3000/dogs/dog'
        return window.location;
    }

    return <div>
        <button className={styles.butt} onClick={handleClick}>Create Breed</button>
    </div>
}