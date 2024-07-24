import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    } else {
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(storedNotes);
    }
  }, [navigate]);

  const handleCreateNote = () => {
    navigate('/note/new');
  };

  const handleNoteClick = (id) => {
    navigate(`/note/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Button onClick={handleCreateNote}>
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card 
            key={note.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            style={{ backgroundColor: note.color }}
            onClick={() => handleNoteClick(note.id)}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{note.content.substring(0, 100)}...</p>
              <div className="mt-2">
                {note.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;