import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaRoad, FaGasPump, FaCarBattery, FaPalette } from 'react-icons/fa';

interface RecentCardProps {
  cover: string;
  name: string;
  price: number;
  distance: number;
  onClick: () => void;
}

const RecentCard: React.FC<RecentCardProps> = ({ cover, name, price, distance, onClick }) => {
  return (
    <Card className="shadow">
      <Card.Img variant="top" src={cover} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><FaRoad /> {distance} km</Card.Text>
        {/* Buton üzerindeki onClick işlevi */}
        <Button variant="primary" onClick={(e) => {
          e.stopPropagation(); // Kartın kendisine tıklanmasını önle
          onClick();
        }}>{`₺ ${price} / Gün`}</Button>
      </Card.Body>
    </Card>
  );
};

export default RecentCard;
