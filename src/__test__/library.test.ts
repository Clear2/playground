import DummyClass from "../library"

describe("Dummy test", () => {
    it("works if true is truthy", () => {
        expect(true).toBeTruthy()
    })

    it("DummyClass is intantiable", () =>{
        expect(new DummyClass()).toBeInstanceOf(DummyClass)
    })
})