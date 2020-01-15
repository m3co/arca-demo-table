
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUTasksGantt as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUTasksGantt
  extends React.Component<Props, State['Source']['APU-Tasks-Gantt']>
{
  public readonly state: State['Source']['APU-Tasks-Gantt'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Tasks-Gantt']);
    });

    props.socket.Select('APU-Tasks-Gantt');
    props.socket.GetInfo('APU-Tasks-Gantt');
    props.socket.Subscribe('APU-Tasks-Gantt');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-Tasks-Gantt', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('APU-Tasks-Gantt', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU-Tasks-Gantt', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      ContractorID: 0,
      Key: '',
      Constraint: '',
      Description: '',
      Unit: '',
      Status: '',
      P: 0,
      Q: 0,
      Start: null,
      End: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Tasks-Gantt"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
