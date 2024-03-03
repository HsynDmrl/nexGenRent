import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'; 

const Footer: React.FC = () => {
  return (
    <>
      <section className="footerContact text-white text-center py-4" style={{ backgroundColor: '#27ae60' }}>
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={8} md={7}>
              <h1 style={{ fontSize: '2.5rem' }}>Sorularınız mı Var?</h1>
              <p className="mb-0">Kariyerinizin ve büyümenizin yardımcı olacağız.</p>
            </Col>
            <Col lg={4} md={5} className="mt-3 mt-md-0">
              <Button variant="outline-light" className="px-4 py-2">Bizimle İletişime Geçin</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="text-white py-5" style={{ backgroundColor: '#1d2636' }}>
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <h2 style={{ fontSize: '1.5rem' }}>RentUP</h2>
              <p className="my-4">Bir Şeylerle Mi Yardıma İhtiyacınız Var?</p>
              <p className="small mb-4">Her ay gelen güncellemeleri, sıcak fırsatları, öğreticileri, indirimleri doğrudan gelen kutunuza alın.</p>
              <Form.Control type="text" placeholder="Email Adresi" className="mb-2" />
              <Button variant="primary">Abone Ol</Button>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <h3 style={{ fontSize: '1.2rem' }}>Düzenler</h3>
              <ul className="list-unstyled mt-4">
                <li>Ana Sayfa</li>
                <li>Hakkında</li>
                <li>Servisler</li>
                <li>Özellikler</li>
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <h3 style={{ fontSize: '1.2rem' }}>Bütün Bölümler</h3>
              <ul className="list-unstyled mt-4">
                <li>Başlıklar</li>
                <li>Özellikler</li>
                <li>Tanıklıklar</li>
                <li>Videolar</li>
              </ul>
            </Col>
            <Col lg={2} md={4} sm={6}>
              <h3 style={{ fontSize: '1.2rem' }}>Şirket</h3>
              <ul className="list-unstyled mt-4">
                <li>Hakkımızda</li>
                <li>Blog</li>
                <li>Fiyatlandırma</li>
                <li>Ortaklık</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="legal text-center py-3" style={{ backgroundColor: '#1d2636', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Container>
          <span>© {new Date().getFullYear()} RentUP. GorkCoder tarafından tasarlandı.</span>
        </Container>
      </div>
    </>
  );
};

export default Footer;
