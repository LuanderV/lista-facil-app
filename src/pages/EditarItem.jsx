import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getItem, updateItem } from '../firebase/lista';
import { UsuarioContext } from '../contexts/UsuarioContext';

function EditarItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      if (usuario) {
        try {
          const dadosItem = await getItem(id);
          if (dadosItem && dadosItem.idUsuario === usuario.uid) {
            setItem(dadosItem);
            setValue('nome', dadosItem.nome);
            setValue('quantidade', dadosItem.quantidade);
            setValue('categoria', dadosItem.categoria);
            setValue('data', dadosItem.data);
            setValue('descricao', dadosItem.descricao);
            setValue('concluido', dadosItem.concluido || false);
          } else {
            toast.error('Item não encontrado ou acesso não autorizado.');
            navigate('/listaCompras');
          }
        } catch (error) {
          toast.error('Erro ao carregar o item.');
          navigate('/listaCompras');
        }
      }
    }
    carregarDados();
  }, [id, usuario, navigate, setValue]);

  async function salvarItem(data) {
    try {
      await updateItem(id, data);
      toast.success('Item atualizado com sucesso!');
      navigate('/listaCompras');
    } catch (error) {
      toast.error('Erro ao atualizar o item.');
    }
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!item) {
    return <p>Carregando...</p>;
  }

  return (
    <main>
      <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
        <h1>Editar Item</h1>
        <hr />
        <div>
          <label htmlFor="nome">Nome</label>
          <input 
            type="text" 
            id="nome" 
            className="form-control"
            {...register("nome", { required: true })}
          />
          {errors.nome && <small className="invalid">O nome é inválido!</small>}
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <input 
            type="number" 
            id="quantidade" 
            className="form-control"
            {...register("quantidade", { required: true })}
          />
          {errors.quantidade && <small className="invalid">A quantidade é inválida!</small>}
        </div>
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select 
            id="categoria" 
            className="form-select"
            {...register("categoria")}
          >
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Higiene">Higiene</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div>
          <label htmlFor="data">Data</label>
          <input 
            type="date" 
            id="data" 
            className="form-control" 
            {...register("data")}
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            {...register("descricao")}
          />
        </div>
        <Button variant="dark" className="w-100 mt-1" type="submit">
          Atualizar Item
        </Button>
      </form>
    </main>
  );
}

export default EditarItem;
