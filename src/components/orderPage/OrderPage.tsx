import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { useNavigate } from 'react-router-dom';

interface OrderPageProps {
  car: GetAllCarFilterResponse;
  onBack: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ car, onBack }) => {
  const navigate = useNavigate();

  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  const handlePaymentRedirect = () => {
    navigate('/payment', { state: { car, pickupDate, dropoffDate } });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} style={{ color: 'black' }}>
          <h2>Sipariş Detayları</h2>
          <p>Model: {car.modelName}</p>
          <p>Günlük Fiyat: ₺{car.dailyPrice}</p>
          <p>Kilometre: {car.kilometer} km</p>
          <img src={car.imagePath} alt={car.modelName} style={{ width: '100%' }} />
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
            <Button variant="primary" onClick={handlePaymentRedirect} style={{ margin: '10px 0px' }}>Ödemeye Git</Button>
            <Button variant="secondary" onClick={onBack} style={{ margin: '10px 10px' }}>Geri Dön</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;
