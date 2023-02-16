import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Details from "./details"
import "./weather.css"
const Weather = () => {
    const [inputvalues, setInputvalues] = useState("")
    const [list, setList] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const navigate = useNavigate("")
    const fetchFavouriteLists = async () => {
        const response = await fetch("http://localhost:8000/api/v1/lists")
        const data = await response.json();
        setList([data.main])
    }

    useEffect(() => {
        fetchFavouriteLists()
    }, [])

    const handleLists = async (e) => {
        e.preventDefault()
        const addList = await fetch("http://localhost:8000/api/v1/lists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                list
            })
        })
        const res = await addList.json()
        if (res.status == 201) {
          navigate('/')
          console.log(res)
        } else {
        }
          navigate("/details");
    }

const handleResults = ()=> {
    setSearchResult([...searchResult,inputvalues])
    setInputvalues("")
}

    const favoriteCountries = (name) => {
        setSearchResult([...searchResult, name])
    }


    return (
        <>
            <div className="whole-container">
                <div className="container">
                    <input type="text" value={inputvalues} onChange={(e) => { setInputvalues(e.target.value) }}
                        placeholder="Search for a city temparature" />
                    {/* <Link to="/details"> */}
                        <button className="fetchapi-button" onClick={handleResults} style={{ height: "30px" }} type="submit">Add Location</button>
                    {/* </Link> */}
                    <Link to="/details">
                        <button className="fetchapi-button" style={{height:"30px"}}>Click me for weather Info</button>
                    </Link>
                    <div className="favorite-countries">
                    {
                        searchResult.map((inputvalues, i) => {
                            return (
                                <p key={i}><strong>Location: </strong><span style={{ marginLeft: "5px" }}>{inputvalues}</span></p>
                            )
                        })
                    }
                </div>
                    <div className="details">
                        <Details inpuvalues={inputvalues} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Weather;


















