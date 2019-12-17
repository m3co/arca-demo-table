
import * as React from 'react';
import { render } from 'react-dom';

import { BudgetAAU } from './Budget-AAU';
import { BudgetAAUvsGeneral } from './Budget-AAU-vs-General';
import { Projects } from './Projects';
import { Contractors } from './Contractors';
import { Concretize } from './Concretize';
import { AAU } from './AAU';
import { AAUQTO } from './AAU-QTO';
import { AAUTasksGantt } from './AAU-Tasks-Gantt';

import { APUAssign } from './APU-Assign';
import { APU } from './APU';
import { APUQTO } from './APU-QTO';
import { APUMetaSupplies } from './APU-MetaSupplies';
import { APUPSupplies } from './APU-P-Supplies';
import { APUImportSupplies } from './APU-Import-Supplies';

import { FACADReports } from './FACAD-Reports';
import { FACADReportFilters } from './FACAD-ReportFilters';
import { FACADpreCFTAAU } from './FACAD-preCFT-AAU';
import { FACADCFTAAU } from './FACAD-CFT-AAU';
import { FACADCFTFiltersAAU } from './FACAD-CFT-Filters-AAU';
import { TasksMonthCashFlowAAU } from './Tasks-Month-CashFlow-AAU';

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
    <Contractors socket={socket} />
    <APUAssign socket={socket} />
    <APU socket={socket} />
    <APUQTO socket={socket} />
    <APUMetaSupplies socket={socket} />
    <APUPSupplies socket={socket} />
    <APUImportSupplies socket={socket} />
    <BudgetAAU socket={socket} />
    <BudgetAAUvsGeneral socket={socket} />
    <Concretize socket={socket} />
    <FACADCFTAAU socket={socket} />
    <FACADCFTFiltersAAU socket={socket} />
    <FACADReports socket={socket} />
    <FACADReportFilters socket={socket} />
    <FACADpreCFTAAU socket={socket} />
    <AAU socket={socket} />
    <AAUQTO socket={socket} />
    <AAUTasksGantt socket={socket} />
    <TasksMonthCashFlowAAU socket={socket} />
  </React.Fragment>,
  document.getElementById("root")
);
