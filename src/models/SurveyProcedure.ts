import { RdfBean, RdfMapper, RdfPrefixes, RdfProperty, RdfSubject, XSDDataType } from '@consolidate/ts-rdf-mapper'
import shortid from 'shortid'
import { ExportOptions } from './ExportOptions'
import { SurveyElement } from './SurveyElement'


@RdfPrefixes({
  'survey': 'https://w3id.org/survey-ontology#',
  'process': 'http://purl.org/wf4ever/wfdesc#Process'
})
@RdfBean('survey:SurveyProcedure')
export class SurveyProcedure implements ExportOptions {

  @RdfSubject('process')
  id: string | undefined

  @RdfProperty({predicate: 'survey:startsWith', clazz: SurveyElement})
  start: SurveyElement | undefined

  @RdfProperty({predicate: 'survey:hasStatus', xsdType: XSDDataType.XSD_STRING})
  status: string | undefined

  toTurtleString(): string {
    return RdfMapper.serialize(this)
  }
}

export class SurveyProcedureFactory {
  static fromId(id: string = shortid()): SurveyProcedure {
    const s = new SurveyProcedure()
    s.id = id;
    return s;
  }
}


// export class SurveyProcedureWrapper {
//
//   public surveyProcedure: SurveyProcedure
//
//   constructor(id: string) {
//     if (!id) {
//       throw new Error("No id provided")
//     }
//     this.surveyProcedure = new SurveyProcedure()
//     this.surveyProcedure.id = id;
//   }
//
//   static fromId(id: string = shortid()): SurveyProcedureWrapper {
//
//   }
// }



