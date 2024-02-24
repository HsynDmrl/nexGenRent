import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { getAll as getAllRentals } from '../../../store/rental/rentalSlice';
import { Rental } from '../../../models/rentals/entity/rental';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js/auto';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const allRentals = useAppSelector((state) => state.rental.allData);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllRentals());
    }, [dispatch]);

    useEffect(() => {
        if (allRentals.length > 0) {
            setDataLoaded(true);
        }
    }, [allRentals]);

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

    return (
		<div className="container">
        <div style={{ width: '400px', height: '300px' }}>
            <div>
                <Bar data={chartData} />
            </div>
        </div>
		</div>
    );
};

export default AdminDashboard;
