import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '@lib/airtable/request';
import { refreshUserData } from '@lib/redux/userData';
import { validateField } from '@lib/validationUtils';
import EditButton from '@components/EditButton';
import '@styles/UserProfile.css';
import DefaultUserIcon from '@assets/defaultUserIcon-small.svg';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFirstName: '',
      updateLastName: '',
      updateEmail: '',
      generalEditMode: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.populateUserInformation('general');
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.populateUserInformation('general');
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
      if (type === 'general') {
        this.setState({ generalEditMode: !generalEditMode });
      }
    }
  };

  onGeneralButtonPressed = async () => {
    const { generalEditMode, updateFirstName, updateLastName } = this.state;
    if (generalEditMode) {
      // Validate data
      this.validateAndSubmitData(
        {
          firstName: updateFirstName,
          lastName: updateLastName
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
    if (type === 'general') {
      this.setState({
        updateFirstName: user.firstName,
        updateLastName: user.lastName,
        updateEmail: user.email
      });
    }
  };

  renderInputLabel(name, editable) {
    const { [name]: value, errors } = this.state;
    return (
      <span>
        {editable ? (
          <input
            type="text"
            name={name}
            placeholder={value}
            value={value}
            onChange={this.handleChange}
          />
        ) : (
          <label className="user-profile__general-label">{value}</label>
        )}
        {errors[name] && (
          <label style={{ color: 'red' }}>Error: {errors[name]}</label>
        )}
      </span>
    );
  }

  render() {
    const { updateFirstName, updateLastName, generalEditMode } = this.state;

    const { user } = this.props;

    return (
      <div className="user-profile">
        <div className="user-profile__header">
          <h2>Settings</h2>
        </div>
        <div className="user-profile__content">
          <div className="user-profile__icon">
            <img
              src={DefaultUserIcon}
              alt="DefaultUserIcon"
              className="user-profile__icon-photo"
            />
            <h3>{`${updateFirstName} ${updateLastName}`}</h3>
          </div>
          <div
            className={`user-profile__general edit-${
              generalEditMode ? 'enabled' : 'disabled'
            }`}
          >
            <div className="user-profile__general-header">
              <h2>General</h2>

              <div className="user-profile__general-header-buttons">
                <EditButton
                  label={generalEditMode ? 'Save' : 'Edit'}
                  onClick={this.onGeneralButtonPressed}
                />

                {generalEditMode ? (
                  <EditButton
                    label="Cancel"
                    onClick={() => this.handleCancel('general')}
                  />
                ) : null}

                {/** 
                <button type="button" onClick={this.onGeneralButtonPressed}>
                  {generalEditMode ? 'Save' : 'Edit'}
                </button>

                {generalEditMode ? (
                  <button
                    type="button"
                    onClick={() => this.handleCancel('general')}
                  >
                    Cancel
                  </button>
                  ) : null}
                  */}
              </div>
            </div>
            <form className="user-profile__general-content">
              <div>
                <p>
                  <label htmlFor="updateFirstName">
                    First Name
                    {this.renderInputLabel('updateFirstName', generalEditMode)}
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updateLastName">
                    Last Name
                    {this.renderInputLabel('updateLastName', generalEditMode)}
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updateEmail">
                    Email
                    <label className="user-profile__general-label">
                      {user.email}
                    </label>
                  </label>
                </p>
              </div>
              <div>
                <p>
                  <label htmlFor="updateOrganization">
                    Organization
                    <label className="user-profile__general-label">
                      {user.userTypes}
                    </label>
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
  // projectGroup: state.userData.projectGroup
});
export default connect(mapStateToProps)(UserProfile);
