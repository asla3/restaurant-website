import { createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

import { rubik, robotoSlab } from './fonts';

const headingVariants = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'subtitle1',
	'subtitle2',
] as const;

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			img {
				width: 100%;
				height: 100%;
			}
			`,
		},
	},
	typography: {
		fontFamily: rubik.style.fontFamily,
		// add the same font type to all heading variants
		...headingVariants.reduce<ThemeOptions>((accumulator, variant) => {
			return {
				...accumulator,
				[variant]: {
					fontFamily: robotoSlab.style.fontFamily,
				},
			};
		}, {}),
	},
});

export default theme;
