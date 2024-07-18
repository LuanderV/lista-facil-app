import { Card, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className="container mt-4">
      <Card className="text-center">
        <Card.Header>404</Card.Header>
        <Card.Body>
          <Card.Title>Page Not Found</Card.Title>
          <Card.Text>
            A Página que você está tentando acessar, não existe.
          </Card.Text>
          <Button variant="primary" href="/">Voltar para o início.</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;
