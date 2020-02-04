
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AAUAPUTasksGantt
  extends React.Component<Props, State['Source']['AAU-APU-Tasks-Gantt']>
{
  public readonly state: State['Source']['AAU-APU-Tasks-Gantt'] = {
    Rows: [],
    Aggs: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AAU-APU-Tasks-Gantt']);
    });

    props.socket.Select('AAU-APU-Tasks-Gantt');
    props.socket.GetInfo('AAU-APU-Tasks-Gantt');
    props.socket.Subscribe('AAU-APU-Tasks-Gantt');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('AAU-APU-Tasks-Gantt', row);
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"AAU-APU-Tasks-Gantt"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
