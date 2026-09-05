import * as model from "./model.js";
import searchWeather from "./view/searchWeather.js";
import units from "./view/units.js";
import view from "./view/view.js";
import weatherStats from "./view/weatherStats.js";
const controlDataWeather = async () => {
  try {
    view.renderSkeletonLoading();
    await model.setDataWeather();
    weatherStats.renderData(model.state.weather);
    view.showBtns();
  } catch (err) {
    view.renderError();
    throw err;
  }
};
const controlRetryBtn = () => {
  view.renderInintContent();
  controlDataWeather();
};
const controlDaySelectInit = () => {
  const dayFullName = new Date(
    model.state.weather.current.time,
  ).toLocaleDateString("en-US", {
    weekday: "long",
  });
  weatherStats.renderItemsListHourly(model.state.weather, dayFullName);
};
const controlDaySelect = (day) => {
  weatherStats.renderItemsListHourly(model.state.weather, day);
  weatherStats.hiddenDayPanel();
};
const controlcatchErr = (err) => {
  view.showPopup("Something went wrong", err.message);
  searchWeather.unfoucsInSearchInput();
  view.renderInintContent();
  weatherStats.addHandlerDaySelect(controlDaySelect);
  searchWeather.addHandlerSuggestionsClick(controlSuggestionsClick);
  searchWeather.addHandlerSuggestions(controlSearchSuggestions);
  searchWeather.showSuggestionPanelByUnFoucs();
  searchWeather.hiddenSuggestionPanelByUnFoucs();
  view.hiddenBtns();
};
const searchOperation = () => {
  controlDaySelectInit();
  weatherStats.renderData(model.state.weather);
  view.showBtns();
  searchWeather.hiddenSuggestionPanel();
  searchWeather.unfoucsInSearchInput();
  searchWeather.noResInSuggestionPanel("No search results found");
};
const controlSearchInput = async () => {
  try {
    const query = searchWeather.getQuery();
    view.renderSkeletonLoading();
    await model.setDataFromSearch(query);
    searchOperation();
  } catch (err) {
    controlcatchErr(err);
  }
};
const controlSearchSuggestions = async (query) => {
  try {
    await model.SearchSuggestions(query);
    searchWeather.renderSerchSuggestions(model.state.searchWeatherRes);
  } catch (err) {
    searchWeather.noResInSuggestionPanel(err.message);
  }
};
const controlSuggestionsClick = async (data) => {
  try {
    view.renderSkeletonLoading();
    await model.searchSuggestionsSetData(data);
    searchOperation();
  } catch (err) {
    controlcatchErr(err);
  }
};
const controlUnitsPanel = async (data) => {
  try {
    await model.unitOperation(data);
    controlDaySelectInit();
    weatherStats.renderData(model.state.weather);
  } catch (err) {
    controlcatchErr(err);
  }
};
const init = async () => {
  view.addHandlerRetryBtn(controlRetryBtn);
  model.getBtnsActiveUnitAndSetNewData();
  await controlDataWeather();
  units.markOnActiveBtns(model.state.unitsActive);
  controlDaySelectInit();
  weatherStats.addHandlerDaySelect(controlDaySelect);
  searchWeather.addHandlerSearch(controlSearchInput);
  searchWeather.addHandlerSuggestionsClick(controlSuggestionsClick);
  searchWeather.addHandlerSuggestions(controlSearchSuggestions);
  units.addHandlerClickOfListPanel(controlUnitsPanel);
  units.addHandlerSwitchToImperial(controlUnitsPanel)
};
init();
