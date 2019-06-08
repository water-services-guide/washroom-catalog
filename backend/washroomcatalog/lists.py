import json

from washroomcatalog import mysql


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
