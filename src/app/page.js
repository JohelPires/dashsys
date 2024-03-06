import Image from 'next/image'
import Button from '@mui/material/Button'
import BarChartPlot from '../components/barchart'
import LineChartPlot from '../components/linechart'

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ]

export default async function Home() {
    const url =
        'https://servicodados.ibge.gov.br/api/v3/agregados/6396/periodos/202304/variaveis/4099?localidades=N3[11,12,13,14,15,16,17,31,33,35,50,51]&classificacao=2[6794]'

    const taxa_des = await fetch(url)
        .then((res) => res.json())
        .then((data) => data)

    const data = taxa_des[0].resultados[0].series
    console.log(taxa_des)
    const title = taxa_des[0].variavel
    const estados = []
    const valores = []
    for (const value in data) {
        console.log(data[value])
        estados.push(data[value].localidade.nome)
        valores.push(parseFloat(data[value].serie['202304']))
    }
    console.log(estados, valores)

    return (
        <main>
            <BarChartPlot x={estados} y={valores} title={title} />
            <LineChartPlot />
            <Button variant='contained'>Hello world</Button>
        </main>
    )
}
