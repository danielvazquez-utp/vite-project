import React, { useEffect, useState } from 'react'
import Componente1 from './Componente1';
import LineChart from '../echarts/LineChart';

const AirQualityScreen = () => {

    const [city, setCity] = useState('Puebla');
    const [aqi, setAqi] = useState(0);
    const [source, setSource] = useState('SNICA');
    const [station, setStation] = useState('Conocida');
    const [co, setCo] = useState(0);
    const [dew, setDew] = useState(0);
    const [h, setH] = useState(0);
    const [no2, setNo2] = useState(0);
    const [o3, setO3] = useState(0);
    const [p, setP] = useState(0);
    const [pm10, setPm10] = useState(0);
    const [pm25, setPm25] = useState(0);
    const [so2, setSo2] = useState(0);
    const [t, setT] = useState(0);
    const [w, setW] = useState(0);
    const [wg, setWg] = useState(0);
    const [time, setTime] = useState('2024-05-17 00:00:00');
    const [scale, setScale] = useState(['primary', 'desconocida', 'Por determinar']);
    const [latitud, setLatitud] = useState('19.115858055556');
    const [longitud, setLongitud] = useState('-98.277487222222');
    const [temperatura, setTemperatura] = useState(10);
    const [humedad, setHumedad] = useState(0);
    const [presion, setPresion] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [temps, setTemps] = useState([]);
    const [dates, setDates] = useState([]);

    const token='dc70001fc567310aca4f8f2dd2ec4ddaf33a677f';
    const apiKey='b90add97e8658958811faddd000ec8b5';

    const getWeather = async(lat, lon) => {
        console.log(lat, lon);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ apiKey }&units=metric&lang=es`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Datos clima", data);
        setTemperatura(data.main.temp);
        setHumedad(data.main.humidity);
        setPresion(data.main.pressure);
        setDescripcion(data.weather[0].description);
    }

    const getWeatherForecast = async(lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lon }&appid=${ apiKey }&units=metric&lang=es`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Predicción del clima en los siguientes 5 días: ", data);
        const lista = data.list;
        let temperaturas = []
        let fechas = []
        lista.forEach(objeto => {
            temperaturas.push(objeto.main.temp)
            fechas.push(objeto.dt_txt)
        });
        console.log(temperaturas)
        console.log(fechas)
        setTemps(temperaturas)
        setDates(fechas)
    }

    const getAQI = async(ciudad) => {
        const url = `https://api.waqi.info/feed/${ ciudad }/?token=${ token }`;
        const response =  await fetch(url);
        const data = await response.json();
        console.log(data);
        setCity(data.data.city.name);
        setAqi(data.data.aqi);
        setSource(data.data.attributions[0]);
        setTime(data.data.time.s);
        setScale(getScale(data.data.aqi));
        setLatitud(data.data.city.geo[0]);
        setLongitud(data.data.city.geo[0]);
    }

    const getData = () => {
        getAQI(city);
        getWeather(latitud, longitud);
    }

    const getScale = (aqi) => {
        let color = "";
        let nivel = "";
        let mensaje= "";
        switch (true) {
            case aqi>=0 && aqi <=50:
                color = "success";
                nivel = "Buena";
                mensaje = "No se anticipan impactos a la salud cuando la calidad del aire se encuentra en este intervalo.";
                break;
            case aqi>=51 && aqi <=100:
                color = "warning";
                nivel = "Moderado";
                mensaje = "Las personas extraordinariamente sensitivas deben considerar limitación de los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi>=101 && aqi <=150:
                color = "orange";
                nivel = "Dañina a la Salud de los Grupos Sensitivos";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi>=151 && aqi <=200:
                color = "danger";
                nivel = "Dañino para la salud";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar los esfuerzos excesivos prolongados al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos y prolongados al aire libre.";
                break;
            case aqi>=201 && aqi <=300:
                color = "purple";
                nivel = "Muy Dañina a la Salud";
                mensaje = "Los niños y adultos activos, y personas con enfermedades respiratorias tales como el asma, deben evitar todos los esfuerzos excesivos al aire libre; las demás personas, especialmente los niños, deben limitar los esfuerzos físicos excesivos al aire libre.";
                break;
            default:
                color = "maroon";
                nivel = "Arriesgado";
                mensaje = "Fin del mundo.";
                break;
        }
        //console.log(color, nivel, mensaje);
        return [color, nivel, mensaje];
    }

    useEffect(() => {
      getAQI(city);
      getWeather(latitud, longitud);
      getWeatherForecast(latitud, longitud);
    }, [])
    

  return (
    <>
        <div className='row'>
            <div className='col-12'>
                <div className='card card-primary'>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label>Buscar</label>
                            <input type='text' className='form-control' placeholder='Ciudad, Estación o País' value={ city } onChange={ e => setCity(e.target.value) } />
                        </div>
                    </div>
                    <div className='card-footer'>
                        <button className='btn bg-purple btn-lg' onClick={ () => getData() } >Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <div><a href={source.url} target='_blank' title='Ir al sitio'>{ source.name } { time }</a></div>
        <div className='card card-info'>
            <div className='card-header'>
                <h4 className='card-title'>{ city }</h4>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 style={{ fontSize:"10rem" }}>{ temperatura }°</h1>
                    </div>
                    <div className='col-4'>
                        <Componente1 valor={ humedad + " %" } texto="Humedad" />
                    </div>
                    <div className='col-4'>
                        <Componente1 valor={ presion + " B"} texto="Presión" />
                    </div>
                    <div className='col-4'>
                        <Componente1 valor={ descripcion } texto="Descripción" />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                        <Componente1 valor={ aqi } texto="AQI" icono="far fa-paper-plane" color={`bg-${scale[0]}`} descripcion={ scale[1] } />
                    </div>
                    <div className='col-md-6 col-xs-12'>
                        <p>
                            { scale[2] }
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-xs-12'>
                        <Componente1 valor={ 10 } texto="CO" icono="far fa-paper-plane" color="bg-primary" />
                    </div>
                    <div className='col-lg-4 col-md-6 col-xs-12'>
                        <Componente1 valor={ 5.7 } texto="O" icono="far fa-surprise" color="bg-orange" />
                    </div>
                    <div className='col-lg-4 col-md-6 col-xs-12'>
                        <Componente1 />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <LineChart temperaturas={ temps } fechas={ dates } titulo={"Predicción del clima los próximos 5 días"} />
                    </div>
                </div>
            </div>
            <div className='card-footer'>
                <button className='btn btn-secondary'>Cancelar</button>
                <button className='btn btn-success float-right'>Aceptar</button>
            </div>
        </div>
    </>
  )
}

export default AirQualityScreen;