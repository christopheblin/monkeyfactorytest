## Installation & Runtime

You should have NPM installed and use the usual way

    $> npm install

To run the server on localhost:3000

    $> npm run start

## Examples

http://localhost:3000/demo/2021-02-09

=> {"romanDateStr":"IX/II/MMXXI","receivedDateStr":"2021-02-09"}

## Problème avec NestJS HttpModule

J'ai essayé d'implémenter la récupération de la température min / max à paris avec MetaWeather.

Aucun pb pour trouver dans la doc la route à appeler (après avoir hardcodé le woeid que j'ai trouvé via https://www.metaweather.com/api/location/search/?query=paris)

En substance, je voulais faire un service dédié et utiliser subscribe + pipe (comme je fais en Angular) :

	@Injectable()
	export class TemperatureInParisService {
	  constructor(private httpService: HttpService) {}

	  retieveTemperaturesInParis(date: Date): Observable<ParisTemperature> {
		  const parisWoeid = 615702; //hardcoded for test purposes
		  const year = date.getFullYear();
		  const month = date.getMonth() + 1;
		  const day = date.getDate();
		  return this.httpService.get(
			  `https://www.metaweather.com/api/location/${parisWoeid}/${year}/${month}/${day}/`,
		  )
		  .pipe(map((response) => <ParisTemperature>{ min: response.data[0].min_temp, max: response.data[0].max_temp, ));
	  }
	}

Cependant, une fois que j'injecte TemperatureInParisService dans mon AppController et que je transforme ma méthode pour retourner un Observable de DemoResponse, ma route ne retourne plus rien ...

De ce que je comprends, il faut que je 'complete' manuellement l'Observable après le subscribe, mais je trouve étonnant de devoir faire comme ça donc il faudarit me montrer comment vous faites habituellement pour que le controller "déclenche" la réponse (la doc de NestJs est un peu succinte sur ce point).

Note : et dans les tests, j'avais fait

      .overrideProvider(TemperatureInParisService)
      .useClass(DummyTemperatureInParisService)

afin de pouvoir retourner en dur -20 / 40 pour mon et max et ne pas faire de requete HTTP durant les test unitaires
