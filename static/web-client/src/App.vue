<template>

  <div id="app">

    <vue-topprogress ref="progress" color="#212121"/>

    <i-nav/>

    <main class="main box is-shadowless">
      <router-view :key="Math.random()"/>
    </main>

    <footer class="footer columns">

      <div class="column">
        <img src="@/assets/logo.white.png" width="80" height="80">
      </div>

      <div class="column has-text-right">
        <h6>{{ $store.getters.i18n("reserved") }}</h6>
      </div>
      
    </footer>

  </div>

</template>

<script>

import INav from "./components/nav";

export default {
  name: "app",
  components: {
    INav
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },

  watch: {
    loading(n, o) {

      if (n === "loading") return this.$refs.progress.start();

      if (n === "done") return this.$refs.progress.done();

      if (n === "fail") return this.$refs.progress.fail();

    }
  }
};
</script>
