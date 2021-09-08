import React, { useEffect, useState } from 'react'
import productApi from '../../apis/ProductApi'

import {useDispatch} from 'react-redux'
import { increase } from '../../features/counter/counterSlice'
import { addToCart } from '../../features/cart/cartSlice'

import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid, makeStyles, Container, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles({
  root: {
    marginBottom: 50
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  item: {
    margin: 20,
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  center: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

export default function ProductList() {
  const [productList, setProductList] = useState([])
  const classes = useStyles();

	useEffect(() => {
    const fetchProductList = async () => {      
      try {
        const response = await productApi.getAll()
        console.log(productApi.getAll(), 'url')
        console.log(response , 'respone')
        setProductList(response)
        
      }
      catch (error) {
        console.log(error)
      }
    }  

    fetchProductList()
    
  }, [])

	return (
		<div>
      <Container>
      <Grid container justifyContent='center' className={classes.root}>
			{
        productList && productList.map((item,i) =>  <ProductItem item={item} key={i}/>)
      }
      </Grid>
      </Container>
		</div>
	)
}

function ProductItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [like, setLike] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const handleLike = () => {
    setLike(!like)
  }

  return (
    <>
    <Grid item lg={3} sm={6} xs={12} spacing={2}>
    <Card className={classes.item}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.item.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
              
              {props.item.name}

            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.item.price}$
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.center}>
          <Button size="small" color='primary' onClick={handleLike}>
            {like ? <FavoriteIcon style={{color:'red'}}/> : <FavoriteBorderIcon style={{color:'red'}}/>}           
            Like
          </Button>
          <Button size="small" color="primary" onClick={() => {dispatch(addToCart(props.item)); dispatch(increase()); handleClick()}} >
            <AddShoppingCartIcon/>
            Buy
          </Button>
        </CardActions>
    </Card>
    </Grid>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        Add to cart Success!
      </Alert>
    </Snackbar>
    </>
  )
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}