<script>
	import Modal from '$lib/Modal.svelte';

	let showModal = $state(false);

	function addItem() {
		showModal = true;
		console.log(showModal);
	}

	function closeModal() {
		// Logic to handle modal close
		showModal = false;
		console.log('close modal');
	}
	function handleSubmit() {
		// Form submission logic
	}

	$inspect(showModal);
</script>

<button on:click={addItem}>Add an Item</button>

{#if showModal}
	<Modal bind:active={showModal}>
        <h2>This is my modal</h2>
        <input type="text" name="name" placeholder="Name" />
    </Modal>
{/if}
