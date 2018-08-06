import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';
// import * as ICON from 'shared/constants/icons';

describe('<Button />', () => {
    it('it renders Button', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders children', () => {
        const wrapper = shallow(<Button>button</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    // it('it renders icon', () => {
    //     const wrapper = mount(<Button iconId={ICON.ICON_MAIN_PAGE_LOGIN_32}/>);
    //     expect(wrapper).toMatchSnapshot();
    // });

    it('it renders tag a', () => {
        const wrapper = mount(<Button href="http://moscow.megafon.ru/" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it calls click handler', () => {
        const onClick = jest.fn();
        const wrapper = mount(<Button href="http://moscow.megafon.ru/" onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick.mock.calls).toHaveLength(1);
    });
});
