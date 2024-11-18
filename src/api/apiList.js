export const apiList = {
    signup: {
        method: 'POST',
        url: () => `/web/auth/signup`
    },
    login: {
        method: 'POST',
        url: () => `/web/auth/login`
    },
    getEventList: {
        method: 'GET',
        url: () => `/web/event/list`
    },
    adminlogin: {
         method: 'POST',
        url: () => `/admin/auth/login`
    },
    adminSignup: {
        method: 'POST',
       url: () => `/admin/auth/signup`
   }
}