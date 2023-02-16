<script>
export default {
    props: ['comments', 'id']
}
</script>

<template>
    <div class="comments" v-show="id === $store.state.active.id" style="margin-top: 10px"
         v-for="comment in comments">
        <hr>
        <h2>Comments</h2>
        <hr>
        <div>
            <span style="font-weight: bold">Date:</span>
            {{ comment.createdAt }}
        </div>
        <div>
            <span style="font-weight: bold"> Description: </span>
            {{ comment.body }}
        </div>
    </div>
</template>

<style scoped>
.comments {
    padding: 10px;
    border: 2px solid #ffffff;
    border-radius: 10px;
}
.comments h2 {
    color: #222222;
    font-weight: bold;
}
</style>