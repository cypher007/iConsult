<template>
    <button ref="button" class="button google"><img src="@/assets/google.svg"/> Continue With Google</button>
</template>

<script>
export default {
    name: "google-sign-in-button",
    props: ["client_id"],
    mounted() {

        window.gapi.load("auth2", () => {

            const auth2 = window.gapi.auth2.init({
                client_id: this.client_id,
                cookiepolicy: 'single_host_origin'
            });

            auth2.attachClickHandler(this.$refs.button, {}, user => {
                this.$emit("success", user);
            }, error => {
                this.$emit("error", error);
            });

        });

    }
}
</script>

<style scoped>

    .google {
        height: 50px;
        margin: 1rem;
    }

    .google {
        padding-left: 0;
    }
</style>
