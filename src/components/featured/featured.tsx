import React, { useEffect, useState } from 'react';
import FeaturedCard from './FeaturedCard';
import BrandBar from '../brandBar/BrandBar'; // BrandBar'ı import edin
import { Container, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { getAll } from '../../store/car/carSlice';
import { RootState } from '../../store/configStore/configureStore';
import './Featured.css'

const Featured = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state: RootState) => state.car.allData);
  const [carTypesCount, setCarTypesCount] = useState<Record<string, number>>({});

  useEffect(() => {
    dispatch(getAll()); // Araç listesini çek
  }, [dispatch]);

  useEffect(() => {
    // Yakıt tipine göre ve status true olan araç sayısını hesapla
    const count = cars.reduce((acc: Record<string, number>, car: { fuelType: string; status: boolean; }) => {
      if (car.status) { // Yalnızca status değeri true olan araçları hesaba kat
        const type = car.fuelType; // Yakıt tipi özelliğinizi buraya yazın
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {});

    setCarTypesCount(count);
  }, [cars]);

  return (
    <section className="featured">
      <Container className='container'>
        <BrandBar  /> {/* BrandBar bileşenini buraya ekleyin */}
        <Row className='row'>
          {Object.entries(carTypesCount).map(([type, count], idx) => (
            <Col key={idx} xs={12} sm={6} md={3} className="mb-4">
              <FeaturedCard type={type} count={count.toString()} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Featured;
