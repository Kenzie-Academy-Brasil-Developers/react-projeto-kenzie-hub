
function Card ({title, status, setModalDeleteTech, idTech, setIdDeleteTech}) {

const handleDelete = () => {
    setModalDeleteTech(true)
    setIdDeleteTech({
        id: idTech,
        title: title
    })
}

return (
    <div className="card">
        <h3 className="cardName">{title}</h3>
        <div className="cardCard">
            <p className="cardNivel">{status}</p>
            <button onClick={() => handleDelete()}>🗑️</button>
        </div>
    </div>
)
}

export default Card