import { useState, ChangeEvent, FormEvent } from 'react';
import { addUser } from '../../store/user/userSlice';
import { AddUserRequest } from '../../models/users/requests/addUserRequest';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

const AddUserForm = () => {
  const [userData, setUserData] = useState<AddUserRequest>({
    name: '',
    surname: '',
    email: '',
    nationalityId: '',
    gsm: '',
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();
	const addUserRequest: AddUserRequest = {
	  name: userData.name,
	  surname: userData.surname,
	  email: userData.email,
	  nationalityId: userData.nationalityId,
	  gsm: userData.gsm,
	};
	dispatch(addUser(addUserRequest));
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Surname</label>
          <input type="text" name="surname" value={userData.surname} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Nationality ID</label>
          <input type="text" name="nationalityId" value={userData.nationalityId} onChange={handleInputChange} />
        </div>
        <div>
          <label>GSM</label>
          <input type="text" name="gsm" value={userData.gsm} onChange={handleInputChange} />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
