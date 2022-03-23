import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface BarProps {
    labels: Array<string>;
    data: Array<number | undefined>;
    title: string;
}
function BarChart(props: BarProps) {
    const state = {
        labels: props.labels,
        datasets: [
            {
                label: "Reservations",
                borderWidth: 2,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                data: props.data
            }
        ]
    }
    return (<div>
        <Bar
            data={state}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: props.title,
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }}
        />

    </div>)
}

export default BarChart