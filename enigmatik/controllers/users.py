from enigmatik import app
from flask import render_template, redirect, request, session, flash
from enigmatik.models.user import User

from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


# Routes to register/ login and out
@app.route('/')
def reg_login():
    return render_template('login_reg.html')

@app.route('/submit_registration', methods=["POST"])
def submit_registration():
    print(request.form)
    if not User.validated(request.form):
        return redirect('/')
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    userInfo = {
        **request.form,
        'password': pw_hash
    }
    user_id = User.register_user(userInfo)
    
    session['user_id'] = user_id
    session['first_name'] = request.form['first_name']

    return redirect('/messages')

@app.route('/submit_login', methods=["POST"])
def submit_login():
    print(request.form)
    user = User.user_exists(request.form['email'])
    if not user:
        flash('Invalid Email/Password', 'login')
        return redirect('/')
    if not bcrypt.check_password_hash(user.password, request.form['password']):
        flash('Invalid Email/Password', 'login')
        return redirect('/')
    
    session['user_id'] = user.id
    print('session id is ', session['user_id'])
    session['first_name'] = user.first_name
    return redirect('/messages')


@app.route('/logged_in')
def logged_in():
    if 'user_id' not in session:
        return redirect('/')
    return render_template('logged_in.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')


# profile routes
@app.route('/profiles')
def user_profile():
    # return render_template('profiles.html', user_posts=user_posts)
    return render_template('profiles.html')