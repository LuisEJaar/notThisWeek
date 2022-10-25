import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import CharacterFeed from './Pages/CharacterFeed'
import Character from './Pages/Character'
import GameFeed from './Pages/GameFeed'
import Game from './Pages/Game'
import Encounter from './Pages/Encounter'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element= {<Home />} />
        <Route path="/login" element= {<Login />}/>
        <Route path="/signup" element= {<Signup />} />
        <Route path="/userProfile/:id" element= {<Profile />} />
        <Route path="/characterFeed" element= {<CharacterFeed />} />
        <Route path="/character/:id" element= {<Character />} />
        <Route path="/gameFeed" element= {<GameFeed />} />
        <Route path="/post/:id" element= {<Game />} />
        <Route path="/encounter/:id" element= {<Encounter />} />
      </Routes>
    </div>
  );
}

export default App;
