import _ from "lodash"

export default {
    isEquals(value1: any, value2: any) {
        return _.isEqual((typeof value1 !== "undefined" && value1 !== null ? value1.toString() :  ""), (typeof value2 !== "undefined" && value2 !== null ? value2.toString() : ""))
    }
}