<template>
    <div class="container">

        <h2 class="is-size-2 has-text-centered has-text-weight-bold box is-shadowless">{{ $store.state.user.name }}</h2>

        <div class="box">

            <form @submit.prevent="changePassword">
                
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="text" placeholder="Enter your name..." v-model="$store.state.user.name">
                        <i class="icon is-small is-left icon-profile"></i>
                    </div>
                    <span class="help is-danger">{{ errors.name }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="email" placeholder="Enter your email..." v-model="$store.state.user.email">
                        <i class="icon is-small is-left icon-envelop"></i>
                    </div>
                    <span class="help is-danger">{{ errors.email }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control has-icons-left">
                        <input disabled class="input" type="text" placeholder="Enter your phone number..." v-model="$store.state.user.phone_number">
                        <i class="icon is-small is-left icon-mobile"></i>
                    </div>
                    <span class="help is-danger">&nbsp;</span>
                </div>

                <h4 class="is-size-4 has-text-centered has-text-weight-bold">Change Password</h4>

                <div class="field">
                    <label class="label">Old Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Enter your old password..." v-model="passwordForm.oldPassword">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.oldPassword" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.oldPassword }}&nbsp;</span>
                </div>

                <div class="field">
                    <label class="label">New Password</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="password" placeholder="Enter your new password..." v-model="passwordForm.newPassword">
                        <i class="icon is-small is-left icon-key"></i>
                        <i v-if="!errors.newPassword" class="icon is-small is-right icon-checkmark"></i>
                    </div>
                    <span class="help is-danger">{{ errors.newPassword }}&nbsp;</span>
                </div>

                <div class="has-text-right box is-shadowless is-paddingless">

                    <button type="submit" class="button is-primary" :disabled="disabled">Change Password</button>

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
						presence: true,
						length: {
							minimum: 8,
							maximum: 512,
							message: "Password must be 8 to 512 characters!"
						}
					},

					newPassword: {
						presence: true,
						length: {
							minimum: 8,
							maximum: 512,
							message: "Password must be 8 to 512 characters!"
                        },
                        equality: {
                            attribute: "oldPassword",
                            message: "Old password and New password can't be the same",
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
