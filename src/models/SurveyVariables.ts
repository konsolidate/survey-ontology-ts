import { RdfBean, RdfPrefixes, RdfSubject } from 'ts-rdf-mapper'
import { RdfDescription } from './ExportOptions'


@RdfPrefixes({
  'survey': 'https://w3id.org/survey-ontology#',
  'rv': 'http://w3id.org/rv-ontology#'
}) @RdfBean('survey:ObservableVariable')
export class ObservableVariable implements RdfDescription {
  @RdfSubject('rv')
  variable: string | undefined

  get bean(): string {
    return "https://w3id.org/survey-ontology#ObservableVariable"
  }
}






