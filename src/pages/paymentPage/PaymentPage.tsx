import React, { useState } from 'react';
import { Container, Row, Col, Form, Button,Alert } from 'react-bootstrap';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { useLocation } from 'react-router-dom';
import './P.css';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons'; 
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';
import axios from 'axios';
import { addRentalAsync } from '../../store/rentals/rentalsSlice';
import { AddRentalRequest } from '../../models/rentals/requests/addRentalRequest';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

interface PaymentPageProps {
  car: GetAllCarResponse; 
  pickupDate: string; 
  dropoffDate: string; 
}


const PaymentPage = () => {
    const location = useLocation();

    const dispatch = useAppDispatch();
  
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false); // Başarılı submit durumu için state
  
    const { car, pickupDate, dropoffDate } = location.state as any; // Burada daha iyi bir tip tanımı kullanılmalı
  
    if (!car || !pickupDate || !dropoffDate) {
      return <div>Ödeme bilgileri eksik veya hatalı.</div>;
    }
  
    const calculateTotalPrice = (): number => {
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      const numberOfDays = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 3600 * 24));
      return numberOfDays * car.dailyPrice;
    };
  
    const handleSubmit = (event:any) => {
        event.preventDefault();
    
        const rentalData: AddRentalRequest = {
    
          id: 0,
          startDate: new Date(),
          endDate: new Date(),
          totalPrice: 100,
          returnDate: new Date(),
          startKilometer: 100,
          endKilometer: 200,
          discount: 10,
          carId: 1,
          customerId: 1,
          employeeId: 1,
        };
    
        dispatch(addRentalAsync(rentalData));
      };
  

  
    return (
      <Container className="payment-page">
        <Row className="justify-content-md-center payment-card">
          <Col md={6} className="card-body">
            <h2>Ödeme</h2>
            <p>Model: {car.model.name}</p>
            <p>Alış Tarihi: {pickupDate}</p>
            <p>Bırakış Tarihi: {dropoffDate}</p>
            <p>Toplam Gün: {Math.ceil((new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 3600 * 24))}</p>
            <p>Günlük Fiyat: ₺{car.dailyPrice}</p>
            <p>Toplam Fiyat: ₺{calculateTotalPrice()}</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="cardNumber">
                <FontAwesomeIcon icon={faCreditCard} />
                <Form.Label>Kart Numarası</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kart Numarası"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="cardHolder">
                <FontAwesomeIcon icon={faUser} />
                <Form.Label>Kart Sahibi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kart Sahibi"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col className='custom-col'>
                  <Form.Group controlId="expiryDate">
                    <Form.Label>Son Kullanma Tarihi</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YYYY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button className="payment-button" variant="primary" type="submit">
                Ödeme Yap
              </Button>
              {isSubmitSuccessful && <Alert variant="success" className="mt-3">Kayıt başarılı!</Alert>}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  export default PaymentPage;