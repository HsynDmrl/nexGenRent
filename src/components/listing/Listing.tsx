import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CarFilter from '../filter/Filter';
import Recent from '../recent/Recent';
import Heading from '../heading/Heading';
import { fetchFilteredCars } from '../../store/filter/filterSlice';
import { CarFilterModel } from '../../services/filterService';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import OrderPage from '../orderPage/OrderPage';
import { GetAllCarResponse } from '../../models/cars/response/getAllCarResponse';

const CarsPage = () => {
  const dispatch = useAppDispatch();
  const [selectedCar, setSelectedCar] = useState<GetAllCarResponse | null>(null);

  const handleCarSelect = (car: GetAllCarResponse) => {
    setSelectedCar(car);
  };


  const handleFilterChange = (filters: CarFilterModel) => {
    dispatch(fetchFilteredCars(filters));
    setSelectedCar(null);
  };

  

  return (
    <Container className="my-4">
      <Heading title="Aktif Araçlarımız" subtitle="" />
      <Row>
        <Col lg={3} className="mb-3">
          <CarFilter onFilterChange={handleFilterChange} />
        </Col>
        <Col lg={9}>
          {!selectedCar ? (
           
            <Recent onCarSelect={handleCarSelect} />
          ) : (
            
            <OrderPage car={selectedCar} onBack={() => setSelectedCar(null)} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CarsPage;
