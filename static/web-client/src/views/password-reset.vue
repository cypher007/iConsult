<template>
<div :class="[modal ? '' : 'hero is-fullheight-with-navbar container']">

    <div class="columns hero-body is-shadowless">

        <div v-if="!modal" class="column is-hidden-mobile has-text-centered">
            <img src="@/assets/logo.png">
        </div>

            <div class="column">

                <form @submit.prevent="reset">

                    <h2 class="is-size-2 has-text-centered">{{ $store.getters.i18n("enter_new_password") }}</h2>

                    </br>

                    <div class="field">
                        <label class="label">{{ $store.getters.i18n("new_password") }}</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="password" placeholder="Enter your new password..." v-model="user.newPassword">
                            <i class="icon is-small is-left icon-key"></i>
                            <i v-if="!errors.newPassword"  class="icon is-small is-right icon-checkmark"></i>
                        </div>
                        <span class="help is-danger">{{ errors.newPassword }}&nbsp;</span>
                    </div>

                    <div class="has-text-right">

                        <button type="submit" class="button is-primary" :disabled="disabled">{{ $store.getters.i18n("save") }}</button>

                    </div>

                </form>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: "password-reset",
    props: {
        modal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            disabled: true,
            user: {
                newPassword: null
            },
            errors: {}
        }
    },

    methods: {

        async reset() {

            try {

                await this.$store.dispatch("reset", this.user);

                this.$router.replace("/");

            } catch (error) {

                console.error(error);

            }

        }

    },

    mounted() {

        this.$store.commit("updateUser", {
            auth_token: this.$route.query.access_token
        });

    },

    watch: {
        user: {
            deep: true,

            handler() {

                let constraints = {

                    newPassword: {
                        presence: true,
                        length: {
                            minimum: 8,
                            maximum: 512,
                            message: this.$store.getters.i18n("invalid_password")
                        }
                    }

                };

                let errors = this.$validate(this.user, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;

            }
        }
    }

};
</script>

<style scoped>
.icon-checkmark {
    color: #009688 !important;
}
</style>
