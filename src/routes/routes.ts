
/**
 * An array of public routes that can be accessed without authentication
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const publicRoutes = [
    {
        path: "",
        name: "",
        component: "",
    },
    
    
];


/**
 * An array of public routes that are used for authentication
 * These routes can be accessed without authentication
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const authRoutes =[
    {
        path: "/login",
        name: "Login",
        component: "Login",
    },
    {
        path: "/register",
        name: "Register",
        component: "Register",
    },
    
];





/**
 * The prefix for API routes
 * Routes that start with this prefix will be protected
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const apiAuthPrefix =[
    {
        path: "/api/auth",
        name: "ApiAuth",
        component: "ApiAuth",
    },
    

    
]






/**
 * The default redirect path after logging in
 * 
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const DEFAULT_LOGIN_REDIRECT = [
    {
        path: "/",
        name: "Home",
        component: "Home",
    }
]