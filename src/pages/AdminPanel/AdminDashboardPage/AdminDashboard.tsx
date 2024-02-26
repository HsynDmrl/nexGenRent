import React, { useEffect, useState } from 'react';
import { getAll as getAllCars } from '../../../store/car/carSlice';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllBrands } from '../../../store/brand/brandSlice';
import { getAll as getAllCustomers } from '../../../store/customer/customerSlice';
import { getAll as getAllEmployees } from '../../../store/employee/employeeSlice';
import { getAll as getAllInvoices } from '../../../store/invoice/invoiceSlice';
import { getAll as getAllRentals } from '../../../store/rental/rentalSlice';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartData } from 'chart.js/auto';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { Rental } from '../../../models/rentals/entity/rental';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { getGearTypeLabel } from '../../../models/cars/entity/gearType';
import { getFuelTypeLabel } from '../../../models/cars/entity/fuelType';
import { Card } from 'react-bootstrap';
import { FaBuilding, FaCar, FaFileInvoiceDollar, FaToolbox, FaUsers } from 'react-icons/fa';
import { IoIosPeople } from "react-icons/io";
import './AdminDashboard';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import getIconForEntity from '../../../components/entityIcon/entityIcon';
import EntityIcon from '../../../components/entityIcon/entityIcon';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


interface DataState {
	brands: any[];
	models: any[];
	cars: any[];
	customers: any[];
	employees: any[];
	invoices: any[];
	rentals: any[];
}

const AdminDashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const allRentals = useAppSelector((state) => state.rental.allData);
	const [dataState, setDataState] = useState<DataState>({
		brands: [],
		models: [],
		cars: [],
		customers: [],
		employees: [],
		invoices: [],
		rentals: [],
	});

	useEffect(() => {
		dispatch(getAllBrands()).then((brands) => setDataState((prevState) => ({ ...prevState, brands: brands.payload as any[] })));
		dispatch(getAllModels()).then((models) => setDataState((prevState) => ({ ...prevState, models: models.payload as any[] })));
		dispatch(getAllCars()).then((cars) => setDataState((prevState) => ({ ...prevState, cars: cars.payload as any[] })));
		dispatch(getAllCustomers()).then((customers) => setDataState((prevState) => ({ ...prevState, customers: customers.payload as any[] })));
		dispatch(getAllEmployees()).then((employees) => setDataState((prevState) => ({ ...prevState, employees: employees.payload as any[] })));
		dispatch(getAllInvoices()).then((invoices) => setDataState((prevState) => ({ ...prevState, invoices: invoices.payload as any[] })));
		dispatch(getAllRentals()).then((rentals) => setDataState((prevState) => ({ ...prevState, rentals: rentals.payload as any[] })));
	}, [dispatch]);

	const tableData = [
		{ entity: 'Marka Sayısı', count: dataState.brands.length },
		{ entity: 'Model Sayısı', count: dataState.models.length },
		{ entity: 'Araç Sayısı', count: dataState.cars.length },
		{ entity: 'Çalışan Sayısı', count: dataState.employees.length },
		{ entity: 'Müşteri Sayısı', count: dataState.customers.length },
		{ entity: 'Kiralama Sayısı', count: dataState.rentals.length }
	];

	const totalDistributionData: ChartData<'pie'> = {
		labels: [
			'Marka Sayısı',
			'Model Sayısı',
			'Araç Sayısı',
			'Çalışan Sayısı',
			'Müşteri Sayısı',
			'Kiralama Sayısı'
		],
		datasets: [
			{
				data: [
					dataState.brands?.length ?? 0,
					dataState.models?.length ?? 0,
					dataState.cars?.length ?? 0,
					dataState.employees?.length ?? 0,
					dataState.customers?.length ?? 0,
					dataState.rentals?.length ?? 0
				],
				backgroundColor: [
					'#FF5252', '#FF6D00', '#FFC400', '#00E676', '#1DE9B6', '#2979FF'
				],
				hoverBackgroundColor: [
					'#FF1744', '#FF9100', '#FFAB00', '#00C853', '#00BFA5', '#2962FF'
				],
			},
		],
	};


	const brandDistributionData: ChartData<'pie'> = {
		labels: ['Marka Sayısı'],
		datasets: [
			{
				data: [dataState.brands?.length ?? 0],
				backgroundColor: ['#FF5252', '#FF6D00', '#FFC400', '#00E676', '#1DE9B6', '#2979FF'],
				hoverBackgroundColor: ['#FF1744', '#FF9100', '#FFAB00', '#00C853', '#00BFA5', '#2962FF'],
			},
		],
	};

	const carsDistributionData: ChartData<'pie'> = {
		labels: ['Araç Sayısı'],
		datasets: [
			{
				data: [dataState.cars?.length ?? 0],
				backgroundColor: ['#D500F9', '#651FFF', '#3D5AFE', '#00B0FF', '#00E5FF', '#1DE9B6'],
				hoverBackgroundColor: ['#AA00FF', '#6200EA', '#304FFE', '#0091EA', '#00B8D4', '#00BFA5'],
			},
		],
	};

	const modelDistributionData: ChartData<'pie'> = {
		labels: ['Model Sayısı'],
		datasets: [
			{
				data: [dataState.models?.length ?? 0],
				backgroundColor: ['#F50057', '#FF4081', '#C51162', '#7B1FA2', '#651FFF', '#3D5AFE'],
				hoverBackgroundColor: ['#C51162', '#F06292', '#880E4F', '#4A148C', '#6200EA', '#304FFE'],
			},
		],
	};

	const employeeDistributionData: ChartData<'pie'> = {
		labels: ['Çalışan Sayısı'],
		datasets: [
			{
				data: [dataState.employees?.length ?? 0],
				backgroundColor: ['#FF9800', '#FFA000', '#FFAB00', '#FFB300', '#FFC107', '#FFCA28'],
				hoverBackgroundColor: ['#FFA000', '#FFB300', '#FFC400', '#FFD54F', '#FFD740', '#FFD740'],
			},
		],
	};

	const customerDistributionData: ChartData<'pie'> = {
		labels: ['Müşteri Sayısı'],
		datasets: [
			{
				data: [dataState.customers?.length ?? 0],
				backgroundColor: ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'],
				hoverBackgroundColor: ['#388E3C', '#689F38', '#AFB42B', '#FDD835', '#FFA000', '#FFA000'],
			},
		],
	};

	const calculateMonthlySales = () => {
		const monthlySales = new Array(12).fill(0);
		allRentals.forEach((rental: Rental) => {
			const rentalDate = new Date(rental.startDate);
			const month = rentalDate.getMonth();
			monthlySales[month] += rental.totalPrice;
		});
		return monthlySales;
	};

	const monthlySales = calculateMonthlySales();

	const chartData: ChartData<'bar'> = {
		labels: [
			'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
			'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
		],
		datasets: [
			{
				label: 'Aylık Satışlar',
				data: monthlySales,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	};

	const calculateYearlySales = () => {
		const yearlySales = new Array(12).fill(0);
		monthlySales.forEach((monthlySale, index) => {
			const month = index % 12;
			yearlySales[month] += monthlySale;
		});
		return yearlySales;
	};

	const yearlySales = calculateYearlySales();

	const yearlyChartData: ChartData<'bar'> = {
		labels: [
			'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
			'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
		],
		datasets: [
			{
				label: 'Yıllık Satışlar',
				data: yearlySales,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	};

	const countOccurrences = (items: string[]) => items.reduce((acc, item) => {
		acc[item] = (acc[item] || 0) + 1;
		return acc;
	}, {} as { [key: string]: number });

	const prepareChartData = () => {
		if (!Array.isArray(dataState.cars)) {
			return {
				gearTypeLabels: [],
				gearTypeData: [],
				fuelTypeLabels: [],
				fuelTypeData: [],
			};
		}
	
		const gearTypes = dataState.cars.map(car => getGearTypeLabel(car?.gearType));
		const fuelTypes = dataState.cars.map(car => getFuelTypeLabel(car?.fuelType));
	
		const gearTypeCounts = countOccurrences(gearTypes);
		const fuelTypeCounts = countOccurrences(fuelTypes);

		const gearTypeLabels = Object.keys(gearTypeCounts);
		const gearTypeData = Object.values(gearTypeCounts);

		const fuelTypeLabels = Object.keys(fuelTypeCounts);
		const fuelTypeData = Object.values(fuelTypeCounts);

		return {
			gearTypeLabels,
			gearTypeData,
			fuelTypeLabels,
			fuelTypeData,
		};
	};

	const { gearTypeLabels, gearTypeData, fuelTypeLabels, fuelTypeData } = prepareChartData();

	const carAttributesChartData: ChartData<'bar'> = {
		labels: [...gearTypeLabels],
		datasets: [
			{
				label: 'Toplam Vites Türü Dağılımı',
				data: gearTypeData,
				backgroundColor: 'rgba(54, 162, 235, 0.5)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
		],
	};

	const carFuelAttributesChartData: ChartData<'bar'> = {
		labels: [...fuelTypeLabels],
		datasets: [
			{
				label: 'Toplam Yakıt Türü Dağılımı',
				data: fuelTypeData,
				backgroundColor: 'rgba(255, 206, 86, 0.5)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
			},
		],
	};


	return (
		<Container>
			<Row className='mb-5'>
				{tableData.map((data, index) => (
					<EntityBox key={index} entity={data.entity} count={data.count} icon={<EntityIcon entity={data.entity} />} />
				))}
			</Row>

			<Row>
				<Col xs={12} md={6} lg={8} className="col-9 mb-4">
					<Card className="h-100 shadow-sm text-center">
						<Card.Header>Aylık Satışlar</Card.Header>
						<Card.Body>
							<div style={{ height: '450px' }}>
								<Bar data={chartData} />
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={6} lg={4} className="col-3 mb-4">
					<Card className="h-100 w-11 shadow-sm text-center">
						<Card.Header>Toplam Dağılım</Card.Header>
						<Card.Body>
							<div style={{ height: '450px' }}>
								<Pie data={totalDistributionData} />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col xs={12} className="mb-4 custom-table-container">
					<Table striped bordered hover className="custom-table">
						<thead>
							<tr>
								<th>Varlıklar</th>
								<th>Toplam</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((data, index) => (
								<tr key={index}>
									<td data-label="Varlıklar">{data.entity}</td>
									<td data-label="Toplam">{data.count}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>

			<Row className="mb-5">
				<Col xs={12} md={6} lg={6} className="col-6 mb-2">
					<Card className="h-100 shadow-sm text-center">
						<Card.Header>Yakıt Türü Dağılımı</Card.Header>
						<Card.Body>
							<div style={{ height: '250px' }}>
								<Bar data={carFuelAttributesChartData} />
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={12} md={6} lg={6} className="col-6 mb-2">
					<Card className="h-100 shadow-sm text-center">
						<Card.Header>Vites Türü Dağılımı</Card.Header>
						<Card.Body>
							<div style={{ height: '250px' }}>
								<Bar data={carAttributesChartData} />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col xs={12} md={6} lg={12}>
					<Card className="h-100 shadow-sm text-center">
						<Card.Header>Yıllık Satışlar</Card.Header>
						<Card.Body>
							<div style={{ height: '700px' }}>
								<Bar data={yearlyChartData} />
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);

};

export default AdminDashboard;