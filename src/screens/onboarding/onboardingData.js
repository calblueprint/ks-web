import ContactInfoStep from './steps/ContactInfoStep';
import BasicInfoStep from './steps/BasicInfoStep';
import CompleteStep from './steps/CompleteStep';
import BylawStep from './steps/BylawStep';

// Maps Step to Component and Fields via Indices
const OnboardingData = [
  {
    component: BasicInfoStep,
    fields: [
      'firstName',
      'lastName',
      'email',
      'alternateEmail',
      'password',
      'userTypes',
      'isReceivingDividends',
      'numberOfShares'
    ],
    copy: '',
    header: ''
  },
  {
    component: ContactInfoStep,
    fields: [
      'permanentStreet1',
      'permanentStreet2',
      'permanentCity',
      'permanentState',
      'permanentZipcode',
      'mailingStreet1',
      'mailingStreet2',
      'mailingCity',
      'mailingState',
      'mailingZipcode',
      'phoneNumber',
      'mailingAddressSame',
      'certifyPermanentAddress'
    ],
    copy:
      'Tell us some general contact information so we can get started setting up your account.',
    header: 'Welcome Aboard!'
  },
  {
    component: BylawStep,
    fields: ['bylaw1', 'bylaw2'],
    copy: '',
    header: 'User Agreement and Acknowledgment'
  },
  {
    component: CompleteStep,
    fields: [],
    copy:
      'Great! Congrats on finishing onboarding. Click to go to your dashboard!',
    header: 'Registration complete!'
  }
];

export default OnboardingData;
