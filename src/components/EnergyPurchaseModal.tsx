import { useGame } from '../state/GameContext';
import { CONFIG } from '../state/config';

export default function EnergyPurchaseModal() {
  const { state, dispatch } = useGame();
  if (state.phase !== 'energyPurchase') return null;

  const cost = CONFIG.ENERGY_PURCHASE_COST;
  const amount = CONFIG.ENERGY_PURCHASE_AMOUNT;
  const canAfford = state.money > 0;

  function buy() {
    dispatch({ type: 'BUY_ENERGY' });
  }

  function decline() {
    dispatch({ type: 'DECLINE_ENERGY' });
  }

  return (
    <div className="overlay">
      <div className="card energy-modal">
        <h2>Prestij Krizi</h2>
        <p>
          Prestij puanın bitti! {cost} ₺ karşılığında +{amount} prestij kazanmak ister
          misin?
        </p>
        <div className="energy-modal-buttons">
          <button
            className="btn primary"
            disabled={!canAfford}
            onClick={buy}
          >
            Evet ({cost} ₺)
          </button>
          <button className="btn" onClick={decline}>
            Hayır
          </button>
        </div>
        {!canAfford && (
          <p className="warn-text">
            Paran yok, prestij alamazsın. Hayır dersen oyunu kaybedersin.
          </p>
        )}
      </div>
    </div>
  );
}
