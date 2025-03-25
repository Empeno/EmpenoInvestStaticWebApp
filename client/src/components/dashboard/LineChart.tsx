import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart: React.FC<LineProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

const ExampleUsage = () => {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Profit',
        data: [855, 755, 956, 841, 690, 750, 950],
        fill: false,
        borderColor: 'rgb(56, 189, 248)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Last 7 months',
      },
    },
  };

  return <LineChart data={data} options={options} />;
};

export default ExampleUsage;
