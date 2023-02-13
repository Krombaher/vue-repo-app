import {createStore} from 'vuex'
import axios from "axios";

const store = createStore({
    state() {
        return {
            repoData: null
        }
    },

    actions: {
        fetchData() {
            const baseURL = "https://api.github.com/graphql";
            axios.post(baseURL, {
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
            }, {
                headers: {Authorization: `Bearer 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`}
            }).then(res => {
                console.log(res.data.data.user.repositories.edges)
                store.state.repoData = res.data.data.user.repositories.edges
            })
        }
    }
})

export default store