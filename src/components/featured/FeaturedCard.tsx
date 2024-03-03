import React from 'react';
import { Card } from 'react-bootstrap';
import { FaBolt, FaGasPump, FaOilCan, FaLeaf, FaCar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import './FeaturedCard.css'; // Stillerin olduğu CSS dosyasını import et

// İkonların her biri için bir tip tanımlaması
interface Icons {
  [key: string]: IconType;
}

const icons: Icons = {
  Elektrikli: FaBolt,
  Dizel: FaOilCan,
  Benzinli: FaGasPump,
  Hibrit: FaLeaf,
};

// Varsayılan ikon
const DefaultIcon = FaCar;

// Props için bir tip tanımlaması
interface FeaturedCardProps {
  type: keyof Icons;
  count: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ type, count }) => {
  const IconComponent = icons[type] || DefaultIcon;

  return (
    <Card className="featured-card">
      <Card className="text-center p-4">
        <IconComponent size="3em" className="icon mb-2" />
        <Card.Title>{type}</Card.Title>
        <Card.Text>{`${count} araç`}</Card.Text>
      </Card>
    </Card>

    
  );
};

export default FeaturedCard;
