<script>
export default {
    props: ['issues', 'visible', 'onClick']
}
</script>
<template>
    <div @click="onClick(issue.node.id)" class="issue__card" v-for="issue in issues" :key="issue.node.id">
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
                <div class="comments" v-show="issue.node.id === $store.state.activeId" style="margin-top: 10px"
                     v-for="comment in issue.node.comments.nodes">
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
        </div>
    </div>
</template>

<style scoped>
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