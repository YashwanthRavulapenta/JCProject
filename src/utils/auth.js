// src/utils/auth.js

// =========================================
// GET JWT TOKEN
// =========================================

export const getToken = () => {
    return localStorage.getItem("token");
};


// =========================================
// GET LOGGED-IN USER
// =========================================

export const getUser = () => {

    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch (error) {

        console.error("USER DATA ERROR:", error);

        return null;
    }
};


// =========================================
// CHECK LOGIN STATUS
// =========================================

export const isLoggedIn = () => {

    return !!localStorage.getItem("token");
};


// =========================================
// LOGOUT USER
// =========================================

export const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");
};