"use client";

import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import swal from "sweetalert";
import { motion } from "framer-motion";
import Main from "../components/Main";
import Footer from "../components/Footer";

type WeatherData = {
  name: string;
  main: { temp: number; humidity: number };
  wind: { speed: number };
  weather: { main: string }[];
};

const Home = () => {
  // Saving input value
  const [inputField, setInputField] = useState<string>("");

  // Aiming input to focus
  const inputFocus = useRef<HTMLInputElement>(null!);

  // Focus input
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const [main, setMain] = useState(false);
  const [footer, setFooter] = useState(false);

  // Data API
  const [data, setData] = useState<WeatherData>(null!);
  const searchDataApi = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputField}&appid=acc9b85378b15e529a1304ae2ac92690&units=metric`
      );
      if (response.status === 200) {
        setData(response.data);
        setMain(true);
        setFooter(true);
      } else {
        setMain(false);
        setFooter(false);
      }
    } catch (error) {
      setMain(false);
      setFooter(false);
      swal(`No such a country name like: ${inputField}`);
    } finally {
      setInputField("");
      inputFocus.current.focus();
    }
  };

  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="container mx-auto flex justify-center items-center h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: "-100vw" }}
          animate={{ opacity: 1, y: "0" }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: "spring",
            mass: 1.2,
          }}
          className="p-5 rounded-2xl text-center bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg shadow-indigo-500/50 w-[90%] md:w-fit"
        >
          <header className="flex justify-between items-center gap-2 pointer-events-auto">
            {/* Input */}
            <input
              type="search"
              placeholder="Enter city name..."
              ref={inputFocus}
              value={inputField}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputField(e.target.value)
              }
              className="py-2 px-4 rounded-full text-lg focus:border-none focus:outline-none text-black w-[80%] md:w-full"
            />

            {/* Icon */}
            <div
              onClick={searchDataApi}
              className="w-12 md:w-14 h-12 bg-white flex justify-center items-center rounded-full cursor-pointer"
            >
              <BiSearchAlt className="text-black text-3xl" />
            </div>
          </header>

          {main && (
            <Main
              weather={data.weather[0].main || "clear"}
              temp={data.main.temp}
              name={data.name}
            />
          )}

          {footer && (
            <Footer humidity={data.main.humidity} wind={data.wind.speed} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
