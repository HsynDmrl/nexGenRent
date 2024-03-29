import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaRoad,FaCalendarAlt,FaCar, FaPalette } from 'react-icons/fa';

interface RecentCardProps {
  cover: string;
  name: string;
  price: number;
  distance: number;
  year:number;
  brand:string;
  color:string
  onClick: () => void;
}

const RecentCard: React.FC<RecentCardProps> = ({ cover, name, price, distance,year,brand,color, onClick }) => {
  return (
    <Card className="shadow">
      <Card.Img variant="top" src={cover} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><FaCar /> {brand}</Card.Text>
        <Card.Text><FaRoad /> {distance} km</Card.Text>
        <Card.Text><FaPalette/>{''} {color}</Card.Text>
        <Card.Text><FaCalendarAlt /> {year}</Card.Text>
        <Button variant="primary" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>{`₺ ${price} / Gün`}</Button>
      </Card.Body>
    </Card>
  );
};

export default RecentCard;
