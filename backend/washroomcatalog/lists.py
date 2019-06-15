import json
from flask import jsonify
from washroomcatalog import mysql
import datetime

def getObjects(table, attributes):
    connect = mysql.connect()
    cursor = connect.cursor()
    cursor.execute('SELECT ' + ', '.join(attributes) + ' FROM ' + table)
    result = []

    for row in cursor:
        rowObject = {}
        for attribute, data in zip(attributes, row):
            rowObject[attribute] = data
        result.append(rowObject)

    cursor.close()
    connect.close()
    return json.dumps(result)


def getUsers():
    return getObjects('User', ['User_id', 'Username', 'Password'])


def getNecessities():
    return getObjects('Necessity', ['Necessity_id', 'Status', 'Building_id'])

def getComments(necessity_id):
    return execute("""
    SELECT Username, Comment 
    FROM User u, Comment c 
    WHERE u.User_id = c.User_id 
    AND Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getBuildingDetails(necessity_id):
    return execute("""
    SELECT * 
    from Building b, PostalCode po, Necessity n, Favourite f
    where b.Postal_code = po.Postal_code
    AND f.Building_id = b.Building_id
    AND n.Building_id = b.Building_id
    AND n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getFavouriteBuilding(user_id, necessity_id):
    return execute("""
    SELECT *
    from Necessity n, Favourite f
    WHERE n.Necessity_id = {necessity_id}
    AND n.Building_id = f.Building_id
    AND f.user_id =  {user_id}
    """.format(necessity_id=necessity_id, user_id=user_id))

def getMaintenanceCompanyInfo(necessity_id):
    return execute("""
    SELECT * 
    from MaintainenceCompany m, MaintainedBy mb
    WHERE m.Company_id = mb.Company_id
    AND mb.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getWashroomDetails(necessity_id):
    return execute("""
    SELECT * 
    from Necessity n, Washroom w
    Where n.Necessity_id=w.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getWaterFountainDetails(necessity_id):
    return execute("""
    Select * 
    from Necessity n, WaterFountain w
    where n.Necessity_id = w.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getShowerDetails(necessity_id):
    return execute("""
    Select * 
    from Necessity n, Shower s
    where n.Necessity_id = s.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def execute(query):
    connection = mysql.connect()
    cursor = connection.cursor()
    cursor.execute(query)   
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result


