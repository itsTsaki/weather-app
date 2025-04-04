'use server'

import { WeatherData } from "@/types/weather";


export async function getWeatherdata(city: string): Promise< {
  data ?: WeatherData,
  error?: string }> {
  try {
    if(!city.trim()){
      return {error:  "City name is required!"};
    }

    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);

    if(!res.ok){
      throw new Error("City not found");
    }

    const data = await res.json();
    return {data};
  } catch (error) {
    console.log(error)
    return{error: "Failed to fetch data"}
  }
}