
import * as React from 'react';

import { Table } from 'arca-table';

import { ARCASocket, State, Row, FACADCFTFilters as Model } from 'arca-redux';

interface Props {
  socket: ARCASocket;
}

export class FACADCFTFilters
  extends React.Component<Props, State['Source']['FACAD-CFTFilters']>
{
  public readonly state: State['Source']['FACAD-CFTFilters'] = {
    Rows: [],
    Requests: [],
  }

  public constructor(props: Props) {
    super(props);
    props.socket.store.subscribe((): void => {
      const state: State = props.socket.store.getState();
      this.setState(state.Source["FACAD-CFTFilters"]);
    });

    props.socket.Select('FACAD-CFTFilters');
    props.socket.GetInfo('FACAD-CFTFilters');
    props.socket.Subscribe('FACAD-CFTFilters');
  }

  private onUpdate = (row: Row): void => {
    this.props.socket.Update('FACAD-CFTFilters', row);
  }

  private onInsert = (row: Row): string => {
    return this.props.socket.Insert('FACAD-CFTFilters', row);
  }

  private onDelete = (row: Row): void => {
    this.props.socket.Delete('FACAD-CFTFilters', row);
  }

  private provideEmptyRow = (): Model["Row"] => {
    const row: Model["Row"] = {
      ID: 0,
      CFTID: 0,
      Comparator: '',
      ValueType: '',
      Field: '',
      Value: '',
    };
    return row;
  }

  public render(): JSX.Element {
    const { Info, Rows, Requests } = this.state;
    return <Table
      Title={"FACAD-CFTFilters"}
      Info={Info}
      Rows={Rows}
      onInsert={this.onInsert}
      onDelete={this.onDelete}
      onUpdate={this.onUpdate}
      provideEmptyRow={this.provideEmptyRow}
      Requests={Requests} />
  }
}
