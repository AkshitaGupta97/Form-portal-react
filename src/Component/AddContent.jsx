import { useNavigate } from "react-router-dom";
import { useContent } from "../Context/ContentContext";
import { useEffect, useState } from "react";
import { isNotEmpty } from "../Utils/Validations";

function AddContent() {
  const { addContent } = useContent();
  const navigate = useNavigate();

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
      date: new Date().toISOString()
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
    <div className="panel">
      <h2>Add Content</h2>
      <form onSubmit={handleSubmit} className="content-form">

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
          <select id="category" value={category} 
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
            <h4>{title || 'Title'}</h4>
            <p>{body || 'Contente Preview'}</p>
            <small><b>Category : </b>{category} </small>
          </div>
        )
      }

    </div>
  );
}

export default AddContent;
