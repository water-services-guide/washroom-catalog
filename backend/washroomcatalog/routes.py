import datetime
import json

from dateutil import parser
from flask import jsonify, make_response, request
from flask_cors import cross_origin
from washroomcatalog import app, lists


#what should we on cascade delete
@app.route('/UserList')
def getUserList():
    return make_response(jsonify(lists.getUsers()))

@app.route('/NecessityList', methods=['GET'])
def getNecessityList():
    options = {
        'id': request.args.get('id'),
        'status': request.args.get('status'),
        'type': request.args.get('type'),
        'sex': request.args.get('sex'),
        'fields': request.args.get('fields')
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


@app.route('/necessity/<necessity_id>/like', methods=["POST", "OPTIONS"])
@cross_origin()
def toggleUserLike(necessity_id):
    user_id = getUserId(request.headers['username'])
    like = 'liked'
    il = isLiked(lists.findUserLike(user_id, necessity_id))
    if il:
        lists.removeUserLike(user_id, necessity_id)
        like = 'unliked'
    else:
        lists.addUserLike(user_id, necessity_id)
        like = 'liked'
    response = make_response(jsonify({'status': like}))
    return make_response(jsonify(lists.findUserLike(user_id, necessity_id)))

@app.route('/necessity/<necessity_id>/favouritebuilding', methods=["POST", "OPTIONS"])
@cross_origin()
def toggleFavouriteBuilding(necessity_id):
    user_id = getUserId(request.headers['username'])
    fb = lists.findFavouriteBuilding(user_id, necessity_id)
    if isBuildingFavourite(fb):
        building_id = fb['Building_id']
        lists.removeFavouriteBuilding(user_id, building_id)
    else:
        building_id = lists.getBuildingDetails(necessity_id)['Building_id']
        lists.addFavouriteBuilding(user_id, building_id)
    response = make_response(jsonify(lists.findFavouriteBuilding(user_id, necessity_id)))
    return response


@app.route('/necessity/<necessity_id>/rating', methods=["POST", "OPTIONS"])
@cross_origin()
def rating(necessity_id):
    data = json.loads(request.data)
    date = formatDate(data['date'])
    rating = data['rating']
    user_id = getUserId(request.headers['username'])
    userRating = lists.getUserRating(user_id, necessity_id)
    if ratingExists(userRating):
        lists.updateRating(date, rating, user_id, necessity_id)
    else:
        lists.addRating(date, rating, user_id, necessity_id)
    return make_response(jsonify(lists.getUserRating(user_id, necessity_id)))


@app.route('/favouriteBuildings')
@cross_origin()
def getFavouriteBuildings():
    # user_id = getUserId(request.headers['username'])
    user_id = 5
    return make_response(jsonify(lists.getFavouriteBuildings(user_id)))

@app.route('/necessitiesLikedByAllUsers')
def getNecessitiesLikedByAllUsers():
    return make_response(jsonify(lists.getNecessitiesLikedByAllUsers()))

# TODO: add building favourites, ratings, likes, and user in header
def generateNecessityResponseObject(user_id, necessity_id):
    return {
        'building' : lists.getBuildingDetails(necessity_id),
        'maintenanceCompany' : lists.getMaintenanceCompanyInfo(necessity_id),
        'comments' : lists.getComments(necessity_id),
        'services' : lists.getNecessityServices(necessity_id),
        'isLiked' : isLiked(lists.findUserLike( user_id, necessity_id)),
        'isBuildingFavourite' : isBuildingFavourite(lists.findFavouriteBuilding(user_id, necessity_id)),
        'rating' : getRatingIfExists(lists.getUserRating(user_id, necessity_id)),
        'avgRating' : lists.getAvgRating(necessity_id)['avg']
    }

def getUserId(username):
    return lists.getUserIdByUsername(username)['User_id']

def formatDate(date):
    dt = parser.parse(date).strftime("%Y-%m-%d %H:%M:%S")
    return dt

def isLiked(result):
    return not not result

def isBuildingFavourite(result):
    return not not result

def getRatingIfExists(result):
    if not result:
        return 0
    else:
        return result['Rating']

def ratingExists(result):
    return not not result


# admin routes


@app.route('/deleteuser/<id>', methods=["POST", "OPTIONS"])
@cross_origin()   
def deleteUser(id):
    lists.deleteUser(id)
    return make_response(jsonify({'status': 'deleted'}))

@app.route('/necessity/<id>/status', methods=["POST", "OPTIONS"])
@cross_origin()   
def updateNecessityStatus(id):
    data = json.loads(request.data)
    status = data['status']
    lists.updateNecessityStatus(id, status)
    return make_response(jsonify({'status': 'updated'}))


@app.route('/necessity/<attribute>', methods=["GET", "OPTIONS"])
@cross_origin()   
def projectNecessityAttribute(attribute):
    result = lists.projectNecessity(attribute)
    return make_response(jsonify(result))


@app.route('/avgRatings', methods=["GET", "OPTIONS"])
@cross_origin()   
def aggregateRatingsByUser():
    result = lists.getAvgRatingByAllUsers()
    return make_response(jsonify(result))

@app.route('/necessity/join', methods=["POST", "OPTIONS"])
@cross_origin()   
def join():
    data = json.loads(request.data)
    table = data['table']
    join_statement = "n.Necessity_id = "
    if (table == "Rating"):
        join_statement += "Rating.Necessity_id"
    elif (table == "UserLike"):
        join_statement += "UserLike.Necessity_id"
    elif (table == "Service"):
        join_statement += "Service.Necessity_id"
    else:
        return make_response(jsonify({'status':"nope"}))
    result = lists.joinNecessity(table, join_statement)
    return make_response(jsonify(result))

    
    

@app.route('/')
def main():
    response_object = {
        'status': 'ok'
    }
    return make_response(jsonify(response_object)), 200
