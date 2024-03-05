import React from 'react';
import { Card } from 'react-bootstrap';
import { FaBolt, FaGasPump, FaOilCan, FaLeaf, FaCar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import './FeaturedCard.css'; 
import { FuelType, getFuelTypeLabel } from '../../models/cars/entity/fuelType';


interface Icons {
  [key: string]: IconType;
}

const icons: Icons = {
  Elektrikli: FaBolt,
  Dizel: FaOilCan,
  Benzinli: FaGasPump,
  Hibrit: FaLeaf,
};

const DefaultIcon = FaCar;

interface FeaturedCardProps {
  type: keyof Icons;
  count: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ type, count }) => {
  const fuelType: FuelType = type as FuelType;
  const IconComponent = icons[getFuelTypeLabel(fuelType)] || DefaultIcon;

  return (
    <Card className="featured-card mx-5">
      <Card className="text-center p-4">
        <IconComponent size="3em" className="icon mb-2" />
        <Card.Title>{getFuelTypeLabel(fuelType)}</Card.Title>
        <Card.Text>{`${count} araç`}</Card.Text>
      </Card>
    </Card>
  );
};

export default FeaturedCard;
