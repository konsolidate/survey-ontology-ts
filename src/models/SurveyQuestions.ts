import { RdfBean, RdfPrefixes, RdfProperty, RdfSubject } from '@consolidate/ts-rdf-mapper'
import shortid from 'shortid'
import { SurveyElement } from './SurveyElement'
import { ObservableVariable } from './SurveyVariables'


abstract class Question extends SurveyElement {
  @RdfProperty({
    predicate: 'survey:hasObservableVariable',
    clazz: ObservableVariable
  })
  observableVariable: ObservableVariable | undefined
}

abstract class OpenQuestion extends Question {}
abstract class ClosedQuestion extends Question {}

// @RdfPrefixes({
//   'survey': 'https://w3id.org/survey-ontology#',
//   'question': 'http://schema.org/Question'
// })
// @RdfBean('survey:MultipleInputQuestion')
// class MultipleInputQuestion extends OpenQuestion {
//   @RdfSubject('question')
//   id: string | undefined
// }

@RdfPrefixes({
  'survey': 'https://w3id.org/survey-ontology#',
  'question': 'http://schema.org/Question'
})
@RdfBean('survey:SingleInputQuestion')
export class SingleInputQuestion extends OpenQuestion {
  @RdfSubject('question')
  id: string | undefined
}


export class QuestionFactory {
  static singleInputQuestion({id = shortid(), text}: {id: string, text: string}): SingleInputQuestion {
    if (!text) {
      throw new Error("No text provided for singleInputQuestion")
    }
    const q = new SingleInputQuestion()
    q.id = id
    q.text = text
    return q
  }
}
