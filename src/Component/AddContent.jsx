import { useNavigate } from "react-router-dom";
import { useContent } from "../Context/ContentContext"
import { useEffect, useState } from "react";
import { isNotEmpty } from "../Utils/Validations";
import { parseAst } from "vite";

function AddContent() {
  const {addContent} = useContent();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Misc');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem('contentDraft');
    if(draft){
      try{
        const {title, body, category} = JSON.parse(draft);
        setTitle(title || '');
        setBody(body || '');
        setCategory(category || '');
      }
      catch(error){
        console.log("Error in Draft", error)
      }
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDeafult();
    if(!isNotEmpty(username) || !isNotEmpty(password)) {
      setError('Please fill title and body for Article');
      return;
    }
    const newContent = {
      id: Date.now(),
      title, 
      body, 
      category, 
      date: new Date().toISOString()
    }

    addContent(newContent);
    setTitle('');
    setBody('');
    setCategory('Misc');
    setError('');
    localStorage.remove('contentDraft');
    navigate('/view');

  }

  return (
    <div>
     
    </div>
  )
}

export default AddContent