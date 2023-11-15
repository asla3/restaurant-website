'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';

import Link from '@/common/components/Link';
import Image from '@/common/components/Image';

import logo from '../../../../public/logo.jpeg';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

export interface NavBarProps {
	/**
	 * NavBar has a special behavior: when you scroll, it fixes to the top and adds a background color. Set to `false` to always have this style
	 * @default false
	 */
	shouldAlwaysBeFixed?: boolean;
}

const MENU_OPTIONS = ['About', 'Menu', 'Book a table', 'Contact us'];

const MobileLinks = () => {
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const openDrawer = () => setDrawerOpen(true);

	const closeDrawer = () => setDrawerOpen(false);

	return (
		<Box sx={{ display: { md: 'none' } }}>
			<IconButton
				aria-label="open navigation links"
				onClick={openDrawer}
				sx={{ marginRight: '3px' }}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={closeDrawer}
				sx={{ display: { md: 'none' } }} // this needs it's own display prop or it'll show on desktop
			>
				<Box sx={{ textAlign: 'end' }}>
					<IconButton aria-label="close navigation links" onClick={closeDrawer}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Box
					sx={{
						width: 250,
					}}
					role="presentation"
					onClick={closeDrawer}
					onKeyDown={closeDrawer}
				>
					<List>
						{MENU_OPTIONS.map((text) => (
							<ListItem key={text} disablePadding>
								<ListItemButton component={Link} href="#">
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</Box>
	);
};

const ShoppingBagButton = styled(ButtonBase)(({ theme }) => ({
	border: `1px solid ${theme.palette.secondary.main}`,
	borderRadius: 1,
	color: theme.palette.secondary.contrastText,
	backgroundColor: theme.palette.secondary.main,
	width: 50,
	height: 50,
	boxShadow: 'none',
}));

const SearchBox = ({
	label = 'Search',
	InputProps,
	...props
}: TextFieldProps) => (
	<TextField
		{...props}
		label={label}
		InputProps={{
			...InputProps,
			endAdornment: InputProps?.endAdornment ?? (
				<InputAdornment position="end">
					<IconButton type="submit" color="primary">
						<SearchIcon />
					</IconButton>
				</InputAdornment>
			),
		}}
	/>
);

const NavBar = ({ shouldAlwaysBeFixed = false }: NavBarProps) => {
	const [fixedNavBar, setFixedNavBar] = React.useState(shouldAlwaysBeFixed);

	useScrollPosition(
		({ currPos }) => {
			const userScrolled = currPos.y < 0;
			setFixedNavBar(shouldAlwaysBeFixed || userScrolled);
		},
		[fixedNavBar, shouldAlwaysBeFixed],
		undefined,
		undefined,
		250
	);

	return (
		<Box
			component="nav"
			sx={{
				position: fixedNavBar ? 'fixed' : 'absolute',
				backgroundColor: fixedNavBar ? 'white' : undefined,
				boxShadow: fixedNavBar ? '0 2px 4px 0 rgba(0,0,0,.2)' : undefined,
				top: 0,
				width: '100%',
				zIndex: 1000,
				padding: '15px',
			}}
		>
			<Box sx={{ maxWidth: { lg: '90%' }, margin: { lg: '0 auto' } }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<MobileLinks />
					<Link
						href="/"
						aria-label="Go to home"
						sx={{
							display: 'block',
							lineHeight: 0,
							marginRight: { md: '70px' },
						}}
					>
						<Image alt="" src={logo} sx={{ width: '50px', height: 'auto' }} />
					</Link>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							flex: 1,
							justifyContent: 'space-between',
							maxWidth: '400px',
							listStyle: 'none',
							padding: 0,
							margin: 0,
							marginRight: '70px',
						}}
						component="ul"
					>
						{MENU_OPTIONS.map((option) => (
							<Box key={option} component="li">
								<Link
									href="#"
									sx={{ color: 'inherit', textDecoration: 'none' }}
								>
									{option}
								</Link>
							</Box>
						))}
					</Box>
					<Badge
						color="primary"
						badgeContent={1}
						sx={{ marginLeft: { xs: 'auto', md: '0' }, order: { md: 1 } }}
					>
						<ShoppingBagButton
							LinkComponent={Link}
							href="#"
							aria-label="Go to cart"
						>
							<ShoppingBagIcon />
						</ShoppingBagButton>
					</Badge>
					{/* wrapping inside a form because I want to use nextjs's actions */}
					<Box
						component="form"
						sx={{
							flexBasis: { xs: '100%', md: 'auto' },
							marginTop: { xs: '10px', md: 0 },
							marginLeft: { md: 'auto' },
							marginRight: { md: '10px' },
						}}
					>
						<SearchBox sx={{ display: { md: 'none' } }} fullWidth />
						<SearchBox
							sx={{ display: { xs: 'none', md: 'block' } }}
							size="small"
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default NavBar;
