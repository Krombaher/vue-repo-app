import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        data: null,
        searchValue: '',
        modal: false,
        visible: false,
        active: {},
        activeId:{},
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
                // console.log(res.data.data.user.repositories.edges)
                this.state.data = res.data.data.user.repositories.edges
            }).catch(res => {
                console.log(res)
            })
        }
    }
})
