<script>
import Issues from "@/components/Issues.vue";
import RepositoryMenu from "@/components/RepositoryMenu.vue";

export default {
    components: {
        RepositoryMenu,
        Issues
    },

    mounted() {
        this.$store.dispatch('fetchData')
    }
}
</script>

<template>
    <div class="container">
        <RepositoryMenu/>
        <Issues
            v-if="$store.state.searchValue"
        />
    </div>
</template>

<style scoped>
.container {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}
</style>
