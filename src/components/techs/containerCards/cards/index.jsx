import "./style.css";
import DeleteIcon from '@mui/icons-material/Delete';

function Card({ title, status, setModalDeleteTech, idTech, setIdDeleteTech }) {
  const handleDelete = () => {
    setModalDeleteTech(true);
    setIdDeleteTech({
      id: idTech,
      title: title,
    });
  };

  return (
    <div className="card">
      <h3 className="cardName">{title}</h3>
      <div className="cardCard">
        <p className="cardNivel">{status}</p>
        <DeleteIcon className="trashBtn" onClick={() => handleDelete()}/>
      </div>
    </div>
  );
}

export default Card;
