import { browser } from '$app/environment';
import { interpolateRgbBasis } from 'd3-interpolate';
import { tweened, type Tweened, type TweenedOptions } from 'svelte/motion';
import { derived } from 'svelte/store';
/**
 * @type SetFN
 * A typing for Svelte Derived Store set Fn
 */
type SetFn<T = string[]> = (val: T) => void;
/**
 * @function numberToWord
 * @param number A numerical #
 * @returns {string} The word as a string
 */
function numberToWord(number: number) {
	switch (number) {
		case 1:
			return 'one';
		case 2:
			return 'two';
		case 3:
			return 'three';
		case 4:
			return 'four';
		case 5:
			return 'five';
		case 6:
			return 'six';
		case 7:
			return 'seven';
		case 8:
			return 'eight';
		case 9:
			return 'nine';
		case 10:
			return 'ten';
		default:
			return null;
	}
}
/**
 * @class Gradience
 * A wrapper for gradient interpolation
 */
export class Gradience {
	#colors: string[][] = $state([]);
	#tweens: Tweened<string>[];

	constructor(
		colors: string[][],
		private tweenOptions: TweenedOptions<string>
	) {
		this.#colors = [...this.#colors, ...colors];
		const options = {
			interpolate: (a: string, b: string) => interpolateRgbBasis([a, b]),
			...this.tweenOptions
		};
		this.#tweens = this.#colors.map((c) => tweened<string>(c[0], options));

		this.run();
		return this;
	}
	/**
	 * @public @method asBackgroundColors
	 * Returns the colors as CSS strings "background-color: colorVal"
	 * @returns An array of background-color CSS strings
	 */
	asBackgroundColors = () => {
		return derived<Tweened<string>[], string[]>(
			[...this.#tweens],
			([...vals]: string[], set: SetFn) => {
				const strings = vals.map((v) => {
					return `background-color: ${v};`;
				});
				set(strings);
			}
		);
	};
	/**
	 * @public @method asVariables
	 * @returns The colors as CSS variable strings "--one: color1;"
	 */
	asVariables = () => {
		return derived<Tweened<string>[], string[]>(
			this.#tweens,
			([...vals]: string[], set: SetFn<string>) => {
				let s = '';
				vals.forEach((v, i) => (s += `--${numberToWord(i + 1)}: ${v}; `));

				set(s);
			}
		);
	};
	/**
	 * @public @method asRawColors
	 * @returns The colors as raw color strings "#FFFFFF"
	 */
	asRawColors = () => {
		return derived<Tweened<string>[], string[]>(this.#tweens, ([...vals]: string[], set: SetFn) => {
			set(vals);
		});
	};
	/**
	 * @public @method run()
	 * Runs the loop
	 */
	run = () => {
		if (browser) {
			this.#tweens.forEach((t, index) => {
				t.set(this.#colors[index][1]).then(() => {
					t.set(this.#colors[index][0]).then(() => this.run());
				});
			});
		}
	};
}
