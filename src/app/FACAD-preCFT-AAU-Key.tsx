
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADpreCFTAAUKey as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADpreCFTAAUKey
  extends React.Component<Props, State['Source']['FACAD-preCFT-AAU-Key']>
{
  public readonly state: State['Source']['FACAD-preCFT-AAU-Key'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-preCFT-AAU-Key"]);
    });

    props.socket.Select('FACAD-preCFT-AAU-Key');
    props.socket.GetInfo('FACAD-preCFT-AAU-Key');
    props.socket.Subscribe('FACAD-preCFT-AAU-Key');
  }

  private onUpdate = (row: Row): void => {
    const r = row as Model["Row"];
    const PK: Model["PK"] = {
      Key: null,
      Family: r.Family,
      Type: r.Type,
    };

    this.props.socket.Update('FACAD-preCFT-AAU-Key', row, { PK });
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"FACAD-preCFT-AAU-Key"}
      Info={Info}
      Rows={Rows}
      onUpdate={this.onUpdate}
      Requests={Requests} />
  }
}
