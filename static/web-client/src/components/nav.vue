<template>
<nav class="navbar is-fixed-top">

    <div class="navbar-brand">

        <a class="navbar-item" href="/"><img src="@/assets/logo.png"></a>

        <a class="navbar-burger burger" @click="menuVisible = !menuVisible;" id="navbar-burger" data-target="navbarBasic">
          <span></span>
          <span></span>
          <span></span>
        </a>

    </div>

    <div id="navbarBasic" :class="['navbar-menu', menuVisible ? 'is-active' : null]">

        <div class="navbar-start">

            <a class="navbar-item has-text-weight-bold" href="/">{{ $store.getters.i18n("home") }}</a>

        </div>

        <div class="navbar-end">

            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="#">Languages</a>
                <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" @click.prevent="$store.commit('updateLocale', 'english')">English</a>
                    <a class="navbar-item" @click.prevent="$store.commit('updateLocale', 'french')">French</a>
                </div>
            </div>

            <div class="navbar-item">
                <div class="buttons" v-if="!$store.getters.loggedIn">

                    <router-link v-if="$route.path !== '/register/'" class="button is-primary" to="/register/">{{ $store.getters.i18n("register") }}</router-link>
                    <router-link v-if="$route.path !== '/login/'" class="button is-primary" :to="`/login/?next=${this.$route.path}`">{{ $store.getters.i18n("login") }}</router-link>

                </div>
                <div class="buttons" v-else>
                    <router-link v-if="!$store.getters.socialUser" class="button is-primary" to="/profile/">Profile</router-link>
                    <button class="button is-primary" to="/profile/" @click="logout">{{ $store.getters.i18n("logout") }}</button>
                </div>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    name: "i-nav",
    data() {
        return {
            menuVisible: false
        }
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.replace("/");
        }
    }
}
</script>
