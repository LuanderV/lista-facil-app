import { Container, Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <>
      <Container>
        <Spinner animation="border" variant="danger" />
        <span className='mt-5'>Carregando</span>
      </Container>
    </>
  );
}

export default Loader;