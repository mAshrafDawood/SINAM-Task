# Type Faster!
Type Faster! is a keyboard typing trainer generating a set of random words using a JSON file called `words.json`

## Stack used
1. ReactJS
2. tailwind
3. lucid-react

For this project I opted for single application using ReactJS instead of two applications (front-end and back-end) as There was no real need for a database and server side persistance, using only the client-side's browser local storage was just fine also using a single page application seemed optimal for this usecase. Tailwind for easier and faster CSS styling. And fincally lucid-react for the home icon used in the project instead of font-awesome or w3 SVGs.


## Running the application
#### 1.Node & npm
The version of node and npm running must be able to support ReactJS v19 as this app is based on it
#### 2. Devlopment Environment
All you need is run this following commands in the root directory of the project
 - `npm install`
 - `npm start`

as simple as that

#### 3. Deployment Environment
You can use the `Dockerfile` provided with this app and `nginx.conf` to run this app basically anywhere, just use the following commands in the project's root directory
 - `docker build -t my-container .` (change my-container to your container name)
 - `docker run -p 80:80 -d --name my-image my-container` (change my-image to your image name as well as my-container to the container's name you used earlier)
 And you have your image running and serving the application on port 80

 ## Room for improvment
 There is always room for improvement so this is a list of features/bugs to be later addressed if needed

 #### 1. Words reset on game start
 As soon as the game starts with any `word's count > 1` the word list would reset (this is not inteded behaviour)

 #### 2. Responsive design issues
 User interface might break for certain small devices if certain conditions meet, such as too many characters display

 #### 3. Update the words per minute state live
 Currently WPM is only calculated at the end of the game, It can be calculated live through the whole game

 #### 4. Add more modes for a more fun exprience
 Can add a few more modes as the following
 1. Story mode: Write a random paragraph from a book or a novel
 2. Songs mode: Write a verse from a known song
 3. Quotes & Idioms: Write famous quotes or idioms
 4. Scientific facts: Learn new facts (fun or not) while improving your typing skills
 5. Time based: Instead of the word count based or sentence based modes a mode where you are limited by the time

#### 5. Account for mistakes
Currently if a wrong character is inputed it is ignored, it can be highlighted and displayed in way to give a better user exprience also more statistics and insights to be stored and displayed (ex. Accuracy percentage and Consistency)

#### 6. Word rules
Add rules to allow or disallow a specific set of characters (ex. punctuation and numbers)

#### 7. Add custom word set
Add an input field for the user to add their own custom word set and store them to be used at any given time