/* eslint-disable react/no-multi-comp */
import './App.css';
import {
  AddBear,
  AddBee,
  NukeBears,
  NukeBees,
  RemoveBear,
  RemoveBee,
  ShowBears,
  ShowBees,
  SpecificBearsAmount,
  SpecificBeesAmount,
} from './components/ActionButtons';
import { Bears } from './components/Bears';
import { Bees } from './components/Bees';
import { useBearsStore } from './components/Bears/bear-store';
import { useBeesStore } from './components/Bees/bees-store';
import React from 'react';

const App = () => (
  <div className="App">
    <ShowBears />
    <div className="actions">
      {useBearsStore((state) => state.bears) !== 0 ? <RemoveBear /> : null}
      <AddBear />
      {useBearsStore((state) => state.bears) !== 0 ? <NukeBears /> : null}
      <SpecificBearsAmount />
    </div>
    <br />
    <Bears />
    <br />
    <ShowBees />
    <div className="actions">
      {useBeesStore((state) => state.bees) !== 0 ? <RemoveBee /> : null}
      <AddBee />
      {useBeesStore((state) => state.bees) !== 0 ? <NukeBees /> : null}
      <SpecificBeesAmount />
    </div>
    <br />
    <Bees />
  </div>
);

// eslint-disable-next-line import/no-default-export
export default App;
