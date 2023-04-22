import assert from "assert"
import request from "supertest"
import app from "../../src/index"

jest.mock('../../src/utils/secrets')

const checkSuccessAndUp = (url: string) => () => {
  return request(app)
    .get(url)
    .then((response) => {
      assert.strictEqual(response.status, 200)
      assert.strictEqual(response.body.status, "up")
    })
}

describe("testing items ", () => {

  it("health-check should return Success",
    checkSuccessAndUp("/api/v1/health-check")
  )
  it("liveness should return Success",
    checkSuccessAndUp("/api/v1/liveness")
  )
  it("readiness should return Success",
    checkSuccessAndUp("/api/v1/readiness")
  )
})
