import { useState } from 'react';
import { searchRazas } from '../../store/actions';
import { useDispatch } from 'react-redux';

export default function Busqueda() {
    const [search, setSearch] = useState('');
    
    const onChange = (event) => {
        setSearch(event.target.value)
    }
    
    let dispatch = useDispatch()
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(searchRazas(search))
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder='Breed...' onChange={onChange} value={search} />
            <button type='submit'>Search</button>
        </form>
    </div>
}