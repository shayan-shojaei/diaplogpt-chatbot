# CHATBOT APP

## Usage

### API

Go into the api directory:

```bash
cd chatbot-api
```

Create a virtual environment if you desire, then install the requirements:

```bash
pip install -r requirements.txt
```

Launch the server:

```bash
uvicorn api:app --reload
```

### Frontend Client

Go into the frontend directory:

```bash
cd chatbot-frontend
```

Install the dependencies:

```bash
yarn
# or
npm install 
```

Create the environment variables file:

```bash
cp .env.example .env.local # or .env.production in case of a production build
```

Input your API url into the `.env` file:

```bash
REACT_APP_API="http://localhost:8000"
```

Launch the app:

```bash
yarn start
# or
npm run start
```
