import './Featured.css'; // Stilleri import et
// Featured.tsx
import React from 'react';
import FeaturedCard from './FeaturedCard';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../heading/Heading';
import BrandBar from '../brandBar/BrandBar';

const carTypes = [
  { type: 'Elektrikli', count: '50' },
  { type: 'Dizel', count: '120' },
  { type: 'Benzinli', count: '200' },
  { type: 'Hibrit', count: '80' }
];

const Featured = () => {
  
  return (
    <section className="featured">
      <Container>
        <BrandBar></BrandBar>
        <Row>
          {carTypes.map((car, idx) => (
            <Col key={idx} xs={12} sm={6} md={3} className="mb-4">
              <FeaturedCard type={car.type} count={car.count} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Featured;