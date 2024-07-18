import { Card, Button } from 'react-bootstrap'
import Ilustracao from '../assets/img/not-found.png'

const NotFound = () => {
  return (
    <main className="container mt-4">
      <Card className="text-center">
        <Card.Header>404</Card.Header>
        <Card.Body>
          <div>
            <Card.Title>OOOps!</Card.Title>
            <Card.Title>Página não encontrada!</Card.Title>
          </div>
          <Card.Text>
            Não foi possível encontrar o que você procurou. Tente pesquisar
            novamente.
          </Card.Text>
          <Button variant="primary" href="/">
            Voltar para o início.
          </Button>
        </Card.Body>
      </Card>
      <Card.Img src={Ilustracao} />
    </main>
  )
}

export default NotFound
