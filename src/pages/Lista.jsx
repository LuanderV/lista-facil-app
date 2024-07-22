import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { getItemsUsuario, deleteItem, updateItem } from '../firebase/lista'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'
import Menu from '../components/Menu'
import { UsuarioContext } from '../contexts/UsuarioContext'
import editList from '../assets/img/edit.svg'
import deleteList from '../assets/img/delete.svg'

const categoriaCores = {
  Alimentos: 'bg-success text-white',
  Bebidas: 'bg-primary text-white',
  Limpeza: 'bg-warning text-dark',
  Higiene: 'bg-info text-white',
  Outros: 'bg-secondary text-white'
}

function Lista() {
  const [itens, setItens] = useState(null)
  const usuario = useContext(UsuarioContext)
  const navigate = useNavigate()

  function carregarDados() {
    if (usuario) {
      getItemsUsuario(usuario.uid).then(resultados => {
        setItens(resultados)
      })
    }
  }

  function deletarItem(id) {
    const deletar = window.confirm('Tem certeza que deseja excluir?')
    if (deletar) {
      deleteItem(id).then(() => {
        toast.success('Item removido com sucesso')
        carregarDados()
      })
    }
  }

  function atualizarStatus(id, concluido) {
    updateItem(id, { concluido }).then(() => {
      toast.success('Status atualizado com sucesso')
      carregarDados()
    })
  }

  useEffect(() => {
    carregarDados()
  }, [usuario])

  if (usuario === null) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Menu corLista="navbar-lista" />
      <main className="d-flex justify-content-center align-items-center lista-contain-main">
        <Container className="lista-container">
          <h1 className="mb-4 text-center">Lista de Compras</h1>

          {itens ? (
            <section>
              <Link
                className="btn mb-4 btn-add-item"
                to="/listaCompras/adicionar"
              >
                Adicionar Item
              </Link>
              {itens.map(item => (
                <Card
                  key={item.id}
                  className={`mb-4 shadow-sm lista-card ${
                    item.concluido
                      ? 'bg-light text-muted text-decoration-line-through'
                      : ''
                  }`}
                >
                  <Card.Body>
                    <Row className=" align-items-baseline">
                      <Col md={8} className="w-25">
                        <Card.Title>{item.nome}</Card.Title>
                        <Card.Text>Quantidade: {item.quantidade}</Card.Text>
                        {/* <Card.Text><strong>Data:</strong> {item.data}</Card.Text> */}
                        <Card.Text>
                          <span
                            className={`badge rounded-pill ${
                              categoriaCores[item.categoria] || 'bg-light'
                            }`}
                          >
                            {item.categoria}
                          </span>
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>{item.descricao}</Card.Text>
                      </Col>
                      <Col md={4} className="text-end">
                        <div className="d-flex align-items-center justify-content-end">
                          <Form.Check
                            type="checkbox"
                            checked={item.concluido}
                            onChange={() =>
                              atualizarStatus(item.id, !item.concluido)
                            }
                            label="Concluído"
                            className="me-3"
                            isValid
                          />
                          <Button
                            variant="outline-info"
                            className="me-2"
                            onClick={() =>
                              navigate(`/listaCompras/editar/${item.id}`)
                            }
                          >
                            <img
                              src={editList}
                              className="lista-icone-editar"
                              alt="icone editar item da lista"
                            />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => deletarItem(item.id)}
                          >
                            <img
                              src={deleteList}
                              className="lista-icone-editar"
                              alt="icone deletar item da lista"
                            />
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
  )
}

export default Lista
