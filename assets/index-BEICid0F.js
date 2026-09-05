(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`https://api.open-meteo.com/v1`,t=`https://geocoding-api.open-meteo.com/v1/search?name=`,n=`https://api-bdc.net/data/reverse-geocode-client`,r=`bdc_2478984e54954c2782b8e9d7672198b5`,i=e=>new Promise((t,n)=>{setTimeout(()=>{n(Error(`Request took long time! Timout after ${e} second`))},1e3*e)}),a=async e=>{let t=await Promise.race([fetch(e),i(10)]);if(!t.ok)throw Error(`${t.statusText} (${t.status})`);let n=await t.json();if(!n.results&&Object.keys(n).length===1)throw Error(`No search results found`);return n},o=new class{constructor(){this.handlerUnitsBtn()}handlerUnitsBtn(){let e=document.getElementById(`unitsBtn`),t=document.getElementById(`unitsPanel`),n=document.getElementById(`unitsChevron`);e.addEventListener(`click`,()=>{t.classList.toggle(`hidden-item`),n.classList.toggle(`rotate-180`);let r=e.getAttribute(`aria-expanded`);dayBtn.setAttribute(`aria-expanded`,r!==`true`)})}markOnActiveBtns(e){e&&document.getElementById(`unitsPanel`).querySelectorAll(`button`).forEach((t,n)=>{if(n===0)return;t.querySelector(`svg`).classList.add(`hidden-item`);let r=t.dataset.value;e.flatMap(e=>e.unit).includes(r)&&t.querySelector(`svg`).classList.remove(`hidden-item`)})}addHandlerSwitchToImperial(e){let t=document.getElementById(`switchSystemBtn`),n=document.getElementById(`unitsPanel`);t.addEventListener(`click`,()=>{n.querySelectorAll(`button`).forEach((e,t)=>{t!==0&&e.querySelector(`svg`).classList.toggle(`hidden-item`)}),e([...n.querySelectorAll(`button:has(svg:not(.hidden-item))`)])})}addHandlerClickOfListPanel(e){let t=document.getElementById(`unitsPanel`);t.addEventListener(`click`,n=>{let r=n.target.closest(`.dropdown-option`);if(!r||!r.querySelector(`svg`).classList.contains(`hidden-item`))return;let i=r.dataset.group;r.dataset.group,n.currentTarget.querySelectorAll(`[data-group='${i}']`).forEach(e=>{e.querySelector(`svg`).classList.add(`hidden-item`)}),r.querySelector(`svg`).classList.remove(`hidden-item`),e([...t.querySelectorAll(`button:has(svg:not(.hidden-item))`)])})}},s={weather:{current:{},currentUnits:{},hourly:{},hourlyUnits:{},daily:{},dailyUnits:{},city:``,locality:``,currLat:0,currLng:0},units:{temperature_unit:`celsius`,wind_speed_unit:`kmh`,precipitation_unit:`mm`},unitsActive:[],searchWeatherRes:[]},c=()=>new Promise((e,t)=>{navigator.geolocation.getCurrentPosition(e,t)}),l=(e,t)=>{s.weather.current=e.current,s.weather.currentUnits=e.current_units,s.weather.hourly=e.hourly,s.weather.hourlyUnits=e.hourly_units,s.weather.daily=e.daily,s.weather.dailyUnits=e.daily_units,s.weather.city=t.city,s.weather.locality=t.locality,s.weather.currLat=t.latitude,s.weather.currLng=t.longitude},u=e=>{s.weather.current=e.current,s.weather.currentUnits=e.current_units,s.weather.hourly=e.hourly,s.weather.hourlyUnits=e.hourly_units,s.weather.daily=e.daily,s.weather.dailyUnits=e.daily_units},d=async()=>{let{latitude:t,longitude:i}=(await c()).coords,[o,u]=await Promise.all([a(`${e}/forecast?latitude=${t}&longitude=${i}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),a(`${n}?latitude=${t}&longitude=${i}&key=${r}`)]);l(o,u)},f=async n=>{if(!n)return;let r=(await a(`${t}${n}`)).results[0],i={city:r.country,locality:r.name,latitude:r.latitude,longitude:r.longitude},{latitude:o,longitude:c}=r;l(await a(`${e}/forecast?latitude=${o}&longitude=${c}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),i)},p=async e=>{s.searchWeatherRes=(await a(`${t}${e}`)).results.slice(0,4)},m=async t=>{l(await a(`${e}/forecast?latitude=${t.lat}&longitude=${t.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`),{city:t.city,locality:t.locality,latitude:t.lat,longitude:t.lng})},h=async t=>{g(t),u(await a(`${e}/forecast?latitude=${s.weather.currLat}&longitude=${s.weather.currLng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${s.units.temperature_unit}&wind_speed_unit=${s.units.wind_speed_unit}&precipitation_unit=${s.units.precipitation_unit}`))},g=e=>{e.forEach(e=>{let t=e.dataset.group,n=e.dataset.value;s.units[t]=n});let t=e.map(e=>({unit:e.dataset.value,query:e.dataset.group}));localStorage.setItem(`btnsActiveUnitsPanel`,JSON.stringify(t))},_=()=>{let e=JSON.parse(localStorage.getItem(`btnsActiveUnitsPanel`));s.unitsActive=e,e&&e.forEach(e=>{let t=e.query,n=e.unit;s.units[t]=n})},v=new class{#e={app:document.getElementById(`app`)};constructor(){this.hiddenSuggestionPanelByUnFoucs(),this.showSuggestionPanelByUnFoucs()}getQuery(){return document.querySelector(`#searchInput`).value}addHandlerSearch(e){this.#e.app.addEventListener(`submit`,t=>{t.preventDefault(),t.target.closest(`#searchForm`)&&e()})}unfoucsInSearchInput(){let e=document.querySelector(`#searchInput`);e.value=``,document.activeElement.blur()}renderSerchSuggestions(e){let t=document.getElementById(`suggestionsPanel`),n=``;e.forEach((t,r)=>{n+=`<li id="city-item" data-lat="${e[r].latitude}" data-lng="${e[r].longitude}" data-city="${t.country}" data-locality="${t.name}">
                <button type="button" class="dropdown-link">${t.name}</button>
               </li>
        `}),t.innerHTML=n,t.classList.remove(`hidden-item`)}noResInSuggestionPanel(e){let t=document.getElementById(`suggestionsPanel`);t.innerHTML=`<li><p>${e}</p></li>`}hiddenSuggestionPanelByUnFoucs(){document.addEventListener(`click`,e=>{let t=document.querySelector(`#searchInput`),n=document.getElementById(`suggestionsPanel`),r=t.contains(e.target),i=n.contains(e.target);!r&&!i&&this.hiddenSuggestionPanel()})}showSuggestionPanelByUnFoucs(){document.querySelector(`#searchInput`).addEventListener(`focus`,this.showSuggestionPanel)}hiddenSuggestionPanel(){document.getElementById(`suggestionsPanel`).classList.add(`hidden-item`)}showSuggestionPanel(){document.getElementById(`suggestionsPanel`).classList.remove(`hidden-item`)}addHandlerSuggestions(e){document.querySelector(`#searchInput`).addEventListener(`input`,t=>{e(t.target.value.trim())})}addHandlerSuggestionsClick(e){document.getElementById(`suggestionsPanel`).addEventListener(`click`,t=>{let n=t.target.closest(`#city-item`);n&&e({lat:+n.dataset.lat,lng:+n.dataset.lng,city:n.dataset.city,locality:n.dataset.locality})})}},y=`/weather-app/assets/sprite-DvK6xIi1.svg`,b=new class{#e=document.getElementById(`app`);#t={weatherContent:document.getElementById(`weatherContent`),hourlyStats:document.getElementById(`hourlyList`),WeatherStats:document.getElementById(`WeatherStats`),dailyForecast:document.getElementById(`dailyForecast`),header:document.getElementById(`headerOfPage`),dayBtn:document.getElementById(`dayBtn`),dayPanel:document.getElementById(`dayPanel`),dayChevron:document.getElementById(`dayChevron`),popups:document.getElementById(`popups`)};constructor(){this.addHandlerDaySelect(),this.addHandlerClosePopupBtn()}#n(){return`
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
      </li>`;this.#t.popups.insertAdjacentHTML(`beforeend`,n),this.hiddenPopup(5)}showBtns(){let e=document.getElementById(`dayBtn`),t=document.getElementById(`unitsBtn`);e.disabled=!1,t.disabled=!1}hiddenBtns(){let e=document.getElementById(`dayBtn`),t=document.getElementById(`unitsBtn`);e.disabled=!0,t.disabled=!0}addHandlerRetryBtn(e){document.addEventListener(`click`,t=>{t.target.closest(`#retryBtn`)&&e(t)})}addHandlerDaySelect(){this.#t.dayBtn.addEventListener(`click`,()=>{this.#t.dayPanel.classList.toggle(`hidden-item`),this.#t.dayChevron.classList.toggle(`rotate-180`);let e=this.#t.dayBtn.getAttribute(`aria-expanded`);this.#t.dayBtn.setAttribute(`aria-expanded`,e!==`true`)})}addHandlerClosePopupBtn(){this.#t.popups.addEventListener(`click`,e=>{if(!e.target.closest(`#btnClosePoupup`))return;let t=e.target.closest(`#btnClosePoupup`).closest(`#popup-item`);this.closePopup(t)})}},x=`data:image/webp;base64,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`,S=`/weather-app/assets/icon-fog-DRj_BhH9.webp`,C=`data:image/webp;base64,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`,w=`data:image/webp;base64,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`,T=`data:image/webp;base64,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`,E=`data:image/webp;base64,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`,D=`data:image/webp;base64,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`,O=`data:image/webp;base64,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`,k=new class{#e={0:O,1:w,2:w,3:C,45:S,48:S,51:x,53:x,55:x,61:T,63:T,65:T,71:E,73:E,75:E,95:D,99:D};renderDataWeatherCard(e){let t=document.getElementById(`weatherContent`),n=e.current.time,r=new Date(n).toLocaleDateString(`en-US`,{weekday:`long`,year:`numeric`,month:`short`,day:`numeric`}),i=this.#e[e.current.weather_code]||`data:image/webp;base64,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`;t.innerHTML=`
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
  `}renderDataWeatherStats(e){Object.entries({feelsLike:`apparent_temperature`,humidity:`relative_humidity_2m`,wind:`wind_speed_10m`,precip:`precipitation`}).forEach(([t,n])=>{let r=document.getElementById(t);r&&(r.textContent=`${e.current[n]} ${e.currentUnits[n]}`)})}renderDailyForecast(e){document.getElementById(`dailyForecast`).querySelectorAll(`#item-day`).forEach((t,n)=>{let r=e.daily.time[n],i=new Date(r).toLocaleDateString(`en-US`,{weekday:`short`}),a=this.#e[e.daily.weather_code[n]]||`data:image/webp;base64,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`;t.innerHTML=`
               <time class="text-base font-medium text-neutral-0" datetime="${r}">${i}</time>
                <img src="${a}" alt="${a.split(`/`).pop().split(`-`)[1].split(`.`)[0]}" class="h-8 w-8" />
                <div class="flex items-center gap-2 text-sm max-sm:w-full">
                <div class="w-full flex items-center gap-2 max-sm:justify-between">
                    <span class="font-semibold text-neutral-0">${e.daily.temperature_2m_max[n]}°</span>
                    <span class="text-neutral-300">${e.daily.temperature_2m_min[n]}°</span>
                </div>
                </div>`})}renderItemsListHourly(e,t){let n=document.getElementById(`hourlyList`),r=document.getElementById(`dayLabel`),i=``;r.textContent=t,e.hourly.time.forEach((n,r)=>{if(new Date(n).toLocaleDateString(`en-US`,{weekday:`long`})!==t)return;let a=this.#e[e.hourly.weather_code[r]]||`data:image/webp;base64,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`,o=a.split(`/`).pop().split(`-`)[1].split(`.`)[0],s=e.hourly.time[r],c=new Date(s).toLocaleTimeString(`en-US`,{hour:`numeric`,hour12:!0});i+=`
                <li class="hour-row">
                    <div class="hour-label">
                        <img src="${a}" alt="${o}" class="h-6 w-6" />
                        <span>${c}</span>
                    </div>
                    <span class="text-base text-neutral-0">${e.hourly.temperature_2m[r]}${e.hourlyUnits.temperature_2m}</span>
                </li>`}),n.innerHTML=i}hiddenDayPanel(){document.getElementById(`dayPanel`).classList.add(`hidden-item`)}addHandlerDaySelect(e){document.getElementById(`dayPanel`).addEventListener(`click`,t=>{let n=t.target.closest(`#day-item`);if(!n)return;let r=n.dataset.day;e(r)})}renderData(e){this.renderDataWeatherCard(e),this.renderDataWeatherStats(e),this.renderDailyForecast(e)}},A=async()=>{try{b.renderSkeletonLoading(),await d(),k.renderData(s.weather),b.showBtns()}catch(e){throw b.renderError(),e}},j=()=>{b.renderInintContent(),A()},M=()=>{let e=new Date(s.weather.current.time).toLocaleDateString(`en-US`,{weekday:`long`});k.renderItemsListHourly(s.weather,e)},N=e=>{k.renderItemsListHourly(s.weather,e),k.hiddenDayPanel()},P=e=>{b.showPopup(`Something went wrong`,e.message),v.unfoucsInSearchInput(),b.renderInintContent(),k.addHandlerDaySelect(N),v.addHandlerSuggestionsClick(R),v.addHandlerSuggestions(L),v.showSuggestionPanelByUnFoucs(),v.hiddenSuggestionPanelByUnFoucs(),b.hiddenBtns()},F=()=>{M(),k.renderData(s.weather),b.showBtns(),v.hiddenSuggestionPanel(),v.unfoucsInSearchInput(),v.noResInSuggestionPanel(`No search results found`)},I=async()=>{try{let e=v.getQuery();b.renderSkeletonLoading(),await f(e),F()}catch(e){P(e)}},L=async e=>{try{await p(e),v.renderSerchSuggestions(s.searchWeatherRes)}catch(e){v.noResInSuggestionPanel(e.message)}},R=async e=>{try{b.renderSkeletonLoading(),await m(e),F()}catch(e){P(e)}},z=async e=>{try{await h(e),M(),k.renderData(s.weather)}catch(e){P(e)}};(async()=>{b.addHandlerRetryBtn(j),_(),await A(),o.markOnActiveBtns(s.unitsActive),M(),k.addHandlerDaySelect(N),v.addHandlerSearch(I),v.addHandlerSuggestionsClick(R),v.addHandlerSuggestions(L),o.addHandlerClickOfListPanel(z),o.addHandlerSwitchToImperial(z)})();