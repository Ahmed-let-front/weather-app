(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://api.open-meteo.com/v1`,t=`https://geocoding-api.open-meteo.com/v1/search?name=`,n=`https://api-bdc.net/data/reverse-geocode-client`,r=`bdc_2478984e54954c2782b8e9d7672198b5`,i=e=>new Promise((t,n)=>{setTimeout(()=>{n(Error(`Request took long time! Timout after ${e} second`))},1e3*e)}),a=async e=>{let t=await Promise.race([fetch(e),i(10)]);if(!t.ok)throw Error(`${t.statusText} (${t.status})`);let n=await t.json();if(!n.results&&Object.keys(n).length===1)throw Error(`No search results found`);return n},o=new class{constructor(){this.handlerUnitsBtn()}handlerUnitsBtn(){let e=document.getElementById(`unitsBtn`),t=document.getElementById(`unitsPanel`),n=document.getElementById(`unitsChevron`);e.addEventListener(`click`,()=>{t.classList.toggle(`hidden-item`),n.classList.toggle(`rotate-180`);let r=e.getAttribute(`aria-expanded`);dayBtn.setAttribute(`aria-expanded`,r!==`true`)})}markOnActiveBtns(e){e&&document.getElementById(`unitsPanel`).querySelectorAll(`button`).forEach((t,n)=>{if(n===0)return;t.querySelector(`svg`).classList.add(`hidden-item`);let r=t.dataset.value;e.flatMap(e=>e.unit).includes(r)&&t.querySelector(`svg`).classList.remove(`hidden-item`)})}addHandlerSwitchToImperial(e){let t=document.getElementById(`switchSystemBtn`),n=document.getElementById(`unitsPanel`);t.addEventListener(`click`,()=>{n.querySelectorAll(`button`).forEach((e,t)=>{t!==0&&e.querySelector(`svg`).classList.toggle(`hidden-item`)}),e([...n.querySelectorAll(`button:has(svg:not(.hidden-item))`)])})}addHandlerClickOfListPanel(e){let t=document.getElementById(`unitsPanel`);t.addEventListener(`click`,n=>{let r=n.target.closest(`.dropdown-option`);if(!r||!r.querySelector(`svg`).classList.contains(`hidden-item`))return;let i=r.dataset.group;r.dataset.group,n.currentTarget.querySelectorAll(`[data-group='${i}']`).forEach(e=>{e.querySelector(`svg`).classList.add(`hidden-item`)}),r.querySelector(`svg`).classList.remove(`hidden-item`),e([...t.querySelectorAll(`button:has(svg:not(.hidden-item))`)])})}},s={weather:{current:{},currentUnits:{},hourly:{},hourlyUnits:{},daily:{},dailyUnits:{},city:``,locality:``,currLat:0,currLng:0},units:{temperature_unit:`celsius`,wind_speed_unit:`kmh`,precipitation_unit:`mm`},unitsActive:[],searchWeatherRes:[]},c=()=>new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(e,t)}),l=(e,t)=>{s.weather.current=e.current,s.weather.currentUnits=e.current_units,s.weather.hourly=e.hourly,s.weather.hourlyUnits=e.hourly_units,s.weather.daily=e.daily,s.weather.dailyUnits=e.daily_units,s.weather.city=t.city,s.weather.locality=t.locality,s.weather.currLat=t.latitude,s.weather.currLng=t.longitude},u=e=>{s.weather.current=e.current,s.weather.currentUnits=e.current_units,s.weather.hourly=e.hourly,s.weather.hourlyUnits=e.hourly_units,s.weather.daily=e.daily,s.weather.dailyUnits=e.daily_units},d=async()=>{let{latitude:t,longitude:i}=(await c()).coords,[o,u]=await Promise.all([a(`${e}/forecast?latitude=${t}&longitude=${i}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),a(`${n}?latitude=${t}&longitude=${i}&key=${r}`)]);l(o,u)},f=async n=>{if(!n)return;let r=(await a(`${t}${n}`)).results[0],i={city:r.country,locality:r.name,latitude:r.latitude,longitude:r.longitude},{latitude:o,longitude:c}=r;l(await a(`${e}/forecast?latitude=${o}&longitude=${c}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),i)},p=async e=>{s.searchWeatherRes=(await a(`${t}${e}`)).results.slice(0,4)},m=async t=>{l(await a(`${e}/forecast?latitude=${t.lat}&longitude=${t.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),{city:t.city,locality:t.locality,latitude:t.lat,longitude:t.lng})},h=async t=>{g(t),u(await a(`${e}/forecast?latitude=${s.weather.currLat}&longitude=${s.weather.currLng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`))},g=e=>{e.forEach(e=>{let t=e.dataset.group,n=e.dataset.value;s.units[t]=n});let t=e.map(e=>({unit:e.dataset.value,query:e.dataset.group}));localStorage.setItem(`btnsActiveUnitsPanel`,JSON.stringify(t))},_=()=>{let e=JSON.parse(localStorage.getItem(`btnsActiveUnitsPanel`));s.unitsActive=e,e&&e.forEach(e=>{let t=e.query,n=e.unit;s.units[t]=n})},v=new class{#e={app:document.getElementById(`app`)};constructor(){this.hiddenSuggestionPanelByUnFoucs(),this.showSuggestionPanelByUnFoucs()}getQuery(){return document.querySelector(`#searchInput`).value}addHandlerSearch(e){this.#e.app.addEventListener(`submit`,t=>{t.preventDefault(),t.target.closest(`#searchForm`)&&e()})}unfoucsInSearchInput(){let e=document.querySelector(`#searchInput`);e.value=``,document.activeElement.blur()}renderSerchSuggestions(e){let t=document.getElementById(`suggestionsPanel`),n=``;e.forEach((t,r)=>{n+=`<li id="city-item" data-lat="${e[r].latitude}" data-lng="${e[r].longitude}" data-city="${t.country}" data-locality="${t.name}">
                <button type="button" class="dropdown-link">${t.name}</button>
               </li>
        `}),t.innerHTML=n,t.classList.remove(`hidden-item`)}noResInSuggestionPanel(e){let t=document.getElementById(`suggestionsPanel`);t.innerHTML=`<li><p>${e}</p></li>`}hiddenSuggestionPanelByUnFoucs(){document.addEventListener(`click`,e=>{let t=document.querySelector(`#searchInput`),n=document.getElementById(`suggestionsPanel`),r=t.contains(e.target),i=n.contains(e.target);!r&&!i&&this.hiddenSuggestionPanel()})}showSuggestionPanelByUnFoucs(){document.querySelector(`#searchInput`).addEventListener(`focus`,this.showSuggestionPanel)}hiddenSuggestionPanel(){document.getElementById(`suggestionsPanel`).classList.add(`hidden-item`)}showSuggestionPanel(){document.getElementById(`suggestionsPanel`).classList.remove(`hidden-item`)}addHandlerSuggestions(e){document.querySelector(`#searchInput`).addEventListener(`input`,t=>{e(t.target.value.trim())})}addHandlerSuggestionsClick(e){document.getElementById(`suggestionsPanel`).addEventListener(`click`,t=>{let n=t.target.closest(`#city-item`);n&&e({lat:+n.dataset.lat,lng:+n.dataset.lng,city:n.dataset.city,locality:n.dataset.locality})})}},y=`/weather%20App/assets/sprite-DvK6xIi1.svg`,b=new class{#e=document.getElementById(`app`);#t={weatherContent:document.getElementById(`weatherContent`),hourlyStats:document.getElementById(`hourlyList`),WeatherStats:document.getElementById(`WeatherStats`),dailyForecast:document.getElementById(`dailyForecast`),header:document.getElementById(`headerOfPage`),dayBtn:document.getElementById(`dayBtn`),dayPanel:document.getElementById(`dayPanel`),dayChevron:document.getElementById(`dayChevron`),popups:document.getElementById(`popups`)};constructor(){this.addHandlerDaySelect(),this.addHandlerClosePopupBtn()}#n(){return`
      <div id="error-message" class="flex flex-col items-center justify-center text-center py-16 px-4">
        <svg width="48" height="48" class="text-neutral-300 mb-4">
          <use href="${y}#icon-error"></use>
        </svg>
        <h2 class="text-2xl font-bold text-neutral-0 mb-2">Something went wrong</h2>
        <p class="text-neutral-300 text-sm max-w-sm mb-6">
          We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button id="retryBtn" class="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
          <svg width="16" height="16">
            <use href="${y}#icon-retry"></use>
          </svg>
          Retry
        </button>
      </div>
    `}renderError(e=this.#e){e.innerHTML=this.#n()}renderSkeletonLoading(){this.#t.weatherContent.innerHTML=`
            <div
                id="weatherSkeleton"
                class="relative flex-1  flex items-center justify-center h-full"
              >
                <div class="flex flex-col items-center gap-3 py-8">
                  <div class="flex gap-1.5">
                    <span
                      class="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-0 [animation-delay:-0.3s]"
                    ></span>
                    <span
                      class="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-0 [animation-delay:-0.15s]"
                    ></span>
                    <span
                      class="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-0"
                    ></span>
                  </div>
                  <p class="text-sm text-neutral-200">Loading...</p>
                </div>
            </div>
    `,this.#t.hourlyStats.innerHTML=`
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
              <li
                class="h-[52px] w-full animate-pulse rounded-lg border border-neutral-600 bg-neutral-700/60"
              ></li>
    `,this.#t.WeatherStats.querySelectorAll(`.stat-value`).forEach(e=>e.textContent=`-`),this.#t.dailyForecast.querySelectorAll(`#item-day`).forEach(e=>e.textContent=``)}#r(){this.#t.weatherContent=document.getElementById(`weatherContent`),this.#t.hourlyStats=document.getElementById(`hourlyList`),this.#t.WeatherStats=document.getElementById(`WeatherStats`),this.#t.dailyForecast=document.getElementById(`dailyForecast`),this.#t.dayBtn=document.getElementById(`dayBtn`),this.#t.dayPanel=document.getElementById(`dayPanel`),this.#t.dayChevron=document.getElementById(`dayChevron`),this.addHandlerDaySelect()}renderInintContent(){this.#e.innerHTML=`
       <h1
          class="mx-auto mt-10 max-w-2xl text-center font-display text-2xl font-bold leading-tight sm:mt-14 sm:text-[2.9rem]"
        >
          How&rsquo;s the sky looking today?
        </h1>

        <form
          id="searchForm"
          class="relative mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:mt-10 sm:flex-row"
        >
          <div class="relative flex-1">
            <svg
              class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-300"
            >
              <use href="./src/assets/images/sprite.svg#icon-search"></use>
            </svg>
            <input
              id="searchInput"
              type="text"
              placeholder="Search for a place..."
              autocomplete="off"
              aria-label="search Input"
              class="search-input"
            />

            <ul
              id="suggestionsPanel"
              class="dropdown-panel left-0 hidden-item w-full"
            >
            <li>
                <p>No search results found</p>
              </li>
            </ul>
          </div>
          <button type="submit" class="primary-btn">Search</button>
        </form>

        <div class="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-3">
          <div class="flex flex-col gap-10 lg:col-span-2">
            <div
              id="weatherCard"
              class="relative flex min-h-[220px] flex-col justify-between overflow-hidden-item rounded-2xl border border-neutral-600 bg-gradient-to-br from-blue-500 to-blue-700 p-6 sm:p-8"
            >
              <div
                id="weatherContent"
                class="relative flex flex-col gap-8 sm:flex-row items-center sm:items-center sm:justify-between h-full"
              >
                <div>
                  <h2
                    id="cityName"
                    class="font-display text-xl font-bold sm:text-2xl"
                  >
                    ----
                  </h2>
                  <p
                    id="dateLabel"
                    class="mt-1 text-sm text-neutral-200 sm:text-base"
                  >
                    -----
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <svg width="56" height="56" class="text-yellow-300">
                    <use href="./src/assets/images/sprite.svg#icon-sun"></use>
                  </svg>
                  <output
                    id="currentTemp"
                    class="font-display text-6xl font-bold sm:text-7xl italic"
                  >
                    ---
                  </output>
                </div>
              </div>
            </div>

            <div
              class="grid grid-cols-2 gap-4 sm:grid-cols-4"
              id="WeatherStats"
            >
              <div class="stat-card">
                <p class="stat-label">Feels Like</p>
                <p class="stat-value" id="feelsLike">--</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">Humidity</p>
                <p class="stat-value" id="humidity">--</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">Wind</p>
                <p class="stat-value" id="wind">--</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">Precipitation</p>
                <p class="stat-value" id="precip">--</p>
              </div>
            </div>

            <div>
              <h2 class="mb-4 text-base font-medium text-neutral-0">
                Daily forecast
              </h2>
              <ul
                id="dailyForecast"
                class="flex gap-3 overflow-x-auto pb-4 sm:grid sm:grid-cols-4 sm:overflow-visible md:grid-cols-7"
              >
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
                <li
                  id="item-day"
                  class="flex w-[10rem] min-h-20 shrink-0 flex-col items-center gap-3 rounded-xl border border-neutral-600 bg-neutral-800 px-3 py-4 text-center sm:w-auto sm:shrink"
                ></li>
              </ul>
            </div>
          </div>

          <div
            class="rounded-2xl border border-neutral-600 bg-neutral-800 p-5 sm:p-6 lg:max-h-[640px]"
          >
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-lg font-medium text-neutral-0">
                Hourly forecast
              </h2>
              <div class="relative">
                <button
                  id="dayBtn"
                  type="button"
                  class="pill-trigger"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span id="dayLabel">-</span>
                  <svg
                    id="dayChevron"
                    width="16"
                    height="16"
                    class="transition-transform rotate-180"
                  >
                    <use
                      href="./src/assets/images/sprite.svg#icon-chevron-down"
                    ></use>
                  </svg>
                </button>
                <ul
                  id="dayPanel"
                  class="dropdown-panel hidden-item w-40 duration-300"
                >
                  <li id="day-item" data-day="Monday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Monday
                    </button>
                  </li>
                  <li id="day-item" data-day="Tuesday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Tuesday
                    </button>
                  </li>
                  <li id="day-item" data-day="Wednesday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Wednesday
                    </button>
                  </li>
                  <li id="day-item" data-day="Thursday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Thursday
                    </button>
                  </li>
                  <li id="day-item" data-day="Friday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Friday
                    </button>
                  </li>
                  <li id="day-item" data-day="Saturday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Saturday
                    </button>
                  </li>
                  <li id="day-item" data-day="Sunday">
                    <button
                      type="button"
                      class="dropdown-link day-option w-full text-left"
                    >
                      Sunday
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <ul
              id="hourlyList"
              class="flex flex-col gap-3 max-h-[470px] overflow-y-auto pr-4"
            ></ul>
          </div>
        </div>
    `,this.#r()}hiddenPopup(e){let t=this.#t.popups.lastChild;t&&setTimeout(()=>{t.classList.remove(`animate-slide-right`),t.classList.add(`animate-slide-left`),setTimeout(()=>{t.remove()},1e3)},e*1e3)}closePopup(e){e.classList.remove(`animate-slide-right`),e.classList.add(`animate-slide-left`),setTimeout(()=>{e.remove()},1e3)}showPopup(e,t){let n=`
    <li
        class="flex items-start gap-3 rounded-2xl border border-neutral-600 bg-neutral-800 p-4 shadow-xl shadow-black/40 animate-slide-right"
        id="popup-item"
      >
        <div class="flex-1">
          <p class="text-sm font-medium text-neutral-0" id="error-title">
          ${e}
          </p>
          <p class="mt-0.5 text-sm text-neutral-300" id="error-message">
          ${t}
          </p>
        </div>
        <button
          type="button"
          class="focus-ring shrink-0 rounded-md p-1 text-neutral-300 hover:text-neutral-0 cursor-pointer"
          aria-label="btnClosePoupup"
          id="btnClosePoupup"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </li>`;this.#t.popups.insertAdjacentHTML(`beforeend`,n),this.hiddenPopup(5)}showBtns(){let e=document.getElementById(`dayBtn`),t=document.getElementById(`unitsBtn`);e.disabled=!1,t.disabled=!1}hiddenBtns(){let e=document.getElementById(`dayBtn`),t=document.getElementById(`unitsBtn`);e.disabled=!0,t.disabled=!0}addHandlerRetryBtn(e){document.addEventListener(`click`,t=>{t.target.closest(`#retryBtn`)&&e(t)})}addHandlerDaySelect(){this.#t.dayBtn.addEventListener(`click`,()=>{this.#t.dayPanel.classList.toggle(`hidden-item`),this.#t.dayChevron.classList.toggle(`rotate-180`);let e=this.#t.dayBtn.getAttribute(`aria-expanded`);this.#t.dayBtn.setAttribute(`aria-expanded`,e!==`true`)})}addHandlerClosePopupBtn(){this.#t.popups.addEventListener(`click`,e=>{if(!e.target.closest(`#btnClosePoupup`))return;let t=e.target.closest(`#btnClosePoupup`).closest(`#popup-item`);this.closePopup(t)})}},x=new class{#e={0:`icon-sunny.webp`,1:`icon-partly-cloudy.webp`,2:`icon-partly-cloudy.webp`,3:`icon-overcast.webp`,45:`icon-fog.webp`,48:`icon-fog.webp`,51:`icon-drizzle.webp`,53:`icon-drizzle.webp`,55:`icon-drizzle.webp`,61:`icon-rain.webp`,63:`icon-rain.webp`,65:`icon-rain.webp`,71:`icon-snow.webp`,73:`icon-snow.webp`,75:`icon-snow.webp`,95:`icon-storm.webp`,99:`icon-storm.webp`};renderDataWeatherCard(e){let t=document.getElementById(`weatherContent`),n=e.current.time,r=new Date(n).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`short`,day:`numeric`}),i=`../src/assets/images/${this.#e[e.current.weather_code]||`icon-sunny.webp`}`;t.innerHTML=`
    <div>
      <h2
        id="cityName"
        class="font-display text-xl font-bold sm:text-2xl"
      >
        ${e.city}, ${e.locality||``}
      </h2>
     <time
      id="dateLabel"
      datetime="${n}"
      class="mt-1 text-sm text-neutral-200 sm:text-base"
    >
      ${r}
    </time>
    </div>
    <div class="flex items-center gap-4">
      <img src="${i}" alt="Weather Icon" class="w-14 h-14" />
      <output
        id="currentTemp"
        class="font-display text-3xl font-bold sm:text-5xl italic"
      >
        ${e.current.temperature_2m}${e.currentUnits.temperature_2m}
      </output>
    </div>
  `}renderDataWeatherStats(e){Object.entries({feelsLike:`apparent_temperature`,humidity:`relative_humidity_2m`,wind:`wind_speed_10m`,precip:`precipitation`}).forEach(([t,n])=>{let r=document.getElementById(t);r&&(r.textContent=`${e.current[n]} ${e.currentUnits[n]}`)})}renderDailyForecast(e){document.getElementById(`dailyForecast`).querySelectorAll(`#item-day`).forEach((t,n)=>{let r=e.daily.time[n],i=new Date(r).toLocaleDateString(`en-US`,{weekday:`short`}),a=this.#e[e.daily.weather_code[n]]||`icon-sunny.webp`;t.innerHTML=`
               <time class="text-base font-medium text-neutral-0" datetime="${r}">${i}</time>
                <img src="${`../src/assets/images/${a}`}" alt="${a.split(`-`)[1].split(`.`)[0]}" class="h-8 w-8" />
                <div class="flex items-center gap-2 text-sm max-sm:w-full">
                <div class="w-full flex items-center gap-2 max-sm:justify-between">
                    <span class="font-semibold text-neutral-0">${e.daily.temperature_2m_max[n]}°</span>
                    <span class="text-neutral-300">${e.daily.temperature_2m_min[n]}°</span>
                </div>
                </div>`})}renderItemsListHourly(e,t){let n=document.getElementById(`hourlyList`),r=document.getElementById(`dayLabel`),i=``;r.textContent=t,e.hourly.time.forEach((n,r)=>{if(new Date(n).toLocaleDateString(`en-US`,{weekday:`long`})!==t)return;let a=this.#e[e.hourly.weather_code[r]]||`icon-sunny.webp`,o=`../src/assets/images/${a}`,s=a.split(`-`)[1].split(`.`)[0],c=e.hourly.time[r],l=new Date(c).toLocaleTimeString(`en-US`,{hour:`numeric`,hour12:!0});i+=`
                <li class="hour-row">
                    <div class="hour-label">
                        <img src="${o}" alt="${s}" class="h-6 w-6" />
                        <span>${l}</span>
                    </div>
                    <span class="text-base text-neutral-0">${e.hourly.temperature_2m[r]}${e.hourlyUnits.temperature_2m}</span>
                </li>`}),n.innerHTML=i}hiddenDayPanel(){document.getElementById(`dayPanel`).classList.add(`hidden-item`)}addHandlerDaySelect(e){document.getElementById(`dayPanel`).addEventListener(`click`,t=>{let n=t.target.closest(`#day-item`);if(!n)return;let r=n.dataset.day;e(r)})}renderData(e){this.renderDataWeatherCard(e),this.renderDataWeatherStats(e),this.renderDailyForecast(e)}},S=async()=>{try{b.renderSkeletonLoading(),await d(),x.renderData(s.weather),b.showBtns()}catch(e){throw b.renderError(),e}},C=()=>{b.renderInintContent(),S()},w=()=>{let e=new Date(s.weather.current.time).toLocaleDateString(`en-US`,{weekday:`long`});x.renderItemsListHourly(s.weather,e)},T=e=>{x.renderItemsListHourly(s.weather,e),x.hiddenDayPanel()},E=e=>{b.showPopup(`Something went wrong`,e.message),v.unfoucsInSearchInput(),b.renderInintContent(),x.addHandlerDaySelect(T),v.addHandlerSuggestionsClick(A),v.addHandlerSuggestions(k),v.showSuggestionPanelByUnFoucs(),v.hiddenSuggestionPanelByUnFoucs(),b.hiddenBtns()},D=()=>{w(),x.renderData(s.weather),b.showBtns(),v.hiddenSuggestionPanel(),v.unfoucsInSearchInput(),v.noResInSuggestionPanel(`No search results found`)},O=async()=>{try{let e=v.getQuery();b.renderSkeletonLoading(),await f(e),D()}catch(e){E(e)}},k=async e=>{try{await p(e),v.renderSerchSuggestions(s.searchWeatherRes)}catch(e){v.noResInSuggestionPanel(e.message)}},A=async e=>{try{b.renderSkeletonLoading(),await m(e),D()}catch(e){E(e)}},j=async e=>{try{await h(e),w(),x.renderData(s.weather)}catch(e){E(e)}};(async()=>{b.addHandlerRetryBtn(C),_(),await S(),o.markOnActiveBtns(s.unitsActive),w(),x.addHandlerDaySelect(T),v.addHandlerSearch(O),v.addHandlerSuggestionsClick(A),v.addHandlerSuggestions(k),o.addHandlerClickOfListPanel(j),o.addHandlerSwitchToImperial(j)})();