import {createStore} from 'vuex'
import axios from "axios";

export default createStore ({
    state: {
        data: null,
        searchValue: '',
        modal: false,
        active: {},
    },

    getters: {
        filteredList(state) {
            if (state.searchValue.trim().length > 0) {
                return state.data.filter((repo) =>
                    repo.node.name
                        .toLowerCase()
                        .includes(state.searchValue.trim().toLowerCase()))
            }
            return state.data
        }
    },

    mutations: {
        onClick(state, id) {
            state.active.id = id
        },

        setState(state, obj) {
            state.searchValue = obj.name
            state.active.name = obj.name
            state.active.issues = obj.issues.edges
            state.modal = false
        }
    },

    actions: {
        fetchData() {
            const baseURL = "https://api.github.com/graphql";
            axios.post(baseURL, {
                query: `
                      {
                          user(login: "octocat") {
                            repositories(first: 100) {
                              edges {
                                node {
                                  id
                                  name
                                  description
                                  issues(first: 5) {
                                    edges {
                                      node {
                                        id
                                        title
                                        body
                                        state
                                        comments(first: 5) {
                                          nodes {
                                            id
                                            createdAt
                                            body
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                    `,
            }, {
                headers: {Authorization: `Bearer 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`}
            }).then(res => {
                this.state.data = res.data.data.user.repositories.edges
            }).catch(res => {
                console.log(res)
            })
        }
    }
})
