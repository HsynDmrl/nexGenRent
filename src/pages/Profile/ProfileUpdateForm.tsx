import React, { useState } from "react";
import { User } from "../../models/users/entity/user";
import { Role } from "../../models/roles/entity/role";

const ProfileUpdateForm = ({ user, onUpdate }: { user: User, onUpdate: (userData: User) => void }) => {
  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [nationalityId, setNationalityId] = useState(user.nationalityId);
  const [gsm, setGsm] = useState(user.gsm);
  const [roleName, setRoleName] = useState(user.roleName);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const updatedUserData: User = {
      id,
      name,
      surname,
      email,
      nationalityId,
      gsm,
      roleName,
      password: "asdasd",
      //role: user.role as Role,
    };
    onUpdate(updatedUserData);
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
        id:
        <input
            type="text"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
        />
    </label>
      <label>
        İsim:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Soyisim:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        TC Kimlik No:
        <input
          type="text"
          value={nationalityId}
          onChange={(e) => setNationalityId(e.target.value)}
        />
      </label>
      <label>
        GSM:
        <input
          type="text"
          value={gsm}
          onChange={(e) => setGsm(e.target.value)}
        />
      </label>
      <label>
        Rol:
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </label>
      <button type="submit">Güncelle</button>
    </form>
  );
};

export default ProfileUpdateForm;
