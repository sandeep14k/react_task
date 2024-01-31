import { useParams } from "react-router-dom";
import userData from './data.json';
import React, { useState, useEffect } from 'react';
const Blogdetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
  
    useEffect(() => {

      const targetBlogId = parseInt(id, 10);
  
      const filteredUser = userData.find(user => user.blog_id === targetBlogId);
      setUser(filteredUser || null);
    }, [id]);
return(
    <div className="blog_detail">
   {user ? (
        <div className="detail" key={user.blog_id}>
            <h2>Author : {user.author}</h2>
            <p>Blog title : {user.blog_title}</p>
            <p>Commentator : {user.commentator}</p>
            <p>Comment text : {user.comment_text}</p>
        </div>
      ) : (
        <p>User not found...</p>
      )}
    </div>
);
}
export default Blogdetail;