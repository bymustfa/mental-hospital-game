import { GameProvider, useGame } from './state/GameContext';
import IntroScreen from './components/IntroScreen';
import HubScreen from './components/HubScreen';
import SessionScreen from './components/SessionScreen';
import VerdictScreen from './components/VerdictScreen';
import EventScreen from './components/EventScreen';
import EndScreen from './components/EndScreen';
import EnergyPurchaseModal from './components/EnergyPurchaseModal';
import Hud from './components/Hud';
import './App.css';

function Game() {
  const { state } = useGame();
  const showHud = state.phase !== 'intro' && state.phase !== 'win' && state.phase !== 'lose';

  return (
    <div className="app">
      {showHud && <Hud />}
      <main className="stage">
        {state.phase === 'intro' && <IntroScreen />}
        {state.phase === 'hub' && <HubScreen />}
        {state.phase === 'session' && <SessionScreen />}
        {state.phase === 'verdict' && <VerdictScreen />}
        {state.phase === 'event' && <EventScreen />}
        {(state.phase === 'win' || state.phase === 'lose') && <EndScreen />}
      </main>
      <EnergyPurchaseModal />
      <footer className="footer">Akıl Hastanesi — prototip</footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
