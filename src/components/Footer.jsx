import { Card } from 'react-bootstrap'
import whatsappIcon from '../assets/img/whatsapp.svg'
import instagramIcon from '../assets/img/instagram.svg'
import twitterXIcon from '../assets/img/twitter-x.svg'
import gpstore from '../assets/img/googleplay.png'
import apstore from '../assets/img/appstore.png'

function Footer() {
  return (
    <footer className="footer-contain">
      <Card className="p-0 border-0 footer-contain-card ">
        <Card.Body className=" p-0 d-flex align-items-center mb-0 footer-card-body">
          <Card.Body className="p-0 d-flex flex-column justify-content-center">
            <Card.Text className="text-center footer-text fw-medium">
              Mídias Sociais
            </Card.Text>
            <Card.Body className="d-flex justify-content-center p-2">
              <Card.Link href="#">
                <Card.Img className="footer-icon" src={whatsappIcon} />
              </Card.Link>
              <Card.Link href="#">
                <Card.Img className="footer-icon" src={instagramIcon} />
              </Card.Link>
              <Card.Link href="#">
                <Card.Img className="footer-icon" src={twitterXIcon} />
              </Card.Link>
            </Card.Body>
          </Card.Body>
          <Card.Body className="p-0 d-flex justify-content-center">
            <Card.Text className="footer-text fw-medium">
              © 2024 Lista<span className="footer-span">Fácil</span>. Todos os
              direitos reservados.
            </Card.Text>
          </Card.Body>
          <Card.Body className="p-0 d-flex justify-content-center">
            <Card.Link href="#">
              <Card.Img className="footer-img-stores" src={gpstore} />
            </Card.Link>
            <Card.Link href="#">
              <Card.Img className="footer-img-stores" src={apstore} />
            </Card.Link>
          </Card.Body>
        </Card.Body>
      </Card>
    </footer>
  )
}

export default Footer
