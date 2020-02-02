
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

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Tasks-Gantt"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
