import img from '../../dog.png';

export default function BotonHome(){
    function ppalRoute()  {
        return window.location = 'http://localhost:3000/dogs'
    }
    return <div>
        <img src={img} alt="dogHome" />
        <br />
        <button className="homeButton" onClick={ppalRoute}>Acceder</button>
    </div>
}

