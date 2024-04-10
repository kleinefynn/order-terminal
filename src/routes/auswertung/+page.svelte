<script lang="ts">
    import purchases from "../purchases.store"
</script>

<div class="flex flex-col">
    {#each $purchases as purchase}
        <p>{purchase.time}</p>
    {/each}
</div>
