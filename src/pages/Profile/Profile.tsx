import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { fetchUser, getAllUsers, getUser } from "../../store/user/userSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dataUser = useSelector((state: RootState) => state.base.data);
  const allData = useSelector((state: RootState) => state.base.allData);
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
	  dispatch(getUser(1));
	  dispatch(getAllUsers());
	  dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      {user && (
        <div>
          <h1>Hoş geldiniz, {user.name} {user.surname}</h1>
		  <h1>getByid</h1>
          <p>Email: {user.email}</p>
          <p>TC No: {user.nationalityId}</p>
          <p>GSM: {user.gsm}</p>
          <p>Role: {user.roleName}</p>
        </div>
      )}
	  {dataUser && (
        <div>
          <h1>Hoş geldiniz, {dataUser.name} {dataUser.surname}</h1>
		  <h1>getByEmail</h1>
          <p>Email: {dataUser.email}</p>
          <p>TC No: {dataUser.nationalityId}</p>
          <p>GSM: {dataUser.gsm}</p>
          <p>Role: {dataUser.roleName}</p>
        </div>
      )}
      {allData && (
        <div>
          <h2>Tüm Kullanıcılar:</h2>
		  <h1>getAll</h1>
          <ul>
            {allData.map((userData) => (
              <li key={userData.id}>
                {userData.name} {userData.surname} - {userData.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
