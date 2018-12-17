export default {
    state: {
        en: {
            register: "Register",
            login: "Login",
            highlight: "Highlight text to start annotating",
            reserved: "All Rights Reserved.",
            logout: "Logout",
            swipe: "swipe to navigate between sections",
            with_facebook: "Continue With Facebook",
            with_google: "Continue With Google",
            email: "Email",
            password: "Password",
            enter_email: "Enter your email...",
            enter_password: "Enter your password...",
            remember_me: "Remember me",
            forgot_password: "Forgot Password?",
            request_password_reset: "Request Password Reset",
            request_reset: "Request Reset",
            reset_msg: "Please check your email for your password reset instructions!",
            home: "Home",
            enter_new_password: "Enter your new password",
            new_password: "New Password",
            save: "Save",
            invalid_email: "Invalid Email Address",
            invalid_password: "Password must be 8 to 512 characters!",
            blank: "Can't be blank",
            invalid_email_or_password: "Invalid email or password",
            name: "Name",
            enter_name: "Enter Your Name...",
            enter_phone: "Enter Your Phone Number...",
            phone_number: "Phone Number",
            email_registered: "Email already registered",
            phone_registered: "Phone number already registered",
            name_length: "Name must be 2 to 100 characters"
        },
        fr: {
            register: "Registre",
            login: "S'identifier",
            highlight: "Mettez en surbrillance le texte pour commencer à annoter",
            swipe: "glisser pour naviguer entre les sections",
            reserved: "Tous les droits sont réservés.",
            logout: "Connectez - Out",
            with_facebook: "continuer avec Facebook",
            with_google: "continuer avec Google",
            email: "Email",
            password: "mot de passe",
            enter_email: "Entrer votre Email...",
            enter_password: "Tapez votre mot de passe...",
            remember_me: "souviens-toi de moi",
            forgot_password: "Mot de passe oublié?",
            request_password_reset: "Demander la réinitialisation du mot de passe",
            request_reset: "demande de réinitialisation",
            reset_msg: "S'il vous plaît vérifier votre email pour vos instructions de réinitialisation de mot de passe!",
            home: "Accueil",
            enter_new_password: "Entrez votre nouveau mot de passe",
            new_password: "nouveau mot de passe",
            save: "sauvegarder",
            invalid_email: "Adresse e-mail invalide",
            invalid_password: "Le mot de passe doit comporter entre 8 et 512 caractères!",
            blank: "Ne peut pas être vide",
            invalid_email_or_password: "email ou mot de passe invalide",
            name: "prénom",
            phone_number: "Numéro de téléphone",
            enter_name: "Entrez votre nom...",
            enter_phone: "Entrez votre numéro de téléphone...",
            email_registered: "Email déjà enregistré!",
            phone_registered: "Numéro de téléphone déjà enregistré!",
            name_length: "Le nom doit comporter entre 2 et 100 caractères."
        }
    },
    getters: {
        i18n: (state, getter, rootState) => {
            return function(key) {
                return state[rootState.settings.locale][key];
            }
        }
    }
}