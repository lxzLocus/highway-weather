const assert = require('node:assert/strict');
const { getWindStrengthColor, getWindArrowHtml } = require('./wind-utils.js');

assert.equal(getWindStrengthColor(2), '#22c55e');
assert.equal(getWindStrengthColor(8), '#f59e0b');
assert.equal(getWindStrengthColor(18), '#ef4444');
assert.ok(getWindArrowHtml(12, 45).includes('transform: rotate(225deg)'));
assert.ok(getWindArrowHtml(12, 45).includes('background: #f59e0b'));

console.log('wind-utils tests passed');
