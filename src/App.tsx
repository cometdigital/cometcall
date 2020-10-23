import React, { useState,useEffect } from 'react';
import useOpenTok from 'react-use-opentok';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [opentokProps, opentokMethods] = useOpenTok();
  const [isOnline, setIsOnline] = useState({});
  const {
    // connection info
    isSessionInitialized,
    connectionId,
    isSessionConnected,

    // connected data
    session,
    connections,
    streams,
    subscribers,
    publisher,
  } = opentokProps;

  const {
    initSessionAndConnect,
    disconnectSession,
    publish,
    unpublish,
    subscribe,
    unsubscribe,
    sendSignal,
  } = opentokMethods;

  async function fetchTokBoxData(){
    let tokBoxData = await Axios('http://localhost:3000/');
    initSessionAndConnectTokBox(tokBoxData.data.apiKey,tokBoxData.data.sessionId,tokBoxData.data.token);
  }
  function initSessionAndConnectTokBox(apiKey,sessionId,token){
    initSessionAndConnect({
      apiKey,
      sessionId,
      token,
    });

  }
  useEffect(() => {
   if(isSessionConnected){
    publish({
      name: 'ownerVideo',
      element: 'ownerVideo',
    });
   }else{
    fetchTokBoxData();
   }
  }, [isSessionConnected])
  useEffect(() => {
    if(streams.length>1){
      streams.map(steam=>{
        if(steam.connection.connectionId!=connectionId){
        subscribe({ stream: steam, element: 'guestVideo' });
        }
      })
    }
  }, [streams,connectionId])
  return (
    <div className="VideoContainer">
      <div className="owner">
        <div className="ownerVideo" id="ownerVideo">
        </div>
        <h1>ຂ້ອຍ</h1>
      </div>
      <div className="guest">
        <div className="guestVideo" id="guestVideo">
        </div>
        <h1>ເຈົ້າ</h1>
      </div>
    </div>
  );
}

export default App;
