import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../auth/useAuth.js';

export default function LoginPage() {
    const { user, signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (user) {
        return <Navigate to="/" replace />;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError('');
        const result = signIn(email, password);
        if (!result.success) {
            setError(result.error);
            return;
        }
        navigate('/', { replace: true });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-600 p-3 text-white"><LockKeyhole size={22} /></div>
                    <div>
                        <h1 className="text-xl font-semibold text-slate-900">Korn Ferry</h1>
                        <p className="text-sm text-slate-500">Sign in to your account</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700">
                        Email
                        <input
                            type="email"
                            autoComplete="username"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                        Password
                        <input
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </label>

                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

                    <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700">
                        Sign in
                    </button>
                </form>

                <div className="mt-6 rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                    <p className="mb-1 font-semibold">Demo accounts (local-only)</p>
                    <p>Admin: admin@example.com / Admin123!</p>
                    <p>User: john.doe@example.com / User123!</p>
                    <p className="mt-1">Demo authentication only; do not use these credentials in production.</p>
                </div>
            </section>
        </main>
    );
}
