# GameHub

### Installation

#### Prerequisites to Installation:
- download docker https://www.docker.com/products/docker-desktop
- download node

#### Installation steps:
- git clone https://github.com/colbytanderson/GameHub.git
- cd GameHub/src/frontend
- npm i
- npm run build
- cd ../../
- make build (builds the docker image)

### Running the Project
- make up (navigate to localhost:8000)

### Testing the Project
- make test

### Developing the Project
- cd GameHub/src/frontend
- npm i
- npm run start
- cd ../../
- make up

Tips:
Run the following command before 'make up' to create a superuser to use
django's admin: docker-compose run --no-deps --rm web python3 manage.py createsuperuser

### Future Features/Fixes
- add multiplayer real time hangman competitions against the computer (who
can guess the word faster)
- add asynchronous multiplayer: one user makes the word, the other user guesses the word
- fix up in-game UI for hangman (format previously guessed letters better and show actual hangman)
- fix landing page UI (add more images and descriptions to make it look nice)
- add profile functionality (change password, delete account, etc)
- add game model to database to represent generic games (not just hangman)
- add testing to front end
- add more games!
