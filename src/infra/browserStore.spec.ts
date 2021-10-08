import { browserStore } from "./browserStore";

describe("#BrowerStore", () => {
  let localStorageOld = localStorage.__proto__;
  let getSpy: jest.SpyInstance;

  beforeAll(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    localStorage.__proto__ = localStorageMock;
    getSpy = jest.spyOn(localStorage.__proto__, "getItem");
  });

  afterAll(() => {
    localStorage.__proto__ = localStorageOld;
  });

  it("should set store item correctly", () => {
    browserStore.setItem("foo", "bar");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "foo",
      JSON.stringify("bar")
    );
  });

  it("should get store item correctly", () => {
    const mockData = JSON.stringify({ data: "value" });
    getSpy.mockReturnValueOnce(mockData);
    expect(browserStore.getItem("someKey")).toMatchObject({ data: "value" });
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it("should remove store item correctly", () => {
    browserStore.removeItem("foo");
    expect(localStorage.removeItem).toHaveBeenCalledWith("foo");
  });

  it("should clear the store correctly", () => {
    browserStore.clear();
    expect(localStorage.clear).toBeCalled();
  });
});
