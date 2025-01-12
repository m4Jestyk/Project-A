import React, { useState, useEffect } from 'react'

const MessageUser = (props) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/v1/users/getprofilebyid", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user })
          });
          const us = await res.json();
          setUser(us);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      

      useEffect(()=>{
        fetchUser();
      }, [])


  return (
    <div>
      {props.userId}
    </div>
  )
}

export default MessageUser
