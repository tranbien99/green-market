import React from 'react'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import ProductList from '../../components/Product'
import Ad1 from '../../assets/img/ad1.jpg'
import Ad2 from '../../assets/img/ad2.jpg'
import Ad3 from '../../assets/img/ad3.jpg'

import { Grid, Hidden, Container, Typography, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';


const useStyles = makeStyles({
		root: {
			marginBottom: 50,
			marginTop: 50,		
		},
		ad: {
			height: 140,
		},
		item: {
			margin: 10,
			overflow: 'hidden'
		},
	})


export default function HomePage() {

	const classes = useStyles();
	
	return (
		<div>
			<Banner />
			<Container>

			<Grid container justifyContent='space-around' className={classes.root}>
				<Grid item sm={3} xs={12} className={classes.item}>
						<Paper style={{paddingTop:40, paddingBottom:40}} variant='outlined'>
							<LocalShippingOutlinedIcon fontSize='large' />
							<Typography variant='h5'>Free shipping > 50$</Typography>
						</Paper>
				</Grid>
				<Grid item sm={3} xs={12} className={classes.item}>
						<Paper style={{paddingTop:40, paddingBottom:40}} variant='outlined'>
							<LockOutlinedIcon fontSize='large' />
							<Typography variant='h5'>Secure Payment</Typography>
						</Paper>
				</Grid>
				<Grid item sm={3} xs={12} className={classes.item}>
						<Paper style={{paddingTop:40, paddingBottom:40}} variant='outlined'>
							<AddIcCallOutlinedIcon fontSize='large' />
							<Typography variant='h5'>Support 24/7 All time</Typography>
						</Paper>
				</Grid>
			</Grid>
			
			<Hidden smDown>			
				<Grid container justifyContent='space-around' wrap='nowrap' className={classes.root}>
					<Grid item sm={3} xs={4} className={classes.item}>
						<img src={Ad1} alt='ad' style={{height:'35vh'}}></img>
					</Grid>
					<Grid item sm={6} xs={4} className={classes.item}>
						<img src={Ad2} alt='ad' style={{height:'35vh'}}></img>
					</Grid>
					<Grid item sm={3} xs={4} className={classes.item}>
						<img src={Ad3} alt='ad' style={{height:'35vh'}}></img>
					</Grid>
				</Grid>	
			</Hidden>
			
			<Typography variant='h4'>Our Best Seller</Typography>
			<ProductList />			
			</Container>
			<Footer />
		</div>
	)
}
