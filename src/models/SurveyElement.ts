import { RdfProperty, XSDDataType } from '@consolidate/ts-rdf-mapper'

export abstract class SurveyElement {
  @RdfProperty({predicate: 'survey:hasText', xsdType: XSDDataType.XSD_STRING})
  text: string | undefined

  @RdfProperty({predicate: 'survey:leadsTo', clazz: SurveyElement})
  next: SurveyElement | undefined
}

