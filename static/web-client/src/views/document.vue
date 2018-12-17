<template>
<div class="container box is-shadowless parent">

    <modal :scrollable="true" :maxWidth="500" :maxHeight="500" height="auto" width="90%" :adaptive="true" name="login">
        <login @login="loggedIn" :modal="true" />
    </modal>

    <h1 class="is-size-1 has-text-centered has-text-weight-bold">{{ document.title }}</h1>
    <h6 class="is-size-6 has-text-centered has-text-weight-semibold">
        <template v-if="isMobile">(swipe to navigate between sections)</template>
        <template v-else>(Highlight text to start annotating)</template>
    </h6>

    <template v-if="isMobile">

        <div class="arrows">

            <span class="icon-arrow-left"></span> <span class="icon-arrow-right"></span>

        </div>

        <swiper class="box document">

            <swiper-slide class="swiper-slide" v-for="section in document.sections" :key="section.id">

                <div class="box is-shadowless has-text-centered">

                    <button @click="$modal.show('login');" v-if="!$store.getters.loggedIn" class="button is-primary">Review &amp; Comment</button>

                    <h3 class="is-size-3 has-text-centered has-text-weight-bold">{{ section.title }}</h3>

                    <document-section :isMobile="isMobile" v-if="$store.getters.loggedIn" :section="section" :comment="section.comments ? section.comments[0] : undefined" :rating="section.ratings ? section.ratings[0] : undefined" />

                    <document-section v-else :section="section" />

                </div>

            </swiper-slide>

        </swiper>

    </template>

    <template v-else>

        <div ref="document" class="container document" @mouseup="selected">

            <div v-html="document.content"></div>

            <accordion :collapseAll="true" :items="document.sections || []" :selectors="{id: 'id', title: 'title', content: 'content'}">

                <template slot="title" slot-scope="{ item }">
                    <section-title :section="item" :title="item.title" :rating="item.ratings ? item.ratings[0] : undefined" />
                </template>

                <template slot="content" slot-scope="{ item }">

                    <document-section :isMobile="isMobile" v-if="$store.getters.loggedIn" :section="item" :comment="item.comments ? item.comments[0] : undefined" :rating="item.ratings ? item.ratings[0] : undefined" />

                    <document-section v-else :section="item" />

                </template>

            </accordion>

        </div>

    </template>

    <document-com-rate :document="document" :comment="document.documentComments ? document.documentComments[0] : undefined" :rating="document.documentRates ? document.documentRates[0] : undefined" v-if="$store.getters.loggedIn"></document-com-rate>

</div>
</template>

<script>
import Login from "./login";
import annotator from "annotator";
import Accordion from "@profesia/vue-accordion-component";
import DocumentSection from "../components/section";
import DocumentComRate from "../components/document-comment-rate";
import 'swiper/dist/css/swiper.css';
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';
import SectionTitle from "../components/section-title";

export default {
    name: "document",
    components: {
        Login,
        Accordion,
        DocumentSection,
        swiper,
        swiperSlide,
        SectionTitle,
        DocumentComRate
    },
    data() {
        return {
            document: {
                id: "5c0646c75277e02775050a42"
            },
            stats: {},
            ann: new annotator.App()
        }
    },

    methods: {

        // this method adds contextual data such as
        // document id and user id to annotation before it's saved
        // into the store
        addExtraDataToAnnotation() {
            let that = this;
            return {
                beforeAnnotationCreated(annotation) {
                    annotation.userId = that.$store.state.user.id;
                    annotation.documentId = that.document.id;
                }
            }
        },

        async load() {

            try {

                let filter = {
                    include: [{
                        relation: "sections"
                    }]
                };

                if (this.$store.getters.loggedIn) {

                    let where = {
                        userId: this.$store.state.user.id
                    };

                    filter.include[0].scope = {
                        include: [{
                                relation: "comments",
                                scope: {
                                    where: where
                                }
                            },
                            {
                                relation: "ratings",
                                scope: {
                                    where: where
                                }
                            }
                        ]
                    };

                    filter.include.push({
                        relation: "documentRates",
                        scope: {
                            where: where
                        }
                    });

                    filter.include.push({
                        relation: "documentComments",
                        scope: {
                            where: where
                        }
                    });

                }

                this.document = await this.$store.dispatch("getObjects", {
                    path: `documents/${this.document.id}?filter=${JSON.stringify(filter)}`
                });

                if (!this.$store.getters.loggedIn) return;

                this.ann = new annotator.App();

                this.ann.include(annotator.ui.main, {
                    element: this.$refs.document
                });

                filter = {
                    where: {
                        userId: this.$store.state.user.id,
                        documentId: this.document.id
                    }
                };

                this.ann.include(annotator.storage.http, {
                    prefix: `${process.env.VUE_APP_BASE_URL}`,
                    headers: {
                        "Authorization": this.$store.state.user && this.$store.state.user.auth_token ? this.$store.state.user.auth_token : undefined
                    },
                    urls: {
                        create: 'annotations',
                        update: 'annotations/{id}',
                        destroy: 'annotations/{id}',
                        search: `annotations?filter=${JSON.stringify(filter)}`
                    }
                });

                this.ann.include(this.addExtraDataToAnnotation);

                this.ann.start()
                    .then(() => {
                        this.ann.annotations.load();
                    });

            } catch (error) {

                console.error(error);

            }

        },

        async loggedIn() {

            await this.load();
            this.$modal.hide("login");

        },

        selected() {

            if (!(window.getSelection().toString().length > 2)) return;

            if (this.$store.getters.loggedIn) return;

            this.$modal.show("login");

        }
    },

    computed: {
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        isLoggedIn() {
            return this.$store.getters.loggedIn;
        }
    },

    async mounted() {
        console.log("mounted");
        this.load();
    },

    watch: {
        isLoggedIn(n, o) {
            if (!n) {
                this.ann.destroy();
            }
        }
    }
}
</script>

<style>
.arrows {
    display: flex;
    justify-content: space-between;
}

.arrows span {
    font-size: 2rem;
}

h2 {
    font-size: 2.5rem !important;
    margin: 10px 0;
    font-weight: 600;
}

.document ul,
.document ol {
    padding: 2rem !important;
}

.document li {
    margin: .5rem 0 !important;
}

.document p {
    margin: 1rem 0 !important;
}

.parent {
    min-height: 73vh;
}
</style>
