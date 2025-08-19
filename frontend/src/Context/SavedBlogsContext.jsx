import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const SavedBlogsContext = createContext({
  savedBlogsList: [],
  setSavedBlogsList: () => {}
});

export const SavedBlogsProvider = ({ children }) => {
  const { user } = useUser();
  const [savedBlogsList, setSavedBlogsList] = useState([]);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      if (!user?.savedBlogs?.length) return;

      try {
        const res = await axios.post("http://localhost:3000/getSavedBlogs", {
          ids: user.savedBlogs
        }, {
          headers: { authorization: localStorage.getItem("token") }
        });
        setSavedBlogsList(res.data.blogs);
      } catch (err) {
        console.error("Error fetching saved blogs:", err);
      }
    };

    fetchSavedBlogs();
  }, [user?.savedBlogs]);

  return (
    <SavedBlogsContext.Provider value={{ savedBlogsList, setSavedBlogsList }}>
      {children}
    </SavedBlogsContext.Provider>
  );
};

export const useSavedBlogs = () => useContext(SavedBlogsContext);
