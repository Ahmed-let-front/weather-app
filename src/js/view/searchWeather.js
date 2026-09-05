class SearchWeather {
  #elements = {
    app: document.getElementById("app"),
  };
  constructor() {
    this.hiddenSuggestionPanelByUnFoucs();
    this.showSuggestionPanelByUnFoucs();
  }
  getQuery() {
    return document.querySelector("#searchInput").value;
  }
  addHandlerSearch(handler) {
    this.#elements.app.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target.closest("#searchForm");
      if (!form) return;
      handler();
    });
  }
  unfoucsInSearchInput() {
    const searchInput = document.querySelector("#searchInput");
    searchInput.value = "";
    document.activeElement.blur();
  }
  renderSerchSuggestions(data) {
    const suggestionsPanel = document.getElementById("suggestionsPanel");
    let markup = "";
    data.forEach((el, i) => {
      markup += `<li id="city-item" data-lat="${data[i].latitude}" data-lng="${data[i].longitude}" data-city="${el.country}" data-locality="${el.name}">
                <button type="button" class="dropdown-link">${el.name}</button>
               </li>
        `;
    });
    suggestionsPanel.innerHTML = markup;
    suggestionsPanel.classList.remove("hidden-item");
  }
  noResInSuggestionPanel(message) {
    const suggestionsPanel = document.getElementById("suggestionsPanel");
    suggestionsPanel.innerHTML = `<li><p>${message}</p></li>`;
  }
  hiddenSuggestionPanelByUnFoucs() {
    document.addEventListener("click", (e) => {
      const searchInput = document.querySelector("#searchInput");
      const suggestionsPanel = document.getElementById("suggestionsPanel");
      const isClickInsideSearch = searchInput.contains(e.target);
      const isClickInsidePanel = suggestionsPanel.contains(e.target);
      if (!isClickInsideSearch && !isClickInsidePanel) {
        this.hiddenSuggestionPanel();
      }
    });
  }
  showSuggestionPanelByUnFoucs() {
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("focus", this.showSuggestionPanel);
  }
  hiddenSuggestionPanel() {
    const suggestionsPanel = document.getElementById("suggestionsPanel");
    suggestionsPanel.classList.add("hidden-item");
  }
  showSuggestionPanel() {
    const suggestionsPanel = document.getElementById("suggestionsPanel");
    suggestionsPanel.classList.remove("hidden-item");
  }
  addHandlerSuggestions(handler) {
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      handler(query);
    });
  }
  addHandlerSuggestionsClick(handler) {
    const suggestionsPanel = document.getElementById("suggestionsPanel");
    suggestionsPanel.addEventListener("click", (e) => {
      const targetEl = e.target.closest("#city-item");
      if (!targetEl) return;
      const lat = +targetEl.dataset.lat;
      const lng = +targetEl.dataset.lng;
      const city = targetEl.dataset.city;
      const locality = targetEl.dataset.locality;
      const data = { lat, lng, city, locality };
      handler(data);
    });
  }
}
export default new SearchWeather();
