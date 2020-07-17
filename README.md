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
Tips: If an edit is made to the dockerfile/docker-compose, rerun make build

### Running the Project
- make up (navigate to localhost:8000)

### Testing the Project
- make test

### Developing the Project
- cd GameHub/src/frontend
- npm i
- npm run start (navigate to localhost:3000)
- cd ../../
- make up (navigate to localhost:8000)

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
- set up front end development/building with docker
- add docs folder with JSDoc for frontend and Sphinx for backend

### Hangman API Relative Endpoints
- 'hangman/'
- 'hangman/${id}/'
- 'hangman/${id}/guessLetter/'
- 'hangman/getFinished/'
- 'hangman/getPoints/'
- 'admin/'
- 'auth/jwt/create/'
- 'auth/jwt/refresh/'
- 'auth/jwt/verify/'
- 'auth/users/'
- 'auth/users/activation/'
- 'auth/users/resend_activation/'
- 'auth/users/me/'
- 'auth/users/set_username/'
- 'auth/users/reset_username/'
- 'auth/users/reset_username_confirm/'
- 'auth/users/set_password/'
- 'auth/users/reset_password/'
- 'auth/users/reset_password_confirm/'
