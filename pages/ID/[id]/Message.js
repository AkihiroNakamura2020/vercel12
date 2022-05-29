import React, {useState,useEffect} from 'react'
import firebaseApp from "../../../components/firebase"
import firebase from "../../../components/firebase2"


import {
  getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged
} from "firebase/auth"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp,updateDoc,arrayUnion,addDoc, arrayRemove } from "firebase/firestore"
import { title } from 'process';


import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';
import { makeStyles } from "@mui/styles"

import { TwitterTimelineEmbed,  TwitterTweetEmbed } from 'react-twitter-embed';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useRouter } from 'next/router'
import { TextField } from "@mui/material"
import { Button } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertCompilerOptionsFromJson } from 'typescript';
import { CardContent } from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


//受け取るcontextの内容を編集
export const getStaticPaths = async () => {

  let posts = []

    const colRef=await collection(firebaseApp, "mydata")


    await getDocs(colRef)
            .then((snapshot)=>{
                snapshot.docs.forEach(doc => {
                  posts.push(JSON.stringify(doc.data().userid))
                  
                });
                
            }).then(()=>console.log(posts))

    
  const paths = posts.map(ninja => {
    return {
      params: { id:ninja.toString() }
    }
  })
  console.log('paths')

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
 
  let posts = []
 
  const id = parseInt(context.params.id)  

    const colRef= await collection(firebaseApp, "directmessage")

    //const q = await query(colRef,where("userid","==",id))
    
    await getDocs(colRef)
            .then((snapshot)=>{
   
                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  console.log('data.title')
                
                  const pile={}
                  if(data.userid==id||data.Towhom==context.params.id){

                                      //条件式 ? trueの処理 : falseの処理
                  pile.title = data.title?data.title:null
                  pile.details = data.details?data.details:null
                  pile.userid = data.userid 
                  pile.username = data.username?data.username:null
                  pile.category = data.category?data.category:null
                  pile.tweetId = data.tweetId ?data.tweetId:null
                  pile.debankid = data.debankid ?data.debankid:null
                  pile.address = data.address ?data.address:null
                  pile.mail = data.mail ?data.mail:null
                  pile.youtubeId = data.youtubeId ?data.youtubeId:null
                  pile.mediumid = data.mediumid ?data.mediumid:null
                  pile.docid = doc.id ?doc.id:null

                  pile.tweetlink = data.tweetlink ?data.tweetlink:null
                  pile.discordlink = data.discordlink ?data.discordlink:null
                  pile.youtubelink = data.youtubelink ?data.youtubelink:null
                  pile.telelink = data.telelink ?data.telelink:null
                  pile.whatslink = data.whatslink ?data.whatslink:null
                  pile.followers = data.followers ?data.followers:null
                  pile.following = data.following ?data.following:null

                  pile.nftlink = data.nftlink ?data.nftlink:null
                  pile.customlink1 = data.customlink1 ?data.customlink1:null
                  pile.customhash1 = data.customhash1 ?data.customhash1:null
                  pile.customlink2 = data.customlink2 ?data.customlink2:null
                  pile.customhash2 = data.customhash2 ?data.customhash2:null

                  pile.ycomment = data.ycomment ?data.ycomment:null
                  pile.storagelink = data.storagelink?data.storagelink:null
                  pile.itsmeid = data.itsmeid ?data.itsmeid:null

                  pile.Message = data.Message ?data.Message:null
                  pile.Towhom = data.Towhom ?data.Towhom:null
                  pile.date = data.date ?data.date:null


                  posts.push(pile)

                  }
                });
                
            }).then(()=>console.log(posts))
    
  return {
    props: { ninja: posts }
  }
}

const useStyles=makeStyles({
  // const useStyles=makeStyles((theme) => ({
    balancer:{
        display:'flex',
    },
    toolh:{
      height:50,
      flexGrow:1//可能な限りの幅を取る
    },
      cardh:{
          marginTop:20,
          marginBottom:20,
    },
      doright:{
      align:'right',
      marginBottom:-6,
  },
      docenter:{
      align:'center',
      marginTop:20,
      marginBottom:20,
      flexGrow:1
  },
      imagemargin:{
        marginRight:10,
  },
      cardmargin:{
        'margin-left': '1%',
          width: "98%",
},
titleback:{
  backgroundColor: "#f5f5f5"
},
aright:{
  //flexGrow:1//可能な限りの幅を取る
      textAlign: "right",
},
avatarshape :{
    borderRadius: "50%",
},
titlebackshape:{
    backgroundColor: "#e1f5fe",
    //border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    //display: 'inline-block'

  },

  
  
  },{ name: "MuiExample_Component" })//)


  export default function Message({ ninja }) {

  const firestorage = getStorage();
  const auth=getAuth()
  const mailRef= collection(firebaseApp, "directmessage")

  const [image,setImage]=useState('')
  const [noimage,setnoImage]=useState(false)

  const [mixlist,setmixlist]=useState([])
  const [mixdone,setmixdone]=useState(false)

  const colRef= collection(firebaseApp, "mydata")//.orderBy('storagelink')


  function Datamixlist() {
　  
    let posts = []
    const colRef= collection(firebaseApp, "mydata")//.orderBy('storagelink')
    const q = query(colRef,where("storagelink", '!=', null))
    
     getDocs(q)
            .then((snapshot)=>{
   
                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  console.log('data.title')
   
                  const pile={}
                  //条件式 ? trueの処理 : falseの処理
                  pile.userid = data.userid 
                  pile.username = data.username
                  pile.mail = data.mail?data.mail:null

            
                  pile.storagelink = data.storagelink?data.storagelink:null

                  posts.push(pile)

                });
                
            }).then(()=>console.log(posts)).then(()=>setmixlist(posts)).then(()=>setmixdone(true))
        

  }

  if(!mixdone){
    Datamixlist()
  }
  

  
//追加事項
const classes=useStyles()


const [depo, setDepo] = useState();
const router = useRouter()

const [umail,setUmail]=useState('')
const [upass,setUpass]=useState('')

const [closeflag,setClose]=useState(false)

const [addressflag,setAddress]=useState(false)
const [address,setaddress]=useState('')


  const [followers,setfollowers]=useState('')
  const [following,setfollowing]=useState('')


  

  const [nftimage, setnftImage] = useState('')

  const [idmailcheck, setidmailcheck] = useState(false)
  const [windowcheck, setwindowcheck] = useState(false)

  const [storagelink, setstoragelink] = useState('')
  const [storagelinkdocid, setstoragelinkdocid] = useState('')

  const [itsmecheck, setitsmecheck] = useState(false)

ninja.forEach(Item => {


if(Item.address !=null||Item.address !=undefined){
    if(address==undefined||address==null||address==''){ 
      setaddress(Item.address)
    }
}


if(Item.followers !=null||Item.followers !=undefined){

if(followers==undefined||followers==null||followers==''){ 
  setfollowers(Item.followers)
}

}

if(Item.following !=null||Item.following !=undefined){

if(following==undefined||following==null||following==''){ 
  setfollowing(Item.following)
}
}



if(Item.storagelink !=null||Item.storagelink !=undefined){

  if(storagelink==undefined||storagelink==null||storagelink==''){ 
    setstoragelink(Item.storagelink)
    setstoragelinkdocid(Item.docid)
  }
}

if(Item.itsmeid !=null||Item.itsmeid !=undefined){

  if(itsmecheck==false){ 
    setitsmecheck(true)
  }
}

});

if(!windowcheck){
  if (typeof window !== 'undefined') {

    console.log(localStorage.getItem('authhistory'))
    console.log(ninja[0].mail)

    if(localStorage.getItem('authhistory')==ninja[0].mail){
      setidmailcheck(true)
      //localStorage.setItem('authuserid',ninja[0].userid)

    }else{
      setidmailcheck(false)
    }
    setwindowcheck(true)
  
  } else {
    console.log('we are running on the server');
  }
}

const [authid, setauthid] = useState('')
const [towhomid, settowhomid] = useState('')

useEffect(() => {
 // if(localStorage.getItem('authhistory')==ninja[0].mail){ localStorage.setItem('authuserid',ninja[0].userid)}
 setauthid(localStorage.getItem('authuserid'))
 settowhomid(localStorage.getItem('Towhom'))
     }
   , [towhomid])

   console.log('authid')
  console.log(authid)

   async function handleOnMessage(e) {
    e.preventDefault();
  
    //メッセージ内容
    const message=umail
    const Towhom=localStorage.getItem('Towhom')

    //'authuserid'の登録は事前にチェック　現在ログインではなく、ログインかつ自身のページへの遷移でauthuseridが再記録されるため 
   //まずは送付側からドキュメント生成し文言を配列として追加
   mixlist.map((item) => {
       if(item.userid==localStorage.getItem('authuserid')){

        addDoc(mailRef,{
            
            userid:item.userid,
            username:item.username,
            date:Date.now(),
            mail:item.mail,
            Message: message,
            Towhom:Towhom
          })

       }
   })

  router.reload()

  }


  if(depo&&closeflag==false){setClose(true)}


let ninjav;

if(authid){

    const newArray = ninja.filter(element => 
        (element.userid==authid&&element.Towhom==towhomid||element.userid==parseInt(towhomid)&&element.Towhom==authid.toString()));
      
      ninjav = newArray.sort(function(a, b) {
        return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
        //return (a.cardorder > b.cardorder) ? -1 : 1;  //オブジェクトの降順ソート
      });
    
}  

  return (
    <Container >

    <Grid item xs={12} md={12} lg={12} >
            
    <Typography >Start chatting!</Typography>
       
        <form noValidate autoComplete="off" onSubmit={handleOnMessage}>
              
        {mixlist.map((item,index) => (
            <div key={index} >
              {item.userid==localStorage.getItem('authuserid')&&(
              <Typography>
		To: {item.username}
    　        </Typography>
              )}
            </div>
        ))
        }

              <TextField 
              onChange={(e)=>setUmail(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
               
               <Box >
                  <Button
                      type="submit"
                      varient="contained"
                      >
                      submit
                  </Button>
               </Box>

          </form>

          {mixlist.map((item,index) => (
            <div key={index} >

              {item.userid==localStorage.getItem('authuserid')&&(
              <div>
		{item.username}
                <img src={item.storagelink} className={classes.avatarshape} alt="" width="30" height="27"/>
    　        </div>
              )}

		{item.userid==localStorage.getItem('Towhom')&&(
              <div  className={classes.aright}>
		{item.username}
                <img src={item.storagelink} className={classes.avatarshape} alt="" width="30" height="27"/>
    　        </div>
              )}


            </div>
        ))
        }

        {authid&&
        <>

        {ninjav.map((item,index) => (
                    <div key={index} >
           
            {item.userid==authid
            ?
                    <Typography className={classes.titlebackshape}>
                {item.username}: {item.Message}:{item.date}
            　        </Typography>
            :

                    <Typography className={classes.titlebackshape}>
                {item.username}: {item.Message}:{item.date}:right
            　        </Typography>
            }

                    </div>
                ))
                }
        </>
        }

       
        <Grid item xs={6} md={6} lg={6} >

        </Grid>

    </Grid>        
   
  </Container>
    
  );
}
