import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { fetchUser } from "../../store/user/userSlice";

const Profile: React.FC = () => {

const dispatch = useDispatch<AppDispatch>();

const user = useSelector((state: RootState) => state.user.data);

useEffect(() => {
	dispatch(fetchUser());
}, [dispatch]);

  return (

    <div>
      {user && (
        <div>
          <h1>Hoş geldiniz, {user.name} {user.surname}</h1>
          <p>Email: {user.email}</p>
          <p>TC No: {user.nationalityId}</p>
          <p>GSM: {user.gsm}</p>
          <p>Role: {user.roleName}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
