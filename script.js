ymaps.ready(init);
function init() {
    var pointZhukova = [51.31093697, 37.88052742],
        pointOlminskogo = [51.31126982, 37.87902002],
        pointOlimpiyskiy = [51.30565938, 37.88637232],
        pointKoroleva = [51.31087609, 37.89849798],
        pointSolnechniy = [51.31590854, 37.89294313],
        pointMakarenko = [51.31160914, 37.87977001],
        pointLog = [51.31676928, 37.89199321],
        pointVostochny = [51.31184244, 37.90776432],
        pointStepnoy = [51.31377998, 37.91539877],
        pointKosmos = [51.30343228, 37.89962900],
        pointDubrava3 = [51.31048130, 37.91541486],
        pointMaslozavod = [51.30716895, 37.86677088],
        pointPushkarskay = [51.30692014, 37.86675478],
        pointPrydchenko = [51.30683944, 37.86711956],
        rayons = ["Жукова", "Ольминского", "Олимпийский", "Королёва", "Солнечный", "Макаренко", "Лог", "Восточный", "Степной", "Космос", "Дубрава-3", "Конева", "Маслозавод", "Пушкарская", "Прядченко"],
        point = [51.30826124, 37.87969247],
        Zhukova = [[0.4318739002138402, 34.95166989496448], [-0.9029141460242159, 85.52866790801349], [0.4373551301397357, 34.73629728068499], [-0.904375187345209, 85.56877287785977]],
        Olminskogo = [[0.19375971938632913, 43.97507148160086], [-0.8960893099652893, 85.25433881216819], [0.38247959491364525, 36.82311928258122], [-2.337307266556488, 139.81663076634055]],
        Olimpiyskiy = [[0.42150589592942933, 35.33646307503367], [-0.8589060303813854, 83.8606147049621], [0.4250621372751663, 35.19410002383042], [-0.8768339452171371, 84.52536386881698]],
        Koroleva = [[0.41023989975876557, 35.76355837442101], [-0.9066451839536653, 85.68007991362033], [0.4441465234264019, 34.47079101344945], [-0.9018960481962303, 85.49101627402197]],
        Solnechniy = [[0.02404755016690807, 50.40501360115207], [-0.8811228261960989, 84.71262019435622], [0.4278940954252477, 35.09475791487185], [-0.9211816167626559, 86.22193623659865]],
        Makarenko = [[0.4338736908080876, 34.881703860705215], [-0.9232775571818655, 86.30007891606944], [0.4249670460076215, 35.213835914695785], [-0.9175558210437857, 86.06816272429393]],
        Log = [[0.45706791416276193, 34.00279064540856], [-0.8954853395955998, 85.2569305354482], [0.03334274920039694, 50.05326827871334], [-0.9378567802009743, 86.85367739249546]],
        Vostochny = [[0.4284617893038998, 35.072874593293676], [-0.9099206145788028, 85.81318478951752], [0.4255747257406465, 35.17503356828847], [-0.8716257048074784, 84.35346691079933]],
        Stepnoy = [[0.42340592020376805, 35.26453377699202], [-0.8515271512589585, 83.60819400944737], [0.19090885529445295, 44.07288868834758], [-0.9144282501304966, 85.98481756819322]],
        Kosmos = [[0.4534919577513784, 34.11611813860261], [-0.9308315076190002, 86.58680487508516], [0.23927105200396426, 42.226528405187096], [-0.7879350913150066, 81.15471093628311]],
        Dubrava3 = [[0.2589170956560942, 41.49271957847887], [-1.325136773265137, 101.56589013963986], [0.06454529508314014, 48.857657898047385], [-0.332530446735289, 63.9155624678894]],
        Koneva = [[0.30994876054870163, 39.57017357565858], [-0.9004333032834253, 85.41902906806416], [-0.11920317780268574, 55.82092828687772]],
        Maslozavod = [[0.22309186494905908, 42.86461232258337], [-4.69084609262047, 228.93496035212854], [0.033609455627128845, 50.03447634748467], [-0.12654120700834365, 56.09824451464932], [0.8973941411981402, 17.33490749574903]],
        Pushkarskay = [[0.02155300240129556, 50.49086424866115], [38.074324325675576, -1390.449948284884], [-0.10340618361450074, 55.221043732309525], [0.5190746309958529, 31.65437867277766]],
        Prydchenko = [[-0.02527752249891289, 52.264116132586615], [-0.4197402694671042, 67.2069272509966], [0.007816236224266705, 51.008422321744085], [-0.6233214615451642, 74.90899022638243], [62.04659830411838, -2298.22085884846]]
    var myMap = new ymaps.Map('map', {
        center: [51.31059486, 37.87972794],
        zoom: 15,
        params: {
            reverseGeocoding: true
          }
        }, {
            searchControlProvider: 'yandex#search'
        });
    var myPlacemark = false;
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        myMap.geoObjects.removeAll();
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events.add('dragend', function () {
            getAddress(myPlacemark.geometry.getCoordinates());
        });

        getAddress(coords);

    });

    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: false
        });
    }

    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    iconCaption: [
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    balloonContent: firstGeoObject.getAddressLine()
                });
            referencePoints = []
            viaIndexes = []
            rayon = ""
            if ((Zhukova[0][0]*coords[1]+Zhukova[0][1] > coords[0]) && (Zhukova[1][0]*coords[1]+Zhukova[1][1] > coords[0]) && (Zhukova[2][0]*coords[1]+Zhukova[2][1] < coords[0]) && (Zhukova[3][0]*coords[1]+Zhukova[3][1] < coords[0])) {
                rayon = "Жукова"
            }
            if ((Olminskogo[0][0]*coords[1]+Olminskogo[0][1] > coords[0]) && (Olminskogo[1][0]*coords[1]+Olminskogo[1][1] > coords[0]) && (Olminskogo[2][0]*coords[1]+Olminskogo[2][1] < coords[0]) && (Olminskogo[3][0]*coords[1]+Olminskogo[3][1] < coords[0])) {
                rayon = "Ольминского"
            }
            if ((Olimpiyskiy[0][0]*coords[1]+Olimpiyskiy[0][1] > coords[0]) && (Olimpiyskiy[1][0]*coords[1]+Olimpiyskiy[1][1] > coords[0]) && (Olimpiyskiy[2][0]*coords[1]+Olimpiyskiy[2][1] < coords[0]) && (Olimpiyskiy[3][0]*coords[1]+Olimpiyskiy[3][1] < coords[0])) {
                rayon = "Олимпийский"
            }
            if ((Koroleva[0][0]*coords[1]+Koroleva[0][1] > coords[0]) && (Koroleva[1][0]*coords[1]+Koroleva[1][1] > coords[0]) && (Koroleva[2][0]*coords[1]+Koroleva[2][1] < coords[0]) && (Koroleva[3][0]*coords[1]+Koroleva[3][1] < coords[0])) {
                rayon = "Королёва"
            }
            if ((Solnechniy[0][0]*coords[1]+Solnechniy[0][1] > coords[0]) && (Solnechniy[1][0]*coords[1]+Solnechniy[1][1] > coords[0]) && (Solnechniy[2][0]*coords[1]+Solnechniy[2][1] < coords[0]) && (Solnechniy[3][0]*coords[1]+Solnechniy[3][1] < coords[0])) {
                rayon = "Солнечный"
            }
            if ((Makarenko[0][0]*coords[1]+Makarenko[0][1] > coords[0]) && (Makarenko[1][0]*coords[1]+Makarenko[1][1] > coords[0]) && (Makarenko[2][0]*coords[1]+Makarenko[2][1] < coords[0]) && (Makarenko[3][0]*coords[1]+Makarenko[3][1] < coords[0])) {
                rayon = "Макаренко"
            }
            if ((Log[0][0]*coords[1]+Log[0][1] > coords[0]) && (Log[1][0]*coords[1]+Log[1][1] > coords[0]) && (Log[2][0]*coords[1]+Log[2][1] < coords[0]) && (Log[3][0]*coords[1]+Log[3][1] < coords[0])) {
                rayon = "Лог"
            }
            if ((Vostochny[0][0]*coords[1]+Vostochny[0][1] > coords[0]) && (Vostochny[1][0]*coords[1]+Vostochny[1][1] > coords[0]) && (Vostochny[2][0]*coords[1]+Vostochny[2][1] < coords[0]) && (Vostochny[3][0]*coords[1]+Vostochny[3][1] < coords[0])) {
                rayon = "Восточный"
            }
            if ((Stepnoy[0][0]*coords[1]+Stepnoy[0][1] > coords[0]) && (Stepnoy[1][0]*coords[1]+Stepnoy[1][1] > coords[0]) && (Stepnoy[2][0]*coords[1]+Stepnoy[2][1] < coords[0]) && (Stepnoy[3][0]*coords[1]+Stepnoy[3][1] < coords[0])) {
                rayon = "Степной"
            }
            if ((Kosmos[0][0]*coords[1]+Kosmos[0][1] > coords[0]) && (Kosmos[1][0]*coords[1]+Kosmos[1][1] > coords[0]) && (Kosmos[2][0]*coords[1]+Kosmos[2][1] < coords[0]) && (Kosmos[3][0]*coords[1]+Kosmos[3][1] < coords[0])) {
                rayon = "Космос"
            }
            if ((Dubrava3[0][0]*coords[1]+Dubrava3[0][1] > coords[0]) && (Dubrava3[1][0]*coords[1]+Dubrava3[1][1] > coords[0]) && (Dubrava3[2][0]*coords[1]+Dubrava3[2][1] < coords[0]) && (Dubrava3[3][0]*coords[1]+Dubrava3[3][1] < coords[0])) {
                rayon = "Дубрава-3"
            }
            if ((Koneva[0][0]*coords[1]+Koneva[0][1] > coords[0]) && (Koneva[1][0]*coords[1]+Koneva[1][1] > coords[0]) && (Koneva[2][0]*coords[1]+Koneva[2][1] < coords[0])) {
                rayon = "Конева"
            }
            if ((Maslozavod[0][0]*coords[1]+Maslozavod[0][1] > coords[0]) && (Maslozavod[1][0]*coords[1]+Maslozavod[1][1] > coords[0]) && (Maslozavod[2][0]*coords[1]+Maslozavod[2][1] < coords[0]) && (Maslozavod[3][0]*coords[1]+Maslozavod[3][1] < coords[0])  && (Maslozavod[4][0]*coords[1]+Maslozavod[4][1] > coords[0])) {
                rayon = "Маслозавод"
            }
            if ((Pushkarskay[0][0]*coords[1]+Pushkarskay[0][1] > coords[0]) && (Pushkarskay[1][0]*coords[1]+Pushkarskay[1][1] < coords[0]) && (Pushkarskay[2][0]*coords[1]+Pushkarskay[2][1] < coords[0]) && (Pushkarskay[3][0]*coords[1]+Pushkarskay[3][1] > coords[0])) {
                rayon = "Пушкарская"
            }
            if ((Prydchenko[0][0]*coords[1]+Prydchenko[0][1] > coords[0]) && (Prydchenko[1][0]*coords[1]+Prydchenko[1][1] > coords[0]) && (Prydchenko[2][0]*coords[1]+Prydchenko[2][1] < coords[0]) && (Prydchenko[3][0]*coords[1]+Prydchenko[3][1] < coords[0]) && (Prydchenko[4][0]*coords[1]+Prydchenko[4][1] > coords[0])) {
                rayon = "Прядченко"
            }

            if (rayons.includes(rayon)) {
                switch (rayon) {
                    case 'Жукова':
                        referencePoints = [coords, pointZhukova, point];
                        viaIndexes = [1];
                        break;
                    case "Ольминского":
                        referencePoints = [coords, pointOlminskogo, point];
                        viaIndexes = [1];
                        break;                 
                    case "Олимпийский":
                        referencePoints = [coords, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "Королёва":
                        referencePoints = [coords, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3];
                        break;
                    case "Солнечный":
                        referencePoints = [coords, pointSolnechniy, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "Макаренко":
                        referencePoints = [coords, pointMakarenko, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "Лог":
                        referencePoints = [coords, pointLog, pointSolnechniy, pointZhukova, point];
                        viaIndexes = [1, 2, 3];
                        break;
                    case "Восточный":
                        referencePoints = [coords, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3, 4];
                        break;
                    case "Степной":
                        referencePoints = [coords, pointStepnoy, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3, 4, 5];
                        break;
                    case "Космос":
                        referencePoints = [coords, pointKosmos, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3];
                        break;
                    case "Дубрава-3":
                        referencePoints = [coords, pointDubrava3, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3, 4, 5];
                        break;                                   
                    case "Конева":
                        referencePoints = [coords, point];
                        viaIndexes = [];
                        break;
                    case "Маслозавод":
                        referencePoints = [coords, pointMaslozavod, pointOlminskogo, point];
                        viaIndexes = [1, 2];
                        break;   
                    case "Пушкарская":
                        referencePoints = [coords, pointPushkarskay, pointMaslozavod, pointOlminskogo, point];
                        viaIndexes = [1, 2, 3];
                        break;   
                    case "Прядченко":
                        referencePoints = [coords, pointPrydchenko, pointPushkarskay, pointMaslozavod, pointOlminskogo, point];
                        viaIndexes = [1, 2, 3, 4];
                        break;                                                         
                }

                var multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: referencePoints,
                    params: {
                        routingMode: 'pedestrian'
                    }
                }, {
                    boundsAutoApply: true,
                    viaIndexes: viaIndexes,
                    wayPointStartIconFillColor: "#55cc88",
                    routeActivePedestrianSegmentStrokeStyle: "solid",
                    routeActivePedestrianSegmentStrokeColor: "#339955",
                    wayPointFinishIconFillColor: "#5588cc",
                });

                myMap.geoObjects.add(multiRoute);
            }
            else {
                alert("Извините, но мы не можем построить безопасный маршрут из данной точки, рекомендуем Вам обратиться к родителям, чтобы те отвезли Вас в школу!");
            }
        });    
    }
}