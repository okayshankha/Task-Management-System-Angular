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
        method: "GET",
        url: "/logout",
        token: true,
    },
    allEmployee: {
        method: "GET",
        url: "/employees",
        token: true,
    },
    allEmployeeWithFilter: {
        method: "POST",
        url: "/employees/filter",
        token: true,
    },
    allTask: {
        method: "GET",
        url: "/task/all",
        token: true,
    },
    allProjects: {
        method: "GET",
        url: "/projects",
        token: true,
    },
    createTask: {
        method: "POST",
        url: "/task/create",
        token: true,
    },
    taskAssign: {
        method: "POST",
        url: "/task/assign",
        token: true,
    },
    me:{
        method: "GET",
        url: "/me",
        token: true,
    }

};