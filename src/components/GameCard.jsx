import React from 'react';
import { ChevronRight, Gamepad2 } from 'lucide-react';

function GameCard({
  game,
  onClick
}) {
  if (!game) return null;

  const {
    name,
    publisher,
    tag,
    tone = '',
    icon,
    cover,
    status = 'Tersedia'
  } = game;

  return (
    <button
      type="button"
      className={`game-card ${tone}`}
      onClick={onClick}
      aria-label={`Top up ${name}`}
    >
      <div className="cover">

        {cover ? (
          <img
            src={cover}
            alt={name}
            className="game-cover-image"
            loading="lazy"
          />
        ) : (
          <div className="game-cover-fallback">
            {icon ? (
              <img
                src={icon}
                alt=""
                className="game-icon"
                loading="lazy"
              />
            ) : (
              <Gamepad2 size={44} />
            )}
          </div>
        )}

        <div className="cover-overlay"></div>

        {tag && (
          <span className="game-tag">
            {tag}
          </span>
        )}

        <span className="game-status">
          {status}
        </span>

      </div>

      <div className="game-meta">

        <div className="game-info">

          <b>{name}</b>

          {publisher && (
            <small>{publisher}</small>
          )}

        </div>

        <div className="game-arrow">
          <ChevronRight size={18} />
        </div>

      </div>

    </button>
  );
}

export default GameCard;
