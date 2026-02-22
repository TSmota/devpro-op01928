import { HTTPService } from "@repo/services";

const WEATHER_SERVER_URL = import.meta.env.VITE_BACKEND_URL;

export const api = new HTTPService(WEATHER_SERVER_URL ?? "http://localhost:3000/api");
