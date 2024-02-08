import React, { useState } from "react";
import authService from '../../services/authService';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationalityId, setNationalityId] = useState("");
  const [gsm, setGsm] = useState("");

  const handleRegister = async () => {
    try {
      await authService.register(name, surname, nationalityId, gsm, email, password,  Number(roleId));
      // window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  
  return (
    <div>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Şifre:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Role ID:</label>
        <input
          type="text"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        />

        <label>Ad:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Soyad:</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <label>TC Kimlik Numarası:</label>
        <input
          type="text"
          value={nationalityId}
          onChange={(e) => setNationalityId(e.target.value)}
        />

        <label>GSM Numarası:</label>
        <input
          type="tel"
          value={gsm}
          onChange={(e) => setGsm(e.target.value)}
        />

        <button type="button" onClick={handleRegister}>
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
