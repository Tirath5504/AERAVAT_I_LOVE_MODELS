"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  ControlBar,
  Chat,
  LayoutContextProvider,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';
import Dictaphone from './components/Dictaphone';
import useMyStore from '@/lib/zustand';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import LoadingScreen from '@/app/loading';
// import webgrazer from "webgazer"

export default function Page({params: {classId, lectureId}}: {params: {classId: string, lectureId: string}}) {
  // TODO: get user input for room and name
  const room = lectureId?lectureId:'default-room';
  const [token, setToken] = useState("");
  const [desc, setDesc] = useState("");
  const {user} = useMyStore() 
  const router = useRouter()

  const handleDisconnect = async() => { 
    console.log('Disconnected from room');
    const res = await fetch(`/api/orgs/test/classroom/${classId}/lecture/${lectureId}/transcript`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({transcriptText:desc})
    })

    const data = await res.json()
    console.log(data)
    if(data.responseStatus!=="SUCCESS"){
      toast(data.responseStatus)
    }else(
      toast("Transcript saved successfully")
    )
    router.push(`/class/${classId}/`)
    
  }

  useEffect(() => {
    console.log(desc)
    // startGazing()
  }, [desc])
  
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${user?.userDisplayName}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return <LoadingScreen/>;
  }

  return (
    <LayoutContextProvider>
    <LiveKitRoom
      onDisconnected={()=>{handleDisconnect()}}
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ minHeight: '100dvh' }}
    >
      
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {desc.length>0&&<h1 className=' absolute top-[10vh] bg-slate-950 p-4 text-slate-100 bg-opacity-50 rounded-lg font-semibold'>{desc}</h1>}
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <div className=' flex flex-row gap-2 justify-center w-full items-center'>
      <ControlBar/>
      <Dictaphone setDesc={setDesc} setLang={()=>{}}/>
      </div>
      <div className=' flex flex-rowgap-4 w-full px-8 py-8 rounded-lg ' style={{gap:"1rem"}}  >
        <iframe src={`http://localhost:5173/room/${room}`} className={` rounded-xl w-full flex ${user?.userType==="Student"?"":""}`} style={{height:"70vh"}}>
          
        </iframe>
      <Chat/>
      </div>
    </LiveKitRoom>
    </LayoutContextProvider>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  useEffect(() => {
    console.log(tracks);
  }, [])
  

  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}