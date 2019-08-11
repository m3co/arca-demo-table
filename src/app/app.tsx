
import * as React from 'react';
import { render } from 'react-dom';

import { AAUTasksGantt } from './TasksGanttAAU';
import { FACADSchedules } from './FACAD-Schedules';
import { FACADParamsBIC } from './FACAD-ParamsBIC';
import { FACADCFT } from './FACAD-CFT';
import { FACADBuiltInCategories } from './FACAD-BuiltInCategories';

import { ARCASocket, reducer } from 'arca-redux';
import { createStore } from 'redux';

const store = createStore(reducer);
const socket = new ARCASocket(store);

function showState(): void {
  console.log(store.getState());
}

render(
  <div>
    <button onClick={showState}>Show state</button><br />
    <FACADCFT socket={socket} />
    <FACADSchedules socket={socket} />
    <AAUTasksGantt socket={socket} />
      {/*
    <FACADParamsBIC socket={socket} />
    <FACADBuiltInCategories socket={socket} />
      */}
  </div>,
  document.getElementById("root")
);
