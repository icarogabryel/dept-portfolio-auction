# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt
pip install sqlalchemy # for Celery broker with SQLite in dev environment

# Apply migrations
python manage.py migrate
