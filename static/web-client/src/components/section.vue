<template>
<div class="has-text-left">

    <star-rating class="justify-center" v-if="$store.getters.loggedIn && isMobile" @rating-selected="submitRating" v-model="rating.content" :show-rating="false" active-color="#212121" :item-size="23" />

    <div v-html="section.content"></div>

    <form v-if="$store.getters.loggedIn" @submit.prevent="submitComment">

        <div class="field">
            <label class="label">Please provide your comment</label>
            <div class="control">
                <textarea v-model="comment.content" class="textarea"></textarea>
            </div>
        </div>

        <div class="has-text-centered">

            <button type="submit" class="button is-primary">Comment</button>

        </div>

    </form>

</div>
</template>

<script>
import { StarRating } from "vue-rate-it";

export default {
    name: "document-section",
    components: {
        StarRating
    },
    props: {
        section: {
            type: Object,
            required: true
        },
        isMobile: {
            type: Boolean,
            default: false
        },
        comment: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    content: undefined
                }
            }
        },
        rating: {
            type: Object,
            default: () => {
                return {
                    id: null,
                    content: undefined
                }
            }
        }
    },
    methods: {

        async submitComment() {

            try {

                let where = {
                    id: this.comment.id
                };

                this.comment.sectionId = this.section.id;

                this.comment = await this.$store.dispatch("saveObject", {
                    path: `comments/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.comment
                });

            } catch (error) {

                console.error(error);

            }

        },

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
.wizard-progress-with-circle,
.wizard-nav-pills {
    display: none !important;
}

.vue-star-rating {
    justify-content: center;
}
</style>
