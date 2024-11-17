import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function ForumComponent({ locations }) {
  return (
    <div>
      {locations.map(location => (
        <ForumPost key={location.id} location={location} />
      ))}
    </div>
  );
}

function ForumPost({ location }) {
  const handleVote = async (id, action) => {
    try {
      await axios.post(`/locations/${id}/vote`, { action });
      // Optionally, you can update the UI or state here after the vote
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{location.marker_title}</Card.Title>
        <Card.Text>
          {location.marker_description}
        </Card.Text>
        <Card.Text>
          Votes: {location.vote_count}
        </Card.Text>
        <Button variant="primary" onClick={() => handleVote(location.id, 'increment')}>+1</Button>
        <Button variant="secondary" onClick={() => handleVote(location.id, 'decrement')}>-1</Button>
      </Card.Body>
    </Card>
  );
}

export default ForumComponent;