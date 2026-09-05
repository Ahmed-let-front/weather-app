import {
  API_WEATHER,
  API_GEOCODING,
  API_GEOCODING_KEY,
  API_WEATHER_SEARCH,
} from "./config.js";
import { AJAX } from "./helper.js";
import units from "./view/units.js";
export const state = {
  weather: {
    current: {},
    currentUnits: {},
    hourly: {},
    hourlyUnits: {},
    daily: {},
    dailyUnits: {},
    city: "",
    locality: "",
    currLat: 0,
    currLng: 0,
  },
  units: {
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  },
  unitsActive: [],
  searchWeatherRes: [],
};
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const setDataInObjectState = (dataWeather, dataCity) => {
  state.weather.current = dataWeather.current;
  state.weather.currentUnits = dataWeather.current_units;
  state.weather.hourly = dataWeather.hourly;
  state.weather.hourlyUnits = dataWeather.hourly_units;
  state.weather.daily = dataWeather.daily;
  state.weather.dailyUnits = dataWeather.daily_units;
  state.weather.city = dataCity.city;
  state.weather.locality = dataCity.locality;
  state.weather.currLat = dataCity.latitude;
  state.weather.currLng = dataCity.longitude;
};
const setDataInObjectStateWithoutDataCity = (data) => {
  state.weather.current = data.current;
  state.weather.currentUnits = data.current_units;
  state.weather.hourly = data.hourly;
  state.weather.hourlyUnits = data.hourly_units;
  state.weather.daily = data.daily;
  state.weather.dailyUnits = data.daily_units;
};
export const setDataWeather = async () => {
  const geo = await getPosition();
  const { latitude, longitude } = geo.coords;
  const [dataWeather, dataCity] = await Promise.all([
    AJAX(
      `${API_WEATHER}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${state.units.temperature_unit}&wind_speed_unit=${state.units.wind_speed_unit}&precipitation_unit=${state.units.precipitation_unit}`,
    ),
    AJAX(
      `${API_GEOCODING}?latitude=${latitude}&longitude=${longitude}&key=${API_GEOCODING_KEY}`,
    ),
  ]);
  setDataInObjectState(dataWeather, dataCity);
};
export const setDataFromSearch = async (query) => {
  if (!query) return;
  const res = await AJAX(`${API_WEATHER_SEARCH}${query}`);
  const data = res.results[0];
  const dataCity = {
    city: data.country,
    locality: data.name,
    latitude: data.latitude,
    longitude: data.longitude,
  };
  const { latitude, longitude } = data;
  const dataWeather = await AJAX(
    `${API_WEATHER}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${state.units.temperature_unit}&wind_speed_unit=${state.units.wind_speed_unit}&precipitation_unit=${state.units.precipitation_unit}`,
  );
  setDataInObjectState(dataWeather, dataCity);
};
export const SearchSuggestions = async (query) => {
  const data = await AJAX(`${API_WEATHER_SEARCH}${query}`);
  state.searchWeatherRes = data.results.slice(0, 4);
};
export const searchSuggestionsSetData = async (data) => {
  const dataWeather = await AJAX(
    `${API_WEATHER}/forecast?latitude=${data.lat}&longitude=${data.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${state.units.temperature_unit}&wind_speed_unit=${state.units.wind_speed_unit}&precipitation_unit=${state.units.precipitation_unit}`,
  );
  const dataCity = {
    city: data.city,
    locality: data.locality,
    latitude: data.lat,
    longitude: data.lng,
  };
  setDataInObjectState(dataWeather, dataCity);
};
export const unitOperation = async (data) => {
  setNewUnit(data);
  const dataRes = await AJAX(
    `${API_WEATHER}/forecast?latitude=${state.weather.currLat}&longitude=${state.weather.currLng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${state.units.temperature_unit}&wind_speed_unit=${state.units.wind_speed_unit}&precipitation_unit=${state.units.precipitation_unit}`,
  );
  setDataInObjectStateWithoutDataCity(dataRes);
};
const setNewUnit = (data) => {
  data.forEach((el) => {
    const query = el.dataset.group;
    const unit = el.dataset.value;
    state.units[query] = unit;
  });
  const dataStortge = data.map((el) => {
    const unit = el.dataset.value;
    const query = el.dataset.group;
    return { unit, query };
  });
  localStorage.setItem("btnsActiveUnitsPanel", JSON.stringify(dataStortge));
};
export const getBtnsActiveUnitAndSetNewData = () => {
  const allUnitsActive = JSON.parse(
    localStorage.getItem("btnsActiveUnitsPanel"),
  );
  state.unitsActive = allUnitsActive;
  if (!allUnitsActive) return;
  allUnitsActive.forEach((el) => {
    const query = el.query;
    const unit = el.unit;
    state.units[query] = unit;
  });
};
