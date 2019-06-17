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
        'status': request.args.get('status')
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

@app.route('/necessity/<id>/comments', methods=["POST", "OPTIONS"])
@cross_origin()
def postComment(id):
    data = json.loads(request.data)
    username = request.headers['username']
    date = formatDate(data['date'])
    comment = data['comment']
    user_id = lists.getUserIdByUsername(username)['User_id']
    lists.addComment(date,  comment, user_id, id)
    response = make_response(jsonify({'status': 'success'}))
    return response

@app.route('/necessity/<id>/incidentreport', methods=["POST", "OPTIONS"])
@cross_origin()
def postIncidentReport(id):
    print(str(id))
    data = json.loads(request.data)
    username = request.headers['username']
    date = formatDate(data['date'])
    severity = data['severity']
    subject = data['subject']
    content = data['content']
    user_id = lists.getUserIdByUsername(username)['User_id']
    lists.addIncidentReport(subject, content, date, severity, user_id, id)
    response = make_response(jsonify({'status': 'success'}))
    return response

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
