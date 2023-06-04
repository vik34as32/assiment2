import React, { useState } from 'react'
import validationSchema from '../Component/Validation/validation'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';




const UserFromData = () => {
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        dateOfBirth: '',
        residentialStreet1: '',
        residentialStreet2: '',
        permanentStreet1: '',
        permanentStreet2: '',
        sameAsResidential: false,
    });
    const [inpufields, setinputFields] = useState([{ filename: '', option: '', file: null, error: '' }]);





    const handleInputChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        const fieldValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: fieldValue,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        validationSchema
            .validate(formValues,inpufields, { abortEarly: false })
            .then(() => {
                // Valid form submission
                alert('Form submitted successfully!');
            })
            .catch((validationErrors) => {

                const errorsObj = {};
                validationErrors.inner.forEach((error) => {
                    errorsObj[error.path] = error.message;
                });
                setErrors(errorsObj);
            });
    };
    const handleSameAsResidentialChange = (event) => {
        const checked = event.target.checked;
        setFormValues((prevValues) => ({
            ...prevValues,
            sameAsResidential: checked,
            permanentStreet1: checked ? prevValues.residentialStreet1 : '',
            permanentStreet2: checked ? prevValues.residentialStreet2 : '',
        }));

        if (checked) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                permanentStreet1: '',
                permanentStreet2: '',
            }));
        }
    };


    const handleFileChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...inpufields];
        updatedFields[index] = { ...updatedFields[index], [name]: value };
        console.log(updatedFields, "updatedFields updatedFields ")

        if (name === 'file') {
            const files = event.target.files;
            if (files.length > 0) {
                const fileType = files[0].type;
                const validFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];

                if (!validFileTypes.includes(fileType)) {
                    updatedFields[index].error = 'Invalid file type. Please upload a PDF, JPEG, or PNG file.';
                    updatedFields[index].file = null;
                    updatedFields[index].filename = '';
                } else {
                    updatedFields[index].file = files[0];
                    updatedFields[index].filename = files[0].name;
                    updatedFields[index].error = '';
                }
            }
        }

        setinputFields(updatedFields);
    };



    const addField = () => {
        setinputFields([...inpufields, { filename: '', filetype: '', file: '' }]);
    };

    const removeField = (index) => {
        const updatedFields = [...inpufields];
        updatedFields.splice(index, 1);
        setinputFields(updatedFields);
    };


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name:<span className='text-danger display-3'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    value={formValues.firstname}
                                    onChange={handleInputChange}
                                />
                                <span className='text-danger'>{errors.firstname && <Form.Text className='text-danger display-3'>{errors.firstname}</Form.Text>}</span>
                            </Form.Group>
                        </Col>
                        <Col>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name: <span className='text-danger display-3'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={formValues.lastname}
                                    onChange={handleInputChange}
                                />
                                {errors.lastname && <Form.Text className='text-danger display-3'>{errors.lastname}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email: <span className='text-danger display-3'>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <Form.Text className='text-danger display-3'>{errors.email}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formDateOfBirth">
                                <Form.Label>Date of Birth: <span className='text-danger display-3'>*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={formValues.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                                {errors.dateOfBirth && <Form.Text className='text-danger display-3'>{errors.dateOfBirth}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container>
                    <h5>Residential Address</h5>
                    <Row>
                        <Col>
                            <Form.Group controlId="formResidentialStreet1">
                                <Form.Label>Street1:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="residentialStreet1"
                                    value={formValues.residentialStreet1}
                                    onChange={handleInputChange}
                                />
                                {errors.residentialStreet1 && (
                                    <Form.Text className='text-danger'>{errors.residentialStreet1}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formResidentialStreet2">
                                <Form.Label>Street2:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="residentialStreet2"
                                    value={formValues.residentialStreet2}
                                    onChange={handleInputChange}
                                />
                                {errors.residentialStreet2 && (
                                    <Form.Text className='text-danger'>{errors.residentialStreet2}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>

                <Form.Group controlId="formSameAsResidential">
                    <Form.Check
                        type="checkbox"
                        name="sameAsResidential"
                        checked={formValues.sameAsResidential}
                        onChange={handleSameAsResidentialChange}
                        label="Same as Residential"
                    />
                </Form.Group>

                <Container>
                    <h5> PermaNent Residential Address</h5>
                    <Row>
                        <Col>
                            <Form.Group controlId="formPermanentStreet1">
                                <Form.Label>Permanent Street1:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="permanentStreet1"
                                    value={formValues.permanentStreet1}
                                    onChange={handleInputChange}
                                    disabled={formValues.sameAsResidential}
                                />
                                {errors.permanentStreet1 && (
                                    <Form.Text className='text-danger'>{errors.permanentStreet1}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formPermanentStreet2">
                                <Form.Label>Permanent Street2:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="permanentStreet2"
                                    value={formValues.permanentStreet2}
                                    onChange={handleInputChange}
                                    disabled={formValues.sameAsResidential}
                                />
                                {errors.permanentStreet2 && (
                                    <Form.Text className='text-danger'>{errors.permanentStreet2}</Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container>

                    {inpufields.map((field, index) => {
                        return (
                            <>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFilename">
                                            <Form.Label>Filename:<span className='text-danger display-3'>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="filename"
                                                value={field.filename}
                                                onChange={(event) => { handleInputChange(index, event) }}
                                            />
                                            {errors.filename && <Form.Text>{errors.filename}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formFiletype">
                                            <Form.Label>Filetype:<span className='text-danger display-3'>*</span></Form.Label>
                                            <Form.Select name='option' value={field.option} onChange={(event) => { handleFileChange(index, event) }} required>
                                                <option value="application/image">Select an option</option>
                                                <option value="application/pdf">PDF</option>
                                                <option value="application/image">Image</option>

                                            </Form.Select>

                                            {errors.filetype && <Form.Text>{errors.filetype}</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formDocument">
                                            <Form.Label>Upload Document:<span className='text-danger display-3'>*</span></Form.Label>
                                            {field.option === 'application/pdf' ? (
                                                <Form.Control
                                                    type="file"
                                                    name="file"
                                                    accept="application/pdf"
                                                    onChange={(event) => { handleFileChange(index, event) }}
                                                  

                                                />
                                            ) : field.option === 'application/image' ? (
                                                <Form.Control
                                                    type="file"
                                                    name="file"
                                                    accept="image/*"
                                                    onChange={(event) => { handleFileChange(index, event) }}
                                                   
                                                />
                                            ) : <Form.Control
                                                type="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={(event) => { handleFileChange(index, event) }}
                                        
                                            />}
                                            {errors.document && <Form.Text>{errors.document}</Form.Text>}
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group controlId="formDocument">
                                            {index == 0 ? <Button className='btn btn-dark' onClick={addField}> <FontAwesomeIcon icon={faPlus} /></Button> : <Button className='btn btn-dark' onClick={() => { removeField(index) }}> <FontAwesomeIcon icon={faTrash} /></Button>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        )
                    })}

                </Container>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </>
    )
}


export default UserFromData