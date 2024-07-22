import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { addItem } from '../firebase/lista'
import Menu from '../components/Menu'
import imagemAddLista from '../assets/img/add.gif'

function AdicionarLista() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const usuario = useContext(UsuarioContext)
  const navigate = useNavigate()

  function salvarItem(data) {
    data.idUsuario = usuario.uid
    addItem(data)
      .then(() => {
        toast.success('Item adicionado com sucesso')
        navigate('/listaCompras')
      })
      .catch(() => {
        toast.error('Ocorreu um erro ao adicionar o item!')
      })
  }

  if (usuario === null) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Menu corAddLista="navbar-add-edit" />
      <main className="d-flex justify-content-evenly align-items-center addlista-main">
        <div>
          <img src={imagemAddLista} alt="" />
        </div>
        <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
          <h1 className="fw-bold">Adicionar Item</h1>
          <hr />
          <div className="pb-2">
            <label htmlFor="nome" className=" fw-semibold">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="form-control login-form-inputs"
              placeholder="Nome do item"
              {...register('nome', { required: true })}
            />
            {errors.nome && (
              <small className="invalid">O nome é inválido!</small>
            )}
          </div>
          <div className="pb-2">
            <label htmlFor="quantidade" className=" fw-semibold">
              Quantidade:
            </label>
            <input
              type="number"
              id="quantidade"
              className="form-control login-form-inputs"
              placeholder="Quantidade de item"
              {...register('quantidade', { required: true })}
            />
            {errors.quantidade && (
              <small className="invalid">A quantidade é inválida!</small>
            )}
          </div>
          <div className="pb-2">
            <label htmlFor="categoria" className=" fw-semibold">
              Categoria:
            </label>
            <select
              id="categoria"
              className="form-select fs-6"
              {...register('categoria')}
            >
              <option value="Alimentos">Alimentos</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Higiene">Higiene</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          {/* <div>
          <label htmlFor="data">Data</label>
          <input 
            type="date" 
            id="data" 
            className="form-control" 
            {...register("data")}
          />
        </div> */}
          <div className="pb-2">
            <label htmlFor="descricao" className=" fw-semibold">
              Observação:
            </label>
            <textarea
              id="descricao"
              className="form-control fs-6 addlista-textarea"
              placeholder="Escreva aqui"
              {...register('descricao')}
            />
          </div>
          <Button className="w-100 mt-2 addlista-btn" type="submit">
            Salvar Item
          </Button>
        </form>
      </main>
    </>
  )
}

export default AdicionarLista
