export const turtleBasicSurvey =
  `@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix survey: <https://w3id.org/survey-ontology#>.
@prefix process: <http://purl.org/wf4ever/wfdesc#Process>.
@prefix tsRdfMapper: <http://ts-rdf-mapper.com#>.

process:newid a survey:SurveyProcedure.
`

export const ttlSingleQuestionSurvey =
  `@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix survey: <https://w3id.org/survey-ontology#>.
@prefix process: <http://purl.org/wf4ever/wfdesc#Process>.
@prefix tsRdfMapper: <http://ts-rdf-mapper.com#>.
@prefix question: <http://schema.org/Question>.

question:question_id a survey:SingleInputQuestion;
    survey:hasText "Where do you live?"^^xsd:string.
process:newid a survey:SurveyProcedure;
    survey:startsWith question:question_id.
`
