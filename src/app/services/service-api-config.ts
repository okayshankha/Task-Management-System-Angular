export const serviceApiConfig = {
    login: {
        method: "POST",
        url: "/login",
        token: false,
    },
    register: {
        method: "POST",
        url: "/register",
        token: false,
    },
    logout: {
        method: "get",
        url: "/register",
        token: true,
    }

};