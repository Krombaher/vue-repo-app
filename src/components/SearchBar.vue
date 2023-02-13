<script>
import Results from "@/components/Results.vue";

export default {
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {},

    mounted() {
        this.$store.dispatch('fetchData')
    },
    computed: {
        repoList() {
            if (this.searchValue.trim().length > 0) {
                return this.$store.state.repoData.filter((repo) =>
                    repo.node.name
                        .toLowerCase()
                        .includes(this.searchValue.trim().toLowerCase()))
            }
            return this.$store.state.repoData
        }
    },
    components: {
        Results
    }
}
</script>
<template>
    <section class="container">
        <div class="search__container">
            <input
                type="text"
                placeholder="Enter text..."
               v-model="searchValue"
            />
        </div>
        <div class="table__container">
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="repo in repoList" :key="repo.id">
                    <td>{{ repo.node.id }}</td>
                    <td>{{ repo.node.name }}</td>
                    <td>{{ repo.node.description }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
.container {
    margin-top: 40px;
}
.container input, button {
    outline: none;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
}
.container button:hover {
    background: aqua;
}
.search__container {
    margin-bottom: 10px;
}
.table__container th {
    background: aqua;
}

.table__container th, td {
    border: 2px solid gray;
    border-radius:10px;
    width: 100px;
}

.table__container td:hover {
    background: gray;
}
</style>
