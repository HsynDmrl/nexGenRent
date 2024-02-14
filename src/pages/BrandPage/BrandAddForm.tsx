import { useState, ChangeEvent, FormEvent } from 'react';
import { addBrand } from '../../store/brand/brandSlice';
import { AddBrandRequest } from '../../models/brands/requests/addBrandRequest';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';

const AddBrandForm = () => {
  const [brandData, setBrandData] = useState<AddBrandRequest>({
	id: 0,
    name: '',
	logoPath: '',
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandData({ ...brandData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
	e.preventDefault();
	const addBrandRequest: AddBrandRequest = {
	  id: brandData.id,
	  name: brandData.name,
	  logoPath: brandData.logoPath,
	};
	dispatch(addBrand(addBrandRequest));
  };

  return (
    <div>
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={brandData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Path Logo</label>
          <input type="text" name="logoPath" value={brandData.logoPath} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Brand</button>
      </form>
    </div>
  );
};

export default AddBrandForm;
