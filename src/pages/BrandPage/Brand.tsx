import React, { useEffect } from "react";
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { useSelector } from "react-redux";
import { RootState } from "../../store/configStore/configureStore";
import { getAll, getById, updateBrand, setSelectedIdAction } from "../../store/brand/brandSlice";
import BrandUpdateForm from "./BrandUpdateForm";
import { Brand as BrandEntity } from "../../models/brands/entity/brand";
import BrandAddForm from "./BrandAddForm";
import { deleteBrand } from "../../store/brand/brandSlice";

const Brand: React.FC = () => {
    const dispatch = useAppDispatch();

    const allData = useSelector((state: RootState) => state.brand.allData);
    const brand = useSelector((state: RootState) => state.brand.dataFromById);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    const handleUpdateBrand = (updatedBrandData: BrandEntity) => {
        dispatch(updateBrand(updatedBrandData));
    };
	const handleBrandSelect = (id: number) => {
		dispatch(setSelectedIdAction(id));
		dispatch(getById(id));
	};
	
    const handleDeleteBrand = (id: number) => {
        dispatch(deleteBrand(id));
    };

	return (
		<div>
			{brand && (
				<div>
					<h1>getByid</h1>
					<p>Brand Name : {brand.name}</p>
					<p>Logopath: {brand.logoPath}</p>
				</div>
			)}
			<hr />
			{allData && (
				<div>
					<h2>Tüm Kullanıcılar:</h2>
					<h1>getAll</h1>
					<ul>
						{allData.map((brandData) => (
							<li key={brandData.id} onClick={() => handleBrandSelect(brandData.id)}>
								{brandData.id} {brandData.name} {brandData.logoPath}
							</li>
						))}
					</ul>
				</div>
			)}
			<hr />
			<div>
				{brand && (
					<div>
						<h1>updateBrand</h1>
						<BrandUpdateForm brand={brand} onUpdate={handleUpdateBrand} selectedId={brand.id} />
					</div>
				)}
				{(
					<div>
						<h1>updateBrand</h1>
						<BrandAddForm />
					</div>
				)}
			</div>
			<hr />
			<ul>
				<h1>deleteBrand</h1>
				{allData.map((brandData) => (
					<li key={brandData.id}>
						{brandData.id} {brandData.name} {brandData.logoPath}
						<button onClick={() => handleDeleteBrand(brandData.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Brand;

