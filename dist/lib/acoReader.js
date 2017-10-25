'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

const fs = require('fs');

const PROTOCOL_SIZE = 1;
const NUMBER_OF_COLORS_SIZE = 1;
const HEADER_SIZE = PROTOCOL_SIZE + NUMBER_OF_COLORS_SIZE;
// v1 protocol number of chunks for one color.
const COLOR_SIZE = 5;

const extractPalette = data => {
	const parts = data.match(/.{1,4}/g);

	var _parts = _toArray(parts);

	const version = _parts[0],
	      numberOfColorsHex = _parts[1],
	      rest = _parts.slice(2);

	// Let's skip the v1 protocol.


	const numberOfColors = parseInt(numberOfColorsHex, 16);
	const protocolOneSize = HEADER_SIZE + numberOfColors * COLOR_SIZE;
	const protocolTwoColorsChunks = rest.slice(protocolOneSize);

	function split(chunks) {
		var _chunks = _toArray(chunks);

		const colorSpace = _chunks[0],
		      w = _chunks[1],
		      x = _chunks[2],
		      y = _chunks[3],
		      z = _chunks[4],
		      nameSizeHex = _chunks[6],
		      rest = _chunks.slice(7);

		const nameSize = parseInt(nameSizeHex, 16);
		const name = rest.slice(0, nameSize - 1).map(s => String.fromCharCode(parseInt(s.toString(16), 16))).join('');

		const getHex = color => color.slice(0, 2);
		const hex = `#${getHex(w)}${getHex(x)}${getHex(y)}`;

		const color = {
			name,
			hex,
			w,
			x,
			y
		};

		const nextColor = rest.slice(nameSize);

		return nextColor.length ? [color].concat(_toConsumableArray(split(nextColor))) : [color];
	}

	const palette = split(protocolTwoColorsChunks);

	// console.log(palette);

	return palette;
};

function toJSON(file, callback) {
	fs.readFile(file, 'hex', (error, data) => {
		return !error ? callback(null, extractPalette(data)) : callback(error);
	});
};

module.exports = {
	toJSON
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYWNvUmVhZGVyLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIlBST1RPQ09MX1NJWkUiLCJOVU1CRVJfT0ZfQ09MT1JTX1NJWkUiLCJIRUFERVJfU0laRSIsIkNPTE9SX1NJWkUiLCJleHRyYWN0UGFsZXR0ZSIsImRhdGEiLCJwYXJ0cyIsIm1hdGNoIiwidmVyc2lvbiIsIm51bWJlck9mQ29sb3JzSGV4IiwicmVzdCIsIm51bWJlck9mQ29sb3JzIiwicGFyc2VJbnQiLCJwcm90b2NvbE9uZVNpemUiLCJwcm90b2NvbFR3b0NvbG9yc0NodW5rcyIsInNsaWNlIiwic3BsaXQiLCJjaHVua3MiLCJjb2xvclNwYWNlIiwidyIsIngiLCJ5IiwieiIsIm5hbWVTaXplSGV4IiwibmFtZVNpemUiLCJuYW1lIiwibWFwIiwicyIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInRvU3RyaW5nIiwiam9pbiIsImdldEhleCIsImNvbG9yIiwiaGV4IiwibmV4dENvbG9yIiwibGVuZ3RoIiwicGFsZXR0ZSIsInRvSlNPTiIsImZpbGUiLCJjYWxsYmFjayIsInJlYWRGaWxlIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxLQUFLQyxRQUFRLElBQVIsQ0FBWDs7QUFFQSxNQUFNQyxnQkFBZ0IsQ0FBdEI7QUFDQSxNQUFNQyx3QkFBd0IsQ0FBOUI7QUFDQSxNQUFNQyxjQUFjRixnQkFBZ0JDLHFCQUFwQztBQUNBO0FBQ0EsTUFBTUUsYUFBYSxDQUFuQjs7QUFFQSxNQUFNQyxpQkFBa0JDLElBQUQsSUFBVTtBQUNoQyxPQUFNQyxRQUFRRCxLQUFLRSxLQUFMLENBQVcsU0FBWCxDQUFkOztBQURnQyx1QkFNNUJELEtBTjRCOztBQUFBLE9BRy9CRSxPQUgrQjtBQUFBLE9BSS9CQyxpQkFKK0I7QUFBQSxPQUs1QkMsSUFMNEI7O0FBUWhDOzs7QUFDQSxPQUFNQyxpQkFBa0JDLFNBQVNILGlCQUFULEVBQTRCLEVBQTVCLENBQXhCO0FBQ0EsT0FBTUksa0JBQWtCWCxjQUFjUyxpQkFBaUJSLFVBQXZEO0FBQ0EsT0FBTVcsMEJBQTBCSixLQUFLSyxLQUFMLENBQVdGLGVBQVgsQ0FBaEM7O0FBRUEsVUFBU0csS0FBVCxDQUFlQyxNQUFmLEVBQXVCO0FBQUEseUJBRW1DQSxNQUZuQzs7QUFBQSxRQUVmQyxVQUZlO0FBQUEsUUFFSEMsQ0FGRztBQUFBLFFBRUFDLENBRkE7QUFBQSxRQUVHQyxDQUZIO0FBQUEsUUFFTUMsQ0FGTjtBQUFBLFFBRVdDLFdBRlg7QUFBQSxRQUUyQmIsSUFGM0I7O0FBR3RCLFFBQU1jLFdBQVdaLFNBQVNXLFdBQVQsRUFBc0IsRUFBdEIsQ0FBakI7QUFDQSxRQUFNRSxPQUFPZixLQUFLSyxLQUFMLENBQVcsQ0FBWCxFQUFjUyxXQUFXLENBQXpCLEVBQ1hFLEdBRFcsQ0FDUEMsS0FBS0MsT0FBT0MsWUFBUCxDQUFvQmpCLFNBQVNlLEVBQUVHLFFBQUYsQ0FBVyxFQUFYLENBQVQsRUFBeUIsRUFBekIsQ0FBcEIsQ0FERSxFQUVYQyxJQUZXLENBRU4sRUFGTSxDQUFiOztBQUlBLFFBQU1DLFNBQVVDLEtBQUQsSUFBV0EsTUFBTWxCLEtBQU4sQ0FBWSxDQUFaLEVBQWUsQ0FBZixDQUExQjtBQUNBLFFBQU1tQixNQUFPLElBQUdGLE9BQU9iLENBQVAsQ0FBVSxHQUFFYSxPQUFPWixDQUFQLENBQVUsR0FBRVksT0FBT1gsQ0FBUCxDQUFVLEVBQWxEOztBQUVBLFFBQU1ZLFFBQVE7QUFDYlIsT0FEYTtBQUViUyxNQUZhO0FBR2JmLElBSGE7QUFJYkMsSUFKYTtBQUtiQztBQUxhLEdBQWQ7O0FBUUEsUUFBTWMsWUFBWXpCLEtBQUtLLEtBQUwsQ0FBV1MsUUFBWCxDQUFsQjs7QUFFQSxTQUFPVyxVQUFVQyxNQUFWLElBQ0xILEtBREssNEJBQ0tqQixNQUFNbUIsU0FBTixDQURMLEtBQ3lCLENBQUNGLEtBQUQsQ0FEaEM7QUFFQTs7QUFFRCxPQUFNSSxVQUFVckIsTUFBTUYsdUJBQU4sQ0FBaEI7O0FBRUE7O0FBRUEsUUFBT3VCLE9BQVA7QUFDQSxDQTNDRDs7QUE2Q0EsU0FBU0MsTUFBVCxDQUFnQkMsSUFBaEIsRUFBc0JDLFFBQXRCLEVBQWdDO0FBQy9CMUMsSUFBRzJDLFFBQUgsQ0FDQ0YsSUFERCxFQUNPLEtBRFAsRUFFQyxDQUFDRyxLQUFELEVBQVFyQyxJQUFSLEtBQWlCO0FBQ2hCLFNBQU8sQ0FBQ3FDLEtBQUQsR0FDTkYsU0FBUyxJQUFULEVBQWVwQyxlQUFlQyxJQUFmLENBQWYsQ0FETSxHQUVObUMsU0FBU0UsS0FBVCxDQUZEO0FBR0EsRUFORjtBQVFBOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2hCTjtBQURnQixDQUFqQiIsImZpbGUiOiJhY29SZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IFBST1RPQ09MX1NJWkUgPSAxO1xuY29uc3QgTlVNQkVSX09GX0NPTE9SU19TSVpFID0gMTtcbmNvbnN0IEhFQURFUl9TSVpFID0gUFJPVE9DT0xfU0laRSArIE5VTUJFUl9PRl9DT0xPUlNfU0laRTtcbi8vIHYxIHByb3RvY29sIG51bWJlciBvZiBjaHVua3MgZm9yIG9uZSBjb2xvci5cbmNvbnN0IENPTE9SX1NJWkUgPSA1O1xuXG5jb25zdCBleHRyYWN0UGFsZXR0ZSA9IChkYXRhKSA9PiB7XG5cdGNvbnN0IHBhcnRzID0gZGF0YS5tYXRjaCgvLnsxLDR9L2cpO1xuXHRjb25zdCBbXG5cdFx0dmVyc2lvbixcblx0XHRudW1iZXJPZkNvbG9yc0hleCxcblx0XHQuLi5yZXN0XG5cdF0gPSBwYXJ0cztcblxuXHQvLyBMZXQncyBza2lwIHRoZSB2MSBwcm90b2NvbC5cblx0Y29uc3QgbnVtYmVyT2ZDb2xvcnMgPSAgcGFyc2VJbnQobnVtYmVyT2ZDb2xvcnNIZXgsIDE2KTtcblx0Y29uc3QgcHJvdG9jb2xPbmVTaXplID0gSEVBREVSX1NJWkUgKyBudW1iZXJPZkNvbG9ycyAqIENPTE9SX1NJWkU7XG5cdGNvbnN0IHByb3RvY29sVHdvQ29sb3JzQ2h1bmtzID0gcmVzdC5zbGljZShwcm90b2NvbE9uZVNpemUpO1xuXG5cdGZ1bmN0aW9uIHNwbGl0KGNodW5rcykge1xuXG5cdFx0Y29uc3QgW2NvbG9yU3BhY2UsIHcsIHgsIHksIHosICwgbmFtZVNpemVIZXgsIC4uLnJlc3RdID0gY2h1bmtzO1xuXHRcdGNvbnN0IG5hbWVTaXplID0gcGFyc2VJbnQobmFtZVNpemVIZXgsIDE2KTtcblx0XHRjb25zdCBuYW1lID0gcmVzdC5zbGljZSgwLCBuYW1lU2l6ZSAtIDEpXG5cdFx0XHQubWFwKHMgPT4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnRvU3RyaW5nKDE2KSwgMTYpKSlcblx0XHRcdC5qb2luKCcnKTtcblxuXHRcdGNvbnN0IGdldEhleCA9IChjb2xvcikgPT4gY29sb3Iuc2xpY2UoMCwgMik7XG5cdFx0Y29uc3QgaGV4ID0gYCMke2dldEhleCh3KX0ke2dldEhleCh4KX0ke2dldEhleCh5KX1gO1xuXG5cdFx0Y29uc3QgY29sb3IgPSB7XG5cdFx0XHRuYW1lLFxuXHRcdFx0aGV4LFxuXHRcdFx0dyxcblx0XHRcdHgsXG5cdFx0XHR5LFxuXHRcdH07XG5cblx0XHRjb25zdCBuZXh0Q29sb3IgPSByZXN0LnNsaWNlKG5hbWVTaXplKTtcblxuXHRcdHJldHVybiBuZXh0Q29sb3IubGVuZ3RoID9cblx0XHRcdFtjb2xvciwgLi4uc3BsaXQobmV4dENvbG9yKV0gOiBbY29sb3JdO1xuXHR9XG5cblx0Y29uc3QgcGFsZXR0ZSA9IHNwbGl0KHByb3RvY29sVHdvQ29sb3JzQ2h1bmtzKTtcblxuXHQvLyBjb25zb2xlLmxvZyhwYWxldHRlKTtcblxuXHRyZXR1cm4gcGFsZXR0ZTtcbn07XG5cbmZ1bmN0aW9uIHRvSlNPTihmaWxlLCBjYWxsYmFjaykge1xuXHRmcy5yZWFkRmlsZShcblx0XHRmaWxlLCAnaGV4Jyxcblx0XHQoZXJyb3IsIGRhdGEpID0+IHtcblx0XHRcdHJldHVybiAhZXJyb3IgP1xuXHRcdFx0XHRjYWxsYmFjayhudWxsLCBleHRyYWN0UGFsZXR0ZShkYXRhKSkgOlxuXHRcdFx0XHRjYWxsYmFjayhlcnJvcilcblx0XHR9XG5cdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0dG9KU09OLFxufTtcbiJdfQ==