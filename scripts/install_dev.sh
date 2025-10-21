# Create .env file first!
# Use root for CWD

cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python3 manage.py migrate

cd ../frontend

# Install frontend dependencies
npm install
