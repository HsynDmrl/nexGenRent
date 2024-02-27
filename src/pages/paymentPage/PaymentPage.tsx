import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { useLocation } from 'react-router-dom';
import './P.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons'; 

interface PaymentPageProps {
  car: GetAllCarFilterResponse; // Araba bilgileri
  pickupDate: string; // Alış tarihi
  dropoffDate: string; // Bırakış tarihi
}

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const { car, pickupDate, dropoffDate } = location.state as { car: GetAllCarFilterResponse; pickupDate: string; dropoffDate: string };

    // Kart bilgileri için state tanımlamaları
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Form gönderme işlemini önle
        // Ödeme işlemi için gerekli kodlar
    };

    // Toplam fiyatı hesapla
    const calculateTotalPrice = (): number => {
        // Teslim tarihleri arasındaki gün sayısını hesapla
        const pickup = new Date(pickupDate);
        const dropoff = new Date(dropoffDate);
        const numberOfDays = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 3600 * 24));
        // Günlük fiyatı gün sayısıyla çarp ve toplam fiyatı döndür
        return numberOfDays * car.dailyPrice;
    };

    return (
        <Container className="payment-page">
            <Row className="justify-content-md-center payment-card">
                <Col md={6} className="card-body">
                    <h2>Ödeme</h2>
                    <p>Model: {car.modelName}</p>
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
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
