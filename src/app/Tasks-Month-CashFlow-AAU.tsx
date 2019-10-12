
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, TasksMonthCashFlowAAU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class TasksMonthCashFlowAAU
  extends React.Component<Props, State['Source']['Tasks-Month-CashFlow-AAU']>
{
  public readonly state: State['Source']['Tasks-Month-CashFlow-AAU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Tasks-Month-CashFlow-AAU']);
    });

    props.socket.Select('Tasks-Month-CashFlow-AAU');
    props.socket.GetInfo('Tasks-Month-CashFlow-AAU');
    props.socket.Subscribe('Tasks-Month-CashFlow-AAU');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Tasks-Month-CashFlow-AAU', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('Tasks-Month-CashFlow-AAU', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('Tasks-Month-CashFlow-AAU', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Project: 0,
      Key: '',
      TaskStart: null,
      Start: null,
      End: null,
      TaskEnd: null,
      Days: 0,
      TotalDays: 0,
      Cost: 0,
      TotalCost: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Tasks-Month-CashFlow-AAU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
