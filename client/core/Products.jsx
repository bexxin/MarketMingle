import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import BaseballImg from './../assets/images/baseball.jpg';
import Button from '@material-ui/core/Button'
import { CardActions } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const Products = () => {
    const [products, setProducts] = useState([]);
}

//TODO Add logic to get product data from database

//add function to add to cart
//function when quantity field is changed
const handleQuantityChange = (event, setQuantity) => {
    setQuantity(event.target.value);
}

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 200,
      margin: 'auto',
      margin: theme.spacing(5),
    },
    title: {
      padding: theme.spacing(3, 2.5, 2),
      color: theme.palette.openTitle,
    },
    media: {
      minHeight: 100,
      minWidth:100,
    },
    cardActions:{
        display:'flex',
        flexDirection:"column",

        justifyContent: 'center'
    }
  }));
  
  export default function Home(){ 
  const[quantity, setQuantity]=React.useState(1);
  const classes = useStyles()
  return (
  <Card className={classes.card}>
     
    <Typography variant="h6" className={classes.title}>Product Name</Typography>
  
  
  <CardMedia className={classes.media}
  image={BaseballImg} title="Sports Equipment"/>
  <CardContent>
  <Typography variant="body2" component="p"> 
  Product Description 
  </Typography> 
  <Typography component="h5">Price: 30.99</Typography>
  </CardContent>
  <CardActions className={classes.cardActions}>
    <TextField type="number" label="Quantity" value={quantity} className={classes.quantityInput} inputProps={{min:1}} onChange={(event) => handleQuantityChange(event, setQuantity)}/>
  <Button color="primary" variant="contained">Add To Cart</Button>
  </CardActions>
  </Card> 
  )
  }