import React, { useState } from 'react';
import axios from 'axios';
import './form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    address: '',
    payment: ''
  });

  const validationRules = {
    name: {
      required: true,
      errorMessage: 'Please enter your name.',
    },
    email: {
      required: true,
      pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      errorMessage: 'Please enter a valid email address.',
    },
    payment: {
      required: true,
      errorMessage: 'Please select a payment method.',
    },
    address: {
      required: true,
      errorMessage: 'Please enter your address.',
    },
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
  
    for (const field in validationRules) {
      if (validationRules.hasOwnProperty(field)) {
        const value = formData[field];
  
        newErrors[field] = '';
  
        if (validationRules[field].required && !value.trim()) {
          newErrors[field] = validationRules[field].errorMessage;
          isValid = false;
        }
  
        if (
          validationRules[field].pattern &&
          !validationRules[field].pattern.test(value)
        ) {
          newErrors[field] = validationRules[field].errorMessage;
          isValid = false;
        }
      }
    }
  
    setErrors(newErrors);
  
    return isValid;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if(validateForm()){
      const response = await axios.post('http://localhost:2000/order', {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        payment: formData.payment
      });
      alert('Order Placed Successfully');
    
      console.log(response.data); // Handle the response as needed
    }
    console.log("Form is invalid");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="container">
  <form onSubmit={handleSubmit}>
  <div className="row">
    <div class="col-25">
      <label for="fname">Name</label>
    </div>
    <div className="col-75">
      <input type="text" id="fname" name="name" value= {formData.name} onChange={handleChange} placeholder="Your name.."/>
      {errors.name && <span>{errors.name}</span>}
    </div>
  </div>
  <div className="row">
    <div class="col-25">
      <label for="lname">Email</label>
    </div>
    <div className="col-75">
      <input type="email" id="lname" name="email" value= {formData.email} onChange={handleChange} placeholder="Your email.."/>
        {errors.email && <span>{errors.email}</span>}
    </div>
  </div>
  <div className="row">
    <div class="col-25"> 
      <label for="country">Payment Method</label>
    </div>
    <div class="col-75">
      <select id="payment" name="payment" value= {formData.payment} onChange={handleChange}>
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Online">Online</option>
        <option value="Other">Other</option>
      </select>
        {errors.payment && <span>{errors.payment}</span>}
    </div>
  </div>
  <div class="row">
    <div class="col-25">
      <label for="subject">Shipping Address</label>
    </div>
    <div class="col-75">
      <textarea id="address" name="address" value= {formData.address} onChange={handleChange} placeholder="Your Address.." style={{height:'200px'}}></textarea>
        {errors.address && <span>{errors.address}</span>}
    </div>
  </div>
  <br/>
  <div class="row">
    <input type="submit" value="Buy Now"/>
  </div>
  </form>
</div>
  );
};

export default Form;
