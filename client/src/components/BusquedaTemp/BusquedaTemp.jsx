import { useState } from 'react';
import { searchTemperamentos } from '../../store/actions';
import { useDispatch } from 'react-redux';

export default function Busqueda() {
    const [search, setSearch] = useState('');
    
    const onChange = (event) => {
        setSearch(event.target.value)
    }
    
    let dispatch = useDispatch()
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(searchTemperamentos(search))
    }
    
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder='Temperament...' onChange={onChange} value={search} />
            <button type='submit'>Search</button>
        </form>
    </div>
}