import { useState } from 'react';
import { searchTemperamentos } from '../../store/actions';
import { useDispatch } from 'react-redux';
import styles from './BusquedaTemp.module.css';

export default function Busqueda() {
    const [search, setSearch] = useState('');

    const onChange = (event) => {
        setSearch(event.target.value)
    }

    let dispatch = useDispatch()
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(searchTemperamentos(search))
        setSearch('')
    }

    const error = (event) => {
        return <div>
            No pasaste parametro
        </div>
    };

    return <div>
        <form onSubmit={!search ? error : onSubmit}>
            <label>Search temperament </label>
            <input className={styles.fieldText} type="text" placeholder='Temperament...' onChange={onChange} value={search} />
            <label> - </label>
            <button className={styles.butt} type='submit'>Search</button>
        </form>
    </div>
}