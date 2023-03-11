import {useLoaderData} from "react-router-dom";
import {getActivity,updateContact} from "../activity";
import Table from "../components/Table/index";
import Card from "../components/Card";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import React, { useState } from "react";
import Map from "../components/Map/index";
import Row from "../components/Flex/index";

export async function loader({params}){
    const activity = getActivity(params.activityId);
    if(activity === null){
        throw new Response("",{status:404,statusText:'Not Found'});
    }
    return activity;
};
export async function action({request,params}){
   let formData = await request.formData();
   return updateContact(params.activityId,{favorite:formData.get("favorite") === "true"});
};
const Data = ({activity})=>{
  return (<>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>UserProfile</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Table data={activity.userProfileMesgs}></Table>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sessions</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Table data={activity.sessionMesgs}></Table>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Typography>Laps</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Table data={activity.lapMesgs}></Table>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
         <Typography>Records</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Table data={activity.recordMesgs}></Table>
        </AccordionDetails>
      </Accordion>
    </>
  )
};

export default function Activty() {
  const activity = useLoaderData();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <div id="activity">
      <Box sx={{ width: '100%', typography: 'body1',marginTop:'29px' }}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" />
            <Tab label="Data" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Row>
              <Card title={'TotalElapsedTime'} value={activity.sessionMesgs[0].totalElapsedTime} unit={'s'}/>
              <Card title={'TotalDistance'} value={activity.sessionMesgs[0].totalDistance} unit={'m'}/>
              <Card title={'TotalCalories'} value={activity.sessionMesgs[0].totalCalories} unit={'kcal'}/>
              <Card title={'TotalDescent'} value={activity.sessionMesgs[0].totalDescent} unit={'m'}/>
          </Row>
          <Divider style={{marginTop:'14px'}} />
          <Map activity={activity}/>
        </TabPanel>
        <TabPanel value="2">    
          <Data activity={activity}/>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
  );
}



