'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/modules/theme/theme';

import NextAppDirEmotionCacheProvider from './EmotionCache';

export interface ThemeRegistryProps {
	children: React.ReactNode;
}

const ThemeRegistry = ({ children }: ThemeRegistryProps) => {
	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</NextAppDirEmotionCacheProvider>
	);
};

export default ThemeRegistry;
