const EPOCH_DIFF = 621355968000000000;

function convertTicksToDateTime(ticks) {
  // Ticks from 0001-01-01 to 1970-01-01 (Unix epoch) = 621355968000000000
  const milliseconds = (ticks - EPOCH_DIFF) / 10000;
  return new Date(milliseconds);
}

function convertDateTimeToTicks(dateStr) {
  // dateStr format from datetime-local input: "YYYY-MM-DDTHH:mm"
  const date = new Date(dateStr);
  const milliseconds = date.getTime();
  const ticks = Math.round(milliseconds * 10000 + EPOCH_DIFF);
  return ticks;
}

document.addEventListener("DOMContentLoaded", function (event) {
  const tickInput = document.querySelector("#tickInput");
  const resultElement = document.querySelector("#convertResult");
  
  tickInput.addEventListener("input", function () {
    let tick = +this.value;

    if (tick === 0) return;

    if (!isNaN(tick)) {
      resultElement.textContent = convertTicksToDateTime(tick).toISOString();
    } else {
      resultElement.textContent = "Use some valid ticks stoopid hooman!";
      return;
    }
  });
  
  const datetimeInput = document.querySelector("#datetimeInput");
  const resultTicksElement = document.querySelector("#convertResultTicks");
  
  datetimeInput.addEventListener("input", function () {
    let datetimeStr = this.value;
    
    if (!datetimeStr) return;
    
    const ticks = convertDateTimeToTicks(datetimeStr);
    resultTicksElement.value = ticks;
  });
  
  const copyBtn = document.querySelector("#copyBtn");
  copyBtn.addEventListener("click", function () {
    const text = resultTicksElement.value;
    navigator.clipboard.writeText(text).then(function () {
      const tooltip = new bootstrap.Tooltip(copyBtn);
      copyBtn.setAttribute("data-bs-title", "Copied!");
      tooltip.show();
      setTimeout(function () {
        tooltip.hide();
        copyBtn.setAttribute("data-bs-title", "Copy to clipboard");
      }, 2000);
    });
  });
  
  // Theme switching
  const savedTheme = localStorage.getItem("theme") || "pink";
  document.body.classList.add("theme-" + savedTheme);
  
  const themeButtons = document.querySelectorAll(".themeBtn");
  themeButtons.forEach(function (btn) {
    if (btn.dataset.theme === savedTheme) {
      btn.classList.add("active");
    }
    
    btn.addEventListener("click", function () {
      const theme = this.dataset.theme;
      
      // Remove all theme classes
      document.body.classList.remove("theme-pink", "theme-green", "theme-blue", "theme-black", "theme-white");
      
      // Add new theme class
      document.body.classList.add("theme-" + theme);
      
      // Update active button
      themeButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
      
      // Save to localStorage
      localStorage.setItem("theme", theme);
    });
  });
});
