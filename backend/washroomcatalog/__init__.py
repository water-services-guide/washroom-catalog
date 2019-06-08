from washroomcatalog.config import configure
from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()
configure(app)
mysql.init_app(app)

from washroomcatalog import routes