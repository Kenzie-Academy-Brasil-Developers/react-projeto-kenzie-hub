import "./style.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Techs from "../../components/techs";
import { useEffect, useState } from "react";
import axios from "axios";
import AddTech from "../../components/modal/addTech";
import DeleteTech from "../../components/modal/deleteTech";


function Home () {

    const history = useHistory()

    const [userTech, setUserTech] = useState([])
    const [modalAddTech, setModalAddTech] = useState(false)
    const [modalDeleteTech, setModalDeleteTech] = useState(false)
    const [idDeleteTech, setIdDeleteTech] = useState([])

    function updateTech () {
        axios.get(`https://kenziehub.herokuapp.com/users/${localStorage.id}`)
            .then((response) => setUserTech(response.data.techs))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        updateTech()
    },[])

    function logout () {
        localStorage.clear()
        history.push('/')
    }


return(
    <div className="page-home">
        <div className="header-home">
            <h1 className="logoName">Kenzie Hub</h1>
            <button onClick={() => logout()} className='btnLogout'>Sair</button>
        </div>
        <div className="nav-home">
            <h2 className="nav-home-user">Olá, {localStorage.name}</h2>
            <p className="nav-home-module">{localStorage.course_module}</p>
        </div>
        <div className="container-tech">
            <Techs
                userTech={userTech}
                setModalAddTech={setModalAddTech}
                setModalDeleteTech={setModalDeleteTech}
                setIdDeleteTech={setIdDeleteTech}/>
        </div>
        {modalAddTech === true && <AddTech setModalAddTech={setModalAddTech} updateTech={updateTech}/>}
        {modalDeleteTech === true && <DeleteTech setModalDeleteTech={setModalDeleteTech} idDeleteTech={idDeleteTech} updateTech={updateTech}/>}
    </div>
)
}

export default Home