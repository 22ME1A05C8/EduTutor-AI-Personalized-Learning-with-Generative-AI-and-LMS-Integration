from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
import json
import requests
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///edututor.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'student' or 'educator'
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    google_classroom_id = db.Column(db.String(100), unique=True)
    educator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    topic = db.Column(db.String(200), nullable=False)
    questions = db.Column(db.Text, nullable=False)  # JSON string
    answers = db.Column(db.Text)  # JSON string
    score = db.Column(db.Float, default=0.0)
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['user_type'] = user.user_type
            session['user_name'] = user.name
            
            if user.user_type == 'student':
                return redirect(url_for('student_dashboard'))
            else:
                return redirect(url_for('educator_dashboard'))
        else:
            flash('Invalid email or password')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        user_type = request.form['user_type']
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already registered')
            return redirect(url_for('register'))
        
        hashed_password = generate_password_hash(password)
        new_user = User(
            name=name,
            email=email,
            password=hashed_password,
            user_type=user_type
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registration successful! Please login.')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/student/dashboard')
def student_dashboard():
    if 'user_id' not in session or session.get('user_type') != 'student':
        return redirect(url_for('login'))
    
    student_id = session['user_id']
    recent_quizzes = Quiz.query.filter_by(student_id=student_id).order_by(Quiz.created_at.desc()).limit(5).all()
    total_quizzes = Quiz.query.filter_by(student_id=student_id).count()
    avg_score = db.session.query(db.func.avg(Quiz.score)).filter_by(student_id=student_id).scalar() or 0
    
    return render_template('student_dashboard.html', 
                         recent_quizzes=recent_quizzes,
                         total_quizzes=total_quizzes,
                         avg_score=round(avg_score, 1))

@app.route('/educator/dashboard')
def educator_dashboard():
    if 'user_id' not in session or session.get('user_type') != 'educator':
        return redirect(url_for('login'))
    
    educator_id = session['user_id']
    courses = Course.query.filter_by(educator_id=educator_id).all()
    
    # Get student analytics
    student_analytics = []
    for course in courses:
        course_quizzes = Quiz.query.filter_by(course_id=course.id).all()
        for quiz in course_quizzes:
            student = User.query.get(quiz.student_id)
            if student:
                student_analytics.append({
                    'student_name': student.name,
                    'course_name': course.name,
                    'topic': quiz.topic,
                    'score': quiz.score,
                    'date': quiz.completed_at or quiz.created_at
                })
    
    return render_template('educator_dashboard.html', 
                         courses=courses,
                         student_analytics=student_analytics)

@app.route('/take-quiz')
def take_quiz():
    if 'user_id' not in session or session.get('user_type') != 'student':
        return redirect(url_for('login'))
    
    return render_template('take_quiz.html')

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    topic = data.get('topic', 'General Knowledge')
    difficulty = data.get('difficulty', 'medium')
    
    # Simulate AI-generated quiz (replace with actual AI integration)
    quiz_questions = generate_ai_quiz(topic, difficulty)
    
    # Save quiz to database
    quiz = Quiz(
        student_id=session['user_id'],
        course_id=1,  # Default course for now
        topic=topic,
        questions=json.dumps(quiz_questions)
    )
    
    db.session.add(quiz)
    db.session.commit()
    
    return jsonify({
        'quiz_id': quiz.id,
        'questions': quiz_questions
    })

@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.get_json()
    quiz_id = data.get('quiz_id')
    answers = data.get('answers')
    
    quiz = Quiz.query.get(quiz_id)
    if not quiz or quiz.student_id != session['user_id']:
        return jsonify({'error': 'Quiz not found'}), 404
    
    # Calculate score
    questions = json.loads(quiz.questions)
    correct_answers = 0
    total_questions = len(questions)
    
    for i, question in enumerate(questions):
        if i < len(answers) and answers[i] == question['correct_answer']:
            correct_answers += 1
    
    score = (correct_answers / total_questions) * 100
    
    quiz.answers = json.dumps(answers)
    quiz.score = score
    quiz.completed_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'score': score,
        'correct_answers': correct_answers,
        'total_questions': total_questions
    })

@app.route('/quiz-history')
def quiz_history():
    if 'user_id' not in session or session.get('user_type') != 'student':
        return redirect(url_for('login'))
    
    student_id = session['user_id']
    quizzes = Quiz.query.filter_by(student_id=student_id).order_by(Quiz.created_at.desc()).all()
    
    return render_template('quiz_history.html', quizzes=quizzes)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def generate_ai_quiz(topic, difficulty):
    """Simulate AI quiz generation - replace with actual AI integration"""
    sample_questions = [
        {
            "question": f"What is a key concept in {topic}?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": 0
        },
        {
            "question": f"Which statement about {topic} is true?",
            "options": ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
            "correct_answer": 1
        },
        {
            "question": f"How does {topic} relate to real-world applications?",
            "options": ["Application A", "Application B", "Application C", "Application D"],
            "correct_answer": 2
        }
    ]
    return sample_questions

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
