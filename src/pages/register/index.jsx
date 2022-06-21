import "./style.css"
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";


function Register () {

  const history = useHistory()

  const formSchema = yup.object().shape({
      name: yup
          .string()
          .required('Nome obrigatório'),
      email: yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      password: yup
          .string()
          .required('Senha obrigatória')
          .min(6, 'Senha no mínimo 6 digitos'),
      passwordConfirmation: yup
          .string()
          .required('Confirmação de senha obrigatória')
          .oneOf([yup.ref('password'), null], 'A senha deve ser igual'),
      bio: yup
          .string()
          .required('Bio obrigatório')
          .min(10, 'Escreva no mínimo 10 letras'),
      contact: yup
          .string()
          .required('Contato obrigatório')
          .min(3, 'Rede Social, Telefone ou E-mail'),
      course_module: yup
          .string()
          .required('Módulo obrigatório'),
        
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors }
      } = useForm({
          resolver: yupResolver(formSchema)
      })



    const onSubmit = (data) => {
      const {name, email, password, bio, contact, course_module} = data
      const user = {name, email, password, bio, contact, course_module}
      newUserApi(user)
      }
      
    const newUserApi = (user) => {
      axios.post('https://kenziehub.herokuapp.com/users', user)
        .then((response) => response.status === 201 && successRegister())
        .catch((err) => err.response.status !== 201 && errorRegister())
    }

    function successRegister () {
      toast.success('Usuário criado com sucesso!')
      setTimeout(history.push('/'),1500)
    }

    function errorRegister(){
      toast.error('Verifique os dados cadastrados')
    }

    return (
        <div className="pageRegister">
            <div className="headerRegister">
              <h1 className="logoName">Kenzie Hub</h1>
              <button className="btnBack" onClick={() => history.goBack()}>Voltar</button>
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
            <div className="containerLogin">
              <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <label>Nome *</label>
                <input {...register('name')} placeholder='Nome'/>
                <span className='errorSpan'>{errors.name?.message}</span>
                <label>E-mail *</label>
                <input {...register('email')} placeholder='E-mail'/>
                <span className='errorSpan'>{errors.email?.message}</span>
                <label>Senha *</label>
                <input type="password" {...register('password')} placeholder='Senha'/>
                <span className='errorSpan'>{errors.password?.message}</span>
                <label>Confirmar senha *</label>
                <input type="password" {...register('passwordConfirmation')} placeholder='Confirmar senha'/>
                <span className='errorSpan'>{errors.passwordConfirmation?.message}</span>
                <label>Bio *</label>
                <input {...register('bio')} placeholder='Conta sobre você'/>
                <span className='errorSpan'>{errors.bio?.message}</span>
                <label>Contato *</label>
                <input {...register('contact')} placeholder='ex.: @fulano'/>
                <span className='errorSpan'>{errors.contact?.message}</span>
                <label>Selecionar módulo *</label>
                <select {...register('course_module')}>
                  <option>Primeiro módulo (Introdução ao Frontend)</option>
                  <option>Segundo módulo (Frontend Avançado)</option>
                  <option>Terceiro módulo (Introdução ao Backend)</option>
                  <option>Quarto módulo (Backend Avançado)</option>
                </select>
                <button className="btnLogin">Cadastrar</button>
              </form>
            </div>
        </div>
    )
}

export default Register