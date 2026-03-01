function convertTicksToDateTime(ticks) {
  // Ticks from 0001-01-01 to 1970-01-01 (Unix epoch) = 621355968000000000
  const epochDiff = 621355968000000000;
  const milliseconds = (ticks - epochDiff) / 10000;
  return new Date(milliseconds);
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
});
