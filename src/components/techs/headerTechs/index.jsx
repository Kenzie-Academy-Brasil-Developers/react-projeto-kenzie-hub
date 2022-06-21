

function HeaderTechs ({setModalAddTech}) {

return (
    <div className="container-tech-header">
        <h3 className="container-tech-tittle">Tecnologias</h3>
        <button className="container-tech-btn" onClick={() => setModalAddTech(true)}>+</button>
    </div>
)
}

export default HeaderTechs