import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CarFilter from '../filter/Filter';
import Recent from '../recent/Recent';
import Heading from '../heading/Heading';
import { useDispatch } from 'react-redux';
import { fetchFilteredCars } from '../../store/filter/filterSlice';
import { AppDispatch } from '../../store/configStore/configureStore';
import { CarFilterModel } from '../../services/filterService';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import OrderPage from '../orderPage/OrderPage';
import { GetAllCarFilterResponse } from '../../models/cars/response/getAllCarFilterResponse';

const CarsPage = () => {
  const dispatch = useAppDispatch();
  const [selectedCar, setSelectedCar] = useState<GetAllCarFilterResponse | null>(null);

  const handleCarSelect = (car: GetAllCarFilterResponse) => {
    setSelectedCar(car);
  };


  const handleFilterChange = (filters: CarFilterModel) => {
    dispatch(fetchFilteredCars(filters));
    setSelectedCar(null); // Filtreleme sonrası selectedCar'ı sıfırla
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
            // Recent bileşenine onCarSelect prop'unu geçir
            <Recent onCarSelect={handleCarSelect} />
          ) : (
            // OrderPage bileşenine onBack prop'unu geçir
            <OrderPage car={selectedCar} onBack={() => setSelectedCar(null)} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CarsPage;
