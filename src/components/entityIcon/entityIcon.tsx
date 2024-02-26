import React from 'react';
import { FaBuilding, FaToolbox, FaCar, FaUsers, FaFileInvoiceDollar, FaPalette, FaImage, FaUserTag, FaFileAlt, FaUser } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

const EntityIcon: React.FC<{ entity: string }> = ({ entity }) => {
    const iconStyle = { fontSize: '48px', color: '#007bff' };
    switch (entity) {
        case 'Marka Sayısı':
            return <FaBuilding style={iconStyle} />;
        case 'Model Sayısı':
            return <FaToolbox style={iconStyle} />;
        case 'Araç Sayısı':
            return <FaCar style={iconStyle} />;
        case 'Çalışan Sayısı':
            return <FaUsers style={iconStyle} />;
        case 'Müşteri Sayısı':
            return <IoIosPeople style={iconStyle} />;
        case 'Kiralama Sayısı':
            return <FaFileInvoiceDollar style={iconStyle} />;
        case 'Renk Sayısı':
            return <FaPalette style={iconStyle} />;
        case 'Logo Sayısı':
            return <FaImage style={iconStyle} />;
        case 'Rol Sayısı':
            return <FaUserTag style={iconStyle} />;
        case 'Fatura Sayısı':
            return <FaFileAlt style={iconStyle} />;
        case 'Kullanıcı Sayısı':
            return <FaUser style={iconStyle} />;
        default:
            return null;
    }
};

export default EntityIcon;
