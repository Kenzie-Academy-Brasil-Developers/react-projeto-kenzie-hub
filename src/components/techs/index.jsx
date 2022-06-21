import ContainerCards from "./containerCards"
import HeaderTechs from "./headerTechs"


function Techs ({userTech, setModalAddTech, setModalDeleteTech, setIdDeleteTech}) {


    return (
        <>
            <HeaderTechs setModalAddTech={setModalAddTech}/>
            <ContainerCards userTech={userTech} setModalDeleteTech={setModalDeleteTech} setIdDeleteTech={setIdDeleteTech}/>
        </>
    )
}

export default Techs