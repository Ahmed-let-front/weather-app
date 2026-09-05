import { TIME_OUT_SEC } from "./config.js";
const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took long time! Timout after ${s} second`));
    }, 1000 * s);
  });
};
export const AJAX = async (url) => {
  const res = await Promise.race([fetch(url), timeout(TIME_OUT_SEC)]);
  if (!res.ok) throw new Error(`${res.statusText} (${res.status})`);
  const data = await res.json();
  if (!data.results && Object.keys(data).length === 1) throw new Error("No search results found");
  return data;
};
