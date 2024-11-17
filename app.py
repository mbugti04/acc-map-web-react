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
        "marker_title": "Location 1",
        "marker_description": "Description for location 1",
        "vote_count": 0
    },
    {
        "id": 2,
        "latitude": 41.38,
        "longitude": -72.2,
        "marker_title": "Location 2",
        "marker_description": "Description for location 2",
        "vote_count": 0
    },
    {
        "id": 3,
        "latitude": 41.39,
        "longitude": -72.3,
        "marker_title": "Location 3",
        "marker_description": "Description for location 3",
        "vote_count": 0
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