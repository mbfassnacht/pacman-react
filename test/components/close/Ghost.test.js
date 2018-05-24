// Close.test.js
import React from 'react';
import Ghost from '../../../src/scripts/components/Ghost/ghost.jsx';
import renderer from 'react-test-renderer';

test('Ghost changes the class when hovered', () => {
    debugger;
    const component = renderer.create(
    <Ghost page="http://www.facebook.com">Facebook</Ghost>,
    );
    let closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();

    closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();

    // manually trigger the callback
    closeComponent.props.onMouseLeave();
    // re-rendering
    closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();
});
