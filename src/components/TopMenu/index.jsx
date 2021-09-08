import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import { auth, db, logout } from "../../firebaseConfig";



const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	}, 
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		textDecoration: 'none',
		color: 'white',
		flexGrow: 1,
		marginLeft: theme.spacing(2)
	}
}))

export default function TopMenu() {
	const [anchor, setAnchor] = useState(null)
	const count = useSelector((state) => state.counter.value)
	
	const classes = useStyle()
	const open = Boolean(anchor)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const [user, loading, error] = useAuthState(auth);
	const [name, setName] = useState("");
	const history = useHistory();
	const fetchUserName = async () => {
		try {
		const query = await db
			.collection("users")
			.where("uid", "==", user?.uid)
			.get();
		const data = await query.docs[0].data();
		setName(data.name);
		} catch (err) {
		console.error(err);
		alert("An error occured while fetching user data");
		}
	};
	useEffect(() => {
		if (loading) return;
		if (!user) return history.replace("/");
		fetchUserName();
	}, [user, loading]);

	const handleMenu = (e) => {
		setAnchor(e.currentTarget)
	}

	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					<Typography
						variant='h5'
						component={Link}
						to='/home'
						className={classes.title}
						style={{textAlign: 'left'}}
					>
						GreenMarket
					</Typography>
					{isMobile ? (
						<>
							<IconButton
								color='textPrimary'
								className={classes.menuButton}
								edge='start'
								aria-label='menu'
								onClick={handleMenu}
							>
								<MenuIcon />
							</IconButton>
							<Menu
								anchorEl={anchor}
								anchorOrigin={{
									vertical: 'top',
									horizontal: ' right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
							>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/"
								>
									<Typography variant='h6'>Home</Typography>
								</MenuItem>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/products"
								>
									<Typography variant='h6'>Product</Typography>
								</MenuItem>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/about"
								>
									<Typography variant='h6'>About</Typography>
								</MenuItem>
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/cart"
								>
									<ListItemIcon>
										<AddShoppingCartIcon />
									</ListItemIcon>
									<Typography variant='h6'>Cart( {count} )</Typography>
								</MenuItem>
								{user ? (
								<>
								<MenuItem onClick={() => setAnchor(null)}>
									<Typography variant='h6'>Hi {name}</Typography>
								</MenuItem>
								<MenuItem
									onClick={() => {setAnchor(null); logout()}}
									component={Link}
									to="/login"
								>										
									<Typography variant='h6'>Log out</Typography>										
								</MenuItem>
								</>) : 
								<MenuItem
									onClick={() => setAnchor(null)}
									component={Link}
									to="/login"
								>
									<Typography variant='h6'>Login</Typography>
								</MenuItem>
								}
							</Menu>
						</>
					) : (
						<div style={{marginRight: '2rem'}}>
							<Button
								varient='text'
								component={Link}
								to='/'
								color='inherit'
							>
								Home
							</Button>
							<Button
								varient='text'
								component={Link}
								to='/products'
								color='inherit'
							>
								Product
							</Button>
							<Button
								varient='text'
								component={Link}
								to='/about'
								color='inherit'
							>
								About
							</Button>
							<Button
								varient='text'
								component={Link}
								to='/cart'
								color='inherit'
							>
								<AddShoppingCartIcon />
								Cart( {count} )
							</Button>
							{user ? (<Button
								varient='text'
								onClick={logout}
								color='inherit'
							>
								 Hi {name}, Logout
							</Button>) :
							(<Button
								varient='text'
								component={Link}
								to='/login'
								color='inherit'
							>
								Login
							</Button>)
							}
						</div>
					)
					}
				</Toolbar>
			</AppBar>
		</div>
	)
}
