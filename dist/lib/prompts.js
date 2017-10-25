'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.jsPath = exports.scssPath = exports.initialize = exports.outputPath = exports.overwrite = exports.swatch = exports.newPath = exports.differentPath = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const differentPath = exports.differentPath = {
	type: 'confirm',
	name: 'differentPath',
	message: 'Would you like to specify a different path?',
	default: true
};

const newPath = exports.newPath = root => ({
	type: 'path',
	name: 'newPath',
	cwd: root,
	directoryOnly: true,
	message: 'Path to your swatches:',
	default: root,
	when: answers => answers.differentPath
});

const swatch = exports.swatch = (files, fileName) => ({
	type: 'autocomplete',
	name: 'swatch',
	message: 'Which swatch file do you want to process?',
	source: (_, input) => Promise.resolve(files.filter(file => !input || file.value.toLowerCase().indexOf(input.toLowerCase()) >= 0)),
	when: !fileName
});

const overwrite = exports.overwrite = {
	type: 'confirm',
	name: 'overwrite',
	message: 'Overwrite swatch file?',
	default: false
};

const outputPath = exports.outputPath = def => ({
	type: 'input',
	name: 'outputPath',
	message: 'Filename of the new swatch file:',
	default: def,
	when: answers => !answers.overwrite
});

const initialize = exports.initialize = skipInit => ({
	type: 'confirm',
	name: 'initialize',
	message: 'Initialize watcher for this swatch file?',
	default: true,
	when: !skipInit
});

const scssPath = exports.scssPath = (root, noSave) => ({
	type: 'path',
	name: 'scssPath',
	message: 'Save SCSS file with color variables to: (leave this empty if SCSS output is not needed)',
	cwd: root,
	validate: answer => answer === root || _lodash2.default.endsWith(answer.toLowerCase(), '.scss') ? true : red.bold('Invalid .scss file path. Enter a valid file path relative to project root.'),
	filter: answer => answer === root ? noSave : answer
});

const jsPath = exports.jsPath = (root, noSave) => ({
	type: 'path',
	name: 'jsPath',
	message: 'Save JS file with color variables to: (leave this empty if JS output is not needed)',
	cwd: root,
	validate: answer => answer === root || _lodash2.default.endsWith(answer.toLowerCase(), '.js') ? true : red.bold('Invalid .js file path. Enter a valid file path relative to project root.'),
	filter: answer => answer === root ? noSave : answer
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvbXB0cy5qcyJdLCJuYW1lcyI6WyJkaWZmZXJlbnRQYXRoIiwidHlwZSIsIm5hbWUiLCJtZXNzYWdlIiwiZGVmYXVsdCIsIm5ld1BhdGgiLCJyb290IiwiY3dkIiwiZGlyZWN0b3J5T25seSIsIndoZW4iLCJhbnN3ZXJzIiwic3dhdGNoIiwiZmlsZXMiLCJmaWxlTmFtZSIsInNvdXJjZSIsIl8iLCJpbnB1dCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZmlsdGVyIiwiZmlsZSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwib3ZlcndyaXRlIiwib3V0cHV0UGF0aCIsImRlZiIsImluaXRpYWxpemUiLCJza2lwSW5pdCIsInNjc3NQYXRoIiwibm9TYXZlIiwidmFsaWRhdGUiLCJhbnN3ZXIiLCJlbmRzV2l0aCIsInJlZCIsImJvbGQiLCJqc1BhdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRU8sTUFBTUEsd0NBQWdCO0FBQzVCQyxPQUFNLFNBRHNCO0FBRTVCQyxPQUFNLGVBRnNCO0FBRzVCQyxVQUFTLDZDQUhtQjtBQUk1QkMsVUFBUztBQUptQixDQUF0Qjs7QUFPQSxNQUFNQyw0QkFBV0MsSUFBRCxLQUFXO0FBQ2pDTCxPQUFNLE1BRDJCO0FBRWpDQyxPQUFNLFNBRjJCO0FBR2pDSyxNQUFLRCxJQUg0QjtBQUlqQ0UsZ0JBQWUsSUFKa0I7QUFLakNMLFVBQVMsd0JBTHdCO0FBTWpDQyxVQUFTRSxJQU53QjtBQU9qQ0csT0FBT0MsT0FBRCxJQUFhQSxRQUFRVjtBQVBNLENBQVgsQ0FBaEI7O0FBVUEsTUFBTVcsMEJBQVMsQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLE1BQXNCO0FBQzNDWixPQUFNLGNBRHFDO0FBRTNDQyxPQUFNLFFBRnFDO0FBRzNDQyxVQUFTLDJDQUhrQztBQUkzQ1csU0FBUSxDQUFDQyxDQUFELEVBQUlDLEtBQUosS0FBY0MsUUFBUUMsT0FBUixDQUNyQk4sTUFBTU8sTUFBTixDQUFhQyxRQUFRLENBQUNKLEtBQUQsSUFBVUksS0FBS0MsS0FBTCxDQUFXQyxXQUFYLEdBQXlCQyxPQUF6QixDQUFpQ1AsTUFBTU0sV0FBTixFQUFqQyxLQUF5RCxDQUF4RixDQURxQixDQUpxQjtBQU8zQ2IsT0FBTSxDQUFDSTtBQVBvQyxDQUF0QixDQUFmOztBQVVBLE1BQU1XLGdDQUFZO0FBQ3hCdkIsT0FBTSxTQURrQjtBQUV4QkMsT0FBTSxXQUZrQjtBQUd4QkMsVUFBUyx3QkFIZTtBQUl4QkMsVUFBUztBQUplLENBQWxCOztBQU9BLE1BQU1xQixrQ0FBY0MsR0FBRCxLQUFVO0FBQ25DekIsT0FBTSxPQUQ2QjtBQUVuQ0MsT0FBTSxZQUY2QjtBQUduQ0MsVUFBUyxrQ0FIMEI7QUFJbkNDLFVBQVNzQixHQUowQjtBQUtuQ2pCLE9BQU9DLE9BQUQsSUFBYSxDQUFDQSxRQUFRYztBQUxPLENBQVYsQ0FBbkI7O0FBUUEsTUFBTUcsa0NBQWNDLFFBQUQsS0FBZTtBQUN4QzNCLE9BQU0sU0FEa0M7QUFFeENDLE9BQU0sWUFGa0M7QUFHeENDLFVBQVMsMENBSCtCO0FBSXhDQyxVQUFTLElBSitCO0FBS3hDSyxPQUFNLENBQUNtQjtBQUxpQyxDQUFmLENBQW5COztBQVFBLE1BQU1DLDhCQUFXLENBQUN2QixJQUFELEVBQU93QixNQUFQLE1BQW1CO0FBQzFDN0IsT0FBTSxNQURvQztBQUUxQ0MsT0FBTSxVQUZvQztBQUcxQ0MsVUFBUyx5RkFIaUM7QUFJMUNJLE1BQUtELElBSnFDO0FBSzFDeUIsV0FBVUMsVUFBVUEsV0FBVzFCLElBQVgsSUFBbUIsaUJBQUUyQixRQUFGLENBQVdELE9BQU9WLFdBQVAsRUFBWCxFQUFpQyxPQUFqQyxDQUFuQixHQUErRCxJQUEvRCxHQUFzRVksSUFBSUMsSUFBSixDQUFTLDRFQUFULENBTGhEO0FBTTFDaEIsU0FBUWEsVUFBVUEsV0FBVzFCLElBQVgsR0FBa0J3QixNQUFsQixHQUEyQkU7QUFOSCxDQUFuQixDQUFqQjs7QUFTQSxNQUFNSSwwQkFBUyxDQUFDOUIsSUFBRCxFQUFPd0IsTUFBUCxNQUFtQjtBQUN4QzdCLE9BQU0sTUFEa0M7QUFFeENDLE9BQU0sUUFGa0M7QUFHeENDLFVBQVMscUZBSCtCO0FBSXhDSSxNQUFLRCxJQUptQztBQUt4Q3lCLFdBQVVDLFVBQVVBLFdBQVcxQixJQUFYLElBQW1CLGlCQUFFMkIsUUFBRixDQUFXRCxPQUFPVixXQUFQLEVBQVgsRUFBaUMsS0FBakMsQ0FBbkIsR0FBNkQsSUFBN0QsR0FBb0VZLElBQUlDLElBQUosQ0FBUywwRUFBVCxDQUxoRDtBQU14Q2hCLFNBQVFhLFVBQVVBLFdBQVcxQixJQUFYLEdBQWtCd0IsTUFBbEIsR0FBMkJFO0FBTkwsQ0FBbkIsQ0FBZiIsImZpbGUiOiJwcm9tcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNvbnN0IGRpZmZlcmVudFBhdGggPSB7XG5cdHR5cGU6ICdjb25maXJtJyxcblx0bmFtZTogJ2RpZmZlcmVudFBhdGgnLFxuXHRtZXNzYWdlOiAnV291bGQgeW91IGxpa2UgdG8gc3BlY2lmeSBhIGRpZmZlcmVudCBwYXRoPycsXG5cdGRlZmF1bHQ6IHRydWVcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdQYXRoID0gKHJvb3QpID0+ICh7XG5cdHR5cGU6ICdwYXRoJyxcblx0bmFtZTogJ25ld1BhdGgnLFxuXHRjd2Q6IHJvb3QsXG5cdGRpcmVjdG9yeU9ubHk6IHRydWUsXG5cdG1lc3NhZ2U6ICdQYXRoIHRvIHlvdXIgc3dhdGNoZXM6Jyxcblx0ZGVmYXVsdDogcm9vdCxcblx0d2hlbjogKGFuc3dlcnMpID0+IGFuc3dlcnMuZGlmZmVyZW50UGF0aFxufSk7XG5cbmV4cG9ydCBjb25zdCBzd2F0Y2ggPSAoZmlsZXMsIGZpbGVOYW1lKSA9PiAoe1xuXHR0eXBlOiAnYXV0b2NvbXBsZXRlJyxcblx0bmFtZTogJ3N3YXRjaCcsXG5cdG1lc3NhZ2U6ICdXaGljaCBzd2F0Y2ggZmlsZSBkbyB5b3Ugd2FudCB0byBwcm9jZXNzPycsXG5cdHNvdXJjZTogKF8sIGlucHV0KSA9PiBQcm9taXNlLnJlc29sdmUoXG5cdFx0ZmlsZXMuZmlsdGVyKGZpbGUgPT4gIWlucHV0IHx8IGZpbGUudmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKGlucHV0LnRvTG93ZXJDYXNlKCkpID49IDApXG5cdCksXG5cdHdoZW46ICFmaWxlTmFtZVxufSk7XG5cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGUgPSB7XG5cdHR5cGU6ICdjb25maXJtJyxcblx0bmFtZTogJ292ZXJ3cml0ZScsXG5cdG1lc3NhZ2U6ICdPdmVyd3JpdGUgc3dhdGNoIGZpbGU/Jyxcblx0ZGVmYXVsdDogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBvdXRwdXRQYXRoID0gKGRlZikgPT4gKHtcblx0dHlwZTogJ2lucHV0Jyxcblx0bmFtZTogJ291dHB1dFBhdGgnLFxuXHRtZXNzYWdlOiAnRmlsZW5hbWUgb2YgdGhlIG5ldyBzd2F0Y2ggZmlsZTonLFxuXHRkZWZhdWx0OiBkZWYsXG5cdHdoZW46IChhbnN3ZXJzKSA9PiAhYW5zd2Vycy5vdmVyd3JpdGVcbn0pO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZSA9IChza2lwSW5pdCkgPT4gKHtcblx0dHlwZTogJ2NvbmZpcm0nLFxuXHRuYW1lOiAnaW5pdGlhbGl6ZScsXG5cdG1lc3NhZ2U6ICdJbml0aWFsaXplIHdhdGNoZXIgZm9yIHRoaXMgc3dhdGNoIGZpbGU/Jyxcblx0ZGVmYXVsdDogdHJ1ZSxcblx0d2hlbjogIXNraXBJbml0XG59KTtcblxuZXhwb3J0IGNvbnN0IHNjc3NQYXRoID0gKHJvb3QsIG5vU2F2ZSkgPT4gKHtcblx0dHlwZTogJ3BhdGgnLFxuXHRuYW1lOiAnc2Nzc1BhdGgnLFxuXHRtZXNzYWdlOiAnU2F2ZSBTQ1NTIGZpbGUgd2l0aCBjb2xvciB2YXJpYWJsZXMgdG86IChsZWF2ZSB0aGlzIGVtcHR5IGlmIFNDU1Mgb3V0cHV0IGlzIG5vdCBuZWVkZWQpJyxcblx0Y3dkOiByb290LFxuXHR2YWxpZGF0ZTogYW5zd2VyID0+IGFuc3dlciA9PT0gcm9vdCB8fCBfLmVuZHNXaXRoKGFuc3dlci50b0xvd2VyQ2FzZSgpLCAnLnNjc3MnKSA/IHRydWUgOiByZWQuYm9sZCgnSW52YWxpZCAuc2NzcyBmaWxlIHBhdGguIEVudGVyIGEgdmFsaWQgZmlsZSBwYXRoIHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdC4nKSxcblx0ZmlsdGVyOiBhbnN3ZXIgPT4gYW5zd2VyID09PSByb290ID8gbm9TYXZlIDogYW5zd2VyXG59KTtcblxuZXhwb3J0IGNvbnN0IGpzUGF0aCA9IChyb290LCBub1NhdmUpID0+ICh7XG5cdHR5cGU6ICdwYXRoJyxcblx0bmFtZTogJ2pzUGF0aCcsXG5cdG1lc3NhZ2U6ICdTYXZlIEpTIGZpbGUgd2l0aCBjb2xvciB2YXJpYWJsZXMgdG86IChsZWF2ZSB0aGlzIGVtcHR5IGlmIEpTIG91dHB1dCBpcyBub3QgbmVlZGVkKScsXG5cdGN3ZDogcm9vdCxcblx0dmFsaWRhdGU6IGFuc3dlciA9PiBhbnN3ZXIgPT09IHJvb3QgfHwgXy5lbmRzV2l0aChhbnN3ZXIudG9Mb3dlckNhc2UoKSwgJy5qcycpID8gdHJ1ZSA6IHJlZC5ib2xkKCdJbnZhbGlkIC5qcyBmaWxlIHBhdGguIEVudGVyIGEgdmFsaWQgZmlsZSBwYXRoIHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdC4nKSxcblx0ZmlsdGVyOiBhbnN3ZXIgPT4gYW5zd2VyID09PSByb290ID8gbm9TYXZlIDogYW5zd2VyXG59KTsiXX0=