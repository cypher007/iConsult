<template>

<div :class="[modal ? '' : 'hero is-fullheight-with-navbar container']">

    <div class="columns hero-body is-shadowless">

        <div v-if="!modal" class="column is-hidden-mobile has-text-centered">
            <img src="@/assets/logo.png">
        </div>

        <div class="column" v-if="sent">

            <h2 class="is-size-2">{{ $store.getters.i18n("reset_msg") }}</h2>

        </div>

        <div class="column" v-else>

            <h2 class="is-size-2 has-text-centered">{{ $store.getters.i18n("request_password_reset") }}</h2>

            </br>

            <form @submit.prevent="reset">

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("email") }}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" :placeholder="$store.getters.i18n('enter_email')" v-model="user.email">
                        <i class="icon is-small is-left icon-envelop"></i>
                        <i v-if="!errors.email"  class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.email }}&nbsp;</span>
                </div>

                <vue-recaptcha ref="recaptcha" sitekey="6LfQhH0UAAAAAB389xxZzLNhEUfifLPZfQZacvYX" @expired="captchaExpired" @verify="captchaVerified"></vue-recaptcha>

                <div class="has-text-right box is-shadowless">

                    <button type="submit" class="button is-primary" :disabled="disabled || recaptchaUnverified">{{ $store.getters.i18n("request_reset") }}</button>

                </div>

            </form>

        </div>

    </div>

</div>
</template>

<script>

import Social from "../social";
import { notLoggedIn } from "../guards";

export default {
    name: "password-reset-request",
    beforeCreate: notLoggedIn,
    mixins: [
        Social
    ],
    props: {
        modal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            disabled: true,
            loading: false,
            sent: false,
            user: {
                email: null,
                captcha: null
            },
            errors: {
                email: null
            }
        }
    },

    methods: {

        async reset() {

            this.loading = true;

            try {

                let user = await this.$store.dispatch("requestReset", this.user);

                this.loading = false;

                this.sent = true;

            } catch(error) {

                this.$refs.recaptcha.reset();

                if (error.error.code === "EMAIL_NOT_FOUND") this.errors.email = "Email not found!";

                console.log(this.errors.email);

                this.loading = false;

                console.error(error);

            }

        }

    },

    watch: {
        user: {
            deep: true,

            handler() {

                let constraints = {

					email: {
						presence: {
                            message: this.$store.getters.i18n("blank")
                        },
						email: {
							message: this.$store.getters.i18n("invalid_email")
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
