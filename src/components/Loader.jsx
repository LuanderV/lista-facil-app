import { Container, Spinner } from 'react-bootstrap'

function Loader(props) {
  return (
    <Container className="d-flex align-items-center justify-content-center mt-5 fw-semibold">
      <Spinner animation="border" variant="dark" />
      <span className="ms-1">Carregando...</span>
    </Container>
  )
}

export default Loader
