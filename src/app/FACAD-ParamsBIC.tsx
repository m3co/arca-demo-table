
import * as React from 'react';

import { Table } from 'arca-table/build/Table';

import { ARCASocket, State, Row, FACADParamsBIC as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADParamsBIC
  extends React.Component<Props, State['Source']['FACAD-ParamsBIC']>
{
  public readonly state: State['Source']['FACAD-ParamsBIC'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['FACAD-ParamsBIC']);
    });

    props.socket.Select('FACAD-ParamsBIC');
    props.socket.GetInfo('FACAD-ParamsBIC');
    props.socket.Subscribe('FACAD-ParamsBIC');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-ParamsBIC', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-ParamsBIC', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-ParamsBIC', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ReportType: '',
      BuiltInCategory: '',
      Field: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
