import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const AdminLogin = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('admin@example.com');
	const [password, setPassword] = useState('admin');
	const [error, setError] = useState<string | undefined>();

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await login(email, password);
			navigate('/admin');
		} catch (err) {
			setError('Invalid credentials');
		}
	}

	return (
		<div className="min-h-screen bg-luxury-cream">
			<Navigation />
			<section className="pt-28 pb-20">
				<div className="container mx-auto px-4 max-w-md">
					<h1 className="text-4xl font-serif mb-6">Admin Login</h1>
					<form onSubmit={onSubmit} className="space-y-4">
						<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-3" />
						<input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border rounded p-3" />
						{error && <div className="text-rose-600 text-sm">{error}</div>}
						<Button type="submit" variant="luxury" className="w-full">Sign In</Button>
					</form>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default AdminLogin;


