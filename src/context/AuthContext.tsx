import React, { createContext, useContext, useMemo, useState } from 'react';
import { ecomService } from '@/services/ecomService';
import type { User } from '@/types/ecom';

type AuthContextValue = {
	user?: User;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, name: string, password: string) => Promise<void>;
	logout: () => void;
	isAdmin: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | undefined>(() => ecomService.currentUser());

	const value = useMemo<AuthContextValue>(() => ({
		user,
		isAdmin: !!user?.isAdmin,
		login: async (email, password) => {
			const u = ecomService.login(email, password);
			setUser(u);
		},
		register: async (email, name, password) => {
			const u = ecomService.register(email, name, password);
			setUser(u);
		},
		logout: () => {
			ecomService.logout();
			setUser(undefined);
		},
	}), [user]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}


