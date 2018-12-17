<template>
<div class="section-title no-select">

    <h4 class="is-size-4 has-text-weight-semibold">{{ title }}</h4>

    <star-rating v-if="$store.getters.loggedIn" @rating-selected="submitRating" v-model="rating.content" :show-rating="false" :item-size="23" active-color="#212121" />

</div>
</template>

<script>
import {
    StarRating
} from "vue-rate-it";
export default {
    name: "section-title",
    components: {
        StarRating
    },
    props: {
        section: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        rating: {
            type: Object,
            required: true,
            default () {
                return {
                    id: null,
                    content: undefined
                }
            }
        }
    },
    methods: {
        async submitRating() {

            try {

                let where = {
                    id: this.rating.id
                };

                this.rating.sectionId = this.section.id;

                this.rating = await this.$store.dispatch("saveObject", {
                    path: `ratings/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.rating
                });

            } catch (error) {

                console.error(error);

            }

        }
    }
}
</script>

<style>
.section-title {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.section-title h4 {
    flex: 1;
}

.section-title .cont {
    flex: 1;
}

.cont {
    display: flex;
    justify-content: space-between !important;
}
</style>
