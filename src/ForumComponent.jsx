import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { useState } from 'react';

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
  const [voteCount, setVoteCount] = useState(location.vote_count);

  const handleVote = async (id, action) => {
    try {
      await axios.post(`http://129.133.74.40:5001/locations/${id}/vote`, { action });
      setVoteCount(prevCount => action === 'increment' ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={location.image_path || "holder.js/100px180"} />
      <Card.Body>
        <Card.Title>{location.marker_title}</Card.Title>
        <Card.Text>
          {location.marker_description}
        </Card.Text>
        <Card.Text>
          Votes: {voteCount}
        </Card.Text>
        <Button variant="primary" onClick={() => handleVote(location.id, 'increment')}>+1</Button>
        <Button variant="secondary" onClick={() => handleVote(location.id, 'decrement')}>-1</Button>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Comments ({location.comments.length})</Accordion.Header>
            <Accordion.Body>
              {location.comments.length > 0 ? (
                location.comments.map((comment, index) => (
                  <p key={index}>{comment}</p>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default ForumComponent;