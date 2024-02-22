import React, { useEffect } from "react";
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { useSelector } from "react-redux";
import { RootState } from "../../store/configStore/configureStore";
import { getAll, getById, updateModel, setSelectedIdAction } from "../../store/model/modelSlice";
import ModelUpdateForm from "./ModelUpdateForm";
import ModelAddForm from "./ModelAddForm";
import { deleteModel } from "../../store/model/modelSlice";
import { UpdateModelRequest } from "../../models/models/requests/updateModelRequest";

const Model: React.FC = () => {
    const dispatch = useAppDispatch();

    const allData = useSelector((state: RootState) => state.model.allData);
    const model = useSelector((state: RootState) => state.model.dataFromById);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const handleUpdateModel = (updatedModelData: UpdateModelRequest) => {
       dispatch(updateModel(updatedModelData));
    };

	const handleModelSelect = (id: number) => {
		dispatch(setSelectedIdAction(id));
		dispatch(getById(id));
	};
	
    const handleDeleteModel = (id: number) => {
        dispatch(deleteModel(id));
    };

	return (
		<div>
			{model && (
				<div>
					<h1>getByid</h1>
					<p>Model Name : {model.name}</p>
					<p>Brand: {model.brand.name}</p>
				</div>
			)}
			<hr />
			{allData && (
				<div>
					<h2>Tüm Kullanıcılar:</h2>
					<h1>getAll</h1>
					<ul>
						{allData.map((modelData) => (
							<li key={modelData.id} onClick={() => handleModelSelect(modelData.id)}>
								{modelData.id} {modelData.name} {modelData.brand.name}
							</li>
						))}
					</ul>
				</div>
			)}
			<hr />
			<div>
				{model && (
					<div>
					<h1>updateModel</h1>
					<ModelUpdateForm model={{ ...model, brandId: model.brand.id }} onUpdate={handleUpdateModel} selectedId={model.id} />
				</div>
				)}
				{(
					<div>
						<h1>updateModel</h1>
						<ModelAddForm />
					</div>
				)}
			</div>
			<hr />
			<ul>
				<h1>deleteModel</h1>
				{allData.map((modelData) => (
					<li key={modelData.id}>
						{modelData.id} {modelData.name} {modelData.brand.name}
						<button onClick={() => handleDeleteModel(modelData.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Model;

