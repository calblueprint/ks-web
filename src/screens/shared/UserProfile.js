import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '@lib/airtable/request';
import { refreshUserData } from '@lib/redux/userData';
import { validateField } from '@lib/utils';
import '@styles/UserProfilePage.css';
import DefaultUserIcon from '@assets/defaultUserIcon-small.svg';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateName: '',
      generalEditMode: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.populateUserInformation('both');
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.populateUserInformation('both');
    }
  }

  handleCancel = type => {
    this.setState({ [`${type}EditMode`]: false });
    this.populateUserInformation(type);
  };

  handleChange = event => {
    const target = event.target.name;

    this.setState({
      [target]: event.target.value
    });
  };

  validateAndSubmitData = async (newUser, type) => {
    const { user } = this.props;
    const errors = {};
    let foundErrors = false;
    const fields = Object.keys(newUser);

    const errorMessages = await Promise.all(
      fields.map(field => validateField(field, newUser[field]))
    );
    errorMessages.forEach((errorMessage, i) => {
      const fieldName = `update${fields[i].charAt(0).toUpperCase() +
        fields[i].slice(1)}`;
      errors[fieldName] = errorMessage;
      if (errorMessage !== '') {
        foundErrors = true;
      }
    });

    this.setState({
      errors
    });

    if (!foundErrors) {
      // Update user and refresh local cache
      await updateUser(user.id, newUser);
      await refreshUserData(user.id);

      // Update Visual state
      const { generalEditMode } = this.state;
      this.setState({ generalEditMode: !generalEditMode });
    }
  };

  onGeneralButtonPressed = async () => {
    const { generalEditMode, updateName } = this.state;
    if (generalEditMode) {
      // Validate data
      this.validateAndSubmitData(
        {
          Name: updateName
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

  populateUserInformation = type => {
    const { user } = this.props;
    if (type === 'general' || type === 'both') {
      this.setState({
        updateName: user.Name
      });
    }
  };

  renderInputLabel(name, editable) {
    const { [name]: value, errors } = this.state;
    return (
      <div>
        {editable ? (
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
        {errors[name] && (
          <label style={{ color: 'red' }}>Error: {errors[name]}</label>
        )}
      </div>
    );
  }

  render() {
    const { updateName, generalEditMode } = this.state;

    const { user } = this.props;

    return (
      <div className="dashboard settings">
        <div className="content">
          <div className="user-profile-settings-header">
            <h2>Settings</h2>
            <button type="button" className="user-profile-settings-refresh">
              Refresh Heavy Connect
            </button>
          </div>

          <div className="row">
            <div className="user-icon">
              <img
                src={DefaultUserIcon}
                alt="DefaultUserIcon"
                className="user-icon__photo"
              />
              <h3>Kevin Kelly</h3>
              {/**
               * {`${updateName}`}
               * */}
              <h4>CEO</h4>
            </div>

            <div
              className={`user-profile-general-form settings-edit-${
                generalEditMode ? 'enabled' : 'disabled'
              }`}
            >
              <div className="user-profile-general-form-header">
                <h2>General</h2>
                <div className="user-profile-general-form-header-buttons">
                  <button type="button" onClick={this.onGeneralButtonPressed}>
                    {generalEditMode ? 'Save' : 'Edit'}
                  </button>
                  <button
                    style={{ display: generalEditMode ? '' : 'none' }}
                    type="button"
                    onClick={() => this.handleCancel('general')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <form>
                <div>
                  <p>
                    <label htmlFor="updateName">
                      Name
                      {this.renderInputLabel('updateName', generalEditMode)}
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updateEmail">
                      Email
                      <label className="settings-label">{user.email}</label>
                    </label>
                  </p>
                </div>
                <div>
                  <p>
                    <label htmlFor="updatePassword">Password</label>
                  </p>
                </div>
                <div>
                  <p className="user-profile__company">
                    <label htmlFor="updateCompany">Organization</label>
                  </p>
                </div>
              </form>
            </div>
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
