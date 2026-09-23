(function (global) {
  function getWindStrengthColor(speedMps) {
    if (speedMps < 3) return '#22c55e';
    if (speedMps < 13) return '#f59e0b';
    if (speedMps < 18) return '#f97316';
    return '#ef4444';
  }

  function getWindArrowHtml(speedMps, windDirDeg) {
    const color = getWindStrengthColor(speedMps);
    const rotation = ((Number(windDirDeg) || 0) + 180) % 360;
    return `
      <span class="wind-arrow" style="transform: rotate(${rotation}deg); background: ${color}; box-shadow: 0 0 0 2px rgba(255,255,255,.9), 0 2px 6px rgba(15,23,42,.18); color: #fff;">
        ↑
      </span>
    `;
  }

  const api = { getWindStrengthColor, getWindArrowHtml };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  global.windUtils = api;
})(typeof window !== 'undefined' ? window : globalThis);
