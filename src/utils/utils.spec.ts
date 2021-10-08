import { formatPrice } from ".";
describe("#Utils", () => {
  it("Should format price for currencies like USD, SGD, CNY by rounding to their nearest dollar", () => {
    const sgd = formatPrice("SGD", 1000012.1251);
    const usd = formatPrice("SGD", 1000012.1251);
    const cny = formatPrice("SGD", 1000012.1251);

    expect(sgd).toBe(1000012);
    expect(usd).toBe(1000012);
    expect(cny).toBe(1000012);
  });

  it("Should format price for currency KRW by rounding to their nearest hundred dollar", () => {
    const krw = formatPrice("KRW", 1000062.1251);
    expect(krw).toBe(1000100);
  });
});
