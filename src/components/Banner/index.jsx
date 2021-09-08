import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Container, Typography } from '@material-ui/core';
import Banner1 from '../../assets/img/banner_1.png'
import Banner2 from '../../assets/img/banner_2.png'


export default function Banner() {
	const items = [
        {
            description: "Probably the most random thing you have ever seen!",
            img: Banner1
        },
        {
            description: "Hello World!",
            img: Banner2
        }
    ]

    return (
		<Container maxWidth='lg'>
			<Carousel>
				{
					items.map( (item, i) => <Item key={i} item={item} /> )
				}
			</Carousel>
		</Container>
    )
}

function Item(props)
{
    const styles = {
        paperContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundImage: `url(${props.item.img})`,
            backgroundPosition: 'bottom',
            backgroundRepeate: 'norepeate',
            height: '40vh',
            marginTop: '10vh',
        }, 
        button: {
            fontSize: '32px',
            fontWeight: 'bold',
            alignItem: 'flex-end'
        }
    }

    console.log(props.item.img)

    return (
        <Paper style={styles.paperContainer} >
            <Typography style={styles.button}>Sale off <b>50%</b> just one day</Typography>
            <Button >BUY NOW</Button>            
        </Paper>
    )
}
