import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { getByEmail, getAll, getById, updateUser, setSelectedIdAction } from "../../store/user/userSlice";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { User } from "../../models/users/entity/user";
import { all } from "axios";
import ProfileAddForm from "./ProfileAddForm";
import { deleteUser } from "../../store/user/userSlice";

const Profile: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const dataUser = useSelector((state: RootState) => state.user.dataFromByEmail);
	const allData = useSelector((state: RootState) => state.user.allData);
	const user = useSelector((state: RootState) => state.user.dataFromById);


	useEffect(() => {
		dispatch(getAll());
		dispatch(getByEmail());
	}, [dispatch]);

	const handleUpdateUser = (updatedUserData: User) => {
		dispatch(updateUser(updatedUserData));
	};

	const handleUserSelect = (id: number) => {
		dispatch(setSelectedIdAction(id));
		console.log(id);
	};

	const handleDeleteUser = (id: number) => {
		dispatch(deleteUser(id));
	};
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
			<hr />
			{dataUser && (
				<div>
					<h1>Hoş geldiniz, {dataUser.name} {dataUser.surname}</h1>
					<h1>getByEmail</h1>
					<p>Email: {dataUser.email}</p>
					<p>id {dataUser.id}</p>
					<p>TC No: {dataUser.nationalityId}</p>
					<p>GSM: {dataUser.gsm}</p>
					<p>Role: {dataUser.roleName}</p>
				</div>
			)}
			<hr />
			{allData && (
				<div>
					<h2>Tüm Kullanıcılar:</h2>
					<h1>getAll</h1>
					<ul>
						{allData.map((userData) => (
							<li key={userData.id} onClick={() => handleUserSelect(userData.id)}>
								{userData.id} {userData.name} {userData.surname} - {userData.email}
							</li>
						))}
					</ul>
				</div>
			)}
			<hr />
			<div>
				{user && (
					<div>
						<h1>updateUser</h1>
						<ProfileUpdateForm user={user} onUpdate={handleUpdateUser} />
					</div>
				)}
				{(
					<div>
						<h1>updateUser</h1>
						<ProfileAddForm />
					</div>
				)}
			</div>
			<hr />
			<ul>
				<h1>deleteUser</h1>
				{allData.map((userData) => (
					<li key={userData.id}>
						{userData.id} {userData.name} {userData.surname} - {userData.email}
						<button onClick={() => handleDeleteUser(userData.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Profile;

