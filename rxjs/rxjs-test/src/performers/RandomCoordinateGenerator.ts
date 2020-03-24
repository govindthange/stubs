import { Performer } from './Performer';
import { range } from 'rxjs';



class RandomCoordinateGenerator implements Performer {

    constructor(config: any) {
        var observable = range(1, config.density);        
        observable.subscribe(
            (x: any) => console.log(x)
        )
    }

    perform() {
        return "Tie subscriber to observable so that it reacts upon call to perform() function.";
    }
}

export { RandomCoordinateGenerator as RCGenerator };