import React, {useState,useEffect} from 'react'
import firebaseApp from "../../../../components/firebase"
import firebase from "../../../../components/firebase2"

import Lastwords from '../../../../components/Lastwords';


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
import { id } from 'date-fns/locale';
import { blue } from '@mui/material/colors';



//受け取るcontextの内容を編集
export const getStaticPaths = async () => {

  let posts = []

    const colRef=await collection(firebaseApp, "mydata")


    await getDocs(colRef)
            .then((snapshot)=>{
                snapshot.docs.forEach(doc => {
                  posts.push(JSON.stringify(doc.data().userid))
                  
                });
                
            })//.then(()=>console.log(posts))

    const filteredArray = posts.filter(function(ele , pos){
              return posts.indexOf(ele) == pos;
    }) 

  console.log('filteredArray')
  //console.log(filteredArray)

  let filtered =[]

  fileadd()

  function fileadd(){
    for(var i=0;i<filteredArray.length;i++){
      for(var s=0;s<filteredArray.length;s++){
        filtered.push([filteredArray[i],filteredArray[s]])
      }
    }
  }
    

  console.log('filtered')
  //console.log(filtered)

  const paths = filtered.map(ninja => {
    return {
      params: { id:ninja[0].toString() ,msid:ninja[1].toString()}
    }
  })

  console.log('paths')
  //console.log(paths)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
 
  let posts = []
  console.log('context')
  //console.log(context)
  

 
  const id = parseInt(context.params.id)  
  const msid = parseInt(context.params.msid)  

    const colRef= await collection(firebaseApp, "directmessage")

    //const q = await query(colRef,where("userid","==",id))
    
    await getDocs(colRef)
            .then((snapshot)=>{
   
                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                 
                
                  const pile={}
                  if(data.userid==id||data.Towhom==context.params.id){

                                      //条件式 ? trueの処理 : falseの処理
                  pile.title = data.title?data.title:null
                  pile.details = data.details?data.details:null
                  pile.userid = data.userid 
                  pile.username = data.username
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

                  pile.msid = msid


                  posts.push(pile)

                  }
                });
                
            })//.then(()=>console.log(posts))
    
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
  //flexGrow:1,//可能な限りの幅を取る
      textAlign: "right",
},
avatarshape :{
    borderRadius: "50%",
},
avatarshapeleft :{
  borderRadius: "50%",
  marginRight:10,
},
titlebackshape:{
    backgroundColor: "#e1f5fe",
    //border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    //display: 'inline-block'
    width: '80%'

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
textover:{
  overflow: "hidden",
  textOverflow: "ellipsis",
 
},
  
  },{ name: "MuiExample_Component" })//)


  export default function Messagemsid({ ninja }) {

  console.log('ninja')
  //console.log(ninja)
 

  const firestorage = getStorage();
  const auth=getAuth()
  const mailRef= collection(firebaseApp, "directmessage")

  const [image,setImage]=useState('')
  const [noimage,setnoImage]=useState(false)

  const [mixlist,setmixlist]=useState([])
  const [mixdone,setmixdone]=useState(false)

  const colRef= collection(firebaseApp, "mydata")//.orderBy('storagelink')

  const [authid, setauthid] = useState('')
const [towhomid, settowhomid] = useState('')

useEffect(() => {
 // if(localStorage.getItem('authhistory')==ninja[0].mail){ localStorage.setItem('authuserid',ninja[0].userid)}
 setauthid(localStorage.getItem('authuserid'))
 settowhomid(localStorage.getItem('Towhom'))
 setmsid(ninja[0].msid)
 setninjafinal(ninjax)

     }
   , [towhomid])

   console.log('authid')
  console.log(authid)


  var ninjax=[]
  //const [ninjax,setninjax]=useState([])
  const [ninjafinal,setninjafinal]=useState([])
  const [ninjafinalv,setninjafinalv]=useState([])
  const [ninjafinalflag,setninjafinalflag]=useState(false)
  
  function Datamixlist() {
　  
    let posts = []
    const colRef= collection(firebaseApp, "mydata")//.orderBy('storagelink')
    const q = query(colRef,where("storagelink", '!=', null))
    
     getDocs(q)
            .then((snapshot)=>{
   
                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  //console.log('data.title')
   
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
  }else{
    console.log('mixdone')
  }

  //if(mixdone&&ninjafinal==[]){
    
    if(mixdone&&ninjax!=[]&&!ninjafinalflag){
    console.log('mixdone&&ninjafinal==[]')
    
    console.log('mixlist.filter(x => ninjafinal.includes(x.userid)')
    //console.log(mixlist.filter(x => ninjafinal.includes(x.userid)))
    console.log(ninjafinal)

    console.log('ninjax')
    console.log(ninjax)

    setninjafinalv(mixlist.filter(x => ninjafinal.includes(x.userid)))
    setninjafinalflag(true)


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

  const [msid, setmsid] = useState('')


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

if(Item.userid !=Item.Towhom ){

  if(Item.userid!=authid){
    ninjax.push(Item.userid)

   
   
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


   async function handleOnMessage(e) {
    e.preventDefault();
  
    //メッセージ内容
    const message=umail
    //const Towhom=localStorage.getItem('Towhom')

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
            Towhom:msid
          })

       }
   })

  router.reload()

  }


  if(depo&&closeflag==false){setClose(true)}


  async function handleOnArraytest(e) {
    //document.addEventListener('touchstart', handler, {passive: true});
    e.preventDefault();
    
    console.log('handleOnArraytest')

    if(followers){
      followers.forEach(Item=> console.log(Item))
    }
  }

  async function handleOnArrayfollow(e) {
    //document.addEventListener('touchstart', handler, {passive: true});
    e.preventDefault();
    const authhistory= localStorage.getItem('authhistory')

    console.log('console.log(authhistory)')
    console.log(authhistory)

    if(localStorage.getItem('authhistory')){
  
    const colRef= await collection(firebaseApp, "mydata")

    const q = await query(colRef,where("mail","==",authhistory))
    
    var getmyuserid=""
    var getmyusername=""
    var getdocid=""
    var getfollowing=""

    var getfollowersname=""
    var getfollowersdocid=""

    //authをもとにクリック主のデータベース情報の取得
    await getDocs(q)
    .then((snapshot)=>{

                snapshot.docs.forEach(doc => {
                  const data = doc.data()

                  if(data.userid&&data.mail&&data.following)
                  {
                    getmyuserid=data.userid
                    getmyusername=data.mail
                    getdocid = doc.id
                    getfollowing = data.following
                    console.log(getmyuserid)
                    console.log(getmyusername)
                    console.log(getdocid)
                    console.log(getfollowing)
                  }


                });
                
            }).then(()=>{
              console.log('get2')

          //自身のデータベースのfollowingにクリック先の[id]情報を登録
          const profileRef=doc(firebaseApp,'mydata',getdocid)
              updateDoc(profileRef, {
                following: arrayUnion(ninja[0].username)
              })
            }).then(()=>{
          //クリック主の情報をクリックされた側のデータベースのfollowersを含むドキュメントを取得
          //ページ表示者の情報はninjaにベースの情報が入っている
          console.log('get3')


          ninja.forEach(Item => {
            if(Item.followers){
              getfollowersdocid=Item.docid
              getfollowersname=Item.username
            }

          })

            }).then(()=>{
              console.log('get4')

              //相手のデータベースのfollowerにクリック主の[id]情報を登録
              const profileRef=doc(firebaseApp,'mydata',getfollowersdocid)
                  updateDoc(profileRef, {
                    followers: arrayUnion(getfollowersname)
                  })
                })
    }else{
      router.push("/login")
    }
      
  }

let ninjav;


if(authid){

    const newArray = ninja.filter(element => 
        (element.userid==authid&&element.Towhom==msid||element.userid==parseInt(msid)&&element.Towhom==authid.toString()));
      
      ninjav = newArray.sort(function(a, b) {
        return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
        //return (a.cardorder > b.cardorder) ? -1 : 1;  //オブジェクトの降順ソート
      });
    
}  

  return (
    <Container >

    <Grid item xs={12} md={12} lg={12} >

            
    {/* <Typography className={classes.titleback}>Message </Typography> */}
       
        <form noValidate autoComplete="off" onSubmit={handleOnMessage}>
          
              
        {mixlist.map((item,index) => (
            <div key={index} >
              {item.userid==msid&&(
              <Typography>
		Send To: {item.username}
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
          </Grid>
        
        <Grid item xs={12} md={12} lg={12} className={classes.balancer}>

        <Grid item xs={6} md={6} lg={6} >
        {/* <Typography sx={{ fontSize: 35 }}　color="#f5f5f5">Chat with</Typography> */}
        
        {ninjafinalv&&ninjafinalv.map((item,index) => (
            <div key={index} >  
            <Card sx={{ boxShadow: 0 }}　className={classes.cardlist}　 onClick={()=>router.push('/ID/'+authid+'/Message/'+item.userid).then(() => router.reload())}>   
            <img src={item.storagelink} className={classes.avatarshapeleft} alt="" width="50" height="50"/> <Typography display="inline"　variant="h4"　className={classes.imagemarginv}>{item.username}  </Typography>
            
            <Lastwords wid={item.userid} ninja={ninja} />
            
          </Card>
            </div>
        ))

        }
        

        </Grid>

        <Grid item xs={6} md={6} lg={6} >

        
          {mixlist.map((item,index) => (
            <div key={index} >

              {item.userid==localStorage.getItem('authuserid')&&(
              <div>
		{item.username}
                <img src={item.storagelink} className={classes.avatarshape} alt="" width="30" height="27"/>
    　        </div>
              )}

		{item.userid==msid&&(
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
            <Box>
                    <Typography className={classes.titlebackshape}  　style={{overflowWrap: 'break-word'}}>
                    {item.Message}
            　        </Typography>
            </Box>
            :
            <Box className={classes.Rbalance}>
                    <Typography className={classes.titlebackshape2}　align="right" style={{overflowWrap: 'break-word'}}>
                    {item.Message}
            　        </Typography>
            </Box>
            }

                    </div>
                ))
                }
        </>
        }
        </Grid>

    </Grid>        
   
  </Container>
    
  );
}
