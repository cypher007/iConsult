<template>

<div class="hero is-fullheight-with-navbar container">

    <div class="columns hero-body is-shadowless">

        <div class="column is-hidden-mobile has-text-centered">
            <img src="@/assets/logo.png">
        </div>

        <div class="column">

            <div class="has-text-centered">
                <fb-signin-button :params="fbSigninParams" @success="fbLoginSuccess"><button class="button facebook"><span class="icon-facebook"></span>Continue With Facebook</button></fb-signin-button>
                <google-sign-in-button @success="googleLoginSuccess" @error="googleLoginError" :client_id="googleClientId"/>
            </div>

            <h3 class="is-size-3 has-text-centered">Or</h3>
            

            <form @submit.prevent="register">

                <div class="field">
                    <label class="label">Name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Enter your name..." v-model="user.name">
                        <i class="icon is-small is-left icon-profile"></i>
                        <i v-if="!errors.name" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.name }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Enter your email..." v-model="user.email">
                        <i class="icon is-small is-left icon-envelop"></i>
                        <i v-if="!errors.email"  class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.email }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Enter your phone number..." v-model="user.phone_number">
                        <i class="icon is-small is-left icon-mobile"></i>
                        <i class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Enter your password..." v-model="user.password">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.password" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.password }}&nbsp;</span>
                </div>

                <vue-recaptcha ref="recaptcha" sitekey="6LfQhH0UAAAAAB389xxZzLNhEUfifLPZfQZacvYX" @expired="captchaExpired" @verify="captchaVerified"></vue-recaptcha>

                <div class="has-text-right box is-shadowless">

                    <button type="submit" class="button is-primary" :disabled="disabled || recaptchaUnverified">Register</button>

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
    name: "register",
    beforeCreate: notLoggedIn,
    mixins: [
        Social
    ],
    components: {
        GoogleSignInButton
    },
    data() {
        return {
            disabled: true,
            user: {
                name: null,
                email: null,
                password: null,
                phone_number: undefined,
                captcha: null
            },
            errors: {}
        }
    },

    methods: {

        async register() {

            try {

                const user = await this.$store.dispatch("register", this.user);

                this.$router.replace("/login/");

            } catch(error) {

                this.disabled = true;

                this.$refs.recaptcha.reset();

                error = error.error;

                if (error.details && error.details.codes.email) return this.errors.email = "Email already registered!";

                if (error.details && error.details.codes.phone_number) return this.errors.phone_number = "Phone number already registered!";

            }

        }

    },

    watch: {
        user: {
            deep: true,

            handler() {

                let constraints = {

                    name: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 100,
                            message: "Name must be 2 to 100 characters"
                        }
                    },

					email: {
						presence: true,
						email: {
							message: "Invalid email address"
						}
					},

					password: {
						presence: true,
						length: {
							minimum: 8,
							maximum: 512,
							message: "Password must be 8 to 512 characters!"
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

    .facebook {
        height: 50px;
        margin: 1rem;
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
