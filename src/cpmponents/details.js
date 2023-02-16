import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./weather.css"
const Details = ({inpuvalues}) => {
    console.log(inpuvalues)
    const navigate = useNavigate("")
    const [search, setSearch] = useState("mumbai")
    const [fahren, setFahrein] = useState([])
    const [result, setResult] = useState([])
    const [country, setCountry] = useState([])
    const [favorite, seFavourite] = useState([])
    const [switchTemp, setSwitchTemp] = useState(false)
    const [convertValue, setConvertValue] = useState("")
    const fetchApi = async () => {
        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d6355e7df2134f7e841bcf16d1957922`)
        const dataAccessing = await weatherData.json()
        console.log(dataAccessing)
        setResult([dataAccessing.main])
        setCountry([dataAccessing.sys.country])
        const weatherDataINFahrenheit = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d6355e7df2134f7e841bcf16d1957922`)
        const Fahrenheit = await weatherDataINFahrenheit.json()
        console.log(Fahrenheit)
        setFahrein([Fahrenheit.main])
    }

    useEffect(() => {
        fetchApi()
    }, [])

    const favoriteCountries = (name) => {
        seFavourite([...favorite, name])
    }

    const switchTemparature = (myVal) => {
        setSwitchTemp(!switchTemp)
        setConvertValue(myVal)
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const addCountry = await fetch("http://localhost:8000/api/v1/countries",{
            method:"POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                country
            })
        })
        const res = await addCountry.json()
      if (res.status == 201) {
        navigate('/')
        console.log(res)
      } else {
      }
        navigate("/");
        setCountry("")
    }

    return (
        <>
            <div className="whole-container">
                <div className="container">
                    <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="Search for a city temparature" />
                    <button className="fetchapi-button" style={{ height: "30px" }} onClick={fetchApi}>Search</button>
                </div>

                <div className="celcius">
                    {result.map((city, i) => {
                        return (
                            <div key={i}>
                                <h1>{search}</h1>
                                {
                                    !city ? (
                                        <p>No City Found</p>
                                    ) : (
                                        <div>
                                            <p><strong>Temparature : </strong>{city.temp} °Celcius</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </div>

                <div className="fahreinheit">
                    {fahren.map((city, i) => {
                        return (
                            <div key={i}>
                                {
                                    !city ? (
                                        <p>No City Found</p>
                                    ) : (
                                        <div>
                                            <p><strong>Temparature : </strong>{city.temp} Fahrenheit</p>
                                            <button onClick={() => switchTemparature(city.temp)}>Switching Temparature :
                                                {switchTemp === false ? (
                                                    <p>{city.temp} Fahrenheit</p>
                                                ) : (
                                                    <p>{((city.temp) / 9.83).toFixed(2)} °Celcius</p>
                                                )
                                                }
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="addingcountry">
                    {country.map((city, i) => {
                        return (
                            <div key={i}>
                                {
                                    !city ? (
                                        <p>No City Found</p>
                                    ) : (
                                        <div>
                                            <span><strong>Country : </strong>{city.country}</span>
                                            <button style={{ display: "inline", marginLeft: "20px" }}
                                                onClick={(e) => { handleUpload(e) }}>add Favorite Country</button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </div>
                <div className="favorite-countries">
                    {
                        favorite.map((country, i) => {
                            return (
                                <p key={i}><strong>Favorite: </strong><span style={{ marginLeft: "5px" }}>{country}</span></p>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Details;
