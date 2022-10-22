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
        {/* Runs Locally */}
        <Route path="/notthisweek" element={<Home />} />
        {/* Runs build version */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element= {<Login />}/>
        <Route path="/signup" element= {<Signup />} />
        <Route path="/userProfile/:id" element= {<Profile />} />
        <Route path="/characterFeed" element= {<CharacterFeed />} />
        <Route path="/character/:id" element= {<Character />} />
        <Route path="/gameFeed" element= {<GameFeed />} />
        <Route path="/post/:id" element= {<Game />} />
        <Route path="/post/:id" element= {<Game />} />
        <Route path="/encounter/:id" element={<Encounter />} />
        <Route path="/logout" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
