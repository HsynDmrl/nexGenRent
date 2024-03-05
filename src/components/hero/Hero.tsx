import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './hero.css'; 

const Hero = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const [searchTerm, setSearchTerm] = useState(""); 
  const [pickupDate, setPickupDate] = useState(formatDate(today));
  const [returnDate, setReturnDate] = useState(formatDate(tomorrow));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pickupDateTime = new Date(pickupDate);
    const returnDateTime = new Date(returnDate);

    if (pickupDateTime > returnDateTime) {
      alert("Alış tarihi, iade tarihinden sonra olamaz!");
      return;
    }


  };

  return (
    <section className="hero">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="text-dark">Size En Uygun Aracı Bulalım</h1>
            <p className="text-secondary">Araçlarımız Tamamı Kaskoludur. Her Bütçeye Uygun Araç Kiralama Hizmeti</p>
            <Form className="mt-1" onSubmit={handleFormSubmit}>
              <Row className="mb-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Marka veya model ara"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      aria-label="Arama"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
              </Row>
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
              <Button variant="primary" type="submit">Araç Bul</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
