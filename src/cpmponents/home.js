import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const [weather, setWeather] = useState(null)
    const [favorite, setFavourite] = useState([])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const apiKey = "d6355e7df2134f7e841bcf16d1957922"
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
                const response = await fetch(url)
                const data = await response.json()
                setWeather(data)
            })
        }
    }, [])

    const fetchFavouriteCountries = async () => {
        const response = await fetch("http://localhost:8000/api/v1/countries")
        const data = await response.json();
        setFavourite(data.desiredCountry.map(country => country.country))
    }

    useEffect(() => {
        fetchFavouriteCountries()
    }, [])

    return (
        <>
        <div className="home-container">
            <div style={{backgroundColor:"gray",color:"white"}}>
                {weather ? (
                    <div >
                        <h1>Current weather in {weather.name}</h1>
                        <p>{weather.weather[0].description}</p>
                        <p> Temparature : {weather.main.temp} °C</p>
                        <p>Humidity : {weather.main.humidity} %</p>
                    </div>
                ) : (
                    <p>Loading....</p>
                )
                }
            </div>
            <Link to="/weather">
            <button className="btn">Search Weather for Locations</button>
            </Link>
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

export default Home;