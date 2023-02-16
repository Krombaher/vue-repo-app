<script>
import Comment from "@/components/Comment.vue";

export default {
    components: {Comment}
}
</script>
<template>
    <div class="issue__container">
        <div @click="$store.commit('onClick', issue.node.id)" class="issue__card" v-for="issue in $store.state.active.issues" :key="issue.node.id">
            <div class="issue__info">
                <div>
                    <span>Issue:</span>
                    {{ issue.node.title }}
                </div>
                <div>
                    <span>State: </span>
                    {{ issue.node.state }}
                </div>
                <div>
                    <span>Description:</span>
                    {{ issue.node.body }}
                </div>
                <Comment
                    :comments="issue.node.comments.nodes"
                    :id="issue.node.id"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.issue__container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
}

.issue__card {
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid #282828;
    margin-top: 10px;
    background: #797878;
    color: white;
}

.issue__info span {
    color: #222222;
    font-weight: bold;
}
</style>