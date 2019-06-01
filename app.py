import os
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template, request
import pymysql
from sqlalchemy import create_engine
# from flask.ext.sqlalchemy import sqlalchemy
from flask_sqlalchemy import SQLAlchemy

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server/latte_effect'
db = SQLAlchemy(app)

# engine = create_engine("mysql://username:password@server/latte_effect")
# conn = engine.connect()


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True)
#     email = db.Column(db.String(120), unique=True)

#     def __init__(self, username, email)
#         self.username = username
#         self.email = email

#     def __repr__(self):
#         return '<User %r>' % self.username

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server/db'
# db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True)
#     email = db.Column(db.String(120), unique=True)

#     def __init__(self, username, email)
#         self.username = username
#         self.email = email

#     def __repr__(self):
#         return '<User %r>' % self.username

#################################################
# Database Setup
#################################################

@app.route("/macros")
def macrosData():
	macrosStuff = pd.read_sql("SELECT * FROM `menu_items`", conn)
	macrosStuff.set_index("Item",inplace = True)

	macrosData = macrosStuff.to_dict(orient = "index")
	
	return jsonify(macrosData)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

