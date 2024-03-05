import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CarFilterModel } from '../../models/filter/response/getCarFilter';
import { FilterService } from '../../services/filterService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configStore/configureStore';
import { getAll as getAllModels } from '../../store/model/modelSlice';
import { getAll as getAllBrand } from '../../store/brand/brandSlice';
import { getAll as getAllColors } from '../../store/color/colorSlice';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { setFilteredCars } from '../../store/car/carSlice'


interface Props {
  onFilterChange: (filters: CarFilterModel) => void;
}

const Filter: React.FC<Props> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<CarFilterModel>({
    brandId: undefined, 
    modelId: undefined,
    year: undefined,
    colorId: undefined,
    gearType: '',
    fuelType: '',
    minDailyPrice: undefined,
    maxDailyPrice: undefined
  });
  const dispatch = useAppDispatch();
  const [filterServiceInstance] = useState(new FilterService());
  const years = Array.from({ length: 2024 - 1900 + 1 }, (_, index) => 1900 + index);
  const allModels = useSelector((state: RootState) => state.model.allData);
  const allBrand = useSelector((state: RootState) => state.brand.allData);
  const allColors = useSelector((state: RootState) => state.color.allData);

  useEffect(() => {
    dispatch(getAllColors());
    dispatch(getAllModels());
    dispatch(getAllBrand());
  }, [dispatch]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("seçtim", e.target.value)
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange(filters);
    filterServiceInstance.fetchCarsWithFilters(filters).then((response) => {
      dispatch(setFilteredCars(response));
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Marka</Form.Label>
    <Form.Control as="select" name="brandId" value={filters.brandId} onChange={handleChange}>
      <option value="">Marka Seçiniz</option>
      {allBrand.map(brand => (
        <option key={brand.id} value={brand.id}>{brand.name}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Model</Form.Label>
    <Form.Control as="select" name="modelId" value={filters.modelId} onChange={handleChange}>
      <option value="">Model Seçiniz</option>
      {allModels.map(item => (
        <option key={item.id} value={item.id}>{item.name}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Yıl</Form.Label>
    <Form.Control as="select" name="year" value={filters.year} onChange={handleChange}>
      <option value="">Yıl Seçiniz</option>
      {years.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Renk</Form.Label>
    <Form.Control as="select" name="colorId" value={filters.colorId} onChange={handleChange}>
      <option value="">Renk Seçiniz</option>
      {allColors.map(color => (
        <option key={color.id} value={color.id}>{color.name}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Vites Tipi</Form.Label>
    <Form.Control as="select" name="gearType" value={filters.gearType} onChange={handleChange}>
      <option value="">Vites tipi seçiniz</option>
      <option value="MANUEL">Manuel</option>
      <option value="AUTO">Otomatik</option>
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Yakıt Tipi</Form.Label>
    <Form.Control as="select" name="fuelType" value={filters.fuelType} onChange={handleChange}>
      <option value="">Yakıt tipi seçiniz</option>
      <option value="DIESEL">Dizel</option>
      <option value="ELECTRIC">Elektrikli</option>
      <option value="HYBRID">Hibrit</option>
      <option value="GASOLINE">Benzinli</option>
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Minimum Günlük Fiyat</Form.Label>
    <Form.Control type="number" name="minDailyPrice" value={filters.minDailyPrice} onChange={handleChange} />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Maksimum Günlük Fiyat</Form.Label>
    <Form.Control type="number" name="maxDailyPrice" value={filters.maxDailyPrice} onChange={handleChange} />
  </Form.Group>

  <Button variant="primary" type="submit">Filtrele</Button>
</Form>
  );
};

export default Filter;