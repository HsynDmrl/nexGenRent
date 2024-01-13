import React, { useEffect, useState } from 'react';
import './App.css';
import CarService from "./services/CarService";
import ModelService from "./services/ModelService";
import ColorService from "./services/ColorService";

function App() {
  const [carsData, setCarsData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newCarData, setNewCarData] = useState({
    plate: '',
    modelId: '',
    colorId: '',
    kilometer: 0,
    year: 2022,
    dailyPrice: 0,
  });
  const [updateCarData, setUpdateCarData] = useState({
    plate: '',
    modelId: '',
    colorId: '',
    kilometer: 0,
    year: 2022,
    dailyPrice: 0,
  });
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carService = new CarService();
        const response = await carService.getAll();

        if (Array.isArray(response.data)) {
          setCarsData(response.data);
        } else {
          console.error('Error: Response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    const fetchModelsAndColors = async () => {
      try {
        const modelService = new ModelService();
        const colorService = new ColorService();

        const modelResponse = await modelService.getAll();
        const colorResponse = await colorService.getAll();

        if (Array.isArray(modelResponse.data)) {
          setModels(modelResponse.data);
        } else {
          console.error('Error: Model response data is not an array');
        }

        if (Array.isArray(colorResponse.data)) {
          setColors(colorResponse.data);
        } else {
          console.error('Error: Color response data is not an array');
        }
      } catch (error) {
        console.error('Error fetching models and colors:', error);
      }
    };

    fetchData();
    fetchModelsAndColors();
  }, []);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setUpdateCarData({
      plate: car.plate,
      modelId: car.modelId,
      colorId: car.colorId,
      kilometer: car.kilometer,
      year: car.year,
      dailyPrice: car.dailyPrice,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCar = async () => {
    try {
      const carService = new CarService();
      await carService.add(newCarData);

      const updatedResponse = await carService.getAll();
      if (Array.isArray(updatedResponse.data)) {
        setCarsData(updatedResponse.data);
      }
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

      const updatedResponse = await carService.getAll();
      if (Array.isArray(updatedResponse.data)) {
        setCarsData(updatedResponse.data);
        setSelectedCar(null);
      }
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async () => {
    try {
      const carService = new CarService();
      await carService.delete(selectedCar.id);

      const updatedResponse = await carService.getAll();
      if (Array.isArray(updatedResponse.data)) {
        setCarsData(updatedResponse.data);
        setSelectedCar(null);
      }
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
