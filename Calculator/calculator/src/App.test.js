import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// This API is use to provide the link to component

Enzyme.configure({ adapter: new Adapter() });
describe("App Component Testing", () => {

  it("Calculator App render successfully testing", () => {
    let wrapper = shallow(<App />)
    let text = wrapper.find("h1").text();
    expect("Simple Calculator").toBe(text);
  })

  it("Addition operation testing", () => {
    let wrapper = shallow(<App />)
    let ref = wrapper.instance();
    expect(16).toBe(ref.getResult('8+8'));
  })

  it("Subtraction operation testing", () => {
    let wrapper = shallow(<App />)
    let ref = wrapper.instance();
    expect(0).toBe(ref.getResult('8-8'));
  })

  it("Multiplication operation testing", () => {
    let wrapper = shallow(<App />)
    let ref = wrapper.instance();
    expect(64).toBe(ref.getResult('8*8'));
  })

  it("Division operation testing", () => {
    let wrapper = shallow(<App />)
    let ref = wrapper.instance();
    expect(1).toBe(ref.getResult('8/8'));
  })

  it("Clean the box testing", () => {
    let wrapper = shallow(<App />)
    let text = wrapper.find("input").text();
    expect("").toBe(text);
  })
})
