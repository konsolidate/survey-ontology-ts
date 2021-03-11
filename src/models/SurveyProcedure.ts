import { RdfBean, RdfMapper, RdfPrefixes, RdfProperty, RdfSubject, XSDDataType } from 'ts-rdf-mapper'
import { Parser, Quad } from 'n3'
import shortid from 'shortid'
import { ExportOptions, RdfDescription } from './ExportOptions'
import { SurveyElement } from './SurveyElement'


@RdfPrefixes({
  'survey': 'https://w3id.org/survey-ontology#',
  'process': 'http://purl.org/wf4ever/wfdesc#Process'
})
@RdfBean('survey:SurveyProcedure')
export class SurveyProcedure implements ExportOptions, RdfDescription {

  @RdfSubject('process')
  id: string | undefined

  @RdfProperty({predicate: 'survey:startsWith', clazz: SurveyElement})
  start: SurveyElement | undefined

  @RdfProperty({predicate: 'survey:hasStatus', xsdType: XSDDataType.XSD_STRING})
  status: string | undefined

  get bean(): string {
    return "https://w3id.org/survey-ontology#SurveyProcedure"
  }

  toTurtleString(): string {
    return RdfMapper.serialize(this)
  }

  toQuads(): Quad[] {
    const p = new Parser()
    return p.parse(this.toTurtleString())
  }
}

export class SurveyProcedureFactory {
  private readonly procedure: SurveyProcedure

  static fromId(id: string = shortid()): SurveyProcedure {
    const s = new SurveyProcedure()
    s.id = id;
    return s;
  }

  static fromSurveyElements({id = shortid(), elements}: {id?: string , elements: SurveyElement[]}): SurveyProcedure {
    let factory = new SurveyProcedureFactory(id)

    elements.forEach(e => {
      factory = factory.addElement(e)
    })

    return factory.build();
  }

  constructor(id: string = shortid()) {
    this.procedure = SurveyProcedureFactory.fromId(id)
  }

  addElement(element: SurveyElement): SurveyProcedureFactory {
    const existingElements = []
    if (!this.procedure.start) {
      this.procedure.start = element
      return this;
    }

    let el = this.procedure.start
    existingElements.push(el)
    while (el.next !== undefined) {
      el = el.next
      existingElements.push(el)
    }

    if (existingElements.includes(element)) {
      throw new Error('Cannot add element. This will create a circular reference. Did you add the same question multiple times?')
    }
    el.next = element
    return this;
  }

  build(): SurveyProcedure {
    return this.procedure;
  }
}



