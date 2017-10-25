'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.processSwatch = exports.getColorNames = undefined;

var _colorNamer = require('color-namer');

var _colorNamer2 = _interopRequireDefault(_colorNamer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _acoReader = require('./lib/acoReader');

var _acoReader2 = _interopRequireDefault(_acoReader);

var _io = require('./lib/io');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FILE_HEADER = '// File auto generated by \'swatch-names\'. Do not modify this file directly.\n';

const getColorNames = exports.getColorNames = hexValues => {
	const allColors = [];

	_lodash2.default.forEach(hexValues, color => {
		const allNames = (0, _colorNamer2.default)(color);
		const combinedNames = _lodash2.default.map(_lodash2.default.uniqBy(_lodash2.default.sortBy(_lodash2.default.reduce(allNames, (result, color) => result.concat(color), []), 'distance'), value => value.name.toLowerCase()), c => c.name.toLowerCase().replace(' ', '-'));

		// Define color only if not already in the list
		if (!_lodash2.default.some(allColors, { color })) {
			// Loop until a free name is found
			_lodash2.default.forEach(combinedNames, name => {
				if (!_lodash2.default.some(allColors, { name })) {
					allColors.push({ color, name });
					return false;
				}
			});
		}
	});

	return allColors;
};

/**
 * Processes the supplied swatch file, saves a named swatch file and generates SCSS/JS files with color variables.
 * @param {string} swatch - Path to the input swatch file.
 * @param {string} scssPath - Path to the SCSS file to save variables.
 * @param {string} jsPath - Path to the JS file to save variables.
 */
const processSwatch = exports.processSwatch = (swatchFile, scssPath, jsPath, output) => {

	return new Promise((resolve, reject) => {
		_acoReader2.default.toJSON(swatchFile, (err, swatches) => {
			if (err) return reject(err);
			const hexValues = swatches.map(swatch => swatch.hex.toLowerCase());
			const colors = getColorNames(hexValues);

			if (scssPath) {
				const data = colors.reduce((result, color) => result + '$' + color.name + ': ' + color.color + ';\n', FILE_HEADER);
				(0, _io.saveFile)(data, scssPath, 'SCSS file saved to: ');
			}

			if (jsPath) {
				const js = colors.reduce((result, color) => result + '\t' + color.name.replace('-', '_').toUpperCase() + ': \'' + color.color + '\',\n', '');
				const data = FILE_HEADER + 'export default COLORS = {\n' + js + '};';
				(0, _io.saveFile)(data, jsPath, 'JS file saved to: ');
			}

			if (output) {
				(0, _io.saveSwatch)(output, colors).then(resolve);
			} else {
				resolve();
			}
		});
	});
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zd2F0Y2gtbmFtZXMuanMiXSwibmFtZXMiOlsiRklMRV9IRUFERVIiLCJnZXRDb2xvck5hbWVzIiwiaGV4VmFsdWVzIiwiYWxsQ29sb3JzIiwiZm9yRWFjaCIsImNvbG9yIiwiYWxsTmFtZXMiLCJjb21iaW5lZE5hbWVzIiwibWFwIiwidW5pcUJ5Iiwic29ydEJ5IiwicmVkdWNlIiwicmVzdWx0IiwiY29uY2F0IiwidmFsdWUiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJjIiwicmVwbGFjZSIsInNvbWUiLCJwdXNoIiwicHJvY2Vzc1N3YXRjaCIsInN3YXRjaEZpbGUiLCJzY3NzUGF0aCIsImpzUGF0aCIsIm91dHB1dCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwidG9KU09OIiwiZXJyIiwic3dhdGNoZXMiLCJzd2F0Y2giLCJoZXgiLCJjb2xvcnMiLCJkYXRhIiwianMiLCJ0b1VwcGVyQ2FzZSIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBLE1BQU1BLGNBQWMsaUZBQXBCOztBQUVPLE1BQU1DLHdDQUFpQkMsU0FBRCxJQUFlO0FBQzNDLE9BQU1DLFlBQVksRUFBbEI7O0FBRUEsa0JBQUVDLE9BQUYsQ0FBVUYsU0FBVixFQUFzQkcsS0FBRCxJQUFXO0FBQy9CLFFBQU1DLFdBQVcsMEJBQU1ELEtBQU4sQ0FBakI7QUFDQSxRQUFNRSxnQkFDTCxpQkFBRUMsR0FBRixDQUNDLGlCQUFFQyxNQUFGLENBQ0MsaUJBQUVDLE1BQUYsQ0FDQyxpQkFBRUMsTUFBRixDQUFTTCxRQUFULEVBQW1CLENBQUNNLE1BQUQsRUFBU1AsS0FBVCxLQUFtQk8sT0FBT0MsTUFBUCxDQUFjUixLQUFkLENBQXRDLEVBQTRELEVBQTVELENBREQsRUFDa0UsVUFEbEUsQ0FERCxFQUdFUyxLQUFELElBQVdBLE1BQU1DLElBQU4sQ0FBV0MsV0FBWCxFQUhaLENBREQsRUFNRUMsQ0FBRCxJQUFPQSxFQUFFRixJQUFGLENBQU9DLFdBQVAsR0FBcUJFLE9BQXJCLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLENBTlIsQ0FERDs7QUFVQTtBQUNBLE1BQUksQ0FBQyxpQkFBRUMsSUFBRixDQUFPaEIsU0FBUCxFQUFrQixFQUFDRSxLQUFELEVBQWxCLENBQUwsRUFBaUM7QUFDaEM7QUFDQSxvQkFBRUQsT0FBRixDQUFVRyxhQUFWLEVBQTBCUSxJQUFELElBQVU7QUFDbEMsUUFBSSxDQUFDLGlCQUFFSSxJQUFGLENBQU9oQixTQUFQLEVBQWtCLEVBQUNZLElBQUQsRUFBbEIsQ0FBTCxFQUFnQztBQUMvQlosZUFBVWlCLElBQVYsQ0FBZSxFQUFDZixLQUFELEVBQVFVLElBQVIsRUFBZjtBQUNBLFlBQU8sS0FBUDtBQUNBO0FBQ0QsSUFMRDtBQU1BO0FBRUQsRUF2QkQ7O0FBeUJBLFFBQU9aLFNBQVA7QUFDQSxDQTdCTTs7QUErQlA7Ozs7OztBQU1PLE1BQU1rQix3Q0FBZ0IsQ0FBQ0MsVUFBRCxFQUFhQyxRQUFiLEVBQXVCQyxNQUF2QixFQUErQkMsTUFBL0IsS0FBMEM7O0FBRXRFLFFBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN2QyxzQkFBVUMsTUFBVixDQUFpQlAsVUFBakIsRUFBNkIsQ0FBQ1EsR0FBRCxFQUFNQyxRQUFOLEtBQW1CO0FBQy9DLE9BQUlELEdBQUosRUFBUyxPQUFPRixPQUFPRSxHQUFQLENBQVA7QUFDVCxTQUFNNUIsWUFBWTZCLFNBQVN2QixHQUFULENBQWN3QixNQUFELElBQVlBLE9BQU9DLEdBQVAsQ0FBV2pCLFdBQVgsRUFBekIsQ0FBbEI7QUFDQSxTQUFNa0IsU0FBU2pDLGNBQWNDLFNBQWQsQ0FBZjs7QUFFQSxPQUFJcUIsUUFBSixFQUFjO0FBQ2IsVUFBTVksT0FBT0QsT0FBT3ZCLE1BQVAsQ0FBYyxDQUFDQyxNQUFELEVBQVNQLEtBQVQsS0FBbUJPLFNBQVMsR0FBVCxHQUFlUCxNQUFNVSxJQUFyQixHQUE0QixJQUE1QixHQUFtQ1YsTUFBTUEsS0FBekMsR0FBaUQsS0FBbEYsRUFBeUZMLFdBQXpGLENBQWI7QUFDQSxzQkFBU21DLElBQVQsRUFBZVosUUFBZixFQUF5QixzQkFBekI7QUFDQTs7QUFFRCxPQUFJQyxNQUFKLEVBQVk7QUFDWCxVQUFNWSxLQUFLRixPQUFPdkIsTUFBUCxDQUFjLENBQUNDLE1BQUQsRUFBU1AsS0FBVCxLQUFtQk8sU0FBUyxJQUFULEdBQWdCUCxNQUFNVSxJQUFOLENBQVdHLE9BQVgsQ0FBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkJtQixXQUE3QixFQUFoQixHQUE2RCxNQUE3RCxHQUFzRWhDLE1BQU1BLEtBQTVFLEdBQW9GLE9BQXJILEVBQThILEVBQTlILENBQVg7QUFDQSxVQUFNOEIsT0FBT25DLGNBQWMsNkJBQWQsR0FBOENvQyxFQUE5QyxHQUFtRCxJQUFoRTtBQUNBLHNCQUFTRCxJQUFULEVBQWVYLE1BQWYsRUFBdUIsb0JBQXZCO0FBQ0E7O0FBRUQsT0FBSUMsTUFBSixFQUFZO0FBQ1gsd0JBQVdBLE1BQVgsRUFBbUJTLE1BQW5CLEVBQ0VJLElBREYsQ0FDT1gsT0FEUDtBQUVBLElBSEQsTUFHTztBQUNOQTtBQUNBO0FBQ0QsR0F0QkQ7QUF1QkEsRUF4Qk0sQ0FBUDtBQXlCQSxDQTNCTSIsImZpbGUiOiJzd2F0Y2gtbmFtZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmFtZXIgZnJvbSAnY29sb3ItbmFtZXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IGFjb1JlYWRlciBmcm9tICcuL2xpYi9hY29SZWFkZXInO1xuaW1wb3J0IHsgc2F2ZVN3YXRjaCwgc2F2ZUZpbGUgfSBmcm9tICcuL2xpYi9pbyc7XG5cbmNvbnN0IEZJTEVfSEVBREVSID0gJy8vIEZpbGUgYXV0byBnZW5lcmF0ZWQgYnkgXFwnc3dhdGNoLW5hbWVzXFwnLiBEbyBub3QgbW9kaWZ5IHRoaXMgZmlsZSBkaXJlY3RseS5cXG4nO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29sb3JOYW1lcyA9IChoZXhWYWx1ZXMpID0+IHtcblx0Y29uc3QgYWxsQ29sb3JzID0gW107XG5cblx0Xy5mb3JFYWNoKGhleFZhbHVlcywgKGNvbG9yKSA9PiB7XG5cdFx0Y29uc3QgYWxsTmFtZXMgPSBuYW1lcihjb2xvcik7XG5cdFx0Y29uc3QgY29tYmluZWROYW1lcyA9XG5cdFx0XHRfLm1hcChcblx0XHRcdFx0Xy51bmlxQnkoXG5cdFx0XHRcdFx0Xy5zb3J0QnkoXG5cdFx0XHRcdFx0XHRfLnJlZHVjZShhbGxOYW1lcywgKHJlc3VsdCwgY29sb3IpID0+IHJlc3VsdC5jb25jYXQoY29sb3IpLCBbXSksICdkaXN0YW5jZScpLFxuXHRcdFx0XHRcdCh2YWx1ZSkgPT4gdmFsdWUubmFtZS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdCksXG5cdFx0XHRcdChjKSA9PiBjLm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKVxuXHRcdFx0KTtcblxuXHRcdC8vIERlZmluZSBjb2xvciBvbmx5IGlmIG5vdCBhbHJlYWR5IGluIHRoZSBsaXN0XG5cdFx0aWYgKCFfLnNvbWUoYWxsQ29sb3JzLCB7Y29sb3J9KSkge1xuXHRcdFx0Ly8gTG9vcCB1bnRpbCBhIGZyZWUgbmFtZSBpcyBmb3VuZFxuXHRcdFx0Xy5mb3JFYWNoKGNvbWJpbmVkTmFtZXMsIChuYW1lKSA9PiB7XG5cdFx0XHRcdGlmICghXy5zb21lKGFsbENvbG9ycywge25hbWV9KSkge1xuXHRcdFx0XHRcdGFsbENvbG9ycy5wdXNoKHtjb2xvciwgbmFtZX0pO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cdHJldHVybiBhbGxDb2xvcnM7XG59O1xuXG4vKipcbiAqIFByb2Nlc3NlcyB0aGUgc3VwcGxpZWQgc3dhdGNoIGZpbGUsIHNhdmVzIGEgbmFtZWQgc3dhdGNoIGZpbGUgYW5kIGdlbmVyYXRlcyBTQ1NTL0pTIGZpbGVzIHdpdGggY29sb3IgdmFyaWFibGVzLlxuICogQHBhcmFtIHtzdHJpbmd9IHN3YXRjaCAtIFBhdGggdG8gdGhlIGlucHV0IHN3YXRjaCBmaWxlLlxuICogQHBhcmFtIHtzdHJpbmd9IHNjc3NQYXRoIC0gUGF0aCB0byB0aGUgU0NTUyBmaWxlIHRvIHNhdmUgdmFyaWFibGVzLlxuICogQHBhcmFtIHtzdHJpbmd9IGpzUGF0aCAtIFBhdGggdG8gdGhlIEpTIGZpbGUgdG8gc2F2ZSB2YXJpYWJsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBwcm9jZXNzU3dhdGNoID0gKHN3YXRjaEZpbGUsIHNjc3NQYXRoLCBqc1BhdGgsIG91dHB1dCkgPT4ge1xuXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0YWNvUmVhZGVyLnRvSlNPTihzd2F0Y2hGaWxlLCAoZXJyLCBzd2F0Y2hlcykgPT4ge1xuXHRcdFx0aWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuXHRcdFx0Y29uc3QgaGV4VmFsdWVzID0gc3dhdGNoZXMubWFwKChzd2F0Y2gpID0+IHN3YXRjaC5oZXgudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRjb25zdCBjb2xvcnMgPSBnZXRDb2xvck5hbWVzKGhleFZhbHVlcyk7XG5cblx0XHRcdGlmIChzY3NzUGF0aCkge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gY29sb3JzLnJlZHVjZSgocmVzdWx0LCBjb2xvcikgPT4gcmVzdWx0ICsgJyQnICsgY29sb3IubmFtZSArICc6ICcgKyBjb2xvci5jb2xvciArICc7XFxuJywgRklMRV9IRUFERVIpO1xuXHRcdFx0XHRzYXZlRmlsZShkYXRhLCBzY3NzUGF0aCwgJ1NDU1MgZmlsZSBzYXZlZCB0bzogJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChqc1BhdGgpIHtcblx0XHRcdFx0Y29uc3QganMgPSBjb2xvcnMucmVkdWNlKChyZXN1bHQsIGNvbG9yKSA9PiByZXN1bHQgKyAnXFx0JyArIGNvbG9yLm5hbWUucmVwbGFjZSgnLScsICdfJykudG9VcHBlckNhc2UoKSArICc6IFxcJycgKyBjb2xvci5jb2xvciArICdcXCcsXFxuJywgJycpO1xuXHRcdFx0XHRjb25zdCBkYXRhID0gRklMRV9IRUFERVIgKyAnZXhwb3J0IGRlZmF1bHQgQ09MT1JTID0ge1xcbicgKyBqcyArICd9Oyc7XG5cdFx0XHRcdHNhdmVGaWxlKGRhdGEsIGpzUGF0aCwgJ0pTIGZpbGUgc2F2ZWQgdG86ICcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3V0cHV0KSB7XG5cdFx0XHRcdHNhdmVTd2F0Y2gob3V0cHV0LCBjb2xvcnMpXG5cdFx0XHRcdFx0LnRoZW4ocmVzb2x2ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufTtcbiJdfQ==