import { uniqueNamesGenerator, names } from "unique-names-generator"

const uniqueNamesGeneratorConfig = {
  dictionaries: [names],
}
export const getName = () => uniqueNamesGenerator(uniqueNamesGeneratorConfig)
