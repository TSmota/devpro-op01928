import type { WeatherForecast } from "@repo/models";
import { isContentfulString } from "@repo/utils";
import { useNavigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { api } from "../api";

interface ForecastContextValue {
  errorMessage?: string;
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
  const [errorMessage, setErrorMessage] = useState<string>();
  const [forecast, setForecast] = useState<WeatherForecast>();

  const navigate = useNavigate();

  const searchCity = useCallback(async (query: string) => {
    if (!isContentfulString(query) || loading) {
      return
    }

    setErrorMessage(undefined);
    setLoading(true);

    const response = await api.get<WeatherForecast>(`/search?city=${query}`)

    if ('error' in response) {
      console.error(`Error fetching search results: ${response.error}`)
      setLoading(false);
      setErrorMessage(response.error);
      return
    }

    setForecast(response.data);
    setLoading(false);
    
    const city = response.data.city.toLowerCase();
    navigate({ to: '/forecast/$city', params: { city } });
  }, [loading, errorMessage]);

  const contextValue: ForecastContextValue = useMemo(() => ({
    errorMessage,
    forecast,
    loading,
    searchCity,
  }), [forecast, loading, searchCity]);

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  )
};
