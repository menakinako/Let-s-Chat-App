import React, { useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

import {useAuth} from '../context/AuthContext';
import axios from 'axios';

import chatalert from '../Audio/chat.wav';
import deletechat from '../Audio/delete.wav';
import addperson from '../Audio/addp.wav';
import chatapp from '../images/chatting.png';

const Chats = () =>{
 
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handlelogout = async() =>{
       await auth.signOut();
       history.push('/');
    }
     
    useEffect(()=>{
        if(!user){
        history.push('/');
         return;
        }

        const getFile = async(url)=> {
            const response = await fetch(url);
            const data = await response.blob();

            return new  File([data], "userPhoto.jpg", {type:"images/jpg"})
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name" : user.email,
                "user-secret" :user.uid
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            
            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users', 
                formdata,
                {headers: {"private-key" : process.env.REACT_APP_CHAT_ENGINE_KEY}}
                )
                .then(()=> setLoading(false))
                .catch((error)=> console.log(error))
            })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading.....';

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    <img src={chatapp} style={{width:"40px", height:"40px"}} alt=""/>
                     Let's Chat
                </div>
                <div onClick={handlelogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
         height="calc(100vh - 66px)"
         projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
         userName={user.email}
         userSecret={user.uid}
         onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
         onNewChat={() => new Audio(chatalert).play() }
         onDeleteChat={() =>new Audio(deletechat).play()}
         onEditChat={() => new Audio(addperson).play()}
    />
        </div>
    )
}

export default Chats;