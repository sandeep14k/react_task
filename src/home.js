import { useState, useEffect } from 'react';
import './home.css'
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from './navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Home = () => {

const token=Cookies.get('token')
const navigate=useNavigate();


 
console.log(token)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sub,setSub]=useState("");
  

  useEffect(() => {
    fetch("/home")
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
  const [subscriptions, setSubscriptions] = useState({});
  
 
  const handelSubscribe=(id)=>{
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
         // subscribing blog

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


        }else{
            window.alert("login first to subscribe blog"); 
            navigate('/')
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // setLoading(false);
      });
  }
  
  const checkSub=(id)=>{

       
  }

    return(
        <>
        <Navbar/>
        <div className="content">
        <h2 className='blog'>Blog list</h2>
        {data ? (
            <>
          {data.map(user => (
            <div class="card" key={user._id}>
            <div class="card-header">{user.blogEntry.authorhandle}</div>
            <div class="card-body">
              <h5 class="card-title">{user.blogEntry.title.replace(/<\/?p>/g, '')}</h5>
              {checkSub(user.blogEntry.id)}
              <button
          id={user.blogEntry.id}
          type="button"
          className={`btn ${subscriptions[user.blogEntry.id] ? 'btn-danger' : 'btn-primary'}`}
          data-mdb-ripple-init
          onClick={() =>handelSubscribe(user.blogEntry.id)}
        >
          {subscriptions[user.blogEntry.id] ? 'Unsubscribe' : 'Subscribe'}
        </button>
              <span className="mar"></span>
              <a href={`/blogs/${user.blogEntry.id}`} class="btn btn-primary" data-mdb-ripple-init >Read more</a>
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
export default Home;
