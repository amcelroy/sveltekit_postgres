<script lang="ts">
    import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        
    });
</script>

<div class="text-2xl">
    Hello {data.profile?.firstName} {data.profile?.lastName}
</div>
<div>
    What would you like to do today?
</div>

