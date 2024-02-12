import React, { useState } from "react";
import { User } from "../../models/users/entity/user";

interface ProfileUpdateFormProps {
  user: User;
  onUpdate: (updatedUserData: User) => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState<User>({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" name="id" value={updatedUser.id} onChange={handleChange}  />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
      </label>
      <label>
        Surname:
        <input type="text" name="surname" value={updatedUser.surname} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
      </label>
      <label>
        Nationality ID:
        <input type="text" name="nationalityId" value={updatedUser.nationalityId} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={updatedUser.password} onChange={handleChange} />
      </label>
      <label>
        Role:
        <input type="text" name="roleName" value={updatedUser.roleName} onChange={handleChange} />
      </label>
      <label>
        GSM:
        <input type="text" name="gsm" value={updatedUser.gsm} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileUpdateForm;
