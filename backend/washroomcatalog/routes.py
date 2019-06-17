import datetime
import json

from dateutil import parser
from flask import jsonify, make_response, request
from flask_cors import cross_origin
from washroomcatalog import app, lists


@app.route('/UserList')
def getUserList():
    return make_response(jsonify(lists.getUsers()))

@app.route('/NecessityList', methods=['GET'])
def getNecessityList():
    options = {
        'id': request.args.get('id'),
        'status': request.args.get('status'),
        'type': request.args.get('type')
    }
    return make_response(jsonify(lists.getNecessities(options)))

@app.route('/NecessityType/<id>')
def getNecessityType(id):
    if (len(lists.getWashroomDetails(id)) > 0):
        return 'washroom'
    elif (len(lists.getShowerDetails(id)) > 0):
        return 'shower'
    elif (len(lists.getWaterFountainDetails(id)) > 0):
        return 'WaterFountain'

@app.route('/necessity/washroom/<id>', methods=["GET", "OPTIONS"])
@cross_origin()
def getWashroomDetails(id):
    user_id = getUserId(request.headers['username'])
    # user_id = 1
    responseObject = generateNecessityResponseObject(user_id, id)
    responseObject['necessity'] = lists.getWashroomDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/shower/<id>', methods=["GET", "OPTIONS"])
@cross_origin()
def getShowerDetails(id):
    # user_id = getUserId(request.headers['username'])
    user_id = 1
    responseObject = generateNecessityResponseObject(user_id, id)
    responseObject['necessity'] = lists.getShowerDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/WaterFountain/<id>', methods=["GET", "OPTIONS"])
@cross_origin()
def getWaterFountainDetails(id):
    # user_id = getUserId(request.headers['username'])
    user_id = 1
    responseObject = generateNecessityResponseObject(user_id, id)
    responseObject['necessity'] = lists.getWaterFountainDetails(id)
    return make_response(jsonify(responseObject))

@app.route('/necessity/<id>/comments', methods=["POST", "OPTIONS"])
@cross_origin()
def postComment(id):
    data = json.loads(request.data)
    user_id = getUserId(request.headers['username'])
    date = formatDate(data['date'])
    comment = data['comment']
    lists.addComment(date,  comment, user_id, id)
    response = make_response(jsonify({'status': 'success'}))
    return response

@app.route('/necessity/<id>/incidentreport', methods=["POST", "OPTIONS"])
@cross_origin()
def postIncidentReport(id):
    print(str(id))
    data = json.loads(request.data)
    user_id = getUserId(request.headers['username'])
    date = formatDate(data['date'])
    severity = data['severity']
    subject = data['subject']
    content = data['content']
    lists.addIncidentReport(subject, content, date, severity, user_id, id)
    response = make_response(jsonify({'status': 'success'}))
    return response

# TODO: add building favourites, ratings, likes, and user in header
def generateNecessityResponseObject(user_id, necessity_id):
    return {
        'building' : lists.getBuildingDetails(necessity_id),
        'maintenanceCompany' : lists.getMaintenanceCompanyInfo(necessity_id),
        'comments' : lists.getComments(necessity_id),
        'services' : lists.getNecessityServices(necessity_id),
        'isLiked' : isLiked(lists.findUserLike( user_id, necessity_id)),
        'isBuildingFavourite' : False,
        'rating' : 5
    }

def getUserId(username):
    return lists.getUserIdByUsername(username)['User_id']

def formatDate(date):
    dt = parser.parse(date).strftime("%Y-%m-%d %H:%M:%S")
    return dt

def isLiked(result):
    return False

def isBuildingFavourite(result):
    return not result

@app.route('/')
def main():
    response_object = {
        'status': 'ok'
    }
    return make_response(jsonify(response_object)), 200
