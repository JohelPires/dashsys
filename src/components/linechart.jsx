'use client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

const uData = [400, 3000, 2000, 2780, 1890, 2390, 3490]
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]
const x_Labels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G']

export default function LineChartPlot() {
    const [url, setUrl] = useState(
        'https://servicodados.ibge.gov.br/api/v3/agregados/6396/periodos/202203|202204|202302|202301|202303|202304/variaveis/4099?localidades=N3[11,12,13,14,15,16,17,31,33,35,50,51]&classificacao=2[6794]'
    )
    const [series, setSeries] = useState([
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
    ])
    const [xLabels, setXlabels] = useState(x_Labels)

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const dt = data[0].resultados[0].series
                console.log(dt[0].serie)
                const seriess = []
                const xlabels = Object.keys(dt[0].serie)
                for (const value in dt) {
                    // console.log(dt[value])
                    const serie = Object.values(dt[value].serie)
                    seriess.push({ data: serie, label: dt[value].localidade.nome })

                    // estados.push(data[value].localidade.nome)
                    // valores.push(parseFloat(data[value].serie['202304']))
                }
                setSeries(seriess)
                setXlabels(xlabels)
            })
    }, [url])

    return <LineChart width={1300} height={300} series={series} xAxis={[{ scaleType: 'point', data: xLabels }]} />
}
