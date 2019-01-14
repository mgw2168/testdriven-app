import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Form from '../Form'


const testData = [
  {
    formType: 'Register',
    formData: {
      username: '',
      email: '',
      password: ''
    },
  },
  {
    formType: 'Login',
    formData: {
      email: '',
      password: ''
    },
  }
];

testData.forEach((el) => {
  test(`${el.formType} Form renders properly`, () => {
    const component = <Form formType={'Register'} formData={formData} />
    const wrapper = shallow(component);
    const h1 = wrapper.find('h1');
    expect(h1.length).toBe(1);
    expect(h1.get(0).props.children).toBe('Register');
    const formGroup = wrapper.find('.field');
    expect(formGroup.length).toBe(3);
    expect(formGroup.get(0).props.children.props.name).toBe('username');
    expect(formGroup.get(0).props.children.props.value).toBe('');
    expect(formGroup.get(0).props.children.props.value).toBe('');
  });
  test(`${el.formType} Form renders properly`, () => {
  const component = <Form formType={'Login'} formData={formData}/>;
  const wrapper = shallow(component);
  const h1 = wrapper.find('h1');
  expect(h1.length).toBe(1);
  expect(h1.get(0).props.children).toBe('Login');
  const formGroup = wrapper.find('.field');
  expect(formGroup.length).toBe(2);
  expect(formGroup.get(0).props.children.props.name).toBe('email');
  expect(formGroup.get(0).props.children.props.value).toBe('');
});

test(`${el.formType} Form renders a snapshot properly`, () => {
  const component = <Form formType={'Register'} formData={formData} />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test(`${el.formType} Form renders a snapshot properly`, () => {
  const component = <Form formType={'Login'} formData={formData} />;
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
});



