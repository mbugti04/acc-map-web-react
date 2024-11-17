# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

locations = [
    {
        "id": 1,
        "latitude": 41.37937613418269,
        "longitude": -72.10613281840935,
        "marker_title": "Cro Blvd, Connecticut College",
        "marker_description": "Construction on Cro Blvd for Pedestrain Project. Recommended Route: Going through Resevoir Street or passing through Central Campus Houses (Plant, Brandford, Smith, and Burdick)",
        "vote_count": 32,
        "image_path": "src/assets/croblvd.png",
        "comments": ["How long will the construction last?", "I think the construction is a good idea."],
    },
    {
        "id": 2,
        "latitude": 41.351505585433806, 
        "longitude": -72.09735330096298,
        "marker_title": "Corner of Tilly & Bank St.",
        "marker_description": "Pedestrian Signal with lack of WAIT Locator Tone",
        "vote_count": 18,
        "image_path": "src/assets/pedestrian.jpg",
        "comments": []
    },
    {
        "id": 3,
        "latitude": 41.382631314999664,
        "longitude": -72.10870974508146,
        "marker_title": "No Sidewalk by Johnson House",
        "marker_description": "There is no sidewalk to get to Johnson House. Recommended route: through the inside of the Plex building.",
        "vote_count": 0,
        "image_path": 'src/assets/johnson.png',
        "comments": []
    }
]

@app.route('/locations')
def location():
    return jsonify(locations)

@app.route('/locations', methods=['POST'])
def add_location():
    new_location = request.get_json()
    new_location['id'] = locations[-1]['id'] + 1 if locations else 1
    new_location['vote_count'] = 0
    new_location['comments'] = []
    locations.append(new_location)
    return jsonify(new_location), 201

@app.route('/locations/<int:id>')
def location_by_id(id):
    for location in locations:
        if location['id'] == id:
            return jsonify(location)
    return jsonify({"message": "Location not found."})

@app.route('/locations/<int:id>/vote', methods=['POST'])
def vote_location(id):
    data = request.get_json()
    for location in locations:
        if location['id'] == id:
            print("location found")
            if data.get('action') == 'increment':
                location['vote_count'] += 1
            elif data.get('action') == 'decrement':
                location['vote_count'] -= 1
            return jsonify(location)
    return jsonify({"message": "Location not found."}), 404

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')