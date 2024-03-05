import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import RecentCard from './RecentCard';
import { setFilteredCars } from '../../store/car/carSlice';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { RootState } from '../../store/configStore/configureStore';
import OrderPage from '../orderPage/OrderPage';
import { useEffect } from 'react';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';
import { FilterService } from '../../services/filterService';

interface RecentProps {
  onCarSelect: (car: GetAllCarFilterResponse) => void;
}

const Recent: React.FC<RecentProps> = ({ onCarSelect }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state: RootState) => state.car.allDataCar);
  const loading = useAppSelector((state: RootState) => state.car.loading);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<GetAllCarFilterResponse | null>(null);
  const newCars = useAppSelector((state: RootState) => state.car.allDataCar);
  const [filterServiceInstance] = useState(new FilterService());
  
  const filters = useMemo(() => ({
    brandId: undefined, 
    modelId: undefined,
    year: undefined,
    colorId: undefined,
    gearType: '',
    fuelType: '',
    minDailyPrice: undefined,
    maxDailyPrice: undefined
  }), []); 

  useEffect(() => {
    filterServiceInstance.fetchCarsWithFilters(filters).then((response) => {
      dispatch(setFilteredCars(response));
    });
  }, [dispatch, filterServiceInstance, filters]);
  

  const handleCarClick = (car: GetAllCarFilterResponse) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  if (loading || cars.length === 0) {
    return <div>Araç Bulunamadı</div>;
  }

  return (
    <section className="recent padding">
      <Container>
        <Row>
        {Array.isArray(newCars) && newCars.map((car: GetAllCarFilterResponse) => (
    car.status && (
        <Col key={car.id} xs={12} sm={6} md={4} className="mb-4">
            <RecentCard
                cover={car.imagePath}
                name={car.modelName}
                brand={car.brandName}
                color={car.colorName}
                price={car.dailyPrice}
                distance={car.kilometer}
                year={car.year}
                onClick={() => handleCarClick(car as GetAllCarFilterResponse)}
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
          {selectedCar && <OrderPage car={{ model: { name: selectedCar.modelName }, dailyPrice: selectedCar.dailyPrice, kilometer: selectedCar.kilometer, imagePath: selectedCar.imagePath }} onBack={handleCloseModal} />}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Recent;
