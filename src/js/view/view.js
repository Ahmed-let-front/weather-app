import iconsSvg from "../../assets/images/sprite.svg";
class View {
  #parentEl = document.getElementById("app");
  #elements = {
    weatherContent: document.getElementById("weatherContent"),
    hourlyStats: document.getElementById("hourlyList"),
    WeatherStats: document.getElementById("WeatherStats"),
    dailyForecast: document.getElementById("dailyForecast"),
    header: document.getElementById("headerOfPage"),
    dayBtn: document.getElementById("dayBtn"),
    dayPanel: document.getElementById("dayPanel"),
    dayChevron: document.getElementById("dayChevron"),
    popups: document.getElementById("popups"),
  };
  constructor() {
    this.addHandlerDaySelect();
    this.addHandlerClosePopupBtn();
  }
  #generateMarkUpErr() {
    return `
      <div id="error-message" class="flex flex-col items-center justify-center text-center py-16 px-4">
        <svg width="48" height="48" class="text-neutral-300 mb-4">
          <use href="${iconsSvg}#icon-error"></use>
        </svg>
        <h2 class="text-2xl font-bold text-neutral-0 mb-2">Something went wrong</h2>
        <p class="text-neutral-300 text-sm max-w-sm mb-6">
          We couldn't connect to the server (API error). Please try again in a few moments.
        </p>
        <button id="retryBtn" class="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
          <svg width="16" height="16">
            <use href="${iconsSvg}#icon-retry"></use>
          </svg>
          Retry
        </button>
      </div>
    `;
  }
  renderError(el = this.#parentEl) {
    el.innerHTML = this.#generateMarkUpErr();
  }
  renderSkeletonLoading() {
    const markupSkeletonWeather = `
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
    `;
    const markupSkeletonHourly = `
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
    `;
    this.#elements.weatherContent.innerHTML = markupSkeletonWeather;
    this.#elements.hourlyStats.innerHTML = markupSkeletonHourly;
    this.#elements.WeatherStats.querySelectorAll(".stat-value").forEach(
      (el) => (el.textContent = "-"),
    );
    this.#elements.dailyForecast
      .querySelectorAll("#item-day")
      .forEach((el) => (el.textContent = ""));
  }
  #reAssignmentsElements() {
    this.#elements.weatherContent = document.getElementById("weatherContent");
    this.#elements.hourlyStats = document.getElementById("hourlyList");
    this.#elements.WeatherStats = document.getElementById("WeatherStats");
    this.#elements.dailyForecast = document.getElementById("dailyForecast");
    this.#elements.dayBtn = document.getElementById("dayBtn");
    this.#elements.dayPanel = document.getElementById("dayPanel");
    this.#elements.dayChevron = document.getElementById("dayChevron");
    this.addHandlerDaySelect();
  }
  renderInintContent() {
    const markup = `
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
    `;
    this.#parentEl.innerHTML = markup;
    this.#reAssignmentsElements();
  }
  hiddenPopup(s) {
    const targetPopup = this.#elements.popups.lastChild;
    if (!targetPopup) return;
    setTimeout(() => {
      targetPopup.classList.remove("animate-slide-right");
      targetPopup.classList.add("animate-slide-left");
      setTimeout(() => {
        targetPopup.remove();
      }, 1000);
    }, s * 1000);
  }
  closePopup(el) {
    el.classList.remove("animate-slide-right");
    el.classList.add("animate-slide-left");
    setTimeout(() => {
      el.remove();
    }, 1000);
  }
  showPopup(title, message) {
    const markup = `
    <li
        class="flex items-start gap-3 rounded-2xl border border-neutral-600 bg-neutral-800 p-4 shadow-xl shadow-black/40 animate-slide-right"
        id="popup-item"
      >
        <div class="flex-1">
          <p class="text-sm font-medium text-neutral-0" id="error-title">
          ${title}
          </p>
          <p class="mt-0.5 text-sm text-neutral-300" id="error-message">
          ${message}
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
      </li>`;
    this.#elements.popups.insertAdjacentHTML("beforeend", markup);
    this.hiddenPopup(5);
  }
  showBtns() {
    const dayBtn = document.getElementById("dayBtn");
    const unitsBtn = document.getElementById("unitsBtn");
    dayBtn.disabled = false;
    unitsBtn.disabled = false;
  }
  hiddenBtns() {
    const dayBtn = document.getElementById("dayBtn");
    const unitsBtn = document.getElementById("unitsBtn");
    dayBtn.disabled = true;
    unitsBtn.disabled = true;
  }
  addHandlerRetryBtn(handler) {
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#retryBtn")) return;
      handler(e);
    });
  }
  addHandlerDaySelect() {
    this.#elements.dayBtn.addEventListener("click", () => {
      this.#elements.dayPanel.classList.toggle("hidden-item");
      this.#elements.dayChevron.classList.toggle("rotate-180");
      const type = this.#elements.dayBtn.getAttribute("aria-expanded");
      this.#elements.dayBtn.setAttribute(
        "aria-expanded",
        type === "true" ? false : true,
      );
    });
  }
  addHandlerClosePopupBtn() {
    this.#elements.popups.addEventListener("click", (e) => {
      if (!e.target.closest("#btnClosePoupup")) return;
      const popupEl = e.target
        .closest("#btnClosePoupup")
        .closest("#popup-item");
      this.closePopup(popupEl);
    });
  }
}

export default new View();
