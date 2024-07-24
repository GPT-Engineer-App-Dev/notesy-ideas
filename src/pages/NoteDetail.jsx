import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '', color: '#ffffff', tags: [], comments: [] });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    } else {
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      const foundNote = id === 'new' ? { id: Date.now(), title: '', content: '', color: '#ffffff', tags: [], comments: [] } : storedNotes.find(n => n.id.toString() === id);
      if (foundNote) {
        setNote(foundNote);
      } else {
        navigate('/notes');
      }
    }
  }, [id, navigate]);

  const handleSave = () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = id === 'new' 
      ? [...storedNotes, note] 
      : storedNotes.map(n => n.id.toString() === id ? note : n);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/notes');
  };

  const handleDelete = () => {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = storedNotes.filter(n => n.id.toString() !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/notes');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setNote(prevNote => ({
        ...prevNote,
        comments: [...prevNote.comments, { id: Date.now(), text: newComment }]
      }));
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <Input 
              value={note.title} 
              onChange={(e) => setNote({...note, title: e.target.value})}
              placeholder="Note Title"
              className="text-2xl font-bold"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={note.content} 
            onChange={(e) => setNote({...note, content: e.target.value})}
            placeholder="Note Content"
            className="min-h-[200px] mb-4"
          />
          <Input 
            type="color" 
            value={note.color} 
            onChange={(e) => setNote({...note, color: e.target.value})}
            className="mb-4"
          />
          <Input 
            value={note.tags.join(', ')} 
            onChange={(e) => setNote({...note, tags: e.target.value.split(',').map(tag => tag.trim())})}
            placeholder="Tags (comma-separated)"
            className="mb-4"
          />
          <div className="flex space-x-2 mb-4">
            <Button onClick={handleSave}>Save</Button>
            {id !== 'new' && <Button onClick={handleDelete} variant="destructive">Delete</Button>}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {note.comments.map(comment => (
              <p key={comment.id} className="mb-2">{comment.text}</p>
            ))}
            <div className="flex space-x-2">
              <Input 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteDetail;