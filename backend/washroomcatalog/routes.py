from washroomcatalog import lists
from washroomcatalog import app
from flask import make_response, jsonify

@app.route('/UserList')
def userList():
    return lists.getUsers()


@app.route('/NecessityList')
def necessityList():
    return lists.getNecessities()

@app.route('/necessity/washroom/<id>')
def getWashroomDetails(id):
    return "Not Implemented"

@app.route('/necessity/shower/<id>')
def getShowerDetails(id):
    return "not Implemented"

@app.route('/necessity/WaterFountain/<id>')
def getWaterFountainDetails(id):
    return "not Implemented"

@app.route('/necessity/<id>/comments/')
def getComments(id):
    return make_response(jsonify(lists.getComments(id))), 200

@app.route('/')
def main(): 
    response_object = {
        'status': 'ok'
    }
    return make_response(jsonify(response_object)), 200