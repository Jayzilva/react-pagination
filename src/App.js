import React, {useState, useEffect} from "react";
import axios from "axios";
import Posts from "./components/posts";
import Pagination from "./components/pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] =  useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(()=>{
    const fetchPosts =async ()=>{
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  //Get current post
  const indexOfLastPost = currentPage *postPerPage;
  const indexOfFirstPost = indexOfLastPost -postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <>
    <div className="App">
      <Posts posts={currentPost} loading={loading}/>
    </div>
    <div>
      <Pagination postPerPage={postPerPage} totzlPosts={posts.length} paginate={paginate}/>
      
    </div>
    </>

  );
}

export default App;
