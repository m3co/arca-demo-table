
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

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Tasks-Month-CashFlow-AAU"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
