import datetime
import json

from flask import jsonify, make_response
from washroomcatalog import mysql


def getUsers():
    return findAll('SELECT * FROM User')

def getNecessities(options):
    query = 'SELECT * FROM Necessity'
    queryOptions = []

    if options['id'] != None:
        queryOption = ''
        nids = options['id'].split(',')

        for nid in nids:
            queryOption += ' Necessity_id = ' + str(nid)
            if (nids.index(nid) < len(nids) - 1):
                queryOption += ' OR '
        queryOptions.append(queryOption)

    if options['status'] != None:
        queryOption = ''
        statuses = options['status'].split(',')

        for status in statuses:
            queryOption += ' Status = \'' + str(status) + '\''
            if (statuses.index(status) < len(statuses) - 1):
                queryOption += ' OR '
        queryOptions.append(queryOption)

    if options['type'] != None:
        queryOption = ''
        types = options['type'].split(',')

        for ntype in types:
            queryOption += 'Necessity_id IN (SELECT Necessity_id FROM ' + str(ntype) + ')'
            if (types.index(ntype) < len(types) - 1):
                queryOption += ' OR '
        queryOptions.append(queryOption)

    if len(queryOptions) > 0:
        query += ' WHERE '
        for queryOption in queryOptions:
            query += '(' + queryOption + ')'
            if (queryOptions.index(queryOption) < len(queryOptions) - 1):
                query += ' AND '

    return findAll(query)

def getComments(necessity_id):
    return findAll("""
    SELECT *
    FROM User u, Comment c
    WHERE u.User_id = c.User_id
    AND Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getBuildingDetails(necessity_id):
    return findOne("""
    SELECT *
    from Building b, PostalCode po, Necessity n, Favourite f
    where b.Postal_code = po.Postal_code
    AND f.Building_id = b.Building_id
    AND n.Building_id = b.Building_id
    AND n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getFavouriteBuilding(user_id, necessity_id):
    return findOne("""
    SELECT TOP *
    from Necessity n, Favourite f
    WHERE n.Necessity_id = {necessity_id}
    AND n.Building_id = f.Building_id
    AND f.user_id =  {user_id}
    """.format(necessity_id=necessity_id, user_id=user_id))

def getMaintenanceCompanyInfo(necessity_id):
    return findOne("""
    SELECT *
    from MaintainenceCompany m, MaintainedBy mb
    WHERE m.Company_id = mb.Company_id
    AND mb.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getWashroomDetails(necessity_id):
    return findOne("""
    SELECT *
    from Necessity n, Washroom w
    Where n.Necessity_id=w.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getWaterFountainDetails(necessity_id):
    return findOne("""
    Select *
    from Necessity n, WaterFountain w
    where n.Necessity_id = w.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getShowerDetails(necessity_id):
    return findOne("""
    Select *
    from Necessity n, Shower s
    where n.Necessity_id = s.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def getNecessityServices(necessity_id):
    return findAll("""
    select *
    from Service s, Necessity n
    where n.Necessity_id = s.Necessity_id
    and n.Necessity_id = {necessity_id}
    """.format(necessity_id=necessity_id))

def addComment(date, comment, user_id, necessity_id):
    return insert("""
    INSERT INTO
    Comment ( Date, Comment, User_id, Necessity_id)
    VALUES
    ('{date}', '{comment}', {user_id}, {necessity_id})
    """.format(
        date=date,
        comment=comment,
        user_id=user_id,
        necessity_id=necessity_id))

def addIncidentReport(subject, text, date, severity, user_id, necessity_id):
    return insert("""
    INSERT INTO
    Incident (Subject, Report_text, Date, Severity, User_id, Necessity_id)
    VALUES
  ('{subject}', '{text}', '{date}', {severity}, {user_id}, {necessity_id})
    """.format(subject=subject, text=text, date=date, severity=severity, user_id=user_id, necessity_id=necessity_id))

def getUserIdByUsername(username):
    return findOne("""
    Select *
    from User u
    Where u.Username = '{username}'
    """.format(username=username))

def insert(query):
    connection = mysql.connect()
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()

def findOne(query):
    connection = mysql.connect()
    cursor = connection.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    if result is None:
        result = {}
    cursor.close()
    connection.close()
    return result

def findAll(query):
    connection = mysql.connect()
    cursor = connection.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result
