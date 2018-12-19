<template>
<div class="box is-shadowless">

    <star-rating class="justify-center" @rating-selected="submitDocumentRating" v-model="rating.content" active-color="#212121" :show-rating="false"  :item-size="30"/>

    <form @submit.prevent="submitDocumentComment">

        <div class="field">
            <label class="label">{{ $store.getters.i18n("whole_document") }}</label>
            <div class="control">
                <textarea v-model="comment.content" class="textarea"></textarea>
            </div>
        </div>

        <div class="has-text-centered">

            <button type="submit" class="button is-primary">{{ $store.getters.i18n("comment") }}</button>

        </div>

    </form>

</div>
</template>

<script>
import { StarRating } from "vue-rate-it";
export default {
    name: "document-comment-rate",
    components: {
        StarRating
    },
    props: {
        comment: {
            type: Object,
            required: true,
            default() {
                return {
                    id: null,
                    content: undefined
                }
            }
        },
        rating: {
            type: Object,
            required: true,
            default() {
                return {
                    id: null,
                    content: undefined
                }
            }
        },
        document: {
            type: Object,
            required: true
        }
    },
    methods: {
        async submitDocumentComment() {

            try {

                let where = {
                    id: this.comment.id
                };

                this.comment.documentId = this.document.id;

                this.comment = await this.$store.dispatch("saveObject", {
                    path: `document_comments/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.comment
                });

            } catch (error) {

                console.error(error);

            }

        },

        async submitDocumentRating() {

            try {

                let where = {
                    id: this.rating.id
                };

                this.rating.documentId = this.document.id;

                this.rating = await this.$store.dispatch("saveObject", {
                    path: `document_ratings/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.rating
                });

            } catch (error) {

                console.error(error);

            }

        },
    }
}
</script>
