import * as Yup from 'yup'


const validationSchema  =Yup.object().shape({
    firstname:Yup.string().required('firstname is required'),
    lastname:Yup.string().required('lastname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth must be before the current date')
    .test('minimum-age', 'Minimum age should be 18 years', function (value) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return value <= minDate;
      })
    .required('Date of birth is required'),
    Street1:Yup.string().required('required'),
    Street2:Yup.string().required('required'),
    filename: Yup.string().required('Filename is required'),
    option: Yup.string().required('Filetype is required'),
    file: Yup.mixed().required('Document upload is required'),
})


export default validationSchema