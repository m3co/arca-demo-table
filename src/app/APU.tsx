
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, APU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class APU
  extends React.Component<Props, State['Source']['APU']>
{
  public readonly state: State['Source']['APU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['APU']);
    });

    props.socket.Select('APU');
    props.socket.GetInfo('APU');
    props.socket.Subscribe('APU');
  }

  private onUpdate = (Row: Row): void => {
    const row = {...Row} as Model["Row"];
    if (row.Key && row.Constraint && row.ContractorID && row.Estimated > 0 && row.P > 0) {
      this.props.socket.Update('APU', row);
    }
  }

  private onInsert = (Row: Row): string => {
    const row = {...Row} as Model["Row"];
    if (row.Key && row.Constraint && row.ContractorID && row.Estimated > 0 && row.P > 0) {
      return this.props.socket.Insert('APU', row);
    }
    return '';
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('APU', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      Key: null,
      Constraint: null,
      ContractorID: null,
      Description: '',
      Unit: null,
      P: 0,
      Price: null,
      Estimated: 0,
      Frozen: false,
      Status: 'Negotiation',
      ExpiredAt: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"APU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
