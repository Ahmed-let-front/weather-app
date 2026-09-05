class WeatherStats {
  #weatherIconMap = {
    0: "icon-sunny.webp",
    1: "icon-partly-cloudy.webp",
    2: "icon-partly-cloudy.webp",
    3: "icon-overcast.webp",
    45: "icon-fog.webp",
    48: "icon-fog.webp",
    51: "icon-drizzle.webp",
    53: "icon-drizzle.webp",
    55: "icon-drizzle.webp",
    61: "icon-rain.webp",
    63: "icon-rain.webp",
    65: "icon-rain.webp",
    71: "icon-snow.webp",
    73: "icon-snow.webp",
    75: "icon-snow.webp",
    95: "icon-storm.webp",
    99: "icon-storm.webp",
  };
  renderDataWeatherCard(data) {
    const weatherContent = document.getElementById("weatherContent");
    const isoString = data.current.time;
    const normalDate = new Date(isoString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const iconFile =
      this.#weatherIconMap[data.current.weather_code] || `icon-sunny.webp`;
    const iconPath = `../src/assets/images/${iconFile}`;
    const markupDataWeatherCard = `
    <div>
      <h2
        id="cityName"
        class="font-display text-xl font-bold sm:text-2xl"
      >
        ${data.city}, ${data.locality || ""}
      </h2>
     <time
      id="dateLabel"
      datetime="${isoString}"
      class="mt-1 text-sm text-neutral-200 sm:text-base"
    >
      ${normalDate}
    </time>
    </div>
    <div class="flex items-center gap-4">
      <img src="${iconPath}" alt="Weather Icon" class="w-14 h-14" />
      <output
        id="currentTemp"
        class="font-display text-3xl font-bold sm:text-5xl italic"
      >
        ${data.current.temperature_2m}${data.currentUnits.temperature_2m}
      </output>
    </div>
  `;
    weatherContent.innerHTML = markupDataWeatherCard;
  }
  renderDataWeatherStats(data) {
    const statsConfig = {
      feelsLike: "apparent_temperature",
      humidity: "relative_humidity_2m",
      wind: "wind_speed_10m",
      precip: "precipitation",
    };
    Object.entries(statsConfig).forEach(([elementId, dataKey]) => {
      const element = document.getElementById(elementId);
      if (element) {
        const value = data.current[dataKey];
        const unit = data.currentUnits[dataKey];
        element.textContent = `${value} ${unit}`;
      }
    });
  }
  renderDailyForecast(data) {
    const dailyForecast = document.getElementById("dailyForecast");
    dailyForecast.querySelectorAll("#item-day").forEach((el, i) => {
      const isoString = data.daily.time[i];
      const dayName = new Date(isoString).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const iconFile =
        this.#weatherIconMap[data.daily.weather_code[i]] || `icon-sunny.webp`;
      const iconPath = `../src/assets/images/${iconFile}`;
      const altName = iconFile.split("-")[1].split(".")[0];
      el.innerHTML = `
               <time class="text-base font-medium text-neutral-0" datetime="${isoString}">${dayName}</time>
                <img src="${iconPath}" alt="${altName}" class="h-8 w-8" />
                <div class="flex items-center gap-2 text-sm max-sm:w-full">
                <div class="w-full flex items-center gap-2 max-sm:justify-between">
                    <span class="font-semibold text-neutral-0">${data.daily.temperature_2m_max[i]}°</span>
                    <span class="text-neutral-300">${data.daily.temperature_2m_min[i]}°</span>
                </div>
                </div>`;
    });
  }
  renderItemsListHourly(data, day) {
    const hourlyList = document.getElementById("hourlyList");
    const dayLabel = document.getElementById("dayLabel");
    let markup = "";
    dayLabel.textContent = day;
    data.hourly.time.forEach((hour, i) => {
      const dayFullName = new Date(hour).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!(dayFullName === day)) return;
      const iconFile =
        this.#weatherIconMap[data.hourly.weather_code[i]] || `icon-sunny.webp`;
      const iconPath = `../src/assets/images/${iconFile}`;
      const altName = iconFile.split("-")[1].split(".")[0];
      const isoString = data.hourly.time[i];
      const formattedHour = new Date(isoString).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      markup += `
                <li class="hour-row">
                    <div class="hour-label">
                        <img src="${iconPath}" alt="${altName}" class="h-6 w-6" />
                        <span>${formattedHour}</span>
                    </div>
                    <span class="text-base text-neutral-0">${data.hourly.temperature_2m[i]}${
                      data.hourlyUnits.temperature_2m
                    }</span>
                </li>`;
    });
    hourlyList.innerHTML = markup;
  }
  hiddenDayPanel() {
    const dayPanel = document.getElementById("dayPanel");
    dayPanel.classList.add("hidden-item");
  }
  addHandlerDaySelect(handler) {
    const dayPanel = document.getElementById("dayPanel");
    dayPanel.addEventListener("click", (e) => {
      const dayItem = e.target.closest("#day-item");
      if (!dayItem) return;
      const day = dayItem.dataset.day;
      handler(day);
    });
  }
  renderData(data) {
    this.renderDataWeatherCard(data);
    this.renderDataWeatherStats(data);
    this.renderDailyForecast(data);
  }
}
export default new WeatherStats();
