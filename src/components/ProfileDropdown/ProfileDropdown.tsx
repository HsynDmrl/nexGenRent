import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // React Router'dan Link bileşenini import et

interface ProfileDropdownProps {
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onLogout }) => {
  return (
    <>
      <NavDropdown.Item as={Link} to="/profile">Profilim</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={onLogout}>Çıkış Yap</NavDropdown.Item>
    </>
  );
};

export default ProfileDropdown;
