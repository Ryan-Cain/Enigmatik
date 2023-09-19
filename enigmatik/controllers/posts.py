from enigmatik import app
from flask import render_template, redirect

@app.route('/messages')
def all_messages():
    return render_template('all_messages.html')

@app.route('/read_message')
def read_message():
    return render_template('read_message.html')