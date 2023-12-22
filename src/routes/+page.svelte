<script lang="ts">
	import Gradience from '@theofficialurban/svelte-gradience';
	import { interpolateRgb } from 'd3-interpolate';
	const gradience = new Gradience(
		[
			['steelblue', 'purple'],
			['green', 'red']
		],
		{
			duration: 2000,
			interpolate: interpolateRgb
		}
	);
	const tweens = gradience.asBackgroundColors();
	const t = gradience.asRawColors();
</script>

<div style={`${$tweens[0]} width: 200px; height: 200px; color: ${$t[1]};`}>Hello World</div>
