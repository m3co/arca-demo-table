
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APUAssign as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APUAssign
  extends React.Component<Props, State['Source']['APU-Assign']>
{
  public readonly state: State['Source']['APU-Assign'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU-Assign']);
    });

    props.socket.Select('APU-Assign');
    props.socket.GetInfo('APU-Assign');
    props.socket.Subscribe('APU-Assign');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('APU-Assign', row);
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU-Assign"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
