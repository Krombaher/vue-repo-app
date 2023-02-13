<script>
import Results from "@/components/Results.vue";
import axios from "axios";

export default {
    data() {
        return {
            repoData: null,
            searchValue: ''
        }
    },
    methods: {
        async getData() {
            await axios.post(
                `https://api.github.com/graphql`,
                {
                    query: `
                      {
                          user(login: "octocat") {
                            repositories(first: 20) {
                              edges {
                                node {
                                  id
                                  name
                                  description
                                  issues(first: 5) {
                                    edges {
                                      node {
                                        title
                                        body
                                        state
                                        createdAt
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                    `,
                },
                {
                    headers: {Authorization: `Bearer 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`}
                }
            ).then(res => {
                console.log(res.data.data.user.repositories.edges)
                this.repoData = res.data.data.user.repositories.edges
            })

        }
    },
    computed: {
        repoList() {
            if (this.searchValue.trim().length > 0) {
                return this.repoData.filter((repo) =>
                    repo.node.name
                        .toLowerCase()
                        .includes(this.searchValue.trim().toLowerCase()))
            }
            return this.repoData
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
            <button @click="getData">Show</button>
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
