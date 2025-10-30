import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import {isNotEmpty} from '../Utils/Validations'
import { Link } from "react-router-dom";
import { useContent } from "../Context/ContentContext";

function ViewContent() {

  const {data, deleteContent, addComments} = useContent();

  const {user} = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Newest');
  const [commentInput, setCommentInput] = useState({});

  const handleDelete = (id) => {  // window.confirm(), return two value either true or false.
    if(window.confirm('Are you sure you want to delete this content ?')){
      deleteContent(id)
    }
  }

  const handleCommentChange = (contentId, value) => {
    setCommentInput((prev) => ({...prev, [contentId]: value}))
  }

  const handleCommentSubmit = (e, commentId) => {
    e.preventDefault();
    const commentText = commentInput[commentId];
    if(!isNotEmpty(commentText)) return;  // it means if commentText is empty, just return.
    const newComment ={
      id: Date.now(),
      author: user.username,
      text: commentText,
      date: new Date().toISOString()
    }
    addComments(commentId, newComment);
    setCommentInput((prev) => ({...prev, [commentId]: ''}))
  }

  const filteredContent = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory
  }).sort((a,b) => {
    switch(sortOption){
      case 'Newest': return new Date(b.date) - new Date(a.date);
      case 'Oldest': return new Date(a.date) - new Date(b.date);
      case 'Title A-Z': return a.title.localeCompare(b.title);
      case 'Title Z-A': return b.title.localeCompare(a.title);
      default: return 0;
    }
  })

  return (
    <div className="panel">
      <h2>View Content</h2>
      <div className="controls">
        <div className="search-bar">
          <input type="text" placeholder="Search by Title" 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-sort">
          <label>
            Filter by Category :
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="News">News</option>
              <option value="Blog">Blog</option>
              <option value="Tutorial">Tutorials</option>
              <option value="Misc">Misc</option>
            </select>
          </label>

          <label>
            Sort by Category :
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Title A-Z">Title A-Z</option>
              <option value="Title Z-A">Title Z-A</option>
              <option value="Misc">Misc</option>
            </select>
          </label>

        </div>
      </div>

      {
        filteredContent.length === 0 ? ( <h3>No Content available.</h3> ) :
        <ul className="content-list">
          {
            filteredContent.map((item) => (
              <li key={item.id} className="content-item" >
                <div className="content-header">
                  <div>
                    <h3>{item.title}</h3>
                    <small><b>Category : </b>{item.category} | <i>{item.author}</i> </small>
                  </div>
                  {  (item.author === user.username) &&

                    <div className="content-actions">
                      <Link to={`/edit/${item.id}`} className="btn-edit">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="btn-delete">
                        Delete
                      </button>
                    </div>
                  }
                </div>
                <p>{item.body}</p>
                <small>{new Date(item.date).toLocaleString()}</small>
                <div className="comments-section">
                  <h4>Comments</h4>
                  {item.comment && item.comments.length > 0 ? (
                    <ul className="comments-list">
                      {
                        item.comments.map((comment) => (
                          <li key={comment.id} className="comment-item">
                            <p>
                              <strong>{comment.author}</strong>
                            </p>
                            <small>{new Date(comment.date).toLocaleString()}</small>
                          </li>
                        ))
                      }                     
                    </ul>
                  ):
                    (
                      <h2>No Comments yet.</h2>
                    )
                  }

                  { (item.author === user.username) &&
                    <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, item.id)} >
                    <input type="text" placeholder="Add a comment..."
                      value={commentInput[item.id] ? commentInput[item.id] : '' }
                      onChange={(e) => handleCommentChange(item.id, e.target.value)} 
                    />
                    <button type="submit" className="btn">
                      Comment
                    </button>
                    </form>
                  }

                </div>
              </li>
            ))
          }
        </ul>
      }

    </div>
  )
}

export default ViewContent