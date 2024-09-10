function convertTicksToDateTime(ticks) {
  let ticksToMicroTime = ticks / 10000;
  let epochMicroTimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));
  return new Date(ticksToMicroTime - epochMicroTimeDiff);
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
