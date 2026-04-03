import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";
import * as actions from "./CertificatesApi";
import * as userActions from "../users/UsersApi";

class Certificate extends Component {
    handleNameChange = (e) => {
        const {resource} = this.state;
        this.setState({resource: {...resource, name: e.target.value}});
    };
    handleDescriptionChange = (e) => {
        const {resource} = this.state;
        this.setState({resource: {...resource, description: e.target.value}});
    };
    handleUserChange = (e) => {
        const {resource} = this.state;
        this.setState({resource: {...resource, user_id: e.target.value ? Number(e.target.value) : null}});
    };

    saveCertificate = (e) => {
        e.preventDefault();
        const {resource} = this.state;
        const validationErrors = {};

        if (Object.keys(resource).length > 0) {
            if (!resource.name || resource.name.trim().length < 2) {
                validationErrors.name = "invalid name";
            }
            if (!resource.user_id) {
                validationErrors.user_id = "user is required";
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            this.setState({validationErrors});
        } else {
            this.props.actions.saveCertificate(resource, () => {
                this.context.router.history.push('/certificates');
            });
        }
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            resource: {},
            users: [],
            validationErrors: {},
            previousCertificateName: ''
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.userActions.loadUsers({page: 1, per_page: 1000}, users => this.setState({users}));
        if (id != null) {
            this.loadCertificate(id);
        } else {
            this.setState({resource: {}});
        }
    };

    loadCertificate(id) {
        this.props.actions.loadCertificate(id,
            resource => this.setState({resource: resource, previousCertificateName: resource.name}));
    };

    getValidationState(id) {
        const {validationErrors} = this.state;
        if (validationErrors.name && id === 'name') {
            return 'error';
        }
        if (validationErrors.user_id && id === 'user_id') {
            return 'error';
        }
        return null;
    }

    render() {
        const {resource, users, validationErrors, previousCertificateName} = this.state;
        return (
            <div>
                {resource && <Row className="vertical-middle breadcrumbs">
                    <Col xs={8}>
                        <h5>
                            <Glyphicon
                                glyph="cog"/> Admin &gt; Certificates &gt; {resource.id ?
                                <span><b>{previousCertificateName}</b> - edit</span> :
                                <span>New</span>}
                        </h5>
                    </Col>
                </Row>
                }
                {resource &&
                <Row id='form'>
                    <Col xs={12} md={6}>
                        <Form horizontal onSubmit={this.saveCertificate}>
                            <FormGroup
                                controlId="name"
                                validationState={this.getValidationState('name')}
                            >
                                <Col componentClass={ControlLabel} sm={2}>Name</Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        value={resource.name || ''}
                                        placeholder="Enter text"
                                        onChange={this.handleNameChange}
                                    />
                                    {
                                        Object.keys(validationErrors).length > 0 && validationErrors.name &&
                                        <ControlLabel>{validationErrors.name}</ControlLabel>
                                    }
                                </Col>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup
                                controlId="description"
                            >
                                <Col componentClass={ControlLabel} sm={2}>Description</Col>
                                <Col sm={10}>
                                    <FormControl
                                        componentClass="textarea"
                                        value={resource.description || ''}
                                        placeholder="Enter text"
                                        onChange={this.handleDescriptionChange}
                                        rows={4}
                                    />
                                </Col>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup
                                controlId="user_id"
                                validationState={this.getValidationState('user_id')}
                            >
                                <Col componentClass={ControlLabel} sm={2}>User</Col>
                                <Col sm={10}>
                                    <FormControl
                                        componentClass="select"
                                        value={resource.user_id || ''}
                                        onChange={this.handleUserChange}
                                    >
                                        <option value="">Select user</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.email}
                                            </option>
                                        ))}
                                    </FormControl>
                                    {
                                        Object.keys(validationErrors).length > 0 && validationErrors.user_id &&
                                        <ControlLabel>{validationErrors.user_id}</ControlLabel>
                                    }
                                </Col>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <Col xsOffset={2} xs={10} className='form-buttons margin10'>
                                <Button type="submit" bsStyle={'success'}>Save</Button>
                                <Button
                                    bsStyle={'warning'}
                                    onClick={() => this.context.router.history.push(`/certificates`)}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Form>
                    </Col>
                </Row>
                }

            </div>
        );
    }
}

Certificate.contextTypes = {
    router: PropTypes.object
};


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch),
    userActions: bindActionCreators(
        userActions,
        dispatch)
});

export default connect(
    undefined,
    mapDispatchToProps
)(Certificate)
