 import Cookies from "js-cookie";
import Navbar from "./navbar";
 import { useState,useEffect } from "react";
 import { useNavigate } from "react-router-dom";
const Sub=()=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token=Cookies.get('token');
    const navigate=useNavigate();
    const [subscriptions, setSubscriptions] = useState({});
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'token': token, 
            }
          };
          fetch("/user/activity/recent-actions",requestOptions)
          .then((res) => res.json())
          .then((jsonData) => {
            console.log(jsonData); // Log the response data to inspect its structure
            setData(jsonData);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, []);

      useEffect(() => {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            'token': token, 
          }
        };
      
        fetch("/checklogin", requestOptions) // Pass the requestOptions object as the second argument
          .then((res) => res.json())
          .then((jsonData) => {
            console.log(jsonData); 
            console.log(jsonData.islogin)
            if (jsonData.islogin=="true") {
              console.log("you are logined")
            }else{
                navigate('/')
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            // setLoading(false);
          });
      }, []);

      const handelUnsubscribe=(id)=>{
        const requestServer = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'token': token, 
          }
        };
      
        fetch("/subscribe/"+id, requestServer) // Pass the requestOptions object as the second argument
          .then((res1) => res1.json())
          .then((jsonData1) => {
            console.log(jsonData1); 
            if (jsonData1.InsertedBlogID==id) {
              console.log("blog id "+id+" subscribed")
              setSubscriptions((prevState) => ({
                ...prevState,
                [id]: !prevState[id] || false, // Toggle the subscription status or set to false if undefined
              }));
            }else{
                
                console.log("Error during subscribing");
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            // setLoading(false);
          });
      }

return(
    <>
    <Navbar></Navbar>

    <div className="content">
        <h2 className='blog'>Blog list</h2>
        {data ? (
            <>
          {data.map(user => (
            <div class="card" key={user.ID}>
            <div class="card-header">{user.BlogEntry.AuthorHandle}</div>
            <div class="card-body">
              <h5 class="card-title">{user.BlogEntry.Title.replace(/<\/?p>/g, '')}</h5>
              
              <button
          id={user.BlogEntry.ID}
          type="button"
          className={`btn ${subscriptions[user.BlogEntry.IDD] ? 'btn-primary' :'btn-danger' }`}
          data-mdb-ripple-init
          onClick={() =>handelUnsubscribe(user.BlogEntry.ID)}
        >
          {subscriptions[user.BlogEntry.ID] ?'Subscribe' : 'Unsubscribe'}
        </button>
              <span className="mar"></span>
              <a href={`/blogs/${user.BlogEntry.ID}`} class="btn btn-primary" data-mdb-ripple-init >Read more</a>
            </div>
          </div>
          ))}

          </>
      ) : (
        <p>Loading...</p>
      )}
      <span className="msr"></span>
        </div>
    </>
);
 }
 export default Sub;