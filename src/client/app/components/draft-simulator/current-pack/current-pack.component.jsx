import React, { Component } from 'react';

const CurrentPack = (props) => {
  const { currentPack: pack, selectCard } = props;
  
  return (
    <div id="current-pack">
      <div className="pack-row">
        {pack[0] ? <img className="card" src={pack[0].image} onClick={() => selectCard(0)}/> : null}
        {pack[1] ? <img className="card" src={pack[1].image} onClick={() => selectCard(1)}/> : null}
        {pack[2] ? <img className="card" src={pack[2].image} onClick={() => selectCard(2)}/> : null}
        {pack[3] ? <img className="card" src={pack[3].image} onClick={() => selectCard(3)}/> : null}
      </div>
      <div className="pack-row">
        {pack[4] ? <img className="card" src={pack[4].image} onClick={() => selectCard(4)}/> : null}
        {pack[5] ? <img className="card" src={pack[5].image} onClick={() => selectCard(5)}/> : null}
        {pack[6] ? <img className="card" src={pack[6].image} onClick={() => selectCard(6)}/> : null}
        {pack[7] ? <img className="card" src={pack[7].image} onClick={() => selectCard(7)}/> : null}
      </div>
      <div className="pack-row">
        {pack[8] ? <img className="card" src={pack[8].image} onClick={() => selectCard(8)}/> : null}
        {pack[9] ? <img className="card" src={pack[9].image} onClick={() => selectCard(9)}/> : null}
        {pack[10] ? <img className="card" src={pack[10].image} onClick={() => selectCard(10)}/> : null}
        {pack[11] ? <img className="card" src={pack[11].image} onClick={() => selectCard(11)}/> : null}
      </div>
    </div>
  );
};

export default CurrentPack;
