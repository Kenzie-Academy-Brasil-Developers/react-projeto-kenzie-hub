import "./index.css";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';



function Login () {

    const history = useHistory()

    const formSchema = yup.object().shape({
        email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        password: yup
            .string()
            .required('Senha obrigatória')
            .min(6, 'Senha no mínimo 6 digitos')
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors },
      } = useForm({
          resolver: yupResolver(formSchema)
      })

    const onSubmit = (data) => {
        axios.post('https://kenziehub.herokuapp.com/sessions', data)
            .then((response) => response.status === 200 && loginSuccess(response))
            .catch((err) => err.response.status !== 200 && errorLogin(err))
    }

    const loginSuccess = (response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        toast.success('Logado com sucesso');
    }

    const errorLogin = (err) => {
        console.log('PEGOU: ' + err)
        toast.error('Verifique e-mail e senha')
    }


    return (
        <div className="pageLogin">
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
                <h3>Login</h3>
                <label>E-mail</label>
                <input type="text" {...register('email')}/>
                <span className='errorSpan'>{errors.email?.message}</span>
                <label>Senha</label>
                <input type="password" {...register('password')}/>
                <span className='errorSpan'>{errors.password?.message}</span>
                <button className="btnLogin" type="submit">Entrar</button>
            </form>
            <p className="register-p">Ainda não possui uma conta?</p>
            <button className="btnRegister" onClick={() => history.push(`/register`)}>Cadastre-se</button>
        </div>
        </div>
    )

}

export default Login