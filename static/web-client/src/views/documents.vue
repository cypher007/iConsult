<template>
    <div class="container">

        <h1 class="is-size-1 has-text-centered has-text-weight-bold">
            <span class="underline">Documents</span>
        </h1>

        <ul class="box columns is-mobile is-multiline is-centered is-shadowless">
            <li class="column" v-for="document in documents" :key="document.id">

                <div class="card">

                    <div class="card-content">

                        <div class="media">
                            <div class="media-left">
                                <i class="icon icon-document"></i>
                            </div>

                            <div class="media-content">
                                <h4 class="title is-4 has-text-centered">{{ document.title }}</h4>
                            </div>
                        </div>

                    </div>

                    <div class="content box is-shadowless">

                        <p>

                            {{ document.content.substring(0, 300) + "..." | striphtml }}

                        </p>

                    </div>

                    <footer class="card-footer">

                        <router-link :to="`/documents/${document.id}`" class="card-footer-item">View</router-link>

                    </footer>

                </div>
            </li>
        </ul>

        <nav class="pagination is-centered">

            <ul class="pagination-list">

                <li v-for="n in totalPages" :key="n">
                    <router-link class="pagination-link" :to="`/?page=${n}`">{{ n }}</router-link>
                </li>

            </ul>

        </nav>

    </div>
</template>

<script>

export default {
    name: "documents",
    data() {
        return {
            documents: [],
            perPage: 10,
            total: 1,
            page: this.$route.query.page || 1
        }
    },

    computed: {

        totalPages() {

            return Math.ceil(this.total / this.perPage);

        }

    },

    methods: {

        async load() {

          let filter = {
            skip: ((this.page - 1) * this.perPage) || undefined,
            limit: this.perPage
          };

          let path = `documents?filter=${JSON.stringify(filter)}`;

          try {

              let documents = await this.$store.dispatch("getObjects", {
                  path: path
              });

              this.total = documents.count;

              this.documents = documents.rows;
              
          } catch(error) {

              console.error(error);

          }

        }
    },

    created() {
        this.load();
    }
};
</script>

<style scoped>

    .icon-document {
        font-size: 3rem;
    }

    .media {
        align-items: flex-end;
    }

    .column {
        min-width: 300px;
        width: 99%;
        max-width: 450px;
        flex-grow: unset;
        flex-basis: unset;
        cursor: pointer;
    }

</style>

