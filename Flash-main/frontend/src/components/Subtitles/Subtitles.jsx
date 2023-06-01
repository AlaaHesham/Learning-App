import * as React from 'react';
import { useState } from 'react';
import{Link} from 'react-router-dom'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import QuizIcon from '@mui/icons-material/Quiz';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Video from './Video';

export default function NestedList({subtitles}) {
  const[open, setOpen]=useState(true);
  const[video,setVideo]=useState({});
  const[desc,setDesc]=useState('')
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          course subtitles
        </ListSubheader>
      }
    >
      {subtitles.map((s) => (
       <><ListItemButton onClick={handleClick}>
              <ListItemIcon>
                  <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={s.subtitle} />
              {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                              <OndemandVideoIcon />
                          </ListItemIcon>
                          <ListItemText primary="video" onClick={()=>setVideo(s.youtubeLink.link)} />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                              <QuizIcon />
                          </ListItemIcon>
                          <Link to={`/excercises/${s._id}`}><ListItemText primary="excercise" /></Link>
                          
                      </ListItemButton>
                  </List>
              </Collapse></>
      ))}
      
    </List>

    <Video video={video}/>

    </>
  );
}