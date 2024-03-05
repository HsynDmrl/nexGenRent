import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CarFilterModel } from '../../models/filter/response/getCarFilter';
import { FilterService } from '../../services/filterService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configStore/configureStore';
import { Model } from '../../models/models/entity/model';
import { getAll as getAllModels } from '../../store/model/modelSlice';
import { getAll as getAllBrand } from '../../store/brand/brandSlice';
import { getAll as getAllColors } from '../../store/color/colorSlice';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { getAll } from '../../store/car/carSlice';
import { Brand } from '../../models/brands/entity/brand';
import { Color } from '../../models/colors/entity/color';
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

  useEffect(() => {
 
    const initialFilters = {
      brandId: undefined,
      modelId: undefined,
      year: undefined,
      colorId: undefined,
      gearType: '',
      fuelType: '',
      minDailyPrice: undefined,
      maxDailyPrice: undefined
    };
    filterServiceInstance.fetchCarsWithFilters(initialFilters)
      .then(filteredCars => {
        onFilterChange(filteredCars); 
        dispatch(setFilteredCars(filteredCars)); 
      })
      .catch(error => {
        console.error('Arabaları yüklerken bir hata oluştu:', error);
      });
  }, [filterServiceInstance, onFilterChange, dispatch]);



  const years = Array.from({ length: 2024 - 1900 + 1 }, (_, index) => 1900 + index);

  const [colors, setColors] = useState<Color[]>([]);
  const allColors = useSelector((state: RootState) => state.color.allData);
  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  useEffect(() => {
    if (allColors.length > 0) {
      setColors(allColors);
    }
  }, [allColors]);

  const [model, setModel] = useState<Model[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);

  
  const allModels = useSelector((state: RootState) => state.model.allData);
  const allBrand = useSelector((state: RootState) => state.brand.allData);
  

  useEffect(() => {
    dispatch(getAllModels());
      dispatch(getAll());
    }, [dispatch]);
  
    useEffect(() => {
      if (allModels.length > 0) {
        setModel(allModels);
      }
    }, [allModels]);

    useEffect(() => {
      dispatch(getAllBrand());
        dispatch(getAll());
      }, [dispatch]);
    
      useEffect(() => {
        if (allBrand.length > 0) {
          setBrand(allBrand);
        }
      }, [allBrand]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };
  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const filteredCars = await filterServiceInstance.fetchCarsWithFilters(filters);
      onFilterChange(filteredCars); 
      dispatch(setFilteredCars(filteredCars));
    } catch (error) {
     
      console.error('Arabaları filtrelerken bir hata oluştu:', error);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3">
    <Form.Label>Marka</Form.Label>
    <Form.Control as="select" name="brandId" value={filters.brandId} onChange={handleChange}>
      <option value="">Marka Seçiniz</option>
      {brand.map(brand => (
        <option key={brand.id} value={brand.id}>{brand.name}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Model</Form.Label>
    <Form.Control as="select" name="modelId" value={filters.modelId} onChange={handleChange}>
      <option value="">Model Seçiniz</option>
      {model.map(item => (
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
      {colors.map(color => (
        <option key={color.id} value={color.id}>{color.name}</option>
      ))}
    </Form.Control>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Vites Tipi</Form.Label>
    <Form.Control as="select" name="gearType" value={filters.gearType} onChange={handleChange}>
      <option value="">Vites tipi seçiniz</option>
      <option value="MANUAL">Manuel</option>
      <option value="AUTOMATIC">Otomatik</option>
      <option value="SEMI_AUTOMATIC">Yarı Otomatik</option>
      <option value="CVT">CVT</option>
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