from washroomcatalog import lists
from washroomcatalog import app
from flask import make_response, jsonify, request
import json

@app.route('/UserList')
def userList():
    return lists.getUsers()

@app.route('/NecessityList')
def necessityList():
    return lists.getNecessities()

@app.route('/necessity/washroom/<id>')
def getWashroomDetails(id):
    responseObject = generateNecessityResponseObject(id)
    responseObject['necessity'] = lists.getWashroomDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/shower/<id>')
def getShowerDetails(id):
    responseObject = generateNecessityResponseObject(id)
    responseObject['necessity'] = lists.getShowerDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/WaterFountain/<id>')
def getWaterFountainDetails(id):
    responseObject = generateNecessityResponseObject(id)
    responseObject['necessity'] = lists.getWaterFountainDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/<id>/comments', methods=["POST"])
def postComment(id):
    data = json.loads(request.data)
    username = request.headers['username']
    date = data['date']
    comment = data['comment']
    user_id = lists.getUserIdByUsername(username)['User_id']
    lists.addComment(date, comment, user_id, id)
    return make_response(jsonify({'status': 'success'})), 200

# TODO: add building favourites, ratings, likes, and user in header
def generateNecessityResponseObject(id):
    return {
        'building' : lists.getBuildingDetails(id),
        'maintenanceCompany' : lists.getMaintenanceCompanyInfo(id),
        'comments' : lists.getComments(id),
        'services' : lists.getNecessityServices(id),
        'isLiked' : False,
        'isBuildingFavourite' : False,
        'rating' : 5
    }

def isLiked(result):
    return False

def isBuildingFavourite(result):
    return False

@app.route('/')
def main(): 
    response_object = {
        'status': 'ok'
    }
    return make_response(jsonify(response_object)), 200