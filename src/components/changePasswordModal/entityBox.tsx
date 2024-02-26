import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface EntityBoxProps {
    entity: string;
    count: number;
    icon: React.ReactNode;
}

const EntityBox: React.FC<EntityBoxProps> = ({ entity, count, icon }) => {
    return (
        <Col className="mb-4" xs={12} sm={6} md={4} lg={2}>
            <Card className="h-100 shadow-sm text-center card-custom">
                <Card.Header className="card-header-custom">{entity}</Card.Header>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <div className="icon-custom">{icon}</div>
                    <Card.Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {count}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default EntityBox;
