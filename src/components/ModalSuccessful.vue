
<template>
<div>
    <div class="modal" @click.self="toggleModal">
        <!-- I know that it is possible through slots, but I don't have much time -->
        <button @click="toggleModal" class="close-button">Close</button>
        <div class="modal-wrapper">
            <h5 class="modal-title _center">Successful</h5>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        toggleModal() {
            this.$emit('toggleModal')
        },
    }
}
</script>

<style>

</style>