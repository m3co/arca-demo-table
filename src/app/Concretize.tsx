
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, AAUConcretize as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AAUConcretize
  extends React.Component<Props, State['Source']['AAU-Concretize']>
{
  public readonly state: State['Source']['AAU-Concretize'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AAU-Concretize']);
    });

    props.socket.Select('AAU-Concretize');
    props.socket.GetInfo('AAU-Concretize');
    props.socket.Subscribe('AAU-Concretize');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('AAU-Concretize', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('AAU-Concretize', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('AAU-Concretize', row);
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Concretize"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
