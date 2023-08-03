import mysql.connector

host = 'fern08999.mysql.pythonanywhere-services.com'
username = 'fern08999'
password = 'Fer@12345678'
database = 'fern08999$wdoinstitution'
port = 3306

connection = mysql.connector.connect(
    host=host,
    user=username,
    password=password,
    database=database,
    port=port
)
if connection.is_connected():
    print('Connected to MySQL database')
else:
    print('Connect to MySQL database has been failed')