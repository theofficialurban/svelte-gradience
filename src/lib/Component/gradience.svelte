<script lang="ts">
	import { linear } from 'svelte/easing';
	import { Gradience } from '../Gradience/Gradience.svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { interpolateRgbBasis } from 'd3-interpolate';
	import type { HTMLAttributes } from 'svelte/elements';
	interface $$props extends HTMLAttributes<HTMLDivElement> {
		element?: 'div' | 'span';
		colors: [string, string][];
		easing?: EasingFunction;
		duration?: number;
		interpolate?: (a: string, b: string) => (t: number) => string;
	}
	const defaultInt = (a: string, b: string) => interpolateRgbBasis([a, b]);
	let {
		colors,
		easing = linear,
		duration = 1000,
		interpolate = defaultInt,
		element = 'div',
		...restProps
	} = $props<$$props>();
	const g = new Gradience(colors, { duration, easing, interpolate });
	const t = g.asVariables();
	const raw = g.asRawColors();
</script>

<svelte:element this={element} style={$t} {...restProps}>
	<slot colors={$raw} />
</svelte:element>
