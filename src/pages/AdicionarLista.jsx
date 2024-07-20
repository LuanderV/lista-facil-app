import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsuarioContext } from '../contexts/UsuarioContext';
import { addItem } from '../firebase/lista';

function AdicionarLista() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  function salvarItem(data) {
    data.idUsuario = usuario.uid;
    addItem(data).then(() => {
      toast.success('Item adicionado com sucesso');
      navigate('/listaCompras');
    }).catch(() => {
      toast.error('Ocorreu um erro ao adicionar o item!');
    });
  }

  if (usuario === null) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <form className="form-section" onSubmit={handleSubmit(salvarItem)}>
        <h1>Adicionar Item</h1>
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
          Salvar Item
        </Button>
      </form>
    </main>
  );
}

export default AdicionarLista;
