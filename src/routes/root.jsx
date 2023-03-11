 import SearchBar from "../components/Search/Search";
 import {Outlet,NavLink,useLoaderData,redirect,useNavigation,useSubmit} from "react-router-dom";
 import {createActivity,getActivities } from "../activity";
 import { useEffect, useState } from "react";
 import Upload from "../components/Upload/Upload";
 import Worker from '../workers/parse.worker.js?worker';

 const navLinkClassName = ({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
 };
 


 const Root= ()=> {
    const {activities,q} = useLoaderData();
    const [query,setQuery] = useState(q);
    const navigation =  useNavigation();
    const navigationState = navigation.state === "loading"? "loading":"";// it can be one of "idle" | "submitting" | "loading".
    const submit = useSubmit();

    useEffect(()=>{
      setQuery(q === null ? "" : q);
    },[q]);

    const fileHandle = (filename,content)=>{
      if (window.Worker) {
          console.log(14,filename,content);
          const myWorker = new Worker({type: 'module'});
          myWorker.addEventListener('message', async (event) => {
            console.log('Message received from worker1',);
            const activity = await createActivity({filename:filename,...event.data});
            submit(null,{action:`/activities/${activity.id}`});
          });
          myWorker.postMessage([filename,content]);
      } else {
        console.log('Your browser doesn\'t support web workers.');
      }
    };

    return (
      <>
        <div id="sidebar">
            <h1>FitBox v0.0.1</h1>
            <Upload id="upload" onChange={fileHandle}/>
            <div style={{display:"none"}}>
              <SearchBar data={query?query:""}/>
            </div>
            <nav>
                {
                    activities.length ? (
                    <ul>
                        {activities.map((activitiy) => (
                         <li key={activitiy.id}>
                            <NavLink to={`/activities/${activitiy.id}`} className={navLinkClassName}>
                            {activitiy? (
                            <>
                                {activitiy.filename.filename}
                            </>
                            ) : (
                            <i>No Name</i>
                            )}{" "}
                            {activitiy.favorite && <span>★</span>}
                            </NavLink>
                        </li>))}
                    </ul>
                    ) : (
                        <p>No activities found.</p>
                    )
                }
            </nav>
        </div>
        <div id="detail" className={navigationState}>
            <Outlet/>
        </div>
      </>
    );
  }
  export default Root;

  export async function action({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const activity = await createActivity(data);
    return redirect(`/activities/${activity.id}`);
  };

  export async function loader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const activities = await getActivities(q);
    return {activities,q};
  }