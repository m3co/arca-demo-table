
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, AAUQTO as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class AAUQTO
  extends React.Component<Props, State['Source']['AAU-QTO']>
{
  public readonly state: State['Source']['AAU-QTO'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['AAU-QTO']);
    });

    props.socket.Select('AAU-QTO');
    props.socket.GetInfo('AAU-QTO');
    props.socket.Subscribe('AAU-QTO');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('AAU-QTO', row);
  }

  private onInsert = (row: Row): string => {
    const r = row as Model["Row"];
    if (!(r.Constraint) || !(r.Key)) {
      return '';
    }
    return this.props.socket.Insert('AAU-QTO', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('AAU-QTO', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      Key: null,
      Constraint: null,
      Q: 0,
      CAD: false,
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"AAU-QTO"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
