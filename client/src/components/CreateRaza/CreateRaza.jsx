import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRaza, getTemperaments } from "../../store/actions";
import ValidatorCreation from "./ValidatorCreation";
import styles from './CreateRaza.module.css';

export default function CreateRaza() {

    let dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        img: '',
        lifeSpan: '',
        temperament: []
    })

    const [error, setError] = useState('');

    function handleChange(event) {
        setInput((prevState) => {
            const newState = {
                ...prevState,
                [event.target.name]: event.target.value
            };
            setError(ValidatorCreation(newState))

            return newState;
        })
    }

    function handleSelect(event) {
        if(input.temperament.indexOf(event.target.value) === -1){
            setInput({
                ...input,
                temperament: [...input.temperament, event.target.value]
            })
        }
    }

    function onClickDel(event) {
        input.temperament.filter(elem => elem !== event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (input.name.length === 0) {
            setError(1)
            alert('Error: Enter the data')
        } else if (Object.keys(error).length === 0) {
            dispatch(createRaza(input));
            alert('Breed created');
        } else {
            alert('Error: Correct your inputs')
        }
        setInput({
            name: '',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            img: '',
            lifeSpan: '',
            temperament: []
        })
    }

    useEffect(() => { // fill the state when the component is mount
        dispatch(getTemperaments())
        // eslint-disable-next-line
    }, [])

    return <div className={styles.maxDiv}>
        <div className={styles.containerCreate}>
            <h1 className={styles.textCreate}>CREATE YOUR BREED</h1>
            <img className={styles.imageCreate} src="https://www.hogarmania.com/archivos/201912/razas-perro-848x477x80xX.jpg" alt="fondoCreate" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <br />
            <div>
                <label>Name: </label>
                <input type="text" placeholder='Breed name' className={error?.name} onChange={(e) => handleChange(e)} value={input.name} name='name' />
                <span>{error.name || ''}</span>
            </div>
            <br />
            <div>
                <label>Height - </label>
                <label>Min: </label>
                <input type="text" placeholder='Min height' className={error?.height_min} onChange={(e) => handleChange(e)} value={input.height_min} name='height_min' />
                <span>{error.height_min || ''}</span>
                <label> Max: </label>
                <input type="text" placeholder='Max height' className={error?.height_max} onChange={(e) => handleChange(e)} value={input.height_max} name='height_max' />
                <span>{error.height_max || ''}</span>
            </div>
            <br />
            <div>
                <label>Weight - </label>
                <label>Min: </label>
                <input type="text" placeholder='Min weight' className={error?.weight_min} onChange={(e) => handleChange(e)} value={input.weight_min} name='weight_min' />
                <span>{error.weight_min || ''}</span>
                <label> Max: </label>
                <input type="text" placeholder='Max weight' className={error?.weight_max} onChange={(e) => handleChange(e)} value={input.weight_max} name='weight_max' />
                <span>{error.weight_max || ''}</span>
            </div>
            <br />
            <div>
                <label>Image: </label>
                <input type="text" placeholder='Breed image' className={error?.img && 'danger'} onChange={(e) => handleChange(e)} value={input.img} name='img' />
            </div>
            <br />
            <div>
                <label>Life Span: </label>
                <input type="text" placeholder='Breed life span' className={error?.lifeSpan && 'danger'} onChange={(e) => handleChange(e)} value={input.lifeSpan} name='lifeSpan' />
                <span>{error.lifeSpan || ''}</span>
            </div>
            <br />
            <div className={styles.tempList}>
                <div>
                    <label>Temperaments: </label>
                    <select onChange={(event) => handleSelect(event)}>
                        {temperaments.map((temp) => (
                            <option key={temp.id} value={temp}>{temp}</option>
                        ))}
                    </select>
                </div>
                
                <ul className={styles.temperaments} key={'ul'}><li key={(e) => e++}>{input.temperament.map(el => <li onClick={(e) => onClickDel(e)}>{el}</li>)}</li></ul>
            </div>
            <br />
            <div className={styles.buttonsFinal}>
                <button className={styles.createButt} type='submit'>Create Breed</button>
                <br />
                <Link to='/dogs'><button className={styles.backButt}>Back</button></Link>
            </div>
            
        </form>
    </div>
}