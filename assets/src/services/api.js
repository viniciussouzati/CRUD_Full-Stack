import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const getRepositories = async(userId, query) => {
    let url = `/users/${userId}/repositories/`;

    if (query !== ''){
        url += `?q=${query}`;
    }

    return api.get(url);
};

export const addUser = async (userData) => {
    try {
        const response = await api.post("/users", userData);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const editUser = async (userId, userData) => {
    try {
        const response = await api.put(`/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        await api.delete(`/users/${userId}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
