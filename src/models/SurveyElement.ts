import { RdfProperty, XSDDataType } from 'ts-rdf-mapper'
import { RdfDescription } from './ExportOptions'

export abstract class SurveyElement implements RdfDescription {
  @RdfProperty({predicate: 'survey:hasText', xsdType: XSDDataType.XSD_STRING})
  text: string | undefined

  @RdfProperty({predicate: 'survey:leadsTo', clazz: SurveyElement})
  next: SurveyElement | undefined

  abstract bean;
}

