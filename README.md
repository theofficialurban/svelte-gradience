# Svelte Gradience

A very thin wrapper for beautiful gradient coloring made using `d3-interpolate`

## `class Gradience`

The Gradience Class allows you to create beautiful Gradients and interpolate colors easily

### Color Return Methods

- `Gradience.asRawColors()` - Returns the colors as the RGB color string ('#FFFFFF')
- `Gradience.asBackgroundColors()` - Returns the colors as CSS `background-color` strings "background-color: color;"
- `Gradience.asVariables()` - Returns the colors as a single CSS variable string "--one: colorOne; --two: colorTwo; ...."

### `Gradience.asRawColors()`

**Returns an array:**

```json
[
    colorOne,
    ...
]
```

### `Gradience.asBackgroundColors`

**Returns an array:**

```json
[
    "background-color: colorOne;",
    "background-color: colorTwo;",
    ....
]
```

### `Gradience.asVariables`

**Returns an single string:**

```html
--one: colorOne; --two: colorTwo; ....
```

### Example

```html
<script lang="ts">
	import Gradience from '@theofficialurban/svelte-gradience';
	const myColors = [
		// Pair #1, will interpolate between red and blue
		['red', 'blue']
	];
	// Second Argument is Svelte Tweened Options /w Interpolater, leave blank for default
	const gradience = new Gradience(myColors, { duration: 1000 });
	const tweens = gradience.asRawColors();
	const colorOne = $tweens[0]; // First tween corresponds to first set of colors

	// If you want the colors as a `background-color: color;` string
	const tweens = gradience.asBackgroundColors();
	console.log($tweens[0]); // "background-color: colorOne;"

	// As a single CSS variable string
	const tweens = gradience.asVariables();
	console.log($tweens); // '--one: colorOne; .....'
</script>
```

```html
<!-- Using a single color -->
<!-- asBackgroundColors() -->
<div style={`${$tweens[0]} width: 200px; height: 200px`} />
```

```html
<!-- Using asVariables() for a single string that declares variables -->
<div style={`${$tweens} width: 200px; height: 200px`} />
```
