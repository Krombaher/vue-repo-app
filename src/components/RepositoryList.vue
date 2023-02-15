<template>
    <div class="container">
        <div class="search__block">
            <div class="search">
                <input type="text" placeholder="Enter name repository..." autocomplete="off" v-model="$store.state.searchValue"
                       @focus="$store.state.modal = true">
            </div>
            <div class="menu" v-if="filteredList && $store.state.modal">
                <div class="menu__block">
                    <li class="menu__item" v-for="item in filteredList" @click="setState(item.node)" :key="item.node.id">
                        {{item.node.name }}
                    </li>
                </div>
            </div>
        </div>
        <div class="issue__container">
            <Issues
                :issues="$store.state.active.issues"
                :visible="$store.state.visible"
                :onClick="onClick"
            />
        </div>
    </div>
</template>

<script>
import Issues from "@/components/Issues.vue";
import {mapGetters} from "vuex";
export default {
    components: {
        Issues
    },
    mounted() {
        this.$store.dispatch('fetchData')
    },

    computed: {
        ...mapGetters({
            filteredList: 'filteredList'
        })
    },
    methods: {
        setState(state) {
            this.$store.state.searchValue = state.name
            this.$store.state.active.name = state.name
            this.$store.state.active.issues = state.issues.edges
            this.$store.state.modal = false
        },

        onClick(id) {
            this.$store.state.activeId = id
        }
    },
}
</script>

<style scoped>
.container {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}
.search__block {
    width: 50%;
}
.search input {
    padding: 5px;
    border-radius: 10px;
    width: 300px;
    outline: none;
    border: 2px solid #282828;
}
.menu {
    position: relative;
}
.menu__block {
    margin-top: 10px;
    width: 300px;
    max-height: 400px;
    overflow-y: scroll;
    position: absolute;
    border: 2px solid #ece9e9;
    color: #222222;
}
.menu__item {
    width: 100%;
    z-index: 12;
    padding: 5px;
    text-align: center;
    margin-top: 2px;
}
.menu__item:hover {
    background: #67c6f1;
}

.issue__container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
}
</style>
