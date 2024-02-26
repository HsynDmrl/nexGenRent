// BrandBar.tsx
import React, { useEffect } from 'react';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch'; // Custom hook'larınızı kullanın
import { getAll as getAllBrands } from '../../store/brand/brandSlice'; // getAllBrands ismini kullanarak çakışmayı önleyin
import './BarndBar.css'; // Özel stil dosyası

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