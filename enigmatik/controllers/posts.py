from enigmatik import app
from flask import render_template, redirect, request

@app.route('/messages')
def all_messages():
    return render_template('all_messages.html')

@app.route('/read_message')
def read_message():
    return render_template('read_message.html')

@app.route('/create_message')
def create_message():
    return render_template('create_message.html')

@app.route('/submit_message', methods=['POST'])
def submit_message():
    print(request.form)
    return redirect('/profiles')