'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Droplet, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherdata } from "./action";
import { WeatherData } from "@/types/weather";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

function SubmitButton() {
  return(
    <Button type="submit">
      <Search className="w-4 h-4"/>
    </Button>
  )
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSearch = async (formData: FormData) => {
    const city = formData.get("city") as string;
    const {data} = await getWeatherdata(city);
    
    if (data) {
      setWeather(data);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
          <Input name="city" type="text" placeholder="Enter city name" className="bg-white/90" required/>
          <SubmitButton/>
        </form>

        {weather && (
          <div>
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">{weather.name}</h2>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={68} height={68}/>
                  <div className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</div>
                </div>
                <div className="text-gray-500 mt-1 capitalize">{weather.weather[0].description}</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                  <div className="text-center"><Thermometer className="w-6 h-6 mx-auto text-amber-500"/>
                  <div className="mt-2 font-bold text-gray-600">Feels like</div>
                  <div className="font-bold text-gray-600">{Math.round(weather.main.feels_like)}°C</div>
                  </div>
                  <div className="text-center"><Droplet className="w-6 h-6 mx-auto text-blue-500"/>
                  <div className="mt-2 font-bold text-gray-600">Humidity</div>
                  <div className="font-bold text-gray-600">{Math.round(weather.main.humidity)}%</div>
                  </div>
                  <div className="text-center"><Wind className="w-6 h-6 mx-auto text-gray-500"/>
                  <div className="mt-2 font-bold text-gray-600">Wind</div>
                  <div className="font-bold text-gray-600">{Math.round(weather.wind.speed)} m/s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
