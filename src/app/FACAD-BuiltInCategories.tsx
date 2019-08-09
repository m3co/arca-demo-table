
import * as React from 'react';

import { Table } from 'arca-table/build/Table';

import { ARCASocket, State, Row, FACADBuiltInCategories as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADBuiltInCategories
  extends React.Component<Props, State['Source']['FACAD-BuiltInCategories']>
{
  public readonly state: State['Source']['FACAD-BuiltInCategories'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source['FACAD-BuiltInCategories']);
    });

    props.socket.Select('FACAD-BuiltInCategories');
    props.socket.GetInfo('FACAD-BuiltInCategories');
    props.socket.Subscribe('FACAD-BuiltInCategories');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-BuiltInCategories', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-BuiltInCategories', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-BuiltInCategories', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      BuiltInCategory: 'INVALID',
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
