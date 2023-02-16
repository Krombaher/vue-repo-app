<script>
import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters({
            filteredList: 'filteredList'
        })
    }
}
</script>

<template>
    <div class="search__block">
        <div class="search">
            <input type="text" placeholder="Enter name repository..." autocomplete="off" v-model="$store.state.searchValue"
                   @focus="$store.state.modal = true">
        </div>
        <div class="menu" v-if="filteredList && $store.state.modal">
            <div class="menu__block">
                <li class="menu__item" v-for="item in filteredList" @click="$store.commit('setState', item.node)" :key="item.node.id">
                    {{item.node.name }}
                </li>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
</style>