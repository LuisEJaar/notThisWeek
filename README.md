# Not This Week
This project was born from my experience of our DND group failing to meet up due to scheduling conflicts. I decided to make a text-based adventure app so that we could keep the story going.

A DM account can create games and add players / descriptions to those games. Games can then be given non-combat encounters which will be given randomized initiative orders based on the players included in the current encounter. The encounter will display whose turn it is as well as give players and the DM unique prompts based on if their turn has come. On each players turn they can pass or take an action which they describe in text. The DM can end the encounter, skip players, add comments etc.

Player account profiles show the games that their account has been added to.

All accounts can view all games as well as the contact information of the DMs and players in those games.

**Link to project:** https://notthisweek.herokuapp.com/

<p align="center">
  <a target="_blank" href="https://notthisweek.herokuapp.com/">
    <img src="https://github.com/LuisEJaar/luisEJaar/blob/main/notThisWeek.gif" height="500px" alt="Not This Week Site"/>
  </a>
</p>

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, Passport, MVC, Flash, Cloudinary, Heroku, MongoDB

## Roadmap

- [X] Build in character Models
  - [X] Tie Characters to users marked players
  - [X] Display character on users page
  - [X] Make feed for all user characters
  - [X] Incorporate characters into games vs players
    
- [X] Add skill rolling to the encounters
  - [X] Rolls to be based upon random d20 & character attributes from sheets
  - [X] DM needs option to pass initiative back to character
    - [X] Flow to be: 
      - [X] Character describes desired action
      - [X] DM assesses the roll required
      - [X] DM passes initiative back to player
      - [X] Player rolls 
  - [X] Rolls to be recorded in encounter flow
  
- [X] Add saving throw rolling to the encounters
- [ ] Add in advantage / disadvantage to rollss
   
- [ ] Add combat to the game
- [ ] Add basic inventory to each player character

One Off necessaries / Improvements:
- [ ] DM to be able to remove characters / players from a game
- [ ] DM to be able to edit their games
- [ ] DM to be able to edit their encounter
- [ ] DM to be able to edit their individual encounter rounds
- [X] DM to be able to toggle their turn status

Cool concepts
- [ ] The ability to hide / unhide encounters / games
  - This will allow for DM's to create games / sessions in advance
- [ ] Ability to copy encounters / games
  - Long term it would be ideal to be able to make templates that other DM's can copy. 
    This would allow for new players / dms to try out the game in a structured manner.

General / vague improvements:
- [ ] General styling update 

## Optimizations

- It feels like I'm making too many calls to my database on the backend and feel there has to be a way to improve this.
- Convert to React
- Use something like socket.io to update each players page and eliminate the need for constant refreshing

## Lessons Learned:

- Got some good practice with MVC workflow

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`

Attributes: 

Favicon:
<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">Dice icons created by Freepik - Flaticon</a>

Front Page Image:
Image by <a href="https://www.freepik.com/free-photo/still-life-objects-with-role-playing-game-sheet_24749859.htm#query=dnd&position=2&from_view=search">Freepik</a>
