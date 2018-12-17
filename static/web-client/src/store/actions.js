export default {
    register(context, user) {
        
        return new Promise((resolve, reject) => {
            
            let ok = false;
            
            this._vm.$fetch("users/sign-up", "POST", user)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    requestReset(context, user) {
        
        return new Promise((resolve, reject) => {

            this._vm.$fetch("users/reset", "POST", user)
            .then(response => {
                if (response.ok) return resolve();
                return response.json();
            })
            .then(data => {
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });

    },

    reset(context, user) {
        
        return new Promise((resolve, reject) => {

            this._vm.$fetch("users/reset-password", "POST", user)
            .then(response => {
                if (response.ok) return resolve();
                return response.json();
            })
            .then(data => {
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });

    },
    
    login(context, user) {
        
        return new Promise((resolve, reject) => {
            
            let ok = false;
            
            this._vm.$fetch("users/login", "POST", user)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    fbLogin(context, data) {
        
        let ok = false;
        
        return new Promise((resolve, reject) => {
            
            this._vm.$fetch("users/facebookLogin", "POST", data)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    googleLogin(context, data) {
        
        let ok = false;
        
        return new Promise((resolve, reject) => {
            
            this._vm.$fetch("users/googleLogin", "POST", data)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    changePassword(context, passwordForm) {
        
        return new Promise((resolve, reject) => {
            
            let ok = false;
            
            this._vm.$fetch("users/change-password", "POST", passwordForm)
            .then(response => {
                ok = response.ok;
                if (response.ok) return resolve();
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    getObjects(context, object) {
        
        let ok = false;
        
        return new Promise((resolve, reject) => {
            
            this._vm.$fetch(object.path)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    },
    
    saveObject(context, object) {
        
        let ok = false;
        
        return new Promise((resolve, reject) => {
            
            this._vm.$fetch(object.path, "POST", object.data)
            .then(response => {
                ok = response.ok;
                return response.json();
            })
            .then(data => {
                if (ok) return resolve(data);
                throw data;
            })
            .catch(error => {
                reject(error);
            });
            
        });
        
    }
    
}