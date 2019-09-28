
import * as React from 'react';
import { render } from 'react-dom';

import { Projects } from './Projects';
import { Concretize } from './Concretize';
import { AAU } from './AAU';
import { AAUQTO } from './AAUQTO';
import { AAUTasksGantt } from './AAUTasksGantt';
import { FACADReports } from './FACAD-Reports';
import { FACADReportFilters } from './FACAD-ReportFilters';
import { FACADpreCFT } from './FACAD-preCFT';
import { FACADCFT } from './FACAD-CFT';

import { ARCASocket, reducer } from 'arca-redux';
import { createStore } from 'redux';

const store = createStore(reducer);
const socket = new ARCASocket(store);

function showState(): void {
  console.log(store.getState());
}

render(
  <React.Fragment>
    <button onClick={showState}>Show state</button><br />
    <Projects socket={socket} />
    <Concretize socket={socket} />
    <FACADCFT socket={socket} />
    <FACADpreCFT socket={socket} />
    <FACADReports socket={socket} />
    <FACADReportFilters socket={socket} />
    <AAU socket={socket} />
    <AAUQTO socket={socket} />
    <AAUTasksGantt socket={socket} />
  </React.Fragment>,
  document.getElementById("root")
);
