import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { entrarGoogle, loginUsuario } from '../firebase/auth'
import toast from 'react-hot-toast'
import btngoogle from '../assets/img/logo_google.png'

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  function entrar(data) {
    loginUsuario(data.email, data.senha)
      .then(() => {
        toast.success('Bem-vindo(a)!')
        navigate('/listaCompras')
      })
      .catch(() => {
        toast.error('Email ou Senha incorretos!')
      })
  }

  function handleEntrarGoogle() {
    entrarGoogle()
      .then(() => {
        toast.success('Bem vindo(a)!')
        navigate('/listaCompras')
      })
      .catch(error => {
        toast.error('Ocorreu um erro ao fazer login com o Google.')
        console.error('Erro ao fazer login com o Google:', error)
      })
  }

  return (
    <>
      <main>
        <form className="form-section" onSubmit={handleSubmit(entrar)}>
          <h1 className="fw-bold">Login</h1>
          <hr />
          <div className=" pb-2">
            <label htmlFor="email" className=" fw-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Seu email"
              className="form-control login-form-inputs "
              {...register('email', { required: 'O email é obrigatório' })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <div className=" pb-2">
            <label htmlFor="senha" className=" fw-semibold">
              Senha:
            </label>
            <input
              type="password"
              placeholder="Sua senha"
              id="senha"
              className="form-control login-form-inputs"
              {...register('senha', {
                required: 'A senha é obrigatória',
                minLength: { value: 6, message: 'Mínimo de 6 caracteres.' }
              })}
            />
            {errors.senha && (
              <small className="text-danger">{errors.senha.message}</small>
            )}
          </div>
          <Button className="w-100 fw-bolder login-btn" type="submit">
            ENTRAR
          </Button>
          <Button
            onClick={handleEntrarGoogle}
            className=" w-100 login-btn-google"
            type="button"
          >
            <img
              src={btngoogle}
              className="login-btn-img"
              alt="logo do google"
            />
            Entrar com o Google
          </Button>
          <div className="d-flex flex-column text-center login-div">
            <span className="login-span">ou</span>
            <Link to="/cadastro" className="nav-link fw-semibold">
              CADASTRE-SE
            </Link>
            <p></p>
          </div>
        </form>
      </main>
    </>
  )
}

export default Login
