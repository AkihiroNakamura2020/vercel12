import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles"

const useStyles=makeStyles({
   
  aright:{
    //flexGrow:1,//可能な限りの幅を取る
        textAlign: "right",
  },
  doright:{
    align:'right',
    marginBottom:-6,
},
toolh:{
    flexGrow:1//可能な限りの幅を取る
  },
  avatarshape :{
      borderRadius: "50%",
  },
  avatarshapeleft :{
    borderRadius: "50%",
    marginRight:10,
  },
    titlebackshape2:{
      backgroundColor: "#eefee1",
      //border: '0.5px solid black',
      borderRadius: '10px',
      margin: '5px',
      padding: '10px',
      //display: 'inline-block'
      width: '80%',
  
    },
    
        cardlist:{
          marginTop:20,
          marginBottom:20,
          display:'flex',
          verticalAlign: 'middle'
          //justifyContent: 'center'
  },
  Rbalance:{
    display:'flex',
    justifyContent: 'flex-end'
  },
  
  imagemarginv:{
    verticalAlign: 'middle',
    marginRight:10,
   
  },
  br:{
    lineHeight: '10px'
  },

    
    },{ name: "MuiExample_Component" })//)
  


const Lastwords = ({wid,ninja}) => {
    //console.log(wid)
    //console.log(ninja)
    const itemold=[]
    var olddate=0
    const classes=useStyles()

    ninja.forEach(item => {
        //console.log('a')
        if(item.userid==item.Towhom){
            //console.log('same')
            return
        }

        if(item.userid==wid||item.Towhom==wid){
            //console.log('b')
            //console.log(item.date)

            if(!olddate||item.date>olddate){
                itemold.push(item.Message)
                olddate=item.date
                //console.log('itemold')
                //console.log(itemold)
            }
            
        }
        
    });
    

    return (
        <div >
            
            <Typography >{itemold[itemold.length-1].slice(0,8)}...</Typography>
        </div>
      );
}
 
export default Lastwords;