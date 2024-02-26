// OrderPage.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';

interface OrderPageProps {
  car: GetAllCarFilterResponse;
  onBack: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ car ,onBack}) => {
  // Alış ve bırakış tarihleri için state tanımlamaları
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Sipariş Detayları</h2>
          {/* Araba detaylarını göster */}
          <p>Model: {car.modelName}</p>
          <p>Günlük Fiyat: ₺{car.dailyPrice}</p>
          <p>Kilometre: {car.kilometer} km</p>
          {/* Araba resmi gösterilebilir */}
          <img src={car.imagePath} alt={car.modelName} style={{ width: '100%' }} />
          {/* Tarih seçim inputları */}
          <Form>
            <Form.Group controlId="pickupDate">
              <Form.Label>Alış Tarihi</Form.Label>
              <Form.Control
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="dropoffDate">
              <Form.Label>Bırakış Tarihi</Form.Label>
              <Form.Control
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ödemeye Git
            </Button>
            <Button variant="secondary" onClick={onBack}>Geri Dön</Button> 
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
