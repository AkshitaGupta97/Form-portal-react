import { useNavigate } from "react-router-dom";
import { useContent } from "../Context/ContentContext";
import { useEffect, useState } from "react";
import { isNotEmpty } from "../Utils/Validations";
import { useAuth } from "../Context/AuthContext";

function AddContent() {
  const { addContent } = useContent();
  const navigate = useNavigate();

  const {user} = useAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Misc');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem('contentDraft');
    if (draft) {
      try {
        const { title, body, category } = JSON.parse(draft);
        setTitle(title || '');
        setBody(body || '');
        setCategory(category || '');
      } catch (error) {
        console.log("Error in Draft", error);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmpty(title) || !isNotEmpty(body)) {
      setError('Please fill title and body for Article');
      return;
    }

    const newContent = {
      id: Date.now(),
      title,
      body,
      category,
      date: new Date().toISOString(),
      author: user.username
    };

    addContent(newContent);
    setTitle('');
    setBody('');
    setCategory('Misc');
    setError('');
    localStorage.removeItem('contentDraft');
    navigate('/view');
  };

  return (
    <div className="add-content">
      <h2>Add Content</h2>
      <form onSubmit={handleSubmit} className=" content-form">

        <div className="form-group">
         <label htmlFor="title">Title : </label>
          <input type="text" id="title" placeholder="Enter title" 
            value={title} onChange={(e) => setTitle(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content : </label>
          <textarea type="text" id="body" placeholder="Enter content" 
            value={body} onChange={(e) => setBody(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category : </label>
          <select id="category" value={category} className="select-category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='News'>News</option>
            <option value='Blog'>Blog</option>
            <option value='Tutoial'>Tutorial</option>
            <option value='Misc'>Misc</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox"
             checked={showPreview} onChange={() => setShowPreview((prev => !prev))} 
            />
            Show Preview
          </label>
        </div>

        {
          error && <div className="error">{error}</div>
        }
        <button type="submit" className="btn">Add Content</button>

      </form>
      
      {
        showPreview && (
          <div className="preview">
            <h3>Preview</h3>
            <h4><b>Title : </b>{title || 'Title'}</h4>
            <p><b>Content : </b>{body || 'Content Preview'}</p>
            <p><b>Category : </b>{category}</p>
          </div>
        )
      }

    </div>
  );
}

export default AddContent;
