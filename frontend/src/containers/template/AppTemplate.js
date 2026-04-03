import React, {Component} from 'react'
import {Button, Glyphicon, Grid, MenuItem, Modal, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {connect} from 'react-redux';
import * as actions from './AppTemplateActions'
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import MDSpinner from "react-md-spinner";

class AppTemplate extends Component {
    render() {
        const {authenticated, loading, showTermsModal} = this.props;
        return (
            <div>
                {authenticated && <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src="/logo.svg" className="logo"/>
                            <small>Certificates</small>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown id="admin" eventKey={1}
                                         title={
                                             <span>
                                                     <Glyphicon glyph="cog"/> Admin
                                                 </span>}
                            >
                                <LinkContainer exact to="/">
                                    <MenuItem eventKey={1.1}>
                                        Users
                                    </MenuItem>
                                </LinkContainer>
                                <LinkContainer exact to="/certificates">
                                    <MenuItem eventKey={1.2}>
                                        Certificates
                                    </MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                            <NavItem onClick={this.props.actions.showTermsModal}>
                                Terms
                            </NavItem>
                        </Nav>
                        <Nav pullRight className="vmiddle">
                            {loading && <span className="pull-left">
                                <MDSpinner size={20}/>
                            </span>}
                            <NavDropdown id="user" eventKey={3} title="Profile">
                                <LinkContainer exact to="/login">
                                    <MenuItem
                                        onClick={this.props.actions.logout} eventKey={3.2}><Glyphicon
                                        glyph="log-out"/> Logout</MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                }
                <Modal show={showTermsModal} onHide={this.props.actions.hideTermsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terms and Statute</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Statute</h4>
                        <p>
                            By using this application, you agree to use it only for legitimate administrative
                            operations related to user and certificate management.
                        </p>
                        <p>
                            Personal data must be processed with care. Do not share account credentials or
                            authorization tokens. Every change should be traceable and made by authorized staff.
                        </p>
                        <p>
                            Certificates should represent completed courses accurately. Creating false records,
                            modifying records without permission, or deleting data without business reason is prohibited.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.actions.hideTermsModal} bsStyle="primary">
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = ({appState}) => ({
    locale: appState.locale,
    alerts: appState.alerts,
    loading: appState.loading,
    profile: appState.profile,
    authenticated: appState.authenticated,
    showTermsModal: appState.showTermsModal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppTemplate))
