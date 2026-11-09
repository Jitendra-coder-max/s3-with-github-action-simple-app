import { useState } from 'react';
import { AuthContext } from './authContext.js';

const SESSION_KEY = 'kornferry-demo-user';

const demoAccounts = [
    {
        id: 'admin',
        email: 'admin@example.com',
        password: 'Admin123!',
        name: 'Demo Admin',
        role: 'admin',
    },
    {
        id: 'user-004',
        email: 'jitendra@example.com',
        password: 'User123!',
        name: 'Jitendra Singh',
        role: 'user',
        userKey: 'user-004',
    },
];

function getStoredUser() {
    try {
        const accountId = localStorage.getItem(SESSION_KEY);
        return demoAccounts.find((account) => account.id === accountId) ?? null;
    } catch (error) {
        console.error('Unable to read the demo login session.', error);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser);

    function signIn(email, password) {
        const account = demoAccounts.find((item) =>
            item.email.toLowerCase() === email.trim().toLowerCase()
            && item.password === password
        );

        if (!account) {
            return { success: false, error: 'Email or password is incorrect.' };
        }

        try {
            localStorage.setItem(SESSION_KEY, account.id);
        } catch (error) {
            console.error('Unable to save the demo login session.', error);
            return { success: false, error: 'Could not save the login session in this browser.' };
        }

        setUser(account);
        return { success: true };
    }

    function signOut() {
        try {
            localStorage.removeItem(SESSION_KEY);
        } catch (error) {
            console.error('Unable to clear the demo login session.', error);
        }
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
