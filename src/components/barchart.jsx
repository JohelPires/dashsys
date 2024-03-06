'use client'

import { BarChart } from '@mui/x-charts/BarChart'

const BarChartPlot = ({ x, y, title }) => {
    // const data = [
    //     {
    //         name: 'Jan',
    //         high: 4000,
    //         low: 2400,
    //     },
    //     {
    //         name: 'Feb',
    //         high: 5000,
    //         low: 1500,
    //     },
    //     {
    //         name: 'Mar',
    //         high: 6000,
    //         low: 3000,
    //     },
    //     {
    //         name: 'Apr',
    //         high: 6500,
    //         low: 4500,
    //     },
    //     {
    //         name: 'May',
    //         high: 7000,
    //         low: 2200,
    //     },
    //     {
    //         name: 'Jun',
    //         high: 8000,
    //         low: 3500,
    //     },
    //     {
    //         name: 'Jul',
    //         high: 7400,
    //         low: 5500,
    //     },
    // ]

    // const meses = []
    // const valores = []
    // for (const value in data) {
    //     // console.log(data[value].name)
    //     meses.push(data[value].name)
    //     valores.push(data[value].high)
    // }

    return (
        <>
            <h2>{title}</h2>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: x,
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: y,
                    },
                ]}
                width={1300}
                height={500}
            />
        </>
    )
}
export default BarChartPlot
