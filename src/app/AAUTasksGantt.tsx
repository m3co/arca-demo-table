
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, AAUTasksGantt as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AAUTasksGantt
  extends React.Component<Props, State['Source']['AAU-Tasks-Gantt']>
{
  public readonly state: State['Source']['AAU-Tasks-Gantt'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AAU-Tasks-Gantt']);
    });

    props.socket.Select('AAU-Tasks-Gantt');
    props.socket.GetInfo('AAU-Tasks-Gantt');
    props.socket.Subscribe('AAU-Tasks-Gantt');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('AAU-Tasks-Gantt', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('AAU-Tasks-Gantt', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('AAU-Tasks-Gantt', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Key: '',
      Constraint: '',
      Start: null,
      End: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"AAU-Tasks-Gantt"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
