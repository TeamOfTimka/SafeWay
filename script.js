function init() {
    var pointZhukova = [51.31093697, 37.88052742],
        pointOlminskogo = [51.31126982, 37.87902002],
        pointOlimpiyskiy = [51.30565938, 37.88637232],
        pointKoroleva = [51.31087609, 37.89849798],
        pointSolnechniy = [51.31590854, 37.89294313],
        pointMakarenko = [51.31160914, 37.87977001],
        pointLog = [51.31676928, 37.89199321],
        pointVostochny = [51.31184244, 37.90776432],
        pointSeverny = [51.31377998, 37.91539877],
        pointKoneva = [],
        point = [51.30826124, 37.87969247]
    var myMap = new ymaps.Map('map', {
        center: [51.31059486, 37.87972794],
        zoom: 15,
        params: {
            reverseGeocoding: true
          }
        }, {
            searchControlProvider: 'yandex#search'
        });
    var myPlacemark = false

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        myMap.geoObjects.removeAll()
        myPlacemark = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemark);
        myPlacemark.events.add('dragend', function () {
            getAddress(myPlacemark.geometry.getCoordinates());
        });
        
        getAddress(coords);
    });

    // �������� �����.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: '�����...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: false
        });
    }

    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', '�����...');
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
        console.log(myPlacemark.properties["_data"]["iconCaption"].split(" ")[2], myPlacemark.properties["_data"]["iconCaption"].split(" ")[4])
        rayons = ["���������", "�����������", "������", "������", "�����������", "���������", "�������", "���", "���������", "�������", "�����������"]
        if (rayons.includes(myPlacemark.properties["_data"]["iconCaption"].split(" ")[2])) {
            switch (myPlacemark.properties["_data"]["iconCaption"].split(" ")[2]) {
                case "������":
                    referencePoints = [coords, point];
                    break;
                case '������':
                    referencePoints = [coords, pointZhukova, point];
                    viaIndexes = [1];
                    break;
                case "�����������":
                    referencePoints = [coords, pointOlminskogo, point];
                    viaIndexes = [1];
                    break;     
                case "���������":
                    referencePoints = [coords, pointMakarenko, pointZhukova, point];
                    viaIndexes = [1, 2];
                    break;
                case "�����������":
                    referencePoints = [coords, pointOlimpiyskiy, pointZhukova, point];
                    viaIndexes = [1, 2];
                    break;
                case "�����������":
                    referencePoints = [coords, pointOlimpiyskiy, pointZhukova, point];
                    viaIndexes = [1, 2];
                    break;    
                case "�������":
                    referencePoints = [coords, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                    viaIndexes = [1, 2, 3];
                    break;
                case "���������":
                    referencePoints = [coords, pointSolnechniy, pointZhukova, point];
                    viaIndexes = [1, 2];
                    break;
                case "���������":
                    referencePoints = [coords, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                    viaIndexes = [1, 2, 3, 4];
                    break;
                case "�������":
                    referencePoints = [coords, pointSeverny, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                    viaIndexes = [1, 2, 3, 4, 5];
                    break;
                case "���":
                    referencePoints = [coords, pointLog, pointSolnechniy, pointZhukova, point];
                    viaIndexes = [1, 2, 3];
                    break;
                case "����":
                    referencePoints = [coords, pointLog, pointSolnechniy, pointZhukova, point];
                    viaIndexes = [1, 2, 3];
                    break;    
                default:
                    alert("��������, �������� �������������� ������: ��� �� ������� ��������� ���������� ������� �� ��������� ���� �����; ��� ���������� ������ ���������� ���������� ������� �������� ����!");
                    break;                                                    
            }
        }
        else {
            if (rayons.includes(myPlacemark.properties["_data"]["iconCaption"].split(" ")[3])) {
                switch (myPlacemark.properties["_data"]["iconCaption"].split(" ")[3]) {
                    case "������":
                        referencePoints = [coords, point];
                        break;
                    case "������":
                        referencePoints = [coords, pointZhukova, point];
                        viaIndexes = [1];
                        break;
                    case "�����������":
                        referencePoints = [coords, pointOlminskogo, point];
                        viaIndexes = [1];
                        break;     
                    case "���������":
                        referencePoints = [coords, pointMakarenko, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "�����������":
                        referencePoints = [coords, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "�������":
                        referencePoints = [coords, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3];
                        break;
                    case "���������":
                        referencePoints = [coords, pointSolnechniy, pointZhukova, point];
                        viaIndexes = [1, 2];
                        break;
                    case "���������":
                        referencePoints = [coords, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3, 4];
                        break;
                    case "�������":
                        referencePoints = [coords, pointSeverny, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                        viaIndexes = [1, 2, 3, 4, 5];
                        break;
                    case "���":
                        referencePoints = [coords, pointLog, pointSolnechniy, pointZhukova, point];
                        viaIndexes = [1, 2, 3];
                        break;
                    default:
                        alert("��������, �������� �������������� ������: ��� �� ������� ��������� ���������� ������� �� ��������� ���� �����; ��� ���������� ������ ���������� ���������� ������� �������� ����!");
                        break;                                                    
                }
            }
            else {
                if (rayons.includes(myPlacemark.properties["_data"]["iconCaption"].split(" ")[4])) {
                    switch (myPlacemark.properties["_data"]["iconCaption"].split(" ")[4]) {
                        case "������":
                            referencePoints = [coords, point];
                            break;
                        case "������":
                            referencePoints = [coords, pointZhukova, point];
                            viaIndexes = [1];
                            break;
                        case "�����������":
                            referencePoints = [coords, pointOlminskogo, point];
                            viaIndexes = [1];
                            break;     
                        case "���������":
                            referencePoints = [coords, pointMakarenko, pointZhukova, point];
                            viaIndexes = [1, 2];
                            break;
                        case "�����������":
                            referencePoints = [coords, pointOlimpiyskiy, pointZhukova, point];
                            viaIndexes = [1, 2];
                            break;
                        case "�������":
                            referencePoints = [coords, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                            viaIndexes = [1, 2, 3];
                            break;
                        case "���������":
                            referencePoints = [coords, pointSolnechniy, pointZhukova, point];
                            viaIndexes = [1, 2];
                            break;
                        case "���������":
                            referencePoints = [coords, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                            viaIndexes = [1, 2, 3, 4];
                            break;
                        case "�������":
                            referencePoints = [coords, pointSeverny, pointVostochny, pointKoroleva, pointOlimpiyskiy, pointZhukova, point];
                            viaIndexes = [1, 2, 3, 4, 5];
                            break;
                        case "���":
                            referencePoints = [coords, pointLog, pointSolnechniy, pointZhukova, point];
                            viaIndexes = [1, 2, 3];
                            break;
                        default:
					alert("��������, �������� �������������� ������: ��� �� ������� ��������� ���������� ������� �� ��������� ���� �����; ��� ���������� ������ ���������� ���������� ������� �������� ����!");
                            break;                                                    
                    }
                }
                else{
                    alert("��������, �� �� �� ����� ��������� ���������� ������� �� ������ �����, ����������� ��� ���������� � ���������, ����� �� ������� ��� � �����!");
                }
            }
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
            routeActivePedestrianSegmentStrokeColor: "#99ffbb",
            wayPointFinishIconFillColor: "#5588cc",
        });
        myMap.geoObjects.add(multiRoute);
    });    
}
}
ymaps.ready(init);