
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, AEU as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AEU
  extends React.Component<Props, State['Source']['AEU']>
{
  public readonly state: State['Source']['AEU'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AEU']);
    });

    props.socket.Select('AEU');
    props.socket.GetInfo('AEU');
    props.socket.Subscribe('AEU');
  }

  private onUpdate = (Row: Row): void => {
    const row = {...Row} as Model["Row"];
    if (row.APUID > 0) {
      this.props.socket.Update('AEU', row);
    }
  }

  private onInsert = (Row: Row): string => {
    const row = {...Row} as Model["Row"];
    if (row.APUID > 0) {
      return this.props.socket.Insert('AEU', row);
    }
    return '';
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('AEU', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      ReportedAt: new Date(),
      APUID: 0,
      Q: null,
      Start: new Date(),
      End: null,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"AEU"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
