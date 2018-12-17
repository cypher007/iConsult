export default {
    login(state, data) {
        state.user = data;
    },
    
    logout(state) {
        state.user = {};
        localStorage.removeItem("session");
        sessionStorage.removeItem("session");
    },

    updateLoading(state, loading) {
        state.loading = loading;
    },

    updateUser(state, user) {
        state.user = user;
    },

    updateLocale(state, locale) {
        state.settings.locale = locale;
    }
}