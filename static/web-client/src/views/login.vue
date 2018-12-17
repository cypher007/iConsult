<template>

<div :class="[modal ? '' : 'hero is-fullheight-with-navbar container']">

    <div class="columns hero-body is-shadowless">

        <div v-if="!modal" class="column is-hidden-mobile has-text-centered">
            <img src="@/assets/logo.png">
        </div>

        <div class="column">

            <div class="has-text-centered">
                <fb-signin-button :params="fbSigninParams" @success="fbLoginSuccess"><button class="button facebook"><span class="icon-facebook"></span>{{ $store.getters.i18n("with_facebook") }}</button></fb-signin-button>
                <google-sign-in-button @success="googleLoginSuccess" @error="googleLoginError" :client_id="googleClientId"/>
            </div>

            <h3 class="is-size-3 has-text-centered">Or</h3>
            

            <form @submit.prevent="login">

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("login") }}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" :placeholder="$store.getters.i18n('enter_email')" v-model="user.email">
                        <i class="icon is-small is-left icon-envelop"></i>
                        <i v-if="!errors.email"  class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.email }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("password") }}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" :placeholder="$store.getters.i18n('enter_password')" v-model="user.password">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.password" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.password }}&nbsp;</span>
                </div>

                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="rememberMe"> {{ $store.getters.i18n("remember_me")}}
                        </label>
                    </div>
                </div>

                <vue-recaptcha ref="recaptcha" sitekey="6LfQhH0UAAAAAB389xxZzLNhEUfifLPZfQZacvYX" @expired="captchaExpired" @verify="captchaVerified"></vue-recaptcha>

                <br/>

                <router-link to="/request-reset">{{ $store.getters.i18n("forgot_password") }}</router-link>

                <div class="has-text-right box is-shadowless">

                    <button type="submit" class="button is-primary" :disabled="disabled || recaptchaUnverified">{{ $store.getters.i18n("login") }}</button>

                </div>

            </form>

        </div>

    </div>

</div>
</template>

<script>

import Social from "../social";
import GoogleSignInButton from "../components/google-sign-in-button";
import { notLoggedIn } from "../guards";

export default {
    name: "login",
    beforeCreate: notLoggedIn,
    mixins: [
        Social
    ],
    components: {
        GoogleSignInButton
    },
    props: {
        modal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            disabled: true,
            rememberMe: false,
            user: {
                email: null,
                password: null,
                captcha: null
            },
            errors: {}
        }
    },

    methods: {

        async login() {

            try {

                let user = await this.$store.dispatch("login", this.user);

                this.$store.commit("login", user);

                user = JSON.stringify(user);

                this.rememberMe ? localStorage.setItem("session", user) : sessionStorage.setItem("session", user);

                let next = this.$route.query.next || "/";

                this.modal ? this.$emit("login") : this.$router.replace(next);

            } catch(error) {

                this.$refs.recaptcha.reset();

                if (error.error.code === "LOGIN_FAILED") this.errors.email = this.$store.getters.i18n("invalid_email_or_password");

                this.disabled = true;

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
					},

					password: {
						presence: {
                            message: this.$store.getters.i18n("blank")
                        },
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

    .fb-signin-button {
        display: inline-block;
    }

    .google, .facebook {
        height: 50px;
        margin: 1rem;
    }

    .google {
        padding-left: 0;
    }

    .facebook {
        background: #4867aa;
        color: #fff;
        height: 50px;
    }

    .icon-checkmark {
        color: #009688 !important;
    }

    .icon-facebook:before {
        color: #fff;
        padding: 0 5px;
    }

</style>
