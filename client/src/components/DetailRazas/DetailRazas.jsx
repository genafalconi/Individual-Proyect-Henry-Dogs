import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './DetailRazas.module.css';

export default function DetailRazas() {
    const { id } = useParams();
    const [razaId, setRazaId] = useState(null)

    useEffect(() => { // fill the state when the component is mount
        axios.get('/dogs/' + id)
            .then((res) => {
                setRazaId(res.data)
            })
        // eslint-disable-next-line
    }, [])

    return <div>
        {razaId ?
            <div>
                {!razaId[0].temperament && !razaId[0].temperamentos ? razaId[0].temperament = 'This breed do not have temperaments' : ''}
                <img className={styles.imgRaza} src={razaId[0].img} alt={razaId[0].name} />
                <h2>{razaId[0].name}</h2>
                <h4>Temperaments: {razaId[0].temperament ? razaId[0].temperament : razaId[0].temperamentos.map(elem => elem.nameTemp + ', ')}</h4>
                <h4>Height: ({razaId[0].height ? razaId[0].height : razaId[0].height = razaId[0].height_min + ' - ' + razaId[0].height_max})cm</h4>
                <h4>Weight: ({razaId[0].weight ? razaId[0].weight : razaId[0].weight = razaId[0].weight_min + ' - ' + razaId[0].weight_max})kg</h4>
                <h4>Life span: {typeof razaId[0].lifeSpan !== 'number' ? razaId[0].lifeSpan : razaId[0].lifeSpan + ' years'}</h4>
                <Link to={'/dogs'}><button>Back</button></Link>
            </div>
            : <h2>Loading...</h2>
        }
    </div>
}