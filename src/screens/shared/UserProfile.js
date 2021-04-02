import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '@lib/airtable/request';
import { refreshUserData } from '@lib/redux/userData';
// import { validateField } from '@lib/utils';
import { getCredentials, isNSEVPUser } from '@lib/credentials';
import '@styles/UserProfilePage.css';
import { Button } from '@material-ui/core';
import DefaultUserIcon from '@assets/defaultUserIcon-small.svg';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatefirstName: '',
      updatelastName: '',
      updateemail: '',
      updateuserTypes: '',
      generalEditMode: false
    };
  }

  componentDidMount() {
    this.populateUserInformation();
  }

  handleCancel() {
    this.setState({ generalEditMode: false });
    this.populateUserInformation();
  }

  handleChange = event => {
    const target = event.target.name;
    this.setState({
      [target]: event.target.value
    });
  };

  submitData = async newUser => {
    const { user } = this.props;
    // Update owner and refresh local cache
    await updateUser(user.id, newUser);
    await refreshUserData(user.id);
    // Update Visual state
    const { generalEditMode } = this.state;
    this.setState({ generalEditMode: !generalEditMode });
  };

  editButtonPressed = async () => {
    const { generalEditMode, updatefirstName, updatelastName } = this.state;
    if (generalEditMode) {
      // Validate data
      this.submitData(
        {
          firstName: updatefirstName,
          lastName: updatelastName
        },
        'general'
      );
    } else {
      // Change visual state
      this.setState({
        generalEditMode: true
      });
    }
  };

  populateUserInformation() {
    const { user } = this.props;
    // pulling in currently logged user from props (redux) and updating the empty strings.
    this.setState({
      updateFirstName: user.firstName,
      updateLastName: user.lastName,
      updateEmail: user.email,
      updateUserTypes: user.userTypes
    });
  }

  renderInputLabel(name, editmode) {
    const { [name]: value } = this.state;
    return (
      <div>
        {editmode ? (
          <input
            type="text"
            name={name}
            placeholder={value}
            value={value}
            onChange={this.handleChange}
          />
        ) : (
          <label className="settings-label">{value}</label>
        )}
      </div>
    );
  }

  render() {
    const {
      updateFirstName,
      updateLastName,
      updateEmail,
      updateUserTypes,
      generalEditMode
    } = this.state;
    const { user } = this.props;
    const credentials = getCredentials(user);

    return (
      <div className="user-profile">
        <div className="user-profile__header">
          <h2>Settings</h2>
          {isNSEVPUser(credentials) ? (
            <Button> Refresh Heavy Connect </Button>
          ) : null}
        </div>

        <div className="row">
          <div className="user-profile__icon">
            <img
              src={DefaultUserIcon}
              alt="DefaultUserIcon"
              className="user-profile__icon__photo"
            />
            <h3>{`${updateFirstName} ${updateLastName}`}</h3>
          </div>

          <div
            className={`user-profile__general-form settings-edit-${
              generalEditMode ? 'enabled' : 'disabled'
            }`}
          >
            <div className="user-profile__general-form__header">
              <h2>General</h2>
              <Button onClick={this.editButtonPressed}>
                {generalEditMode ? 'Save' : 'Edit'}
              </Button>
              <Button onClick={() => this.handleCancel()}>
                {generalEditMode ? 'Cancel' : null}
              </Button>

              {/** 
              <div className="user-profile__general-form__header__buttons">
                <button type="button" onClick={this.editButtonPressed}>
                  {generalEditMode ? 'Save' : 'Edit'}
                </button>
                <button
                  style={{ display: generalEditMode ? '' : 'none' }}
                  type="button"
                  onClick={() => this.handleCancel()}
                >
                  Cancel
                </button>
                
              </div>
              */}
            </div>
            <form>
              <div>
                <p>
                  <label htmlFor="updateName">
                    Name
                    <label className="settings-label">{`${updateFirstName} ${updateLastName}`}</label>
                    {/** {this.renderInputLabel('updateName', generalEditMode)} */}
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updateEmail">
                    Email
                    <label className="settings-label">{updateEmail}</label>
                    {/** {this.renderInputLabel('updateemail', generalEditMode)} */}
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updatePassword">
                    Password
                    <label className="settings-label">Password</label>
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updateCompany">
                    Organization
                    <label className="settings-label">{updateUserTypes}</label>
                    {/** {this.renderInputLabel('updateuserTypes', generalEditMode)} */}
                  </label>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});
export default connect(mapStateToProps)(UserProfile);
