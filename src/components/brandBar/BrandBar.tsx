// BrandBar.tsx
import React, { useEffect } from 'react';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch'; 
import { getAll as getAllBrands } from '../../store/brand/brandSlice'; 
import './BarndBar.css'; 
const BrandBar = () => {
    const dispatch = useAppDispatch();
    const brands = useAppSelector((state) => state.brand.allData);
    const loading = useAppSelector((state) => state.brand.loading);
  
    useEffect(() => {
      dispatch(getAllBrands());
    }, [dispatch]);
  
    if (loading) {
      return <div>Loading brands...</div>;
    }
  
    return (
      <div className="brand-bar">
        
        {brands.map((brand) => (
          <img key={brand.id} src={brand.logoPath} alt={brand.name} className="brand-logo" />
        ))}
      </div>
    );
  };
  
  export default BrandBar;