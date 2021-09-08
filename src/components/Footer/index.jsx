import React from 'react'
import { Grid, List, ListItemText, ListItem, Divider, Typography, Container } from '@material-ui/core';
import PaymentImage1 from '../../assets/img/payment1.png'


export default function Footer() {
	return (
		<div style={{backgroundColor:'#eee'}}>
			<Container>
				<Grid container spacing={3} wrap>
					<Grid item sm={4} xs={6}>
						<List>
							<ListItem >
								<ListItemText>GreenMarket</ListItemText>
							</ListItem>
							<Divider/>
							<ListItem>
								<ListItemText>Hotline 24/7</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Center support</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Instrution</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item sm={4} xs={6}>
						<List>
							<ListItem >
								<ListItemText>Our policy</ListItemText>
							</ListItem>
							<Divider/>
							<ListItem>
								<ListItemText>Shipping</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Return package</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Secure policy</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Complain</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item sm={4} xs={12}>
						<Typography variant='h6' style={{padding: 20, fontWeight: 'bold'}}>Payment method</Typography>
						<img src={PaymentImage1} alt='payment' style={{height:'12vh'}}/>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}
