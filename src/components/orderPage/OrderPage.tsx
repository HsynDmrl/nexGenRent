import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { useNavigate } from 'react-router-dom';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';

interface OrderPageProps {
  car: {
    model: { name: string },
    dailyPrice: number,
    kilometer: number,
    imagePath: string
  };
  onBack: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ car, onBack }) => {
  const navigate = useNavigate();
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupDateError, setPickupDateError] = useState('');
  const [dropoffDateError, setDropoffDateError] = useState('');

  const validateDates = () => {
    let isValid = true;
    if (!pickupDate) {
      setPickupDateError('Lütfen alış tarihi seçiniz.');
      isValid = false;
    } else {
      setPickupDateError('');
    }

    if (!dropoffDate) {
      setDropoffDateError('Lütfen bırakış tarihi seçiniz.');
      isValid = false;
    } else if (pickupDate && new Date(pickupDate) >= new Date(dropoffDate)) {
      setDropoffDateError('Bırakış tarihi, alış tarihinden sonra olmalıdır.');
      isValid = false;
    } else {
      setDropoffDateError('');
    }

    return isValid;
  };

  const handlePaymentRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Formun varsayılan submit işlemini önle
    if (validateDates()) {
      navigate('/payment', { state: { car, pickupDate, dropoffDate } });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} style={{ color: 'black' }}>
          <h2>Sipariş Detayları</h2>
          <p>Model: {car.model.name}</p>
          <p>Günlük Fiyat: ₺{car.dailyPrice}</p>
          <p>Kilometre: {car.kilometer} km</p>
          <img src={car.imagePath} alt={car.model.name} style={{ width: '100%' }} />
          <Form>
            <Form.Group controlId="pickupDate">
              <Form.Label>Alış Tarihi</Form.Label>
              <Form.Control
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                isInvalid={!!pickupDateError}
              />
              <Form.Control.Feedback type="invalid">
                {pickupDateError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="dropoffDate">
              <Form.Label>Bırakış Tarihi</Form.Label>
              <Form.Control
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                isInvalid={!!dropoffDateError}
              />
              <Form.Control.Feedback type="invalid">
                {dropoffDateError}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" onClick={handlePaymentRedirect} disabled={!pickupDate || !dropoffDate || !!pickupDateError || !!dropoffDateError} style={{ margin: '10px 0px' }}>Ödemeye Git</Button>
            <Button variant="secondary" onClick={onBack} style={{ margin: '10px 10px' }}>Geri Dön</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;