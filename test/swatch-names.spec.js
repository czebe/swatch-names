import {expect} from 'chai';
import colorList from 'color-name-list';
import _ from 'lodash';

import {getColorNames, processSwatch, sanitizeColorName, FILE_HEADER} from '../src/lib/swatch-names';

describe('swatch-names', () => {

	describe('sanitizeColorName()', () => {

		it('should replace leading number', () => {
			expect(sanitizeColorName('1975 Earth Red')).to.equal('the-1975-earth-red');
		});

		it('should remove punctuation marks', () => {
			expect(sanitizeColorName('Earth\'s Red! Ready? Yes. 9%')).to.equal('earths-red-ready-yes-9');
		});

		it('should remove diacritics', () => {
			expect(sanitizeColorName('Âbi Preußen Zǐ Lúo Lán Sè')).to.equal('abi-preussen-zi-luo-lan-se');
		});

		it('should replace spaces with custom character', () => {
			expect(sanitizeColorName('Yuè Guāng Lán Moonlight', '_')).to.equal('yue_guang_lan_moonlight');
		});

	});

	describe('getColorNames()', () => {

		it('should return correct color names for hex color codes', () => {
			const colors = _.map(_.sampleSize(colorList, 30), c => ({name: sanitizeColorName(c.name), hex: c.hex.toUpperCase()}));
			const namedColors = getColorNames(colors.map((c) => c.hex));

			expect(namedColors).to.deep.equal(colors);
			expect(getColorNames('#B78727')).to.deep.equal([{name: 'university-of-california-gold', hex: '#B78727'}]);
		});

		it('should throw an error when incorrect hex code or wrong argument format is supplied', () => {
			expect(() => getColorNames(['#fff'])).throw();
			expect(() => getColorNames(['#fffff'])).throw();
			expect(() => getColorNames(['#gg0101'])).throw();
			expect(() => getColorNames(['ffffff'])).throw();
			expect(() => getColorNames('ffffff')).throw();
			expect(() => getColorNames('')).throw();
			expect(() => getColorNames([])).throw();
			expect(() => getColorNames({hex: '#ffffff'})).throw();
		});

	});

	describe('processSwatch()', () => {

		const colors = _.map(_.sampleSize(colorList, 10), c => ({name: sanitizeColorName(c.name), hex: c.hex.toUpperCase()}));
		const processed = processSwatch(_.map(colors, c => ({hex: c.hex})));

		it('should generate valid color names', () => {
			expect(processed.colors).to.deep.equal(colors);
		});

		it('should generate SCSS variables', () => {
			expect(processed.scss).to.include(FILE_HEADER);
			expect(processed.scss).to.include(`$${colors[0].name}: '${colors[0].hex}'`);
			expect(processed.scss).to.include(`$${colors[colors.length - 1].name}: '${colors[colors.length - 1].hex}'`);
		});

		it('should generate JS variables', () => {
			expect(processed.js).to.include(FILE_HEADER);
			expect(processed.js).to.include('export default {');
			expect(processed.js).to.include(`${colors[0].name.replace(/-/g, '_')}: '${colors[0].hex}',`);
			expect(processed.js).to.include(`${colors[colors.length - 1].name.replace(/-/g, '_')}: '${colors[colors.length - 1].hex}'`);
			expect(processed.js).to.include('}');
		});

	});

});