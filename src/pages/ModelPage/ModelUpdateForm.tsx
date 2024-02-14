import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configStore/configureStore';
import { Brand } from '../../models/brands/entity/brand';
import { getAll } from '../../store/brand/brandSlice';
import { UpdateModelRequest } from "../../models/models/requests/updateModelRequest";
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

interface ModelUpdateFormProps {
  model: UpdateModelRequest;
  onUpdate: (updatedModelData: UpdateModelRequest) => void;
  selectedId: number;
}

const ModelUpdateForm: React.FC<ModelUpdateFormProps> = ({ model, onUpdate, selectedId }) => {
  const [updatedModel, setUpdatedModel] = useState<UpdateModelRequest>({ ...model });
  const [brands, setBrands] = useState<Brand[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const allBrands = useSelector((state: RootState) => state.brand.allData);

  useEffect(() => {
    setBrands(allBrands);
  }, [allBrands]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "id") {
      onUpdate({ ...updatedModel, id: Number(value) });
    } else {
      setUpdatedModel((prevModel) => ({
        ...prevModel,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedModel);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" name="id" value={updatedModel.id} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={updatedModel.name} onChange={handleChange} />
      </label>
      <label>
        Brand:
        <select name="brandId" value={updatedModel.brandId} onChange={handleChange}>
          <option value="">Select a brand</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Update Model</button>
    </form>
  );
};

export default ModelUpdateForm;
