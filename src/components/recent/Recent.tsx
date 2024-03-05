import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import RecentCard from './RecentCard';
import { getAll } from '../../store/car/carSlice';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { RootState } from '../../store/configStore/configureStore';
import OrderPage from '../orderPage/OrderPage';
import { useEffect } from 'react';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';

interface RecentProps {
  onCarSelect: (car: GetAllCarResponse) => void;
}

const Recent: React.FC<RecentProps> = ({ onCarSelect }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state: RootState) => state.car.allDataCar);
  const carM = useAppSelector((state: RootState) => state.car.allData);
  const loading = useAppSelector((state: RootState) => state.car.loading);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<GetAllCarResponse | null>(null);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleCarClick = (car: GetAllCarResponse) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (loading || cars.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="recent padding">
      <Container>
        <Row>
          {carM.map((car) => (
            car.status && (
              <Col key={car.id} xs={12} sm={6} md={4} className="mb-4">
                <RecentCard
                  cover={car.imagePath}
                  name={car.model.name || 'Marka Yok'}
                  brand={car.model.brand.name}
                  price={car.dailyPrice}
                  distance={car.kilometer}
                  year={car.year}
                  onClick={() => handleCarClick(car)}
                />
              </Col>
            )
          ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sipariş Detayları</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCar && <OrderPage car={selectedCar} onBack={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Recent;
