<template>
    <div class="container">

        <h2 class="is-size-2 has-text-centered has-text-weight-bold box is-shadowless">{{ $store.state.user.name }}</h2>

        <div class="box">

            <form @submit.prevent="changePassword">
                
                <div class="field">
                    <label class="label">{{ $store.getters.i18n("name") }}</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="text" :placeholder="$store.getters.i18n('enter_name')" v-model="$store.state.user.name">
                        <i class="icon is-small is-left icon-profile"></i>
                    </div>
                    <span class="help is-danger">{{ errors.name }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("email") }}</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="email" :placeholder="$store.getters.i18n('enter_email')" v-model="$store.state.user.email">
                        <i class="icon is-small is-left icon-envelop"></i>
                    </div>
                    <span class="help is-danger">{{ errors.email }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("phone_number") }}</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="text" :placeholder="$store.getters.i18n('enter_phone')" v-model="$store.state.user.phone_number">
                        <i class="icon is-small is-left icon-mobile"></i>
                    </div>
                    <span class="help is-danger">&nbsp;</span>
                </div>

                <h4 class="is-size-4 has-text-centered has-text-weight-bold">{{ $store.getters.i18n("change_password") }}</h4>

                <div class="field">
                    <label class="label">{{ $store.getters.i18n("old_password") }}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" :placeholder="$store.getters.i18n('enter_old_password')" v-model="passwordForm.oldPassword">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.oldPassword" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.oldPassword }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">{{ $store.getters.i18n('new_password') }}</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" :placeholder="$store.getters.i18n('enter_new_password')" v-model="passwordForm.newPassword">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.newPassword" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.newPassword }}&nbsp;</span>
                </div>

                <div class="has-text-right box is-shadowless is-paddingless">

                    <button type="submit" class="button is-primary" :disabled="disabled">{{ $store.getters.i18n("change_password") }}</button>

                </div>

            </form>

        </div>

    </div>
</template>

<script>
export default {
    name: "profile",
    data() {
        return {
            disabled: true,
            passwordForm: {
                oldPassword: null,
                newPassword: null
            },
            errors: {}
        }
    },

    methods: {
        async changePassword() {

            try {

                await this.$store.dispatch("changePassword", this.passwordForm);

                this.passwordForm.oldPassword = null;

                this.passwordForm.newPassword = null;

            } catch(error) {

                console.error(error);

                this.disabled = true;

                if (error.error.statusCode === 400) return this.errors.oldPassword = "Invalid old password!";

            }

        }
    },

    watch: {
        passwordForm: {
            deep: true,

            handler() {

                let constraints = {

					oldPassword: {
						presence: {
                            message: this.$store.getters.i18n("blank")
                        },
						length: {
							minimum: 8,
							maximum: 512,
							message: this.$store.getters.i18n("invalid_password")
						}
					},

					newPassword: {
						presence: true,
						length: {
							minimum: 8,
							maximum: 512,
							message: this.$store.getters.i18n("invalid_password")
                        },
                        equality: {
                            attribute: "oldPassword",
                            message: this.$store.getters.i18n("cant_be_same"),
                            comparator: (v1, v2) => v1 !== v2
                        }
					}

				};

				let errors = this.$validate(this.passwordForm, constraints);

				this.errors = errors || {};

				this.disabled = errors !== undefined;

            }
        }
    }
};
</script>
