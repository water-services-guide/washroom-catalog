import washroomcatalog.lists
from washroomcatalog import app

@app.route('/UserList')
def userList():
    return lists.getUsers()


@app.route('/NecessityList')
def necessityList():
    return lists.getNecessities()


@app.route('/')
def main():
    return 'Welcome to Washroom Catalog'
