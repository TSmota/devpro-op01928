import { WeatherForecast } from "@repo/models";
import { isContentfulString } from "@repo/utils";
import { useNavigate } from "@tanstack/react-router";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

interface ForecastContextValue {
  loading?: boolean;
  forecast?: WeatherForecast;
  searchCity: (query: string) => Promise<void>;
}

export const ForecastContext = createContext<ForecastContextValue>({} as ForecastContextValue);

export const useForecastContext = () => {
  const context = useContext(ForecastContext);

  if (!context) {
    throw new Error("useForecastContext must be used within a ForecastProvider");
  }

  return context;
}

export const ForecastProvider = (props: PropsWithChildren) => {
  const { children } = props
  
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [forecast, setForecast] = useState<WeatherForecast>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!forecast) {
      return
    }

    const city = forecast.city.toLowerCase();
    
    navigate({ to: '/forecast/$city', params: { city } });
  }, [forecast, navigate]);

  const searchCity = useCallback(async (query: string) => {
    if (!isContentfulString(query) || loading || hasError) {
      return
    }

    setLoading(true);

    const { data, error } = await api.get<WeatherForecast>(`/search?city=${query}`)

    if (error) {
      console.error(`Error fetching search results: ${error}`)
      setLoading(false);
      setHasError(true);
      return
    }

    setForecast(data);
    setLoading(false);
  }, [loading, hasError]);

  const contextValue: ForecastContextValue = useMemo(() => ({
    forecast: forecast,
    loading,
    searchCity,
  }), [forecast, loading, searchCity]);

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  )
};
