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

@app.route('/verify', methods=['GET'])
def verify_email():
    token = request.args.get('token')

    if not token:
        return jsonify({"error": "Invalid or missing token"}), 400

    # Check if the token exists in the database
    cursor.execute("SELECT * FROM users WHERE verification_token = %s", (token,))
    user = cursor.fetchone()

    if user:
        # Update the user's verification status
        cursor.execute("UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = %s", (token,))
        db.commit()
        return jsonify({"message": "Email verified successfully!"}), 200
    else:
        return jsonify({"error": "Invalid or expired token"}), 400

if __name__ == '__main__':
    app.run(debug=True)