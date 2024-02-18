import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

interface ProfileDropdownProps {
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onLogout }) => {
  return (
    <>
      <NavDropdown.Item as={Link} to="/profile">Profilim</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/admin">Admin sayfası</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={onLogout}>Çıkış Yap</NavDropdown.Item>
    </>
  );
};

export default ProfileDropdown;
