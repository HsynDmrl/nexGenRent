import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import {
    selectCar,
    updateNewCarData,
    updateUpdateCarData,
    fetchCars,
    fetchModelsAndColors,
} from '../store/slices/carSlice';
import { FormCheck } from 'react-bootstrap';

export default function Car() {


    const carsData = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCars());
        dispatch(fetchModelsAndColors());
    }, [dispatch]);




    return (
        <Container className='px-3 mb-3 bg-white rounded'>
            <Table className='table caption-top bg-white rounded mt-2'>
                <caption className='text-white fs-4'>Car List</caption>
                <thead>
                    <td colSpan="8" className='p-2 ml-4'>
                        <Button variant="primary" className='mx-2'>Excell'e Aktar</Button>{' '}
                        <Button variant="warning" className='mx-2'>Ekle</Button>{' '}
                        <Button variant="success" className='mx-2'>Düzenle</Button>{' '}
                        <Button variant="danger" className='mx-2'>Sil</Button>{' '}
                    </td>

                    <tr>
                        <th scope='col'><FormCheck className='mt-4' /> Tümü seç</th>
                        <th scope='col' className='text-center'>Sıra No
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Numaraya Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup></th>
                        <th scope='col' className='text-center'>Model ^
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Modele Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup></th>
                        <th scope='col' className='text-center'>Plate ^
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Plakaya Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </th>
                        <th scope='col' className='text-center'>Color ^
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Renge Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </th>
                        <th scope='col' className='text-center'>Daily Price
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Fiyata Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </th>
                        <th scope='col' className='text-center'>Year ^
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Yıla Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </th>
                        <th scope='col' className='text-center'>Kilometer ^
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Kilometreye Göre Ara"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {carsData.map((car, index) => (
                        <tr key={index}>
                            <th><Form.Check />
                            </th>
                            <th scope='row' className='text-center'>{index + 1}</th>
                            <td className='text-center'>{car.modelName}</td>
                            <td className='text-center'>{car.plate}</td>
                            <td className='text-center'>{car.colorName}</td>
                            <td className='text-center'>{car.dailyPrice} ₺</td>
                            <td className='text-center'>{car.year}</td>
                            <td className='text-center'>{car.kilometer}</td>
                        </tr>
                    ))}
                </tbody>
               
            </Table>
             <div colSpan="8" className='text-center mx-auto'>
                    <Pagination className='justify-content-center'>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
                <br />
        </Container>
    )
}
