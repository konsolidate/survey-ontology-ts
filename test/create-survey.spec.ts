import { QuestionFactory, SingleInputQuestion, SurveyProcedure, SurveyProcedureFactory } from '../src'
import { expect } from 'chai'
import { ttlSingleQuestionSurvey, turtleBasicSurvey } from './turtle-responses'

describe('Reading and parsing turtle files', () => {

  it('create a survey by factory method', async () => {
    const survey = SurveyProcedureFactory.fromId('newid')
    const ttl = survey.toTurtleString()

    expect(ttl).to.equal(turtleBasicSurvey)
  })

  it('create a survey with base class', () => {
    const s = new SurveyProcedure()
    s.id = 'newid'

    const ttl = s.toTurtleString()

    expect(ttl).to.equal(turtleBasicSurvey)
  })

  it('create a survey with 1 question', () => {
    const survey = SurveyProcedureFactory.fromId('newid')
    const question = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id'})

    survey.start = question
    const ttl = survey.toTurtleString()

    expect(ttl).to.contain(`question:question_id a survey:SingleInputQuestion;`)
    expect(ttl).to.contain(`survey:hasText "Where do you live?"^^xsd:string.`)
    expect(ttl).to.contain(`process:newid a survey:SurveyProcedure;`)
    expect(ttl).to.contain(`survey:startsWith question:question_id.`)
  })

  it('create a survey with 2 questions', () => {
    const survey = SurveyProcedureFactory.fromId('newid')
    const question1 = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id_1'})
    const question2 = QuestionFactory.singleInputQuestion({text: 'How old are you?', id: 'question_id_2'})

    survey.start = question1
    question1.next = question2

    const ttl = survey.toTurtleString()

    expect(ttl).to.contain(`process:newid a survey:SurveyProcedure;
    survey:startsWith question:question_id_1.`)
    expect(ttl).to.contain(`question:question_id_1 a survey:SingleInputQuestion;
    survey:hasText "Where do you live?"^^xsd:string;
    survey:leadsTo question:question_id_2.`)
    expect(ttl).to.contain(`question:question_id_2 a survey:SingleInputQuestion;
    survey:hasText "How old are you?"^^xsd:string.`)
  })

  it('create a survey with 2 questions by factory methods', () => {
    const question1 = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id_1'})
    const question2 = QuestionFactory.singleInputQuestion({text: 'How old are you?', id: 'question_id_2'})

    const survey = SurveyProcedureFactory.fromSurveyElements({id: 'newid', elements: [question1, question2]})

    const ttl = survey.toTurtleString()

    expect(ttl).to.contain(`process:newid a survey:SurveyProcedure;
    survey:startsWith question:question_id_1.`)
    expect(ttl, ttl).to.contain(`question:question_id_1 a survey:SingleInputQuestion;
    survey:hasText "Where do you live?"^^xsd:string;
    survey:leadsTo question:question_id_2.`)
    expect(ttl).to.contain(`question:question_id_2 a survey:SingleInputQuestion;
    survey:hasText "How old are you?"^^xsd:string.`)
  })

  it('create a survey with \'AddElement\' factory methods', () => {
    const factory = new SurveyProcedureFactory('newid')
    const question1 = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id_1'})
    const question2 = QuestionFactory.singleInputQuestion({text: 'How old are you?', id: 'question_id_2'})

    const procedure =
      factory
      .addElement(question1)
      .addElement(question2)
      .build()

    const ttl = procedure.toTurtleString()

    expect(ttl).to.contain(`process:newid a survey:SurveyProcedure;
    survey:startsWith question:question_id_1.`)
    expect(ttl, ttl).to.contain(`question:question_id_1 a survey:SingleInputQuestion;
    survey:hasText "Where do you live?"^^xsd:string;
    survey:leadsTo question:question_id_2.`)
    expect(ttl).to.contain(`question:question_id_2 a survey:SingleInputQuestion;
    survey:hasText "How old are you?"^^xsd:string.`)
  })

  describe('error handling', () => {
    it('create a survey with \'AddElement\' of same question should throw', () => {
      const factory = new SurveyProcedureFactory('newid')
      const question1 = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id_1'})

      const badFn = () => factory
      .addElement(question1)
      .addElement(question1)
      .build()

      expect(badFn).to.throw('Cannot add element. This will create a circular reference. Did you add the same question multiple times?')
    })

    it('create a survey with \'AddElement\' of same question in different order should throw', () => {
      const factory = new SurveyProcedureFactory('newid')
      const question1 = QuestionFactory.singleInputQuestion({text: 'Where do you live?', id: 'question_id_1'})
      const question2 = QuestionFactory.singleInputQuestion({text: 'How old are you?', id: 'question_id_2'})

      const badFn = () => factory
      .addElement(question1)
      .addElement(question2)
      .addElement(question1)
      .build()

      expect(badFn).to.throw('Cannot add element. This will create a circular reference. Did you add the same question multiple times?')
    })
  })

})
