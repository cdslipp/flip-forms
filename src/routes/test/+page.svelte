<script>
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Modal from '$lib/Modal.svelte';
	import Form from '../form/+page.svelte';

    let showModal = $state(false);

	async function addItem(e) {
		console.log(e);
		// bail if opening a new tab, or we're on too small a screen
		if (e.metaKey || innerWidth < 640) return;

		// prevent navigation
		e.preventDefault();

		const { href } = e.currentTarget;

		// run `load` functions (or rather, get the result of the `load` functions
		// that are already running because of `data-sveltekit-preload-data`)
		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			const serializableData = JSON.parse(JSON.stringify(result.data));
			pushState('/form', { selected: serializableData });
		} else {
			// something bad happened! try navigating
			goto('/form');
		}
	}

    $effect(() => {
        console.log('modal status', showModal);
        console.log($page.url);
        console.log($page);
        if(!showModal && $page.state === '/form') {
            goto('/test');
        }
    });
</script>

<a href="/form" on:click={addItem}>Add an Item</a>

{#if $page.state.selected}
    <Modal bind:active={showModal}>
        <h1>MODAL!</h1>
        <Form data={$page.state.selected} />
    </Modal>
{/if}
