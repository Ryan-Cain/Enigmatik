from enigmatik import app
from flask import render_template, redirect, request, session
from enigmatik.models.post import Post

@app.route('/messages')
def all_messages():
    posts = Post.get_all_posts()
    return render_template('all_messages.html', posts=posts)

@app.route('/read_message/<int:id>')
def read_message(id):
    post = Post.get_one_post(id)
    return render_template('read_message.html', post=post)

@app.route('/decrypt_message', methods=["POST"])
def decrypt_message():
    print(request.form)
    post = Post.get_one_post(request.form['post_id'])
    decrypted = Post.decrypt_message(request.form)
    print(post)
    print(decrypted)
    # redirect_url = '/read_message/' + request.form['post_id']
    # return redirect(redirect_url)
    return render_template('read_message.html', post=post, decrypted=decrypted)

@app.route('/create_message')
def create_message():
    return render_template('create_message.html')

@app.route('/submit_message', methods=['POST'])
def submit_message():
    # print(session['user_id'])
    userID = session.get('user_id')
    print(userID)
    data = {
        **request.form,
        'user_id': userID
    }
    print(data)
    Post.submit_post(data)
    # return redirect('/profiles')
    return redirect('/messages')