import { Card } from 'react-bootstrap'
import imgCompras from '../assets/img/compras-home.png'
import Login from '../components/Login'
import Menu from '../components/Menu'
function Home() {
  return (
    <>
      <Menu corHome="navbar-home" />
      <main className="d-flex align-items-center justify-content-center contain-main-home">
        <Card className="contain-home border-0">
          <Card.Header className="p-0 border-0 w-50">
            <Card.Title className="fw-bold fs-1 home-cardtitle ">
              Sua Lista de Compras
            </Card.Title>
            <Card.Text className=" fw-bolder text-home">Fácil</Card.Text>
          </Card.Header>
          <Card.Body className="d-flex flex-column p-0 border-0">
            <Card.Img src={imgCompras} className="imgCompras-home" />
          </Card.Body>
        </Card>
        <Card className="border-0">
          <Login />
        </Card>
      </main>
    </>
  )
}

export default Home;
