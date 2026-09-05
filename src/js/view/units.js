class Units {
  constructor() {
    this.handlerUnitsBtn();
  }
  handlerUnitsBtn() {
    const unitsBtn = document.getElementById("unitsBtn");
    const unitsPanel = document.getElementById("unitsPanel");
    const unitsChevron = document.getElementById("unitsChevron");
    unitsBtn.addEventListener("click", () => {
      unitsPanel.classList.toggle("hidden-item");
      unitsChevron.classList.toggle("rotate-180");
      const type = unitsBtn.getAttribute("aria-expanded");
      dayBtn.setAttribute("aria-expanded", type === "true" ? false : true);
    });
  }
  markOnActiveBtns(allUnitsActive) {
    if (!allUnitsActive) return;;
    const unitsPanel = document.getElementById("unitsPanel");
    unitsPanel.querySelectorAll("button").forEach((el, i) => {
      if (i === 0) return;
      el.querySelector("svg").classList.add("hidden-item");
      const dataValue = el.dataset.value;
      const isInclude = allUnitsActive
        .flatMap((obj) => obj.unit)
        .includes(dataValue);
      if (!isInclude) return;
      el.querySelector("svg").classList.remove("hidden-item");
    });
  }
  addHandlerSwitchToImperial(handler) {
    const switchSystemBtn = document.getElementById("switchSystemBtn");
    const unitsPanel = document.getElementById("unitsPanel");
    switchSystemBtn.addEventListener("click", () => {
      unitsPanel.querySelectorAll("button").forEach((el, i) => {
        if (i === 0) return;
        el.querySelector("svg").classList.toggle("hidden-item");
      });
      const allBtnsActive = [
        ...unitsPanel.querySelectorAll("button:has(svg:not(.hidden-item))"),
      ];
      handler(allBtnsActive);
    });
  }
  addHandlerClickOfListPanel(handler) {
    const unitsPanel = document.getElementById("unitsPanel");
    unitsPanel.addEventListener("click", (e) => {
      const btnTargetEl = e.target.closest(".dropdown-option");
      if (!btnTargetEl) return;
      const btnSvg = btnTargetEl.querySelector("svg");
      if (!btnSvg.classList.contains("hidden-item")) return;
      const groupType = btnTargetEl.dataset.group;
      const query = btnTargetEl.dataset.group;
      const els = e.currentTarget.querySelectorAll(
        `[data-group='${groupType}']`,
      );
      els.forEach((el) => {
        const btnSvg = el.querySelector("svg");
        btnSvg.classList.add("hidden-item");
      });
      btnTargetEl.querySelector("svg").classList.remove("hidden-item");
      const allBtnsActive = [
        ...unitsPanel.querySelectorAll("button:has(svg:not(.hidden-item))"),
      ];
      handler(allBtnsActive);
    });
  }
}
export default new Units();
