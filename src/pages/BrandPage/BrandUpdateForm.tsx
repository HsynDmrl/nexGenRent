import React, { useState } from "react";
import { Brand } from "../../models/brands/entity/brand";

interface BrandUpdateFormProps {
  brand: Brand;
  onUpdate: (updatedBrandData: Brand) => void;
  selectedId: number;
}

const BrandUpdateForm: React.FC<BrandUpdateFormProps> = ({ brand, onUpdate }) => {
  const [updatedBrand, setUpdatedBrand] = useState<Brand>({ ...brand });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target;
	if (name === "id") {
	  onUpdate({ ...updatedBrand, id: Number(value) });
	} else {
	  setUpdatedBrand((prevBrand) => ({
		...prevBrand,
		[name]: value,
	  }));
	}
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedBrand);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" name="id" value={updatedBrand.id} onChange={handleChange}  />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={updatedBrand.name} onChange={handleChange} />
      </label>
      <label>
	  	LogoPath:
        <input type="text" name="logoPath" value={updatedBrand.logoPath} onChange={handleChange} />
      </label>
      <button type="submit">Update Brand</button>
    </form>
  );
};

export default BrandUpdateForm;
