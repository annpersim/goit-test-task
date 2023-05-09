import { useState, useEffect } from "react";
import css from "./UserCard.module.css";
import cover from "../img/cover.png";
import logo from "../img/logo.png";
import { fetchUsers } from "../services/api";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(
    localStorage.getItem("visibleUsers") || 3
  );
  const [isFollowed, setIsFollowed] = useState(
    JSON.parse(localStorage.getItem("isFollowed")) || {}
  );

  useEffect(() => {
    async function fetchData() {
      const responce = await fetchUsers();
      setUsers(() => {
        return [...responce];
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("visibleUsers", visibleUsers);
    localStorage.setItem("isFollowed", JSON.stringify(isFollowed));
  }, [visibleUsers, isFollowed]);

  const handleFollowClick = (userId) => {
    const following = isFollowed[userId];
    setIsFollowed((prevState) => ({
      ...prevState,
      [userId]: !following,
    }));
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            followers: following ? user.followers - 1 : user.followers + 1,
          };
        }
        return user;
      })
    );
  };

  const handleLoadMoreClick = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 3);
  };

  return (
    <>
      {users.slice(0, visibleUsers).map((user) => {
        return (
          <div className={css.card} key={user.id}>
            <div key={user.id} className={css.layout}>
              <img src={logo} className={css.logo} alt="logo" />
              <img src={cover} alt="card cover" className={css.cover} />
              <div className={css.divider}>
                <div>
                  <img
                    src={user.avatar}
                    alt={user.user}
                    className={css.avatar}
                  />
                </div>
              </div>
              <div className={css.data}>
                <p>{`${user.tweets} TWEETS`}</p>
                <p>{`${user.followers.toLocaleString("en-US")} FOLLOWERS`}</p>
              </div>
              <button
                type="button"
                className={isFollowed[user.id] ? css.followed : css.button}
                onClick={() => handleFollowClick(user.id)}
              >
                {isFollowed[user.id] ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        );
      })}
      {users.length > visibleUsers && (
        <button
          type="button"
          className={css.loadmore}
          onClick={handleLoadMoreClick}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default UserCard;
