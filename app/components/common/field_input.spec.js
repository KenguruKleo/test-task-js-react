import React from 'react';
import { shallow } from 'enzyme';
import FieldInput from './field_input';

function setup() {

    const props = {
        type: "email",
        meta: {touched: true, error: 'some error'}
    };

    const enzymeWrapper = shallow(
        <FieldInput {...props} />
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('OfferProperties', () => {

        it('should render self', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('FormControl').length).toBe(1);
        });

        it('should render Alert', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('Alert').length).toBe(1);
        });

        it('should render Alert with error text', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('Alert').find('span').text()).toBe("some error");
        });

    })
});