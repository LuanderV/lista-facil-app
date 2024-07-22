import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { cadastrarUsuario, entrarGoogle } from '../firebase/auth'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import signUp from '../assets/img/Sign-up.gif'
import btngoogle from '../assets/img/logo_google.png'

function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  function cadastrar(data) {
    cadastrarUsuario(data.nome, data.email, data.senha)
      .then(() => {
        toast.success(`Bem-vindo(a), ${data.nome}`)
        navigate('/listaCompras')
      })
      .catch(error => {
        toast.error('Um erro aconteceu: ' + error.code)
      })
  }

  function handleEntrarGoogle() {
    entrarGoogle()
      .then(() => {
        toast.success('Bem-vindo(a)')
        navigate('/listaCompras')
      })
      .catch(error => {
        toast.error('Ocorreu um erro ao fazer login com o Google.')
        console.error('Erro ao fazer login com o Google:', error)
      })
  }

  return (
    <>
      <Menu corCadastro="navbar-cadastro" />
      <main className="d-flex align-items-center justify-content-evenly cadastro-main">
        <form
          className="form-section bg-white"
          onSubmit={handleSubmit(cadastrar)}
        >
          <h1 className="fw-bold">Cadastrar</h1>
          <hr />
          <div className="pb-2">
            <label htmlFor="nome" className=" fw-semibold">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="form-control login-form-inputs"
              placeholder="Seu nome e sobrenome"
              {...register('nome', { required: true, maxLength: 150 })}
            />
            {errors.nome && (
              <small className="invalid">O nome é inválido!</small>
            )}
          </div>
          <div className="pb-2">
            <label htmlFor="email" className=" fw-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Seu email"
              className="form-control login-form-inputs"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <small className="invalid">O email é inválido!</small>
            )}
          </div>
          <div className="pb-2">
            <label htmlFor="senha" className=" fw-semibold">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Sua senha"
              className="form-control login-form-inputs"
              {...register('senha', { required: true, minLength: 6 })}
            />
            {errors.senha && (
              <small className="invalid">A senha é inválida!</small>
            )}
          </div>
          <Button className="w-100 fw-bolder login-btn" type="submit">
            CADASTRAR
          </Button>
          <Button
            onClick={handleEntrarGoogle}
            className="mt-1 w-100 login-btn-google"
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
            <span className="login-span">Possui conta?</span>
            <Link to="/" className="nav-link fw-semibold login-texto">
              LOGIN
            </Link>
          </div>
        </form>
        <img
          src={signUp}
          alt="gif de uma ilustração fazendo cadastro no celular"
        />
      </main>
    </>
  )
}

export default Cadastro
