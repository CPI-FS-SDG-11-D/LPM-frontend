# Welcome To Our Frontend Repo

## Getting Started
### How To Run The App Locally
1. Clone the repo
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start the app on development mode
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
5. If you want to run the app on production mode, run `npm run build` and then `npm run preview`

### How To Run The App via Docker
1. Clone the repo
2. Run `docker build -t [INSERT NAME] .` on current directory and wait until the Docker image is built
3. Run `docker run -p 4173:4173 [INSERT NAME]` to start the app's container. The app will be available on [http://localhost:4173](http://localhost:4173) or any exposed port of your choosing on production mode.

## How To Contribute
1. Create a new branch with the following naming convention: 
`<your-name>/<feature-name>`
2. Make your changes
3. Push your changes to the branch you created
4. Create a pull request to merge your branch into main (make sure to consult with the team before merging)

