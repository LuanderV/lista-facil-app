import { Card, Button } from 'react-bootstrap'
import Ilustracao from '../assets/img/not-found.png'
import logoLista from '../assets/img/listafacil-logo.png'

const NotFound = () => {
  return (
    <>
      <Card.Link href="/" className="notfound-contain-logo">
        <Card.Img src={logoLista} className="logo-img-notfound m-2" />
      </Card.Link>
      <main className="d-flex justify-content-center notfound-main gap-5">
        <Card className="text-left notfound-card-contain border-0 bg-transparent">
          <Card.Header className="notfound-number border-0 bg-transparent p-0">
            404
          </Card.Header>
          <Card.Body className="border-0 p-0">
            <div>
              <Card.Title className="notfound-text">OOOps!</Card.Title>
              <Card.Title className="notfound-text">
                Página não encontrada!
              </Card.Title>
            </div>
            <Card.Text className="notfound-text-descricao">
              Não foi possível encontrar o que você procurou. Tente pesquisar
              novamente.
            </Card.Text>
            <Button variant="primary" className="notfound-btn" href="/">
              Voltar para o início.
            </Button>
          </Card.Body>
        </Card>
        <Card.Img src={Ilustracao} className="notfound-img" />
      </main>
    </>
  )
}

export default NotFound
