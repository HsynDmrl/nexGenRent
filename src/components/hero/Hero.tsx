import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './hero.css'; // Stil dosyasının yolu
import carImage from '../../assets/images/cg4.gif'; // Resmin yolu

const Hero = () => {
  // Bugünün ve ertesi günün tarihini al
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Tarihleri YYYY-MM-DD formatında al
  const formatDate = (date:Date) => date.toISOString().split('T')[0];

  // Başlangıç tarih değerleri
  const [pickupDate, setPickupDate] = useState(formatDate(today));
  const [returnDate, setReturnDate] = useState(formatDate(tomorrow));

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    // Alış ve iade tarihlerini Date objesine dönüştür
    const pickupDateTime = new Date(pickupDate);
    const returnDateTime = new Date(returnDate);

    // Kontrol: Alış tarihi iade tarihinden sonra mı?
    if (pickupDateTime > returnDateTime) {
      alert("Alış tarihi, iade tarihinden sonra olamaz!");
      return; // Fonksiyonu burada sonlandır
    }

    // Tüm kontroller başarılı ise devam edilebilir
    // Örneğin, burada araç arama işlemi yapılabilir.
  };

  return (
    <section className="hero">
      <Container>
        {/* <img src={carImage} alt="Car" className="car-image" style={{ top: '0', transform: 'translate(-50%, 0)' }} /> */}
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="text-dark">Size En Uygun Aracı Bulalım</h1>
            <p className="text-secondary">Araçlarımız Tamamı Kaskoludur. Her Bütçeye Uygun Araç Kiralama Hizmeti</p>
            <Form className="mt-1" onSubmit={handleFormSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formPickupDate">
                    <Form.Label className="text-dark">Alış Tarihi</Form.Label>
                    <Form.Control
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="formReturnDate">
                    <Form.Label className="text-dark">İade Tarihi</Form.Label>
                    <Form.Control
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Araç Bul
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
