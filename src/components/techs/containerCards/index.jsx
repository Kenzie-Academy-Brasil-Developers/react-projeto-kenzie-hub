import Card from "./cards"


function ContainerCards ({userTech, setModalDeleteTech, setIdDeleteTech}) {


    return (
        <div className="container-cards">
            {userTech.map((elem, index) => 
                <Card
                    key={index}
                    title={elem.title}
                    status={elem.status}
                    setModalDeleteTech={setModalDeleteTech}
                    idTech={elem.id}
                    setIdDeleteTech={setIdDeleteTech}
                />
            )}
        </div>
    )
}

export default ContainerCards