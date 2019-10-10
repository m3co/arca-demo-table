
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, BudgetAAUvsGeneral as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class BudgetAAUvsGeneral
  extends React.Component<Props, State['Source']['Budget-AAU-vs-General']>
{
  public readonly state: State['Source']['Budget-AAU-vs-General'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Budget-AAU-vs-General']);
    });

    props.socket.Select('Budget-AAU-vs-General');
    props.socket.GetInfo('Budget-AAU-vs-General');
    props.socket.Subscribe('Budget-AAU-vs-General');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Budget-AAU-vs-General', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('Budget-AAU-vs-General', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('Budget-AAU-vs-General', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Project: 0,
      Key: null,
      Description: '',
      Unit: '',
      Q: null,
      P: null,
      Estimated: 0,
      TotalEstimated: 0,
      SummEstimated: 0,
      RateEstimated: 0,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Budget-AAU-vs-General"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
