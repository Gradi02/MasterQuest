import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import * as actions from "./CertificatesApi";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Certificates extends Component {
    state = {certificates: null, page: 1, sizePerPage: 10};

    componentDidMount() {
        this.reload();
    }

    reload() {
        const {page, sizePerPage} = this.state;
        this.props.actions.loadCertificates({page: page, per_page: sizePerPage},
            certificates => this.setState({certificates, page, sizePerPage}));
    }

    delete(name) {
        this.props.actions.deleteCertificate(name, () => {
            this.reload();
        });
    }


    render() {
        const {certificates, page, sizePerPage} = this.state;
        return (<div>
                <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon
                                glyph="cog"/> Admin &gt; Certificates
                        </h5>
                    </Col>
                    <Col xs={4} className="text-right">
                        <h4>
                            <LinkContainer exact to={`/user`}>
                                <Button bsStyle={'success'}><Glyphicon
                                    glyph="plus"/> Add</Button>
                            </LinkContainer>
                        </h4>
                    </Col>
                </Row>
                {certificates &&
                <BootstrapTable
                    data={certificates}
                    fetchInfo={{dataTotalSize: certificates.length}}
                    striped
                    hover
                    remote
                    pagination
                    bordered={false}
                    options={{
                        onPageChange: (page, sizePerPage) => {
                            this.reload(page, sizePerPage);
                        },
                        onSizePerPageList: sizePerPage => {
                            this.reload(this.state.page, sizePerPage);
                        },
                        page,
                        sizePerPage
                    }}
                >
                    <TableHeaderColumn width="10" isKey dataField='id'>ID</TableHeaderColumn>
                    <TableHeaderColumn width="35" dataField='email'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="20" dataField='id' dataFormat={(cell, row) => {
                        return <div>
                            <LinkContainer exact to={`/user/${row.id}`}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Edit
                                    </Tooltip>
                                }>
                                                    <span className="text-success pointer"> <i
                                                        className="fas fa-edit"/></span>
                                </OverlayTrigger>
                            </LinkContainer>
                            <span> </span>

                            <LinkContainer to={`/`} onClick={() => this.delete(row.id)}>
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id="tooltip">
                                        Delete
                                    </Tooltip>
                                }>
                                                    <span className="text-danger pointer"
                                                          onClick={() => this.delete(row.id)}> <i
                                                        className="fas fa-trash-alt"/></span>
                                </OverlayTrigger>
                            </LinkContainer>
                        </div>
                    }}>Actions
                    </TableHeaderColumn>
                </BootstrapTable>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});

export default connect(
    undefined,
    mapDispatchToProps
)(Users)
