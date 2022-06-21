import "./style.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function DeleteTech({setModalDeleteTech, idDeleteTech, updateTech}) {


    const handleDelete = () =>{
        console.log('pegou')

        axios.delete(`https://kenziehub.herokuapp.com/users/techs/${idDeleteTech.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            },
          })
          .then((response) => successDelete())
          .catch((err) => console.log(err))
    }

    const successDelete = () => {
        toast.success('Deletado com sucesso!')
        updateTech()
        setTimeout(function(){
            setModalDeleteTech(false)
        },1500)
    }




  return (
    <div className="modalDeleteTech">
      <div className="modalDeleteTechHeader">
        <h3 className="titleModal">Excluir Tecnologia</h3>
        <p className="closeModal" onClick={() => setModalDeleteTech(false)}>
          X
        </p>
      </div>
      <div className="containerDeleteTech">
        <h2>Deseja remover {idDeleteTech.title}?</h2>
        <div className="containerBtnDeleteTech">
          <button className="btnDeleteTech" onClick={() => handleDelete()}>Sim</button>
          <button className="btnDeleteTech" onClick={() => setModalDeleteTech(false)}>Não</button>
        </div>
      </div>
      <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{
                success: {
                style: {
                    background: '#343B41',
                    color: '#F8F9FA'
                },
                },
                error: {
                style: {
                    background: '#343B41',
                    color: '#F8F9FA',
                },
                },
            }}
        />
    </div>
  );
}

export default DeleteTech;
