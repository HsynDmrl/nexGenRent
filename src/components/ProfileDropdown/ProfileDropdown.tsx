import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface ProfileDropdownProps {
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onLogout }) => {
  return (
	<>
      <NavDropdown.Item href="#user-profile">Profilim</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={onLogout}>Çıkış Yap</NavDropdown.Item>
	</>
  );
};

export default ProfileDropdown;
