// Recent.tsx
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecentCard from './RecentCard';
import { getAll } from '../../store/car/carSlice';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch'; // useAppDispatch ve useAppSelector hooklarını import edin
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { RootState } from '../../store/configStore/configureStore';
import { useNavigate } from 'react-router-dom';

interface RecentProps {
  onCarSelect: (car: GetAllCarFilterResponse) => void;
}

const Recent: React.FC<RecentProps> = ({ onCarSelect }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state:RootState) => state.car.allDataCar);
  const loading = useAppSelector((state:RootState) => state.car.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleCarClick = (car: GetAllCarFilterResponse) => {
    navigate('/order', { state: { car } });
  };
 

  if (loading ) {
    return <div>Loading...</div>;
  }

  return (
    <section className="recent padding">
      <Container>
        <Row>
          {cars.map((car) => (
            car.status && (
              <Col key={car.id} xs={12} sm={6} md={4} className="mb-4">
                <RecentCard
                  cover={car.imagePath}
                  name={car.modelName || 'Marka Yok'}
                  price={car.dailyPrice}
                  distance={car.kilometer}
                  onClick={() => handleCarClick(car)}
                />
              </Col>
            )
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Recent;
