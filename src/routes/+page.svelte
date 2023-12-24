<script lang="ts">
	import { Gradient } from '$lib/index.js';
</script>

<Gradient colors={[['red', 'blue']]} let:colors>
	{colors[0]}
</Gradient>
