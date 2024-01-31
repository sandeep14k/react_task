import React from "react";
import './home.css'
import { useLocation } from 'react-router-dom';
import userData from './data.json';
import { Link } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const name = location.state?.username || '';
    return(
        <>
        <div className="header">
        <h2>Welcome  {name}</h2>
        </div>
        <div className="content">
        <h2>Blog list</h2>
        {userData ? (
            <>
          {userData.map(user => (
           <div className="blog-preview" key={user.blog_id}>
           <Link to={`/blogs/${user.blog_id}`}>
           <h2>{user.blog_title}</h2>
           <p>{user.author}</p>
           </Link>
           </div>
          ))}
          </>
      ) : (
        <p>Loading...</p>
      )}
        </div>
        </>
    );
}
export default Home;