import os
import pandas as pd
import numpy as np
from flask import Flask, jsonify, render_template
from flask.ext.sqlalchemy import sqlalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server/db'
db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True)
#     email = db.Column(db.String(120), unique=True)

#     def __init__(self, username, email)
#         self.username = username
#         self.email = email

#     def __repr__(self):
#         return '<User %r>' % self.username

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@server/db'
db = SQLAlchemy(app)

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

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

