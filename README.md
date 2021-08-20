# Robot Art

_This project is for the Mondo Robot Skills Assessment_

**Prompt:** The Mondo Robot People Operations Team (People Ops) loves to decorate our work space with original art, including vintage robot statues, toys and posters. People Ops is looking for a tool that allows them to create a list of potential famous robots and have the entire company vote on which of the robots is purchased next for the collection on desktop, mobile, and tablets

Demo at [https://mondo-robot-skills-test.vercel.app](https://mondo-robot-skills-test.vercel.app/)

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/noelsner/mondo-robot-skills-test.git
```

2. Navigate to the project directory

```bash
  cd mondo-robot-skills-test
```

3. Install dependencies

```bash
  npm install
```

4. Create a `.env` file the root directory to store the API Key as an environment variable. The API Key for this project is distributed by Mondo Robot.

```bash
touch .env

// In .env
REACT_APP_API_KEY=<api key goes here>
```

5. Start the server

```bash
  npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.
\*\*Please note that the app requires an API key to properly

## Deployment

To deploy this project run

```bash
  npm run build
```

## Tested Experience

During development this project was tested to be compatible with:

- Chrome
- Firerox
- Safari
- iOS
- Android
