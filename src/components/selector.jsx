'use client'
import React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { fetchUrl } from '@/lib/data'
import { LineChart } from '@mui/x-charts/LineChart'

const uData = [400, 3000, 2000, 2780, 1890, 2390, 3490]
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]
const x_Labels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G']
const n2 = [null, 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']

function Selector({ dados }) {
    const [agregado, setAgregado] = React.useState('')
    const [agregado2, setAgregado2] = React.useState()
    const [agregado2Data, setAgregado2Data] = React.useState()
    const [variaveis, setVariaveis] = React.useState()
    const [variavelNome, setVariavelNome] = React.useState()
    const [urlAgg, setUrlAgg] = React.useState()
    const [urlFinal, setUrlFinal] = React.useState()

    const [xLabels, setXlabels] = React.useState(x_Labels)

    const [series, setSeries] = React.useState([
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
    ])

    // const handleChange = (event) => {
    //     fetchUrl()
    //     setAgregado(event.target.value)
    // }

    function handleChange(e) {
        setAgregado(e.target.value)
        // console.log(e.target.value)
        const result = dados.filter((item) => item.nome == e.target.value)
        // console.log(result[0])
        setAgregado2(result[0].nome)
        setAgregado2Data(result[0].agregados)
    }

    async function handleChange2(e) {
        setAgregado2(e.target.value)
        // console.log(agregado2)
        // console.log(agregado2Data)
        const result = agregado2Data.filter((item) => item.nome == e.target.value)
        // console.log(result)
        const url = `https://servicodados.ibge.gov.br/api/v3/agregados/${result[0].id}/metadados`
        setUrlAgg(`https://servicodados.ibge.gov.br/api/v3/agregados/${result[0].id}`)
        // console.log(url)
        const metadados = await fetchUrl(url)
        // console.log(metadados)
        setVariaveis(metadados.variaveis)
    }

    function handleChange3(e) {
        setVariavelNome(e.target.value)
        const result = variaveis.filter((item) => item.nome == e.target.value)
        //servicodados.ibge.gov.br/api/v3/agregados/4099/periodos/-6/variaveis/4099
        setUrlFinal(`${urlAgg}/periodos/-12/variaveis/${result[0].id}?localidades=N2[1,2,3,4,5]`)
        // console.log(urlFinal)
        // const finalData = await fetchUrl(urlFinal)
        // console.log(finalData)
    }

    async function handleGraph() {
        const finalData = await fetchUrl(urlFinal)
        // for (const value in data) {
        //     // console.log(data[value])
        //     estados.push(data[value].localidade.nome)
        //     valores.push(parseFloat(data[value].serie['202304']))
        // }

        const dt = finalData[0].resultados[0].series
        const seriess = []
        const xlabels = Object.keys(dt[0].serie)

        for (const idx in dt) {
            console.log(dt[idx])
            const serie = Object.values(dt[idx].serie)
            seriess.push({ data: serie, label: dt[idx].localidade.nome })
        }
        setSeries(seriess)
        setXlabels(xlabels)

        // console.log(finalData[0].resultados[0].series[0])
    }

    return (
        <Paper className='m-10 p-2 flex flex-col'>
            <Select
                size='small'
                className='m-3'
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={agregado}
                onChange={handleChange}
                label='agregado'
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {dados.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.nome}>
                            {item.nome}
                        </MenuItem>
                    )
                })}
            </Select>{' '}
            {agregado2 && (
                <Select
                    size='small'
                    placeholder='Agregado'
                    name='Agregado'
                    className='m-3'
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={agregado2}
                    onChange={handleChange2}
                    label='agregado'
                >
                    <MenuItem value='vazio'>
                        <em>Vazio</em>
                    </MenuItem>
                    {agregado2Data.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.nome}>
                                {item.id + ' - ' + item.nome}
                            </MenuItem>
                        )
                    })}
                </Select>
            )}
            {variaveis && (
                <Select
                    size='small'
                    placeholder='Agregado'
                    name='Agregado'
                    className='m-3'
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={variavelNome}
                    onChange={handleChange3}
                    label='agregado'
                >
                    <MenuItem value='vazio'>
                        <em>Vazio</em>
                    </MenuItem>
                    {variaveis.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.nome}>
                                {item.id + ' - ' + item.nome}
                            </MenuItem>
                        )
                    })}
                </Select>
            )}
            <div>
                <div className='flex flex-row ml-3'>
                    {n2.map((item, idx) => {
                        if (idx > 0) {
                            return <FormControlLabel key={idx} control={<Checkbox size='small' />} label={n2[idx]} />
                        }
                    })}

                    {/* <FormControlLabel control={<Checkbox size='small' />} label='Required' />
                    <FormControlLabel control={<Checkbox size='small' />} label='Disabled' /> */}
                </div>
                {/* <Checkbox
                    size='small'
                    // checked={checked}
                    onChange={() => {}}
                    inputProps={{ 'aria-label': 'controlled' }}
                /> */}
            </div>
            {urlFinal && <Button onClick={handleGraph}>Gráfico</Button>}
            {urlFinal && <Typography variant='body2'>{urlFinal}</Typography>}
            <LineChart height={300} series={series} xAxis={[{ scaleType: 'point', data: xLabels }]} />
        </Paper>
    )
}

export default Selector
