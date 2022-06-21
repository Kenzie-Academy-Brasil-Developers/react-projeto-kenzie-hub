import "./style.css"
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";


function AddTech ({setModalAddTech, updateTech}) {

    const formSchema = yup.object().shape({
        title: yup
            .string()
            .required('Campo obrigatório')
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data) => {
        axios.post('https://kenziehub.herokuapp.com/users/techs', data, {
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            },
          })
          .then((response) => successPost())
          .catch((err) => toast.error('Não foi possível cadastrar'))
    }

    const successPost = () => {
        toast.success('Tecnologia cadastrada!')
        updateTech()
        setTimeout(function(){
            setModalAddTech(false)
        },1500)
    }
    


    return (
            <div className="modalAddTech">
                <div className="modalAddTechHeader">
                    <h3 className="titleModal">Cadastrar tecnologia</h3>
                    <p onClick={() => setModalAddTech(false)} className="closeModal">X</p>
                </div>
                <form className="formNewTech" onSubmit={handleSubmit(onSubmit)}>
                    <label>Nome</label>
                    <input className="inputModal" placeholder="Ex: React.js" {...register('title')}/>
                    <span className='errorSpan'>{errors.title?.message}</span>
                    <label>Selecionar status</label>
                    <select className="selectModal" {...register('status')}>
                        <option>Iniciante</option>
                        <option>Intermediário</option>
                        <option>Avançado</option>
                    </select>
                    <button type="submit" className="btnModal">Cadastrar Tecnologia</button>
                </form>
                
            </div>
    )
}

export default AddTech