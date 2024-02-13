import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/configStore/configureStore';
import { getAll, addModel } from '../../store/model/modelSlice';
import { Brand } from '../../models/brands/entity/brand';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

const AddModelForm = () => {
  const [modelData, setModelData] = useState({
    id: 0,
    name: '',
    brandId: 0,
  });
  const [brands, setBrands] = useState<Brand[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const allBrands = useSelector((state: RootState) => state.brand.allData);

  useEffect(() => {
    if (allBrands.length > 0) {
      setBrands(allBrands);
    }
  }, [allBrands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModelData({ ...modelData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addModel(modelData));
  };

  return (
    <div>
      <h2>Add Model</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={modelData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Brand</label>
          <select name="brandId" value={modelData.brandId} onChange={handleInputChange}>
            <option value="">Select a brand</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Model</button>
      </form>
    </div>
  );
};

export default AddModelForm;
