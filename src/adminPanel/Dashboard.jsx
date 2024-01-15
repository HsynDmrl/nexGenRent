import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCar,
  updateNewCarData,
  updateUpdateCarData,
  fetchCars,
  fetchModelsAndColors,
} from '../store/slices/carSlice';
import CarService from '../services/CarService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../App';
function Dashboard() {
  
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const dispatch = useDispatch();

  const carsData = useSelector((state) => state.cars.cars);
  const models = useSelector((state) => state.cars.models);
  const colors = useSelector((state) => state.cars.colors);
  const selectedCar = useSelector((state) => state.cars.selectedCar);
  const newCarData = useSelector((state) => state.cars.newCarData);
  const updateCarData = useSelector((state) => state.cars.updateCarData);

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchModelsAndColors());
  }, [dispatch]);

  const handleCarClick = (car) => {
    dispatch(selectCar(car));
    dispatch(
      updateUpdateCarData({
        plate: car.plate,
        modelId: car.modelId,
        colorId: car.colorId,
        kilometer: car.kilometer,
        year: car.year,
        dailyPrice: car.dailyPrice,
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateNewCarData({
        ...newCarData,
        [name]: value,
      })
    );
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateUpdateCarData({
        ...updateCarData,
        [name]: value,
      })
    );
  };

  const handleAddCar = async () => {
    try {
      const carService = new CarService();
      await carService.add(newCarData);

      dispatch(fetchCars());
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const carService = new CarService();

      const updateData = {
        id: selectedCar.id,
        kilometer: updateCarData.kilometer,
        year: updateCarData.year,
        dailyPrice: updateCarData.dailyPrice,
        plate: updateCarData.plate,
        modelId: updateCarData.modelId,
        colorId: updateCarData.colorId,
      };

      await carService.update(updateData);

      dispatch(fetchCars());
      dispatch(selectCar(null));
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      const carService = new CarService();
      await carService.delete(selectedCar.id);

      dispatch(fetchCars());
      dispatch(selectCar(null));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <Container className='px-3'>
      {/* <Nav Toggle={handleToggle} /> */}
      <Container fluid>
        <Row className='g-3 my-2'>
          <Col md={3} className='p-1'>
            <Card className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{carsData.length}</h3>
                <p className='fs-5'>Cars</p>
              </div>
              <i className='bi bi-cart-plus p-3 fs-1'></i>
            </Card>
          </Col>
          <Col md={3} className='p-1'>
            <Card className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{models.length}</h3>
                <p className='fs-5'>Model</p>
              </div>
              <i className='bi bi-currency-dollar p-3 fs-1'></i>
            </Card>
          </Col>
          <Col md={3} className='p-1'>
            <Card className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>{colors.length}</h3>
                <p className='fs-5'>Colors</p>
              </div>
              <i className='bi bi-truck p-3 fs-1'></i>
            </Card>
          </Col>
          <Col md={3} className='p-1'>
            <Card className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>2</h3>
                <p className='fs-5'>Users</p>
              </div>
              <i className='bi bi-graph-up-arrow p-3 fs-1'></i>
            </Card>
          </Col>
        </Row>
      </Container>
      <Table className='table caption-top bg-white rounded mt-2'>
        <caption className='text-white fs-4'>Car List</caption>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Model</th>
            <th scope='col'>Plate</th>
            <th scope='col'>Color</th>
            <th scope='col'>Daily Price</th>
            <th scope='col'>Year</th>
            <th scope='col'>Kilometer</th>
          </tr>
        </thead>
        <tbody>
          {carsData.map((car, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{car.modelName}</td>
              <td>{car.plate}</td>
              <td>{car.colorName}</td>
              <td>{car.dailyPrice} ₺</td>
              <td>{car.year}</td>
              <td>{car.kilometer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    <br />
    <br />
    <br />
    <br />
    <br />

    </Container>
  );
}

export default Dashboard;
