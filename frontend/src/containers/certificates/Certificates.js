import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Col, Glyphicon, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import * as actions from "./CertificatesApi";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class Certificates extends Component {
    state = {
        certificates: null,
        page: 1,
        sizePerPage: 10,
        descriptionTooltip: null
    };

    componentDidMount() {
        this.reload();
    }

    reload() {
        const {page, sizePerPage} = this.state;
        this.props.actions.loadCertificates({page: page, per_page: sizePerPage},
            certificates => this.setState({certificates, page, sizePerPage}));
    }

    delete(id) {
        this.props.actions.deleteCertificate(id, () => {
            this.reload();
        });
    }

    showDescriptionTooltip = (description, event) => {
        this.setState({
            descriptionTooltip: {
                text: description || 'No description',
                x: event.clientX + 12,
                y: event.clientY + 12
            }
        });
    };

    moveDescriptionTooltip = (event) => {
        const {descriptionTooltip} = this.state;
        if (!descriptionTooltip) {
            return;
        }
        this.setState({
            descriptionTooltip: {
                ...descriptionTooltip,
                x: event.clientX + 12,
                y: event.clientY + 12
            }
        });
    };

    hideDescriptionTooltip = () => {
        this.setState({descriptionTooltip: null});
    };


    render() {
        const {certificates, page, sizePerPage, descriptionTooltip} = this.state;
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
                            <LinkContainer exact to={`/certificate`}>
                                <Button bsStyle={'success'}><Glyphicon
                                    glyph="plus"/> Add</Button>
                            </LinkContainer>
                        </h4>
                    </Col>
                </Row>
                {certificates &&
                <div ref={node => {
                    this.tableContainer = node;
                }}>
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
                    <TableHeaderColumn width="30" dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn width="50" dataField='description' dataFormat={(cell, row) => {
                        const descText = cell || 'No description';
                        return (
                            <OverlayTrigger 
                                placement="bottom" 
                                overlay={<Tooltip id={`desc-tooltip-${row.id}`}>{descText}</Tooltip>}
                            >
                                <span 
                                    className="pointer" 
                                    style={{ display: 'inline-block', width: '100%' }}
                                >
                                    {descText}
                                </span>
                            </OverlayTrigger>
                        );
                    }}>Description</TableHeaderColumn>
                    <TableHeaderColumn width="10" dataField='id' dataFormat={(cell, row) => {
                        return <div>
                            <LinkContainer exact to={`/certificate/${row.id}`}>
                                <OverlayTrigger 
                                    placement="top" 
                                    overlay={<Tooltip id={`edit-tooltip-${row.id}`}>Edit</Tooltip>}
                                >
                                    <span className="text-success pointer" style={{ display: 'inline-block' }}>
                                        <i className="fas fa-edit" />
                                    </span>
                                </OverlayTrigger>
                            </LinkContainer>
                            <span> </span>

                            <LinkContainer to={`/`} onClick={() => this.delete(row.id)}>
                                <OverlayTrigger 
                                    placement="top" 
                                    overlay={<Tooltip id={`del-tooltip-${row.id}`}>Delete</Tooltip>}
                                >
                                    <span className="text-danger pointer" style={{ display: 'inline-block' }}>
                                        <i className="fas fa-trash-alt" />
                                    </span>
                                </OverlayTrigger>
                            </LinkContainer>
                        </div>
                    }}>Actions
                    </TableHeaderColumn>
                </BootstrapTable>
                </div>
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
)(Certificates)
