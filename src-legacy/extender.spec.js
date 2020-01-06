import createExtender from './extender';

class BaseClass {
  alpha() {
    return 1;
  }
  zeta() {
    return 3;
  }
}

class SuperClassLeft extends BaseClass {
  alpha() {
    return 4;
  }
  zeta() {
    return 5;
  }
}

class SuperClassRight extends BaseClass {
  beta() {
    return 6;
  }
  zeta() {
    return 7;
  }
}

describe('extender', () => {
  const extender = createExtender(SuperClassLeft, SuperClassRight, {
    omega() {
      return 8;
    },
  });
  it('should have alpha from SuperClassLeft', () => {
    expect(extender('alpha').call({})).toEqual(4);
  });
  it('should have beta from SuperClassRight', () => {
    expect(extender('beta').call({})).toEqual(6);
  });
  it('should have zeta from SuperClassLeft', () => {
    expect(extender('zeta').call({})).toEqual(5);
  });
  it('should have omega from Anon', () => {
    expect(extender('omega').call({})).toEqual(8);
  });
});
