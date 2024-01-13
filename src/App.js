import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCar,
  updateNewCarData,
  updateUpdateCarData,
  fetchCars,
  fetchModelsAndColors,
} from './store/slices/carSlice';
import CarService from './services/CarService';

function App() {
  const dispatch = useDispatch();

  const carsData = useSelector((state) => state.cars.cars);
  const selectedCar = useSelector((state) => state.cars.selectedCar);
  const newCarData = useSelector((state) => state.cars.newCarData);
  const updateCarData = useSelector((state) => state.cars.updateCarData);
  const models = useSelector((state) => state.cars.models);
  const colors = useSelector((state) => state.cars.colors);

  useEffect(() => {
    dispatch(fetchCars());
    dispatch(fetchModelsAndColors());
  }, [dispatch]);

  const handleCarClick = (car) => {
    dispatch(selectCar(car));
    dispatch(updateUpdateCarData({
      plate: car.plate,
      modelId: car.modelId,
      colorId: car.colorId,
      kilometer: car.kilometer,
      year: car.year,
      dailyPrice: car.dailyPrice,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNewCarData({
      ...newCarData,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUpdateCarData({
      ...updateCarData,
      [name]: value,
    }));
  };

  const handleAddCar = async () => {
    try {
      const carService = new CarService();
      await carService.add(newCarData);

      dispatch(fetchCars());
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const carService = new CarService();

      const updateData = {
        id: selectedCar.id,
        kilometer: updateCarData.kilometer,
        year: updateCarData.year,
        dailyPrice: updateCarData.dailyPrice,
        plate: updateCarData.plate,
        modelId: updateCarData.modelId,
        colorId: updateCarData.colorId,
      };

      await carService.update(updateData);

      dispatch(fetchCars());
      dispatch(selectCar(null));
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      const carService = new CarService();
      await carService.delete(selectedCar.id);

      dispatch(fetchCars());
      dispatch(selectCar(null));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <h1>Car List</h1>
      <button onClick={handleAddCar}>Add New Car</button>

      <form>
        <label>
          Plate:
          <input
            type="text"
            name="plate"
            value={newCarData.plate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Model:
          <select
            name="modelId"
            value={newCarData.modelId}
            onChange={handleInputChange}
          >
            <option value="">Select a model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color:
          <select
            name="colorId"
            value={newCarData.colorId}
            onChange={handleInputChange}
          >
            <option value="">Select a color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Kilometer:
          <input
            type="number"
            name="kilometer"
            value={newCarData.kilometer}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={newCarData.year}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Daily Price:
          <input
            type="number"
            name="dailyPrice"
            value={newCarData.dailyPrice}
            onChange={handleInputChange}
          />
        </label>
      </form>

      <ul>
        {carsData.map((car) => (
          <li key={car.plate} onClick={() => handleCarClick(car)}>
            {car.plate} - {car.modelName} - {car.colorName}
          </li>
        ))}
      </ul>

      {selectedCar && (
        <div>
          <h2>Selected Car Details</h2>
          <p>Plate: {selectedCar.plate}</p>
          <p>Model: {selectedCar.modelName}</p>
          <p>Color: {selectedCar.colorName}</p>
          <p>Kilometer: {selectedCar.kilometer}</p>
          <p>Year: {selectedCar.year}</p>
          <p>Daily Price: {selectedCar.dailyPrice}</p>
        </div>
      )}

      {selectedCar && (
        <div>
          <h2>Update Car</h2>
          <form>
            <label>
              Plate:
              <input
                type="text"
                name="plate"
                value={updateCarData.plate}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Model:
              <select
                name="modelId"
                value={updateCarData.modelId}
                onChange={handleUpdateInputChange}
              >
                <option value="">Select a model</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Color:
              <select
                name="colorId"
                value={updateCarData.colorId}
                onChange={handleUpdateInputChange}
              >
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Kilometer:
              <input
                type="number"
                name="kilometer"
                value={updateCarData.kilometer}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                name="year"
                value={updateCarData.year}
                onChange={handleUpdateInputChange}
              />
            </label>
            <label>
              Daily Price:
              <input
                type="number"
                name="dailyPrice"
                value={updateCarData.dailyPrice}
                onChange={handleUpdateInputChange}
              />
            </label>

            <button type="button" onClick={handleUpdateCar}>
              Update Car
            </button>

            <button type="button" onClick={handleDeleteCar}>
              Delete Car
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
