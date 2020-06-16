import DummyClass from "../src/library"

describe("Dummy test", () => {
    it("works if true is truthy", () => {
        expect(true).toBeTruthy()
    })

    it("DummyClass is intantiable", () =>{
        expect(new DummyClass()).toBeInstanceOf(DummyClass)
    })
})