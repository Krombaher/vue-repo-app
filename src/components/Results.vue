<script>
export default {
    props: ['repo'],
    created() {
        // props are exposed on `this`
        console.log(this.repo)
    }
}
</script>
<template>
    <h3>...</h3>
</template>