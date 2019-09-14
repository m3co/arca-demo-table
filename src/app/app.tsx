
import * as React from 'react';
import { render } from 'react-dom';

import { AAU } from './AAU';
import { AAUQTO } from './AAUQTO';
import { AAUTasksGantt } from './AAUTasksGantt';
import { FACADReports } from './FACAD-Reports';
import { FACADpreCFT } from './FACAD-preCFT';
import { FACADCFT } from './FACAD-CFT';

import { ARCASocket, reducer } from 'arca-redux';
import { createStore } from 'redux';
import Favicon from 'react-favicon';

const store = createStore(reducer);
const socket = new ARCASocket(store);

function showState(): void {
  console.log(store.getState());
}

render(
  <div>
    <Favicon url="/favicon.ico" />
    <button onClick={showState}>Show state</button><br />
    <FACADCFT socket={socket} />
    <FACADpreCFT socket={socket} />
    <FACADReports socket={socket} />
    <AAU socket={socket} />
    <AAUQTO socket={socket} />
    <AAUTasksGantt socket={socket} />
  </div>,
  document.getElementById("root")
);
