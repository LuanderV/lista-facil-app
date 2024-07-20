import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getItemsUsuario, deleteItem, updateItem } from '../firebase/lista';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Menu from '../components/Menu';
import { UsuarioContext } from '../contexts/UsuarioContext';

const categoriaCores = {
  Alimentos: 'bg-success text-white',
  Bebidas: 'bg-primary text-white',
  Limpeza: 'bg-warning text-dark',
  Higiene: 'bg-info text-white',
  Outros: 'bg-secondary text-white',
};

function Lista() {
  const [itens, setItens] = useState(null);
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  function carregarDados() {
    if (usuario) {
      getItemsUsuario(usuario.uid).then((resultados) => {
        setItens(resultados);
      });
    }
  }

  function deletarItem(id) {
    const deletar = window.confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteItem(id).then(() => {
        toast.success("Item removido com sucesso");
        carregarDados();
      });
    }
  }

  function atualizarStatus(id, concluido) {
    updateItem(id, { concluido }).then(() => {
      toast.success("Status atualizado com sucesso");
      carregarDados();
    });
  }

  useEffect(() => {
    carregarDados();
  }, [usuario]);

  if (usuario === null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Menu />
      <main>
        <Container className="mt-5">
          <h1 className="mb-4">Lista de Compras</h1>
          <Link className="btn btn-dark mb-4" to="/listaCompras/adicionar">Adicionar Item</Link>
          {itens ? (
            <section>
              {itens.map((item) => (
                <Card key={item.id}className={`mb-4 shadow-sm border ${item.concluido ? 'bg-light text-muted' : 'border-dark'}`}>
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <Card.Title>{item.nome}</Card.Title>
                        <Card.Text>{item.descricao}</Card.Text>
                        <Card.Text>Quantidade: {item.quantidade}</Card.Text>
                        <Card.Text><strong>Data:</strong> {item.data}</Card.Text>
                        <Card.Text>
                          <strong>Categoria:</strong>
                          <span className={`badge rounded-pill ${categoriaCores[item.categoria] || 'bg-light'}`}>{item.categoria}</span>
                        </Card.Text>
                      </Col>
                      <Col md={4} className="text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <Form.Check
                            type="checkbox"
                            checked={item.concluido}
                            onChange={() => atualizarStatus(item.id, !item.concluido)}
                            label="Concluído"
                            className="me-3"
                          />
                          <Button
                            variant="outline-dark"
                            className="me-2"
                            onClick={() => navigate(`/listaCompras/editar/${item.id}`)}
                          >
                            <span className="material-symbols-outlined">edit_note</span>
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => deletarItem(item.id)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </section>
          ) : (
            <Loader />
          )}
        </Container>
      </main>
    </>
  );
}

export default Lista;
