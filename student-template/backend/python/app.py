from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)

DATABASE_URL = os.getenv('DATABASE_URL')

@app.route('/api/inventory/alerts', methods=['GET'])
def get_alerts():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("""
    SELECT id, product_name, quantity, reorder_level
    FROM inventory
    WHERE quantity <= reorder_level
""")
rows = cursor.fetchall()

alerts = []

for row in rows:
    alerts.append({
        "id": row[0],
        "product_name": row[1],
        "quantity": row[2],
        "reorder_level": row[3]
    })
    
cursor.close()
conn.close()
    
return jsonify(alerts), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
