import { useState } from 'react';
import { searchRazas } from '../../store/actions';
import { useDispatch } from 'react-redux';
import styles from './BusquedaRaza.module.css';

export default function Busqueda() {
    const [search, setSearch] = useState('');
    
    const onChange = (event) => {
        setSearch(event.target.value)
    }
    
    let dispatch = useDispatch()
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(searchRazas(search))
        setSearch('')
    }
    return <div className={styles.navSearch}>
        <form onSubmit={onSubmit}>
            <label>Search breed </label>
            <input className={styles.fieldText} type="text" placeholder='Breed...' onChange={onChange} value={search} />
            <label> - </label>
            <button className={styles.butt} type='submit'>Search</button>
        </form>
    </div>
}