import React from 'react'
import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const handleFav = () => {
        navigate(`/favorites`, {
          state: {
            favorites: JSON.parse(localStorage.getItem("fav-Item")),
          },
        });
      };

    const handleBank = () => {
        navigate(`/allbank`);
      };

  return (
    <div className="sidebar">
    <div onClick={handleBank}>All Banks</div>
    <div onClick={handleFav}>Favorites</div>
  </div>
  )
}

export default SideBar