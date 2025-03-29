import mysql.connector
from flask import Flask, request, jsonify

app = Flask(__name__)

# Connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",       
    user="root",   
    password="Max051*#",  
    database="lapet"   
)
cursor = db.cursor(dictionary=True)  # Use dictionary=True to get results as dictionaries

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the user exists and is verified
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()

    if user:
        is_verified = user['is_verified']  # Access 'is_verified' as a dictionary key
        if not is_verified:
            return jsonify({"error": "Please verify your email before logging in"}), 403
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)