import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getItem, updateItem } from '../firebase/lista'
import { UsuarioContext } from '../contexts/UsuarioContext'
import Menu from '../components/Menu'
import checklist from '../assets/img/Checklist.gif'

function EditarItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = useContext(UsuarioContext)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const [item, setItem] = useState(null)

  useEffect(() => {
    async function carregarDados() {
      if (usuario) {
        try {
          const dadosItem = await getItem(id)
          if (dadosItem && dadosItem.idUsuario === usuario.uid) {
            setItem(dadosItem)
            setValue('nome', dadosItem.nome)
            setValue('quantidade', dadosItem.quantidade)
            setValue('categoria', dadosItem.categoria)
            // setValue('data', dadosItem.data)
            setValue('descricao', dadosItem.descricao)
            setValue('concluido', dadosItem.concluido || false)
          } else {
            toast.error('Item não encontrado ou acesso não autorizado.')
            navigate('/listaCompras')
          }
        } catch (error) {
          toast.error('Erro ao carregar o item.')
          navigate('/listaCompras')
        }
      }
    }
    carregarDados()
  }, [id, usuario, navigate, setValue])

  async function salvarItem(data) {
    try {
      await updateItem(id, data)
      toast.success('Item atualizado com sucesso!')
      navigate('/listaCompras')
    } catch (error) {
      toast.error('Erro ao atualizar o item.')
    }
  }

  if (!usuario) {
    return <Navigate to="/login" />
  }

  if (!item) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Menu corAddLista="navbar-add-edit" />
      <main className="d-flex justify-content-evenly align-items-center addlista-main">
        <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
          <h1 className="fw-bold">Editar Item</h1>
          <hr />
          <div className="pb-2">
            <label htmlFor="nome" className=" fw-semibold">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="form-control login-form-inputs"
              placeholder="Nome do Item"
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
              className="form-select"
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
              {...register('data')}
            />
          </div> */}
          <div className="pb-2">
            <label htmlFor="descricao" className=" fw-semibold">
              Observação:
            </label>
            <textarea
              id="descricao"
              className="form-control addlista-textarea fs-6"
              placeholder="Escreva aqui"
              {...register('descricao')}
            />
          </div>
          <Button className="w-100 mt-2 addlista-btn" type="submit">
            Atualizar Item
          </Button>
        </form>
        <div>
          <img src={checklist} alt="imagem de uma lista" />
        </div>
      </main>
    </>
  )
}

export default EditarItem
