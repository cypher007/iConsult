export default {
    data(){ 
        return {
            recaptchaUnverified: true,
            googleClientId: "1039573850432-983fjjplecuicaf3assvkh7f7su7f872.apps.googleusercontent.com",
            fbSigninParams: {
                scopes: ["email"]
            }
        }
    },
    methods: {

        async googleLoginSuccess(data) {

            try {

                let user = await this.$store.dispatch("googleLogin", {
                    auth_token: data.Zi.access_token
                });

                this.$store.commit("login", user);

                user = JSON.stringify(user);

                localStorage.setItem("session", user);

                let next = this.$route.query.next || "/";

                this.modal ? this.$emit("login") : this.$router.replace(next);

            } catch(error) {

                console.error(error);

            }

        },

        async googleLoginError(error) {
            console.error(error);
        },
        
        async fbLoginSuccess(data) {

            try {

                let user = await this.$store.dispatch("fbLogin", {
                    auth_token: data.authResponse.accessToken
                });

                this.$store.commit("login", user);

                user = JSON.stringify(user);

                localStorage.setItem("session", user);

                let next = this.$route.query.next || "/";

                this.modal ? this.$emit("login") : this.$router.replace(next);

            } catch(error) {

                console.error(error);

            }

        },
        captchaVerified(response) {
            this.recaptchaUnverified = false;
            this.user.captcha = response;
        },
        captchaExpired() {
            this.recaptchaUnverified = true;
        }
    }
}