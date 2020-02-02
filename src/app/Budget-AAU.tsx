
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, BudgetAAU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class BudgetAAU
  extends React.Component<Props, State['Source']['Budget-AAU']>
{
  public readonly state: State['Source']['Budget-AAU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['Budget-AAU']);
    });

    props.socket.Select('Budget-AAU');
    props.socket.GetInfo('Budget-AAU');
    props.socket.Subscribe('Budget-AAU');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('Budget-AAU', row);
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"Budget-AAU"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
