import React from 'react';
import { connect } from 'react-redux';
// import qs from 'qs';
import OnboardingData from './onboardingData';
import {
  validateField,
  updateUserFields,
  toggleValidColor,
  validateFieldSync
} from '../../lib/onboardingUtils';
import ProgressBar from './components/ProgressBar';
import Constants from '../../constants';
// import {
//   getPledgeInviteById,
//   updatePledgeInvite
// } from '../../lib/airtable/request';
import LoadingComponent from '../../components/LoadingComponent';

const { NSEVP_USER } = Constants;

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    // State should contain user values, error messages
    this.state = {
      user: {
        onboardingStep: 0,
        inviteToken: '',
        userTypes: [NSEVP_USER],
        isReceivingDividends: true,
        numberOfShares: 1
      },
      errors: {},
      loading: false
    };
  }

  componentDidMount() {
    this.refreshState();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      this.refreshState();
    }
  }

  // Get latest values from props
  refreshState = async () => {
    const { user } = this.props;

    // If there is a logged-in user, copy it to state
    if (user) {
      this.setState({
        user: {
          ...user
        }
      });
      // } else {
      //   // Otherwise, check for invite in query string
      //   const inviteToken = qs.parse(location.search, {
      //     ignoreQueryPrefix: true
      //   }).invite;

      //   if (inviteToken) {
      //     // Download pledge invite and update state
      //     const pledgeInvite = await getPledgeInviteById(inviteToken);
      //     if (pledgeInvite && pledgeInvite.status !== PLEDGE_INVITE_USED) {
      //       this.setState(prevState => ({
      //         user: {
      //           ...prevState.user,
      //           firstName: pledgeInvite.firstName,
      //           lastName: pledgeInvite.lastName,
      //           numberOfShares: pledgeInvite.shareAmount,
      //           isReceivingDividends: pledgeInvite.wantsDividends,
      //           phoneNumber: pledgeInvite.phoneNumber,
      //           email: pledgeInvite.email,
      //           // projectGroupId: pledgeInvite.projectGroupId,
      //           pledgeInviteId: pledgeInvite.id
      //         },
      //         inviteToken: pledgeInvite.id
      //       }));
      //     }
      //   }
    }
  };

  // Validate fields and update user if no errors
  nextStep = async event => {
    const { user } = this.state;
    if (event) {
      event.preventDefault();
    }

    // Keep track of whether we've found any errors
    let foundErrors = false;

    // For each field in this onboarding step, validate, and add to errors object
    const fieldsToValidate = OnboardingData[user.onboardingStep].fields;
    const allErrorMessages = await Promise.all(
      fieldsToValidate.map(f => validateField(f, user[f]))
    );
    const newErrors = {};
    allErrorMessages.forEach((errorMessage, i) => {
      const field = fieldsToValidate[i];
      newErrors[field] = errorMessage;
      if (errorMessage !== '') {
        foundErrors = true;
      }
    });
    this.setState({ errors: newErrors });
    if (!foundErrors) {
      this.setState({ loading: true });
      // Create/Update specific user fields
      // State should be refreshed when data is successfully pulled from redux

      const newUser = {
        ...user,
        onboardingStep: user.onboardingStep + 1
      };

      // If user had invite, skip project group step
      if (newUser.onboardingStep === 2 && newUser.pledgeInviteId) {
        newUser.onboardingStep += 1;
      }

      const fieldsToUpdate = [...OnboardingData[user.onboardingStep].fields];

      // Update extra fields if user has a valid invitation
      // if (inviteToken) {
      //   fieldsToUpdate.push('phoneNumber', 'pledgeInviteId');
      //   updatePledgeInvite(inviteToken, {
      //     status: PLEDGE_INVITE_USED
      //   });
      // }

      await updateUserFields(newUser, fieldsToUpdate);
      this.setState({ loading: false });
    }
  };

  // Decrement step, no validation or airtable update
  prevStep = event => {
    const { user } = this.state;
    event.preventDefault();

    // Decrement Step
    this.setState({
      user: { ...user, onboardingStep: user.onboardingStep - 1 }
    });
  };

  // Handle a change in a step component
  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    const newUser = { ...user };
    switch (name) {
      case 'certifyPermanentAddress':
      case 'bylaw1':
      case 'bylaw2':
        newUser[name] = event.target.checked;
        break;
      case 'isReceivingDividends':
        newUser[name] = value === 'on';
        break;
      case 'permanentStreet1':
      case 'permanentStreet2':
      case 'permanentCity':
      case 'permanentState':
      case 'permanentZipcode':
        if (user.mailingAddressSame) {
          const mailingKey = name.replace('permanent', 'mailing');
          newUser[mailingKey] = value;
        }
        newUser[name] = value;

        break;
      case 'mailingAddressSame':
        if (value) {
          newUser.mailingStreet1 = user.permanentStreet1;
          newUser.mailingStreet2 = user.permanentStreet2;
          newUser.mailingCity = user.permanentCity;
          newUser.mailingState = user.permanentState;
          newUser.mailingZipcode = user.permanentZipcode;
          newUser.mailingAddressSame = event.target.checked;
        }
        break;
      default:
        newUser[name] = value;
    }
    this.setState({ user: newUser });
  };

  handleChangeBylaw = async event => {
    const { name } = event.target;
    const { user, errors } = this.state;
    const newUser = { ...user };
    newUser[name] = event.target.checked;
    this.setState({ user: newUser });
    const fieldsToValidate = ['bylaw1', 'bylaw2'];
    const allErrorMessages = fieldsToValidate.map(f =>
      validateFieldSync(f, user[f])
    );
    const newErrors = {};
    allErrorMessages.forEach((errorMessage, i) => {
      const field = fieldsToValidate[i];
      newErrors[field] = errorMessage;
    });
    this.setState({ errors: { ...errors, [name]: newErrors[newUser[name]] } });
  };

  onFinish = () => {
    const { user } = this.state;
    const newUser = { ...user, onboardingStep: -1 };

    // Should trigger redux refresh navigating user away from onboarding
    updateUserFields(newUser, []);
  };

  // Render the component based on the user's onboarding step
  render() {
    const { history } = this.props;
    const { user, errors, loading } = this.state;
    const stepData = OnboardingData[user.onboardingStep];
    const StepComponent = stepData.component;
    const showStyles = user.onboardingStep > 0;
    if (loading) {
      return <LoadingComponent />;
    }
    return (
      <div
        className={showStyles ? 'flex onboarding-col template-center w-70' : ''}
      >
        {showStyles && (
          <div className="template-card">
            <h1 className="template-header">{stepData.header}</h1>
            <p className="template-body">{stepData.copy}</p>
            <ProgressBar step={user.onboardingStep} />
          </div>
        )}
        <StepComponent
          user={user}
          errors={errors}
          onSubmit={this.nextStep}
          onBack={this.prevStep}
          onFinish={this.onFinish}
          handleChange={this.handleChange}
          handleChangeBylaw={this.handleChangeBylaw}
          toggleValidColor={toggleValidColor}
          history={history}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData.user
});
export default connect(mapStateToProps)(Onboarding);
