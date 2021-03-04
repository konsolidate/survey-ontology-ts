import { RdfBean, RdfPrefixes, RdfSubject } from '@consolidate/ts-rdf-mapper'


@RdfPrefixes({
  'survey': 'https://w3id.org/survey-ontology#',
  'rv': 'http://w3id.org/rv-ontology#'
}) @RdfBean('survey:ObservableVariable')
export class ObservableVariable {
  @RdfSubject('rv')
  variable: string | undefined
}






