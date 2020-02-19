
import * as React from 'react';
import { render } from 'react-dom';

import { BudgetAAU } from './Budget-AAU';
import { BudgetAAUvsGeneral } from './Budget-AAU-vs-General';
import { Projects } from './Projects';
import { Contractors } from './Contractors';

import { AAUConcretize } from './Concretize';
import { AAU } from './AAU';
import { AAUQTO } from './AAU-QTO';
import { AAUTasksGantt } from './AAU-Tasks-Gantt';
import { AAUAPUTasksGantt } from './AAU-APU-Tasks-Gantt';

import { APUAssign } from './APU-Assign';
import { APU } from './APU';
import { APUQTO } from './APU-QTO';
import { APUTasks } from './APU-Tasks';
import { APUTasksGantt } from './APU-Tasks-Gantt';
import { APUMetaSupplies } from './APU-MetaSupplies';
import { APUPSupplies } from './APU-P-Supplies';
import { APUImportSupplies } from './APU-Import-Supplies';
import { APUImportSuppliesInApp } from './APU-Import-Supplies-in-app';

import { AEU } from './AEU';

import { FACADReports } from './FACAD-Reports';
import { FACADReportFilters } from './FACAD-ReportFilters';
import { FACADpreCFTAAU } from './FACAD-preCFT-AAU';
import { FACADpreCFTAAUKey } from './FACAD-preCFT-AAU-Key';
import { FACADCFTAAU } from './FACAD-CFT-AAU';
import { FACADCFTFiltersAAU } from './FACAD-CFT-Filters-AAU';
import { TasksMonthCashFlowAAU } from './Tasks-Month-CashFlow-AAU';

import { ARCASocket, reducer } from 'arca-redux';
import { createStore } from 'redux';
import Socket from 'socket.io-client';

const connection = Socket();
const store = createStore(reducer);
const socket = new ARCASocket(store, connection);

function showState(): void {
  console.log(store.getState());
}

render(
  <React.Fragment>
    <button onClick={showState}>Show state</button><br />

    <Projects socket={socket} />
    <Contractors socket={socket} />
    <AEU socket={socket} />
    <FACADpreCFTAAUKey socket={socket} />
    <APUAssign socket={socket} />
    <APU socket={socket} />
    <APUQTO socket={socket} />
    <APUTasks socket={socket} />
    <APUTasksGantt socket={socket} />
    <APUMetaSupplies socket={socket} />
    <APUImportSuppliesInApp socket={socket} />
    <APUPSupplies socket={socket} />
    <APUImportSupplies socket={socket} />
    <BudgetAAU socket={socket} />
    <BudgetAAUvsGeneral socket={socket} />
    <AAUConcretize socket={socket} />
    <FACADCFTAAU socket={socket} />
    <FACADCFTFiltersAAU socket={socket} />
    <FACADReports socket={socket} />
    <FACADReportFilters socket={socket} />
    <FACADpreCFTAAU socket={socket} />
    <AAU socket={socket} />
    <AAUQTO socket={socket} />
    <AAUTasksGantt socket={socket} />
    <AAUAPUTasksGantt socket={socket} />
    <TasksMonthCashFlowAAU socket={socket} />
  </React.Fragment>,
  document.getElementById("root")
);
