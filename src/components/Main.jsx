import React from "react";
import "./Main.css";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

function Main() {
  const [input, setInput] = useState("Allahabad");
  const [temp, setTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7348430ee1msh0c4c2080227d37cp103d08jsncd53573b7d37",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setLoading(true);
    let data = await fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${input}`,
      options
    );
    data = await data.json();
    setLoading(false);
    setTemp(data.temp);
    setFeelsLike(data.feels_like);
    console.log("Data", data);
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date();
  const todaydate = date.getDate();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const Month = months[month];
  const Week = weeks[day];

  console.log(Month);

  // const handleClear =()=>{
  //   setInput('')
  // }

  return (
    <div className="main_container">
      <div className="child">
        <div className="first_row">
          <input
            className="input_area"
            type="text"
            value={input}
            onChange={handleOnChange}
            placeholder="Search..."
          />
        </div>

        <div className="second_row">
          <h1>{input}</h1>
        </div>

        <div className="third_row">
          <h3>{`${Week} ${todaydate} ${Month} ${year}`} </h3>
        </div>
        <div className="temp_box">
          {loading ? <Spinner /> : <h1 id="center_temp">{temp}&deg;c</h1>}
        </div>
        <div className="fifth_row">
          <h3 className="center_text">{`Feels Like ${feelsLike}`}&deg;C</h3>
        </div>
        <div className="sixth_row">
          <h1 className="center_text">Clouds</h1>
        </div>
      </div>
    </div>
  );
}

export default Main;
